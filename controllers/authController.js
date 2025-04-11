const jwt = require('jsonwebtoken');
const User = require('./models/User');
const config = require('./config/config');

class AuthController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      
      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
      }
      
      const isValidPassword = await User.comparePasswords(password, user.passwordHash);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }
      
      const token = jwt.sign(
        { userId: user.id, username: user.username, role: user.role },
        config.JWT_SECRET,
        { expiresIn: config.JWT_EXPIRES_IN }
      );
      
      res.json({ token });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  static async profile(req, res) {
    res.json({ 
      user: req.user,
      message: `Hola ${req.user.username}, tienes rol ${req.user.role}` 
    });
  }
}

module.exports = AuthController;