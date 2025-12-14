import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { db } from '../firebase';
import { ref, onValue, update } from "firebase/database";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [view, setView] = useState('orders'); // 'orders' or 'qr'

    useEffect(() => {
        // Listen for orders
        const ordersRef = ref(db, 'orders');
        const unsubscribe = onValue(ordersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert object to array
                const ordersArray = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                // Sort by timestamp (newest first)
                ordersArray.sort((a, b) => b.timestamp - a.timestamp);

                // Check if there's a new order to play sound (simple check: length increased)
                // In production, you'd want a more robust way to detect *new* vs *updated*
                // keeping it simple for now: if new length > old length, play sound.
                // NOTE: This runs on initial load too.
                setOrders(prev => {
                    if (ordersArray.length > prev.length && prev.length > 0) {
                        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-positive-notification-951.mp3');
                        audio.play().catch(e => console.log('Audio play failed', e));
                    }
                    return ordersArray;
                });
            } else {
                setOrders([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const updateStatus = (orderId, newStatus) => {
        update(ref(db, 'orders/' + orderId), { status: newStatus })
            .catch(error => console.error("Error updating status:", error));
    };

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', paddingTop: '20px' }}>
                <h1>Rocket Kitchen 👨‍🍳</h1>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <nav style={{ display: 'flex', gap: '8px', backgroundColor: '#F3F4F6', padding: '4px', borderRadius: '8px' }}>
                        <button
                            onClick={() => setView('orders')}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '6px',
                                backgroundColor: view === 'orders' ? 'white' : 'transparent',
                                color: view === 'orders' ? '#D97706' : '#6B7280',
                                fontWeight: '600',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: view === 'orders' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                            }}
                        >
                            Orders
                        </button>
                        <button
                            onClick={() => setView('qr')}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '6px',
                                backgroundColor: view === 'qr' ? 'white' : 'transparent',
                                color: view === 'qr' ? '#D97706' : '#6B7280',
                                fontWeight: '600',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: view === 'qr' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
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
                                                backgroundColor: 'var(--secondary-color)',
                                                color: 'var(--primary-color)',
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
