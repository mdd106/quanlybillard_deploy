const http = require('http');
const app = require('./app');
const { connectDB, sequelize } = require('./config/database');
const initSocket = require('./socket');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
initSocket(server);

// Auto create admin user
const createAdminIfNotExist = async () => {
  try {
    const User = require('./models/User');
    const existingAdmin = await User.findOne({ where: { username: 'admin' } });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        username: 'admin',
        password: hashedPassword,
        fullname: 'Quản trị viên',
        role: 'admin',
        status: 'active'
      });
      console.log('Admin user created: admin/admin123');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating admin:', error.message);
  }
};

// Start Server & Connect Database
const startServer = async () => {
  await connectDB();

  // Import all models to register them with sequelize
  require('./models');

  // Sync database models first
  await sequelize.sync({ force: true }).then(() => {
    console.log('Database synced');
  }).catch((err) => {
    console.error('Failed to sync database: ' + err.message);
  });

  // Create admin user (wait for sync to complete)
  await new Promise(resolve => setTimeout(resolve, 2000));
  await createAdminIfNotExist();

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
