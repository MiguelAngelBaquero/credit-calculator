// require('dotenv').config();

// const config = {
//   env: process.env.NODE_ENV || 'development',
//   isProd: process.env.NODE_ENV === 'production',
//   port: process.env.NODE_PORT || 3000,
//   dbUser: process.env.DB_USER,
//   dbPassword: process.env.DB_PASSWORD || '',
//   dbPort: process.env.DB_PORT,
//   dbName: process.env.DB_NAME,
//   dbHost: process.env.DB_HOST,
//   dbUrl: process.env.DATABASE_URL || '',
//   apiKey: process.env.API_KEY,
//   jwtSecret: process.env.JWT_SECRET,
//   jwtRecoverySecret: process.env.JWT_RECOVERY_SECRET,
//   emailUser: process.env.EMAIL_USER,
//   emailPassword: process.env.EMAIL_PASS,
//   emailPort: process.env.EMAIL_PORT,
//   emailHost: process.env.EMAIL_HOST,
// };

// module.exports = { config };

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRES_IN: '1h',
  EXTERNAL_API: {
    URL: 'https://api-test.avalburo.com/services/V8/getWebService',
    AUTH: {
      username: 'WSTEST-MAXC',
      password: 'YC^1#I8P@V'
    },
    TIMEOUT: 10000
  },
  USERS: [
    {
      id: 1,
      username: process.env.ADMIN_USER || 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin'
    },
    {
      id: 2,
      username: process.env.ANALYST_USER || 'analista',
      password: process.env.ANALYST_PASSWORD || 'analista123',
      role: 'analyst'
    }
  ]
};
