const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { menu } = require('./data');

const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Serve static files from the React app (after build)
app.use(express.static(path.join(__dirname, '../client/dist')));

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Store active orders in memory
let orders = [];

// REST API Routes
app.get('/api/menu', (req, res) => {
    res.json(menu);
});

app.get('/api/orders', (req, res) => {
    res.json(orders);
});

// Socket.io Events
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Admin joins the admin room
    socket.on('join_admin', () => {
        socket.join('admin_room');
        console.log('Admin joined');
    });

    // Customer places an order
    socket.on('place_order', (orderData) => {
        const newOrder = {
            id: Date.now().toString(),
            tableId: orderData.tableId,
            items: orderData.items,
            total: orderData.total,
            status: 'pending',
            timestamp: new Date()
        };

        orders.push(newOrder);

        // Broadcast to admin room
        io.to('admin_room').emit('new_order', newOrder);

        // Confirm to customer
        socket.emit('order_confirmed', newOrder);
        console.log('Order placed:', newOrder.id);
    });

    // Update order status (for admin)
    socket.on('update_status', ({ orderId, status }) => {
        const orderIndex = orders.findIndex(o => o.id === orderId);
        if (orderIndex !== -1) {
            orders[orderIndex].status = status;
            io.emit('status_updated', { orderId, status }); // Broadcast to everyone (optional, if we want customer to see)
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
