const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const userManagementController = require('../controllers/user.controller');
const adminActivityController = require('../controllers/activity.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminAuthMiddleware =  require('../middlewares/adminAuth.middleware')
const courseController = require('../controllers/course.controller');
const classController = require('../controllers/class.controller');
const gradeController = require('../controllers/grade.controller');
const classRequestController = require('../controllers/classRequest.controller');

// Auth routes
router.post('/auth/login', adminController.login);
router.post('/auth/logout', adminAuthMiddleware, adminController.logout);
router.get('/profile', adminAuthMiddleware, adminController.getProfile);
router.put('/profile', adminAuthMiddleware, adminController.updateProfile);

// Activity routes
router.get('/activities', adminAuthMiddleware, adminActivityController.getActivities);

// User management routes
router.get('/users', adminAuthMiddleware, userManagementController.listUsers);
router.post('/users', adminAuthMiddleware, userManagementController.createUser);
router.put('/users/:id', adminAuthMiddleware, userManagementController.updateUser);
router.delete('/users/:id', adminAuthMiddleware, userManagementController.deleteUser);

// Course management routes
router.get('/courses/available', adminAuthMiddleware, courseController.getAvailableCourses);
router.get('/courses', adminAuthMiddleware, courseController.listCourses);
router.post('/courses', adminAuthMiddleware, courseController.createCourse);
router.get('/courses/:id', adminAuthMiddleware, courseController.getCourse);
router.put('/courses/:id', adminAuthMiddleware, courseController.updateCourse);
router.delete('/courses/:id', adminAuthMiddleware, courseController.deleteCourse);

// Class management routes
// Đặt các routes cụ thể trước
router.get('/classes/instructors', adminAuthMiddleware, classController.getInstructors);
router.get('/classes/available-courses', adminAuthMiddleware, classController.getAvailableCourses);
router.get('/classes/stats/summary', adminAuthMiddleware, classController.getClassSummary);

// Sau đó là các routes có params
router.get('/classes/stats/enrollment-count/:id', adminAuthMiddleware, classController.getEnrollmentCount);
router.get('/classes/stats/lesson-progress/:id', adminAuthMiddleware, classController.getLessonProgress);
router.get('/classes/stats/announcement-count/:id', adminAuthMiddleware, classController.getAnnouncementCount);

// Cuối cùng là các routes CRUD cơ bản
router.get('/classes', adminAuthMiddleware, classController.listClasses);
router.post('/classes', adminAuthMiddleware, classController.createClass);
router.get('/classes/:id', adminAuthMiddleware, classController.getClass);
router.put('/classes/:id', adminAuthMiddleware, classController.updateClass);
router.delete('/classes/:id', adminAuthMiddleware, classController.deleteClass);

// Thêm route này vào phần Class management routes
router.get('/classes/:id/students', adminAuthMiddleware, classController.getClassStudents);

// Grade verification routes
router.get('/grades/pending', adminAuthMiddleware, gradeController.getPendingGrades);
router.post('/grades/verify/:id', adminAuthMiddleware, gradeController.verifyGrade);
router.post('/grades/verify-bulk', adminAuthMiddleware, gradeController.verifyBulkGrades);
router.get('/grades/class/:class_id', adminAuthMiddleware, gradeController.getClassGradesForAdmin);

// Class request routes
router.get('/class-requests', adminAuthMiddleware, classRequestController.getAllRequests);
router.put('/class-requests/:id/review', adminAuthMiddleware, classRequestController.reviewRequest);

module.exports = router; 