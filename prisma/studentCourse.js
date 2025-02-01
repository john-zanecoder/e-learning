const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch functions
const getStudentCourseById = async (id) => {
  return prisma.studentCourse.findUnique({ where: { id, deletedAt: null } });
};

const getStudentCourseByStudentId = async (studentId) => {
  return prisma.studentCourse.findMany({ where: { studentId, deletedAt: null } });
};

const getStudentCourseByCourseId = async (courseId) => {
  return prisma.studentCourse.findMany({ where: { courseId, deletedAt: null } });
};

// Create functions
const createStudentCourse = async (data) => {
  const { studentId, courseId } = data;

  return prisma.studentCourse.create({
    data: {
      studentId,
      courseId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

// Update functions
const updateStudentCourse = async (id, data) => {
  const { studentId, courseId } = data;

  return prisma.studentCourse.update({
    where: { id, deletedAt: null },
    data: {
      studentId,
      courseId,
      updatedAt: new Date(),
    },
  });
};

// Delete functions
const deleteStudentCourse = async (id) => {
  return prisma.studentCourse.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

module.exports = {
  getStudentCourseById,
  getStudentCourseByStudentId,
  getStudentCourseByCourseId,
  createStudentCourse,
  updateStudentCourse,
  deleteStudentCourse,
};