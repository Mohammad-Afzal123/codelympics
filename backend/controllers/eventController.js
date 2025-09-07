import pool from '../utils/db.js';

// Get events based on user's paid sections
export const getEventsBySection = async (req, res) => {
  try {
    const studentUuid = req.user.student_uuid;

    // Fetch payment statuses
    const result = await pool.query(
      `SELECT payment_t1, payment_t2, payment_t3 
       FROM students 
       WHERE student_uuid = $1`,
      [studentUuid]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const user = result.rows[0];

    const allowedSections = [];
    if (user.payment_t1) allowedSections.push('T1');
    if (user.payment_t2) allowedSections.push('T2');
    if (user.payment_t3) allowedSections.push('T3');

    if (allowedSections.length === 0) {
      return res.status(403).json({ error: 'No access to any section.' });
    }

    // Fetch events
    const eventsResult = await pool.query(
      `SELECT * FROM events WHERE section = ANY($1)`,
      [allowedSections]
    );

    res.status(200).json({ events: eventsResult.rows });
  } catch (error) {
    console.error('Error in getEventsBySection:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get single event by ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT * FROM events WHERE event_id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error in getEventById:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Register user for an event
export const registerForEvent = async (req, res) => {
  try {
    const studentUuid = req.user.student_uuid;
    const { event_id } = req.body;

    // Check if event exists
    const eventResult = await pool.query(
      `SELECT * FROM events WHERE event_id = $1`,
      [event_id]
    );

    if (eventResult.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const event = eventResult.rows[0];

    // Check capacity
    if (event.current_registrations >= event.max_capacity) {
      return res.status(400).json({ error: 'Event is full' });
    }

    // Check if already registered
    const alreadyRegistered = await pool.query(
      `SELECT * FROM registrations WHERE student_uuid = $1 AND event_id = $2`,
      [studentUuid, event_id]
    );

    if (alreadyRegistered.rows.length > 0) {
      return res.status(400).json({ error: 'Already registered for this event' });
    }

    // Insert registration
    await pool.query(
      `INSERT INTO registrations (student_uuid, event_id) VALUES ($1, $2)`,
      [studentUuid, event_id]
    );

    // Increment registration count
    await pool.query(
      `UPDATE events SET current_registrations = current_registrations + 1 WHERE event_id = $1`,
      [event_id]
    );

    res.status(200).json({ message: 'Registered successfully' });
  } catch (error) {
    console.error('Error in registerForEvent:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getMyRegistrations = async (req, res) => {
  try {
    const studentUuid = req.user.student_uuid;

    const result = await pool.query(
      `SELECT e.*
       FROM registrations r
       JOIN events e ON r.event_id = e.event_id
       WHERE r.student_uuid = $1`,
      [studentUuid]
    );

    res.status(200).json({ registeredEvents: result.rows });
  } catch (error) {
    console.error('Error in getMyRegistrations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
