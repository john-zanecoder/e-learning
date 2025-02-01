const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch functions
const getAssignmentById = async (id) => {
  return prisma.assignment.findUnique({ where: { id, deletedAt: null } });
};

// Create functions
const createAssignment = async (data) => {
  const { title, description, dueDate, courseId, studentId, teacherId } = data;

  return prisma.assignment.create({
    data: {
      title,
      description,
      dueDate,
      courseId,
      studentId,
      teacherId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

// Update functions
const updateAssignment = async (id, data) => {
  const { title, description, dueDate, courseId, studentId, teacherId } = data;

  return prisma.assignment.update({
    where: { id, deletedAt: null },
    data: {
      title,
      description,
      dueDate,
      courseId,
      studentId,
      teacherId,
      updatedAt: new Date(),
    },
  });
};

// Delete functions
const deleteAssignment = async (id) => {
  return prisma.assignment.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

module.exports = {
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};