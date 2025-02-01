const { PrismaClient } = require('@prisma/client');
const {
  createRole,
  updateRole,
  deleteRole,
} = require('../role'); // Adjust the path as necessary

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    role: {
      create: jest.fn(),
      update: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient();

describe('Role Model', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Creating Logics', () => {
    test('createRole', async () => {
      const mockRole = { id: '1', name: 'New Role', description: 'Role Description', deletedAt: null };
      prisma.role.create.mockResolvedValue(mockRole);

      const roleData = {
        name: 'New Role',
        description: 'Role Description',
      };

      const role = await createRole(roleData);
      expect(role).toBeDefined();
      expect(role.name).toBe(roleData.name);
    });
  });

  describe('Updating Logics', () => {
    test('updateRole', async () => {
      const mockRole = { id: '1', name: 'Updated Role', description: 'Updated Description', deletedAt: null };
      prisma.role.update.mockResolvedValue(mockRole);

      const updatedRoleData = {
        name: 'Updated Role',
        description: 'Updated Description',
      };

      const updatedRole = await updateRole('1', updatedRoleData);
      expect(updatedRole).toBeDefined();
      expect(updatedRole.name).toBe(updatedRoleData.name);
    });
  });

  describe('Deleting Logics', () => {
    test('deleteRole', async () => {
      const mockRole = { id: '1', name: 'Delete Role', description: 'Role Description', deletedAt: new Date() };
      prisma.role.update.mockResolvedValue(mockRole);

      const deletedRole = await deleteRole('1');
      expect(deletedRole).toBeDefined();
      expect(deletedRole.id).toBe(mockRole.id);
    });
  });
});