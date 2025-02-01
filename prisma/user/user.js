const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch functions
const getUserById = async (id) => {
  return prisma.user.findUnique({ where: { id, deletedAt: null } });
};

const getUsersByRole = async (role) => {
  return prisma.user.findMany({ where: { role, deletedAt: null } });
};

const getAllUsers = async () => {
  return prisma.user.findMany({ where: { deletedAt: null } });
};

// Create functions
const createUser = async (data) => {
  const { username, email, password, role, roleId, name } = data;

  return prisma.user.create({
    data: {
      username,
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
      roleId,
      role: {
        connect: { id: roleId },
      },
      ...(role === 'STUDENT' && {
        student: {
          create: {
            name,
          },
        },
      }),
      ...(role === 'TEACHER' && {
        teacher: {
          create: {
            name,
          },
        },
      }),
    },
  });
};

// Update functions
const updateUser = async (id, data) => {
  const { username, email, password, role, roleId, name } = data;

  return prisma.user.update({
    where: { id, deletedAt: null },
    data: {
      username,
      email,
      password,
      updatedAt: new Date(),
      roleId,
      role: {
        connect: { id: roleId },
      },
      ...(role === 'STUDENT' && {
        student: {
          update: {
            name,
          },
        },
      }),
      ...(role === 'TEACHER' && {
        teacher: {
          update: {
            name,
          },
        },
      }),
    },
  });
};

// Delete functions
const deleteUser = async (id) => {
  return prisma.user.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

module.exports = {
  getUserById,
  getUsersByRole,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};