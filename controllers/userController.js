const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name?.trim() || !email?.trim() || !password?.trim())
      return res.status(400).json({ error: 'Nombre, email y contraseña son obligatorios' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'El email ya está registrado' });

    const user = await User.create({ name, email, password });
    const token = generateToken(user);
    res.status(201).json({
      message: 'Usuario registrado',
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = generateToken(user);
    res.json({
      message: 'Login exitoso',
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (err) { next(err); }
};

exports.verifyToken = async (req, res) => {
  
  res.json({ valid: true, userId: req.user.id, email: req.user.email });
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; 
    await user.save();

    res.json({ message: 'Perfil actualizado', user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) { next(err); }
};
