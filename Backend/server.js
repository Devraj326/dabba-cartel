const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://dev326patil:dev332266@dabbacaartel.lx9y9qz.mongodb.net/?retryWrites=true&w=majority&appName=dabbaCaartel', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB');
    
    // Drop existing indexes and recreate with correct compound index
    try {
        await LunchBox.collection.dropIndex('date_1');
        console.log('Dropped old date index');
    } catch (error) {
        console.log('No old date index to drop');
    }
    
    try {
        await LunchBox.collection.createIndex({ date: 1, user: 1 }, { unique: true });
        console.log('Created compound index for date and user');
    } catch (error) {
        console.log('Compound index already exists');
    }
});

// Schema for lunch box tracking
const lunchBoxSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    user: {
        type: String,
        required: true,
        enum: ['Devraj', 'Anuj', 'Akshat', 'Shaksham', 'Mayur']
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    totalCost: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

// Create compound index for unique date-user combination
lunchBoxSchema.index({ date: 1, user: 1 }, { unique: true });

const LunchBox = mongoose.model('LunchBox', lunchBoxSchema);


// Routes
// Get all records
app.get('/api/lunchbox', async (req, res) => {
    try {
        const records = await LunchBox.find().sort({ date: -1 });
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add new record
app.post('/api/lunchbox', async (req, res) => {
    try {
        const { date, user, quantity } = req.body;
        const totalCost = quantity * 80; // 80rs per lunch box

        const lunchBox = new LunchBox({
            date: new Date(date),
            user,
            quantity,
            totalCost
        });

        await lunchBox.save();
        res.status(201).json(lunchBox);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: 'Record for this user and date already exists' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

// Update record
app.put('/api/lunchbox/:id', async (req, res) => {
    try {
        const { quantity } = req.body;
        const totalCost = quantity * 80;

        const lunchBox = await LunchBox.findByIdAndUpdate(
            req.params.id,
            { quantity, totalCost },
            { new: true }
        );

        if (!lunchBox) {
            return res.status(404).json({ error: 'Record not found' });
        }

        res.json(lunchBox);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get records by date range for calendar
app.get('/api/lunchbox/calendar/:year/:month', async (req, res) => {
    try {
        const { year, month } = req.params;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);

        const records = await LunchBox.find({
            date: {
                $gte: startDate,
                $lte: endDate
            }
        }).sort({ date: 1, user: 1 });

        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user statistics
app.get('/api/stats/user/:user', async (req, res) => {
    try {
        const { user } = req.params;
        const stats = await LunchBox.aggregate([
            { $match: { user: user } },
            {
                $group: {
                    _id: null,
                    totalBoxes: { $sum: '$quantity' },
                    totalAmount: { $sum: '$totalCost' },
                    totalDays: { $sum: 1 }
                }
            }
        ]);

        res.json(stats[0] || { totalBoxes: 0, totalAmount: 0, totalDays: 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete record
app.delete('/api/lunchbox/:id', async (req, res) => {
    try {
        const lunchBox = await LunchBox.findByIdAndDelete(req.params.id);
        if (!lunchBox) {
            return res.status(404).json({ error: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get total statistics
app.get('/api/stats', async (req, res) => {
    try {
        const stats = await LunchBox.aggregate([
            {
                $group: {
                    _id: null,
                    totalBoxes: { $sum: '$quantity' },
                    totalAmount: { $sum: '$totalCost' },
                    totalDays: { $sum: 1 }
                }
            }
        ]);

        res.json(stats[0] || { totalBoxes: 0, totalAmount: 0, totalDays: 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all users statistics for dashboard
app.get('/api/stats/all-users', async (req, res) => {
    try {
        const userStats = await LunchBox.aggregate([
            {
                $group: {
                    _id: '$user',
                    totalBoxes: { $sum: '$quantity' },
                    totalAmount: { $sum: '$totalCost' },
                    totalDays: { $sum: 1 }
                }
            },
            {
                $sort: { totalAmount: -1 }
            }
        ]);

        // Add users with no records
        const users = ['Devraj', 'Anuj', 'Akshat', 'Shaksham', 'Mayur'];
        const result = users.map(user => {
            const userStat = userStats.find(stat => stat._id === user);
            return {
                user: user,
                totalBoxes: userStat ? userStat.totalBoxes : 0,
                totalAmount: userStat ? userStat.totalAmount : 0,
                totalDays: userStat ? userStat.totalDays : 0
            };
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
