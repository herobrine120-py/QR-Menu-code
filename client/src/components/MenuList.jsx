import React, { useState, useMemo } from 'react';

const MenuList = ({ menu, cart, addToCart, removeFromCart }) => {
    const [selectedCategory, setSelectedCategory] = useState("Tout");

    // Extract unique categories
    const categories = useMemo(() => {
        return ["Tout", ...new Set(menu.map(item => item.category))];
    }, [menu]);

    // Filter items
    const filteredItems = useMemo(() => {
        if (selectedCategory === "Tout") return menu;
        return menu.filter(item => item.category === selectedCategory);
    }, [selectedCategory, menu]);

    return (
        <div style={{ paddingBottom: '20px' }}>
            {/* Horizontal Categories */}
            <div className="category-scroll" style={{
                display: 'flex',
                gap: '12px',
                overflowX: 'auto',
                padding: '0 8px 16px',
                marginBottom: '16px',
                scrollbarWidth: 'none', // hide scrollbar Firefox
                msOverflowStyle: 'none' // hide scrollbar IE
            }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '24px',
                            border: 'none',
                            backgroundColor: selectedCategory === cat ? 'var(--primary-color)' : '#F3F4F6',
                            color: selectedCategory === cat ? 'white' : '#4B5563',
                            fontWeight: '600',
                            whiteSpace: 'nowrap',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: selectedCategory === cat ? '0 4px 6px -1px rgba(217, 119, 6, 0.4)' : 'none'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Menu Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
                {filteredItems.map(item => {
                    const qty = cart[item.id] || 0;
                    return (
                        <div key={item.id} className="card menu-card" style={{
                            padding: '0',
                            overflow: 'hidden',
                            borderRadius: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'white',
                            border: '1px solid #F3F4F6',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                        }}>
                            <div style={{ height: '140px', width: '100%', position: 'relative' }}>
                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>

                            <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>{item.name}</h3>
                                    <span style={{ fontWeight: '800', color: 'var(--primary-color)', fontSize: '1rem' }}>{item.price}<small style={{ fontSize: '0.7em' }}>DH</small></span>
                                </div>
                                <p style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '12px', lineHeight: '1.4', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>

                                {qty === 0 ? (
                                    <button
                                        onClick={() => addToCart(item.id)}
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            borderRadius: '12px',
                                            backgroundColor: 'var(--primary-color)',
                                            color: 'white',
                                            border: 'none',
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        إضافة للطلب
                                    </button>
                                ) : (
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        backgroundColor: '#F3F4F6',
                                        borderRadius: '12px',
                                        padding: '4px'
                                    }}>
                                        <button onClick={() => removeFromCart(item.id)} style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', border: 'none', backgroundColor: 'white', color: '#111827', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>-</button>
                                        <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>{qty}</span>
                                        <button onClick={() => addToCart(item.id)} style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', border: 'none', backgroundColor: 'var(--primary-color)', color: 'white', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>+</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MenuList;
