import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { ref, push, onValue } from "firebase/database";
import { menu as staticMenu } from './data';
import './App.css';

// Components
import MenuList from './components/MenuList';
import CartAction from './components/CartAction';
import OrderSuccess from './components/OrderSuccess';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [view, setView] = useState('menu'); // menu, cart, success, admin
  const [tableId, setTableId] = useState(null);
  const [cart, setCart] = useState({}); // { itemId: quantity }
  const [menu, setMenu] = useState(staticMenu);
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
    }
  }, []);

  // Place Order
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
      total,
      status: 'pending',
      timestamp: Date.now()
    };

    // Push to Firebase
    push(ref(db, 'orders'), orderData)
      .then((ref) => {
        // Success
        const orderWithId = { ...orderData, id: ref.key };
        console.log('Order placed:', orderWithId);
        setCurrentOrder(orderWithId);
        setView('success');
        setCart({}); // Clear cart
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        alert("Failed to place order. Please try again.");
      });
  };

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

  if (view === 'admin') {
    return <AdminDashboard />;
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
