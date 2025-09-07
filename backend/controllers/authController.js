import pool from '../utils/db.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Query students table by email
    const result = await pool.query(
      'SELECT * FROM students WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found. Please complete payment first.' });
    }

    const user = result.rows[0];

    // Check if user has paid for at least one section
    if (!user.payment_t1 && !user.payment_t2 && !user.payment_t3) {
      return res.status(403).json({ error: 'No active payment found for any section.' });
    }

    // Generate JWT
    const token = jwt.sign(
      { student_uuid: user.student_uuid, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      token,
      user: {
        student_uuid: user.student_uuid,
        name: user.name,
        email: user.email,
        payment_t1: user.payment_t1,
        payment_t2: user.payment_t2,
        payment_t3: user.payment_t3,
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};
