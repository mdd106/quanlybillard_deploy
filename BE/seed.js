const bcrypt = require('bcryptjs');
const { sequelize } = require('./config/database');
const { User } = require('./models');

async function seedAdmin() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    // Sync models
    await sequelize.sync({ alter: true });
    console.log('Models synced');

    // Create admin user if not exist
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
      console.log('Admin user created: username=admin, password=admin123');
    } else {
      console.log('Admin user already exists');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedAdmin();
