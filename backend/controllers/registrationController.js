import pool from '../utils/db.js';

export const registerForEvent = async (req, res) => {
  try {
    const studentUuid = req.user.student_uuid;
    const { event_id } = req.body;

    // Check if student exists and has paid
    const studentResult = await pool.query(
      `SELECT payment_t1, payment_t2, payment_t3 FROM students WHERE student_uuid = $1`,
      [studentUuid]
    );
    if (studentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const student = studentResult.rows[0];

    // Check event details
    const eventResult = await pool.query(
      `SELECT section, max_capacity, current_registrations 
       FROM events WHERE event_id = $1`,
      [event_id]
    );
    if (eventResult.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const event = eventResult.rows[0];

    // Verify student has paid for this section
    if (
      (event.section === 'T1' && !student.payment_t1) ||
      (event.section === 'T2' && !student.payment_t2) ||
      (event.section === 'T3' && !student.payment_t3)
    ) {
      return res.status(403).json({ error: 'You are not allowed to register for this section. Please complete payment first.' });
    }

    // Check capacity
    if (event.current_registrations >= event.max_capacity) {
      return res.status(403).json({ error: 'This event is full. No more registrations allowed.' });
    }

    // Register student
    await pool.query(
      `INSERT INTO registrations (student_uuid, event_id) VALUES ($1, $2)`,
      [studentUuid, event_id]
    );

    // Increment current_registrations
    await pool.query(
      `UPDATE events SET current_registrations = current_registrations + 1 WHERE event_id = $1`,
      [event_id]
    );

    res.status(201).json({ message: 'Successfully registered for event' });
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
