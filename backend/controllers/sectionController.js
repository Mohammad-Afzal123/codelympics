import pool from '../utils/db.js';

export const getPaidSections = async (req, res) => {
  try {
    const { student_uuid } = req.user;

    const { rows } = await pool.query(
      `SELECT payment_t1, payment_t2, payment_t3
       FROM students
       WHERE student_uuid = $1`,
      [student_uuid]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const payments = rows[0];
    const sectionsPaid = [];
    if (payments.payment_t1) sectionsPaid.push('T1');
    if (payments.payment_t2) sectionsPaid.push('T2');
    if (payments.payment_t3) sectionsPaid.push('T3');

    if (sectionsPaid.length === 0) {
      return res.status(200).json({
        message: 'Please complete payment on the secondary site to access events.',
        sections: []
      });
    }

    const capacityQuery = `
      SELECT section, capacity 
      FROM section_capacity 
      WHERE section = ANY($1)
    `;
    const { rows: capacities } = await pool.query(capacityQuery, [sectionsPaid]);

    const result = sectionsPaid.map(section => ({
      section,
      capacity: capacities.find(c => c.section === section)?.capacity ?? null
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching paid sections:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
