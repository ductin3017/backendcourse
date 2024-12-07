const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TuitionPayment = sequelize.define('TuitionPayment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  studentId: {
    type: DataTypes.UUID,
    references: {
      model: 'students',
      key: 'id'
    }
  },
  enrollmentId: {
    type: DataTypes.UUID,
    references: {
      model: 'enrollments',
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  paymentMethod: DataTypes.STRING,
  status: {
    type: DataTypes.STRING,
    defaultValue: 'completed'
  },
  confirmedBy: {
    type: DataTypes.UUID,
    references: {
      model: 'admins',
      key: 'id'
    }
  },
  notes: DataTypes.TEXT
}, {
  tableName: 'tuition_payments',
  timestamps: true,
  createdAt: 'payment_date',
  updatedAt: 'updated_at'
});

module.exports = TuitionPayment; 