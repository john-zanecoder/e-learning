const { PrismaClient } = require('@prisma/client');
const {
  getExamById,
  createExam,
  updateExam,
  deleteExam,
} = require('./exam'); // Adjust the path as necessary

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    exam: {
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

describe('Prisma Client - Exam', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Fetching Logics', () => {
    test('getExamById', async () => {
      const mockExam = { id: '1', title: 'Test Exam', description: 'Test Description', courseId: 'courseId', score: 100, deletedAt: null };
      prisma.exam.findUnique.mockResolvedValue(mockExam);

      const fetchedExam = await getExamById('1');
      expect(fetchedExam).toBeDefined();
      expect(fetchedExam.id).toBe(mockExam.id);
    });
  });

  describe('Creating Logics', () => {
    test('createExam', async () => {
      const mockExam = { id: '1', title: 'New Exam', description: 'Exam Description', courseId: 'courseId', score: 100, deletedAt: null };
      prisma.exam.create.mockResolvedValue(mockExam);

      const examData = {
        title: 'New Exam',
        description: 'Exam Description',
        courseId: 'courseId',
        score: 100,
      };

      const exam = await createExam(examData);
      expect(exam).toBeDefined();
      expect(exam.title).toBe(examData.title);
    });
  });

  describe('Updating Logics', () => {
    test('updateExam', async () => {
      const mockExam = { id: '1', title: 'Updated Exam', description: 'Updated Description', courseId: 'courseId', score: 90, deletedAt: null };
      prisma.exam.update.mockResolvedValue(mockExam);

      const updatedExamData = {
        title: 'Updated Exam',
        description: 'Updated Description',
        courseId: 'courseId',
        score: 90,
      };

      const updatedExam = await updateExam('1', updatedExamData);
      expect(updatedExam).toBeDefined();
      expect(updatedExam.title).toBe(updatedExamData.title);
    });
  });

  describe('Deleting Logics', () => {
    test('deleteExam', async () => {
      const mockExam = { id: '1', title: 'Delete Exam', description: 'Exam Description', courseId: 'courseId', score: 100, deletedAt: new Date() };
      prisma.exam.update.mockResolvedValue(mockExam);

      const deletedExam = await deleteExam('1');
      expect(deletedExam).toBeDefined();
      expect(deletedExam.id).toBe(mockExam.id);
    });
  });
});