const jwt = require('jsonwebtoken');

const checkAuthStatus = async (req, res) => {
    console.log('Middleware: checkAuthStatus - Reached');
    try {
        const token = req.cookies.token;
        console.log('Middleware: Token:', token);
        if (!token) {
            console.log('Middleware: No token found');
            return res.status(401).json({ message: 'Unauthorized, no token' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log('Middleware: Error during token verification', err);
                res.clearCookie('token'); // Clear the cookie if the token is invalid
                return res.status(401).json({ message: 'Invalid user' });
            }
            console.log('Middleware: Token verification successful');
            res.status(200).json({ message: 'Authenticated', user: decoded });
        });
    } catch (err) {
        console.error('Middleware: Authentication check error', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { checkAuthStatus };
