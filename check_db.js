const { Client } = require('pg');

const client = new Client({
  host: 'dpg-d8le43g5uvhc7387hfv0-a.singapore-postgres.render.com',
  user: 'billiards_db_vpjy_user',
  password: '4UqubPvdHSjKpR9qq2E66oU2PpcSekzH',
  database: 'billiards_db_vpjy',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

async function check() {
  try {
    await client.connect();
    
    // List tables
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema='public'
    `);
    console.log('Tables:', tables.rows);
    
    // List users
    const users = await client.query('SELECT * FROM "Users"');
    console.log('Users:', users.rows);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.end();
  }
}

check();
