const bcrypt = require('bcrypt');
const config = require('../config/config');

class User {
  static async findByUsername(username) {
    const user = config.USERS.find(u => u.username === username);
    if (!user) return null;
    
    return {
      id: user.id,
      username: user.username,
      passwordHash: await bcrypt.hash(user.password, 10),
      role: user.role
    };
  }

  static async comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  }
}

module.exports = User;
