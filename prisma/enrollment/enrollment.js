const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch functions
const getEnrollmentById = async (id) => {
  return prisma.enrollment.findUnique({ where: { id, deletedAt: null } });
};

// Create functions
const createEnrollment = async (data) => {
  const { courseId, studentId, teacherId, date, status } = data;

  return prisma.enrollment.create({
    data: {
      courseId,
      studentId,
      teacherId,
      date,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

// Update functions
const updateEnrollment = async (id, data) => {
  const { courseId, studentId, teacherId, date, status } = data;

  return prisma.enrollment.update({
    where: { id, deletedAt: null },
    data: {
      courseId,
      studentId,
      teacherId,
      date,
      status,
      updatedAt: new Date(),
    },
  });
};

// Delete functions
const deleteEnrollment = async (id) => {
  return prisma.enrollment.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

module.exports = {
  getEnrollmentById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
};
