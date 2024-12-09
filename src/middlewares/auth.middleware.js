const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/ApiError');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers['Authorization'];
    
    if (!authHeader) {
      throw new ApiError(401, 'No authorization header found');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new ApiError(401, 'No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    if (!decoded.role) {
      throw new ApiError(401, 'Invalid token - missing role information');
    }

    // Add complete user info to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      userId: decoded.userId
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new ApiError(401, 'Invalid token'));
    } else {
      next(error);
    }
  }
};

module.exports = authMiddleware; 