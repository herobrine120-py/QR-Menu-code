import React from 'react';

const MenuList = ({ menu, cart, addToCart, removeFromCart }) => {
    return (
        <div className="menu-list">
            {menu.map(item => {
                const qty = cart[item.id] || 0;
                return (
                    <div key={item.id} className="card menu-item" style={{ display: 'flex', marginBottom: '16px', gap: '16px', alignItems: 'center' }}>
                        <div className="menu-item-image" style={{ width: '100px', height: '100px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div className="menu-item-details" style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{item.name}</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>${item.price.toFixed(2)}</span>

                                <div className="qty-controls" style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#252830', padding: '4px 8px', borderRadius: '8px' }}>
                                    {qty > 0 ? (
                                        <>
                                            <button onClick={() => removeFromCart(item.id)} style={{ color: 'white', background: 'none', padding: '0', fontSize: '1.2rem' }}>-</button>
                                            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{qty}</span>
                                            <button onClick={() => addToCart(item.id)} style={{ color: 'var(--primary-color)', background: 'none', padding: '0', fontSize: '1.2rem' }}>+</button>
                                        </>
                                    ) : (
                                        <button onClick={() => addToCart(item.id)} style={{ color: 'var(--primary-color)', background: 'none', padding: '0', fontSize: '0.9rem', fontWeight: 600 }}>ADD</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MenuList;
