const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch functions
const getRoleById = async (id) => {
  return prisma.role.findUnique({ where: { id, deletedAt: null } });
};

// Create functions
const createRole = async (data) => {
  const { name, description } = data;

  return prisma.role.create({
    data: {
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

// Update functions
const updateRole = async (id, data) => {
  const { name, description } = data;

  return prisma.role.update({
    where: { id, deletedAt: null },
    data: {
      name,
      description,
      updatedAt: new Date(),
    },
  });
};

// Delete functions
const deleteRole = async (id) => {
  return prisma.role.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

module.exports = {
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};