import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

// Components (We will create these next)
import MenuList from './components/MenuList';
import CartAction from './components/CartAction';
import OrderSuccess from './components/OrderSuccess';
import AdminDashboard from './components/AdminDashboard';

// Initialize Socket (outside component to avoid reconnects, or use ref/effect)
const SOCKET_URL = 'http://localhost:3001';
const socket = io(SOCKET_URL);

function App() {
  const [view, setView] = useState('menu'); // menu, cart, success, admin
  const [tableId, setTableId] = useState(null);
  const [cart, setCart] = useState({}); // { itemId: quantity }
  const [menu, setMenu] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Check URL for table ID or Admin route
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const table = params.get('table');
    const path = window.location.pathname;

    if (path === '/admin') {
      setView('admin');
    } else if (table) {
      setTableId(table);
    } else {
      // Default table for demo if none provided
      // setTableId(1);
    }
  }, []);

  // Fetch Menu
  useEffect(() => {
    fetch(`${SOCKET_URL}/api/menu`)
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(err => console.error("Failed to fetch menu:", err));
  }, []);

  // Socket Listeners
  useEffect(() => {
    socket.on('order_confirmed', (order) => {
      console.log('Order confirmed:', order);
      setCurrentOrder(order);
      setView('success');
      setCart({}); // Clear cart
    });

    return () => {
      socket.off('order_confirmed');
    };
  }, []);

  const addToCart = (itemId) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const placeOrder = () => {
    if (!tableId) {
      alert("Please scan a valid table QR code.");
      return;
    }

    // Calculate total and prepare items
    let total = 0;
    const items = Object.entries(cart).map(([id, qty]) => {
      const item = menu.find(m => m.id === parseInt(id));
      if (item) {
        total += item.price * qty;
        return { ...item, quantity: qty };
      }
      return null;
    }).filter(Boolean);

    if (items.length === 0) return;

    const orderData = {
      tableId,
      items,
      total
    };

    socket.emit('place_order', orderData);
  };

  if (view === 'admin') {
    return <AdminDashboard socket={socket} />;
  }

  if (!tableId && view !== 'admin') {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Welcome to QR Dine</h1>
        <p>Please scan a QR code on your table to order.</p>
        <p style={{ fontSize: '0.8rem', color: '#666' }}>Dev Note: Try adding ?table=1 to the URL</p>
      </div>
    )
  }

  return (
    <div className="app-container">
      {view === 'success' && currentOrder ? (
        <OrderSuccess order={currentOrder} onBack={() => setView('menu')} />
      ) : (
        <>
          <header className="header container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Table {tableId}</h3>
              <div className="logo">QR Dine</div>
            </div>
          </header>

          <main className="container">
            <MenuList menu={menu} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
          </main>

          {Object.keys(cart).length > 0 && (
            <CartAction cart={cart} menu={menu} onPlaceOrder={placeOrder} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
