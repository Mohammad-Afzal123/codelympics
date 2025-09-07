import multer from 'multer';
import fs from 'fs';
import pool from '../utils/db.js';
import { parseCSV } from '../utils/csvParser.js';

const upload = multer({ dest: 'uploads/' });

export const uploadCSVMiddleware = upload.single('file');

export const updatePaymentsFromCSV = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'CSV file is required' });
  }
  try {
    const usersData = await parseCSV(req.file.path);

    // Example: CSV columns: college_id, email, payment_t1, payment_t2, payment_t3
    for (const user of usersData) {
      const { college_id, email, payment_t1, payment_t2, payment_t3 } = user;

      await pool.query(
        `UPDATE students 
         SET payment_t1 = $1, payment_t2 = $2, payment_t3 = $3
         WHERE college_id = $4 AND email = $5`,
        [
          payment_t1?.toLowerCase() === 'true',
          payment_t2?.toLowerCase() === 'true',
          payment_t3?.toLowerCase() === 'true',
          college_id,
          email,
        ]
      );
    }

    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting uploaded CSV:', err);
    });

    res.json({ message: 'CSV uploaded and processed successfully.' });
  } catch (error) {
    next(error);
  }
};
