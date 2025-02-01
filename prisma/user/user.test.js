const { PrismaClient } = require('@prisma/client');
const {
  getUserById,
  getUsersByRole,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../user/user'); // Adjust the path as necessary

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient();

describe('User Model', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Fetching Logics', () => {
    test('getUserById', async () => {
      const mockUser = { id: '1', username: 'testuser', email: 'testuser@example.com', deletedAt: null };
      prisma.user.findUnique.mockResolvedValue(mockUser);

      const fetchedUser = await getUserById('1');
      expect(fetchedUser).toBeDefined();
      expect(fetchedUser.id).toBe(mockUser.id);
    });

    test('getUsersByRole', async () => {
      const mockUsers = [{ id: '1', username: 'testuser', email: 'testuser@example.com', deletedAt: null }];
      prisma.user.findMany.mockResolvedValue(mockUsers);

      const users = await getUsersByRole('STUDENT');
      expect(users).toBeDefined();
      expect(users.length).toBeGreaterThan(0);
    });

    test('getAllUsers', async () => {
      const mockUsers = [{ id: '1', username: 'testuser', email: 'testuser@example.com', deletedAt: null }];
      prisma.user.findMany.mockResolvedValue(mockUsers);

      const users = await getAllUsers();
      expect(users).toBeDefined();
      expect(users.length).toBeGreaterThan(0);
    });
  });

  describe('Creating Logics', () => {
    test('createUser', async () => {
      const mockUser = { id: '1', username: 'newuser', email: 'newuser@example.com', deletedAt: null };
      prisma.user.create.mockResolvedValue(mockUser);

      const userData = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password',
        role: 'STUDENT',
        roleId: 'roleId',
        name: 'New Student',
      };

      const user = await createUser(userData);
      expect(user).toBeDefined();
      expect(user.username).toBe(userData.username);
    });
  });

  describe('Updating Logics', () => {
    test('updateUser', async () => {
      const mockUser = { id: '1', username: 'updateduser', email: 'updateduser@example.com', deletedAt: null };
      prisma.user.update.mockResolvedValue(mockUser);

      const updatedUserData = {
        username: 'updateduser',
        email: 'updateduser@example.com',
        password: 'newpassword',
        role: 'STUDENT',
        roleId: 'roleId',
        name: 'Updated Student',
      };

      const updatedUser = await updateUser('1', updatedUserData);
      expect(updatedUser).toBeDefined();
      expect(updatedUser.username).toBe(updatedUserData.username);
    });
  });

  describe('Deleting Logics', () => {
    test('deleteUser', async () => {
      const mockUser = { id: '1', username: 'deleteuser', email: 'deleteuser@example.com', deletedAt: new Date() };
      prisma.user.update.mockResolvedValue(mockUser);

      const deletedUser = await deleteUser('1');
      expect(deletedUser).toBeDefined();
      expect(deletedUser.id).toBe(mockUser.id);
    });
  });
});