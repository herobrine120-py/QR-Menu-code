import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const AdminDashboard = ({ socket }) => {
    const [orders, setOrders] = useState([]);
    const [view, setView] = useState('orders'); // 'orders' or 'qr'

    useEffect(() => {
        // Join admin room
        socket.emit('join_admin');

        // Fetch existing orders
        fetch('http://localhost:3001/api/orders')
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error("Failed to fetch orders:", err));

        // Listen for new orders
        socket.on('new_order', (newOrder) => {
            console.log('New order received:', newOrder);
            setOrders(prev => [newOrder, ...prev]);

            // Play sound
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-positive-notification-951.mp3');
            audio.play().catch(e => console.log('Audio play failed', e));
        });

        socket.on('status_updated', ({ orderId, status }) => {
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
        });

        return () => {
            socket.off('new_order');
            socket.off('status_updated');
        };
    }, [socket]);

    const updateStatus = (orderId, newStatus) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        socket.emit('update_status', { orderId, status: newStatus });
    };

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', paddingTop: '20px' }}>
                <h1>Kitchen Display</h1>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <nav style={{ display: 'flex', gap: '8px', backgroundColor: '#252830', padding: '4px', borderRadius: '8px' }}>
                        <button
                            onClick={() => setView('orders')}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '6px',
                                backgroundColor: view === 'orders' ? '#333a45' : 'transparent',
                                color: view === 'orders' ? 'white' : '#9ca3af'
                            }}
                        >
                            Orders
                        </button>
                        <button
                            onClick={() => setView('qr')}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '6px',
                                backgroundColor: view === 'qr' ? '#333a45' : 'transparent',
                                color: view === 'qr' ? 'white' : '#9ca3af'
                            }}
                        >
                            QR Codes
                        </button>
                    </nav>
                    <div style={{ color: '#4CAF50', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                        <span style={{ width: '10px', height: '10px', backgroundColor: '#4CAF50', borderRadius: '50%', display: 'inline-block' }}></span>
                        Live
                    </div>
                </div>
            </header>

            {view === 'orders' ? (
                <div className="orders-grid">
                    {orders.length === 0 ? (
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '40px' }}>No active orders.</p>
                    ) : (
                        orders.map(order => (
                            <div key={order.id} className="card" style={{ marginBottom: '24px', borderLeft: order.status === 'pending' ? '4px solid var(--primary-color)' : '4px solid #4CAF50' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Table {order.tableId}</h3>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                            #{order.id.slice(-4)} • {new Date(order.timestamp).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>${order.total.toFixed(2)}</div>
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '0.8rem',
                                            backgroundColor: order.status === 'pending' ? 'var(--primary-color)' : '#4CAF50',
                                            color: 'white'
                                        }}>
                                            {order.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    {order.items.map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                            <span style={{
                                                fontWeight: 'bold',
                                                marginRight: '12px',
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                backgroundColor: '#333',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.9rem'
                                            }}>
                                                {item.quantity}
                                            </span>
                                            <span style={{ fontSize: '1.1rem' }}>{item.name}</span>
                                        </div>
                                    ))}
                                </div>

                                {order.status === 'pending' && (
                                    <button
                                        className="btn"
                                        style={{ width: '100%', backgroundColor: '#4CAF50', color: 'white' }}
                                        onClick={() => updateStatus(order.id, 'completed')}
                                    >
                                        Mark as Completed
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <div className="qr-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '24px',
                    padding: '24px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '16px'
                }}>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                        <div key={num} className="card" style={{
                            textAlign: 'center',
                            padding: '32px 16px',
                            backgroundColor: 'white',
                            color: 'black',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            border: 'none',
                            display: 'flex', // fix spacing
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <h3 style={{ color: 'black', marginBottom: '16px', fontSize: '1.5rem' }}>Table {num}</h3>
                            <div style={{ background: 'white', padding: '10px', display: 'inline-block' }}>
                                <QRCodeSVG value={`${window.location.origin}/?table=${num}`} size={150} />
                            </div>
                            <p style={{ marginTop: '16px', fontSize: '0.9rem', color: '#666', fontWeight: 500 }}>Scan to Order</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
