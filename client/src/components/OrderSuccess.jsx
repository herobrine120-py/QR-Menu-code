import React from 'react';

const OrderSuccess = ({ order, onBack }) => {
    return (
        <div className="container" style={{ textAlign: 'center', paddingTop: '60px' }}>
            <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                color: '#4CAF50'
            }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>

            <h2 style={{ marginBottom: '16px' }}>Order Placed!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                Your order for Table {order?.tableId} has been sent to the kitchen.
            </p>

            <div className="card" style={{ textAlign: 'left', marginBottom: '32px' }}>
                <h4 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '12px' }}>Order Summary</h4>
                {order?.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.95rem' }}>
                        <span>{item.quantity}x {item.name}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>Total</span>
                    <span>${order?.total.toFixed(2)}</span>
                </div>
            </div>

            <button className="btn" style={{ backgroundColor: 'var(--surface-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }} onClick={onBack}>
                Back to Menu
            </button>
        </div>
    );
};

export default OrderSuccess;
