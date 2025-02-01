const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch functions
const getLessonById = async (id) => {
  return prisma.lesson.findUnique({ where: { id, deletedAt: null } });
};

// Create functions
const createLesson = async (data) => {
  const { title, content, courseId } = data;

  return prisma.lesson.create({
    data: {
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      courseId,
    },
  });
};

// Update functions
const updateLesson = async (id, data) => {
  const { title, content, courseId } = data;

  return prisma.lesson.update({
    where: { id, deletedAt: null },
    data: {
      title,
      content,
      updatedAt: new Date(),
      courseId,
    },
  });
};

// Delete functions
const deleteLesson = async (id) => {
  return prisma.lesson.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

module.exports = {
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
};