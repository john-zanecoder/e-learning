const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch functions
const getCourseById = async (id) => {
  return prisma.course.findUnique({ where: { id, deletedAt: null } });
};

// Create functions
const createCourse = async (data) => {
  const { title, description, teacherId } = data;

  return prisma.course.create({
    data: {
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      teacherId,
    },
  });
};

// Update functions
const updateCourse = async (id, data) => {
  const { title, description, teacherId } = data;

  return prisma.course.update({
    where: { id, deletedAt: null },
    data: {
      title,
      description,
      updatedAt: new Date(),
      teacherId,
    },
  });
};

// Delete functions
const deleteCourse = async (id) => {
  return prisma.course.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

module.exports = {
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};