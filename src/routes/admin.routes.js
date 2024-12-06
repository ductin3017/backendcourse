const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const userManagementController = require('../controllers/user.controller');
const adminActivityController = require('../controllers/activity.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Auth routes
router.post('/auth/login', adminController.login);
router.post('/auth/logout', authMiddleware, adminController.logout);
router.get('/profile', authMiddleware, adminController.getProfile);
router.put('/profile', authMiddleware, adminController.updateProfile);

// Activity routes
router.get('/activities', authMiddleware, (req, res) => adminActivityController.getActivities(req, res));

// User management routes
router.get('/users', authMiddleware, (req, res) => userManagementController.listUsers(req, res));
router.post('/users', authMiddleware, (req, res) => userManagementController.createUser(req, res));
router.put('/users/:id', authMiddleware, (req, res) => userManagementController.updateUser(req, res));
router.delete('/users/:id', authMiddleware, (req, res) => userManagementController.deleteUser(req, res));

module.exports = router; 