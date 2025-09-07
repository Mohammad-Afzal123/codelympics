export const adminAuth = (req, res, next) => {
    const apiKey = req.headers['x-api-key'] || req.query.admin_key;
    if (!apiKey || apiKey !== process.env.ADMIN_KEY) {
      return res.status(403).json({ error: 'Forbidden: Invalid or missing admin API key' });
    }
    next();
  };
  