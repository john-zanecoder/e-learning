const { PrismaClient } = require('@prisma/client');
const {
  getEnrollmentById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
} = require('../enrollment/enrollment'); // Adjust the path as necessary

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    enrollment: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $disconnect: jest.fn(), // Mock the $disconnect method
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient();

describe('Prisma Client - Enrollment', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Fetching Logics', () => {
    test('getEnrollmentById', async () => {
      const mockEnrollment = { id: '1', courseId: 'courseId', studentId: 'studentId', teacherId: 'teacherId', date: new Date(), status: 'active', deletedAt: null };
      prisma.enrollment.findUnique.mockResolvedValue(mockEnrollment);

      const fetchedEnrollment = await getEnrollmentById('1');
      expect(fetchedEnrollment).toBeDefined();
      expect(fetchedEnrollment.id).toBe(mockEnrollment.id);
    });
  });

  describe('Creating Logics', () => {
    test('createEnrollment', async () => {
      const mockEnrollment = { id: '1', courseId: 'courseId', studentId: 'studentId', teacherId: 'teacherId', date: new Date(), status: 'active', deletedAt: null };
      prisma.enrollment.create.mockResolvedValue(mockEnrollment);

      const enrollmentData = {
        courseId: 'courseId',
        studentId: 'studentId',
        teacherId: 'teacherId',
        date: new Date(),
        status: 'active',
      };

      const enrollment = await createEnrollment(enrollmentData);
      expect(enrollment).toBeDefined();
      expect(enrollment.status).toBe(enrollmentData.status);
    });
  });

  describe('Updating Logics', () => {
    test('updateEnrollment', async () => {
      const mockEnrollment = { id: '1', courseId: 'courseId', studentId: 'studentId', teacherId: 'teacherId', date: new Date(), status: 'completed', deletedAt: null };
      prisma.enrollment.update.mockResolvedValue(mockEnrollment);

      const updatedEnrollmentData = {
        courseId: 'courseId',
        studentId: 'studentId',
        teacherId: 'teacherId',
        date: new Date(),
        status: 'completed',
      };

      const updatedEnrollment = await updateEnrollment('1', updatedEnrollmentData);
      expect(updatedEnrollment).toBeDefined();
      expect(updatedEnrollment.status).toBe(updatedEnrollmentData.status);
    });
  });

  describe('Deleting Logics', () => {
    test('deleteEnrollment', async () => {
      const mockEnrollment = { id: '1', courseId: 'courseId', studentId: 'studentId', teacherId: 'teacherId', date: new Date(), status: 'active', deletedAt: new Date() };
      prisma.enrollment.update.mockResolvedValue(mockEnrollment);

      const deletedEnrollment = await deleteEnrollment('1');
      expect(deletedEnrollment).toBeDefined();
      expect(deletedEnrollment.id).toBe(mockEnrollment.id);
    });
  });
});