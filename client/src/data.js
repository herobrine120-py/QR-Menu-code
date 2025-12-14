const menu = [
    // --- Salades ---
    {
        id: 101,
        name: "Salade de Riz",
        description: "Salade de riz avec thon, maïs, oeuf, mayonnaise.",
        price: 30,
        image: "https://images.unsplash.com/photo-1534938665420-4193effeacc4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Salade"
    },
    {
        id: 102,
        name: "Salade Niçoise",
        description: "Lettuce, tomatoes, boiled eggs, olives, tuna.",
        price: 30,
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Salade"
    },
    {
        id: 103,
        name: "Salade César",
        description: "Lettuce, croutons, parmesan cheese, Caesar dressing, chicken.",
        price: 40,
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Salade"
    },

    // --- BOCA DILLO (Sandwiches) ---
    {
        id: 201,
        name: "Pocadillo Bayta (Oeuf)",
        description: "Sandwich with boiled eggs, veggies, and sauce.",
        price: 16,
        image: "https://images.unsplash.com/photo-1553909489-cd47e3b4430f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Bocadillo"
    },
    {
        id: 202,
        name: "Pocadillo Mortadella",
        description: "Sandwich with mortadella.",
        price: 16,
        image: "https://images.unsplash.com/photo-1553909489-cd47e3b4430f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Bocadillo"
    },
    {
        id: 203,
        name: "Pocadillo Thon",
        description: "Classic tuna sandwich with veggies.",
        price: 20,
        image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Bocadillo"
    },
    {
        id: 204,
        name: "Pocadillo Tanjaoui",
        description: "Traditional Tangier style sandwich.",
        price: 22,
        image: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Bocadillo"
    },
    {
        id: 205,
        name: "Pocadillo Poulet",
        description: "Marinated chicken sandwich.",
        price: 35,
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Bocadillo"
    },
    {
        id: 206,
        name: "Pocadillo Kefta",
        description: "Minced meat (kefta) sandwich.",
        price: 37,
        image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Bocadillo"
    },

    // --- Burger ---
    {
        id: 301,
        name: "Cheese Burger",
        description: "Beef patty with melted cheddar cheese.",
        price: 30,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Burger"
    },
    {
        id: 302,
        name: "Chicken Burger",
        description: "Crispy chicken burger.",
        price: 35,
        image: "https://images.unsplash.com/photo-1615297928064-24977384d0f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Burger"
    },

    // --- Tacos ---
    {
        id: 401,
        name: "Tacos Poulet",
        description: "Chicken tacos with cheese sauce and fries.",
        price: 37,
        image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Tacos"
    },
    {
        id: 402,
        name: "Tacos Viande Hachée",
        description: "Minced meat tacos with cheese sauce.",
        price: 40,
        image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Tacos"
    },

    // --- Panini ---
    {
        id: 501,
        name: "Panini Poulet",
        description: "Grilled panini with chicken and cheese.",
        price: 30,
        image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Panini"
    },
    {
        id: 502,
        name: "Panini Viande Hachée",
        description: "Grilled panini with minced meat.",
        price: 32,
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Panini"
    },

    // --- Boissons ---
    {
        id: 601,
        name: "Eau 50cl",
        description: "Bouteille d'eau.",
        price: 7,
        image: "https://images.unsplash.com/photo-1560614062-863f678f9fadb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Boissons"
    },
    {
        id: 602,
        name: "Soda 33cl",
        description: "Coca, Fanta, Sprite, etc.",
        price: 8,
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Boissons"
    },

    // --- Dessert ---
    {
        id: 701,
        name: "Flan",
        description: "Caramel custard.",
        price: 12,
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Dessert"
    },
    {
        id: 702,
        name: "Crema Catalana",
        description: "Brûlée cream.",
        price: 15,
        image: "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Dessert"
    }
];

export { menu };
