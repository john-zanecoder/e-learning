const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch functions
const getCourseGradeById = async (id) => {
  return prisma.courseGrade.findUnique({ where: { id, deletedAt: null } });
};

// Create functions
const createCourseGrade = async (data) => {
  const { studentId, courseId, grade } = data;

  return prisma.courseGrade.create({
    data: {
      studentId,
      courseId,
      grade,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

// Update functions
const updateCourseGrade = async (id, data) => {
  const { studentId, courseId, grade } = data;

  return prisma.courseGrade.update({
    where: { id, deletedAt: null },
    data: {
      studentId,
      courseId,
      grade,
      updatedAt: new Date(),
    },
  });
};

// Delete functions
const deleteCourseGrade = async (id) => {
  return prisma.courseGrade.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

module.exports = {
  getCourseGradeById,
  createCourseGrade,
  updateCourseGrade,
  deleteCourseGrade,
};