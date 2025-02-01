const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch functions
const getQuizById = async (id) => {
  return prisma.quiz.findUnique({ where: { id, deletedAt: null } });
};

// Create functions
const createQuiz = async (data) => {
  const { title, description, courseId, score } = data;

  return prisma.quiz.create({
    data: {
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      courseId,
      score,
    },
  });
};

// Update functions
const updateQuiz = async (id, data) => {
  const { title, description, courseId, score } = data;

  return prisma.quiz.update({
    where: { id, deletedAt: null },
    data: {
      title,
      description,
      updatedAt: new Date(),
      courseId,
      score,
    },
  });
};

// Delete functions
const deleteQuiz = async (id) => {
  return prisma.quiz.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

module.exports = {
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};