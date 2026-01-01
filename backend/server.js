const dotenv = require('dotenv');
const connectDB = require('./src/config/connectdb');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Import app from app.js (NOT create new express() here)
const app = require('./src/app');

// If your app.js doesn't export app, use this instead:
// const authRoutes = require('./routes/auth.routes');
// const taskRoutes = require('./routes/task.routes');
// const errorHandler = require('./middlewares/error.middleware');

// app.use(cors());
// app.use(express.json());
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/tasks', taskRoutes);
// app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
