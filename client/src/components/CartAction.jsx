import React from 'react';

const CartAction = ({ cart, menu, onPlaceOrder }) => {
    // Calculate totals
    let totalQty = 0;
    let totalPrice = 0;

    Object.entries(cart).forEach(([id, qty]) => {
        const item = menu.find(m => m.id === parseInt(id));
        if (item) {
            totalQty += qty;
            totalPrice += item.price * qty;
        }
    });

    if (totalQty === 0) return null;

    return (
        <div className="cart-action" style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            right: '20px',
            maxWidth: '560px',
            margin: '0 auto',
            zIndex: 100
        }}>
            <button
                onClick={onPlaceOrder}
                className="btn btn-primary btn-full"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '16px 24px',
                    fontSize: '1.1rem',
                    boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)'
                }}
            >
                <span style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.9rem' }}>{totalQty} items</span>
                <span>View Order</span>
                <span>${totalPrice.toFixed(2)}</span>
            </button>
        </div>
    );
};

export default CartAction;
