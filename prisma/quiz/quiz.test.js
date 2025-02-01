const { PrismaClient } = require('@prisma/client');
const {
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} = require('../quiz/quiz'); // Adjust the path as necessary

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    quiz: {
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

describe('Prisma Client - Quiz', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Fetching Logics', () => {
    test('getQuizById', async () => {
      const mockQuiz = { id: '1', title: 'Test Quiz', description: 'Test Description', courseId: 'courseId', score: 100, deletedAt: null };
      prisma.quiz.findUnique.mockResolvedValue(mockQuiz);

      const fetchedQuiz = await getQuizById('1');
      expect(fetchedQuiz).toBeDefined();
      expect(fetchedQuiz.id).toBe(mockQuiz.id);
    });
  });

  describe('Creating Logics', () => {
    test('createQuiz', async () => {
      const mockQuiz = { id: '1', title: 'New Quiz', description: 'Quiz Description', courseId: 'courseId', score: 100, deletedAt: null };
      prisma.quiz.create.mockResolvedValue(mockQuiz);

      const quizData = {
        title: 'New Quiz',
        description: 'Quiz Description',
        courseId: 'courseId',
        score: 100,
      };

      const quiz = await createQuiz(quizData);
      expect(quiz).toBeDefined();
      expect(quiz.title).toBe(quizData.title);
    });
  });

  describe('Updating Logics', () => {
    test('updateQuiz', async () => {
      const mockQuiz = { id: '1', title: 'Updated Quiz', description: 'Updated Description', courseId: 'courseId', score: 90, deletedAt: null };
      prisma.quiz.update.mockResolvedValue(mockQuiz);

      const updatedQuizData = {
        title: 'Updated Quiz',
        description: 'Updated Description',
        courseId: 'courseId',
        score: 90,
      };

      const updatedQuiz = await updateQuiz('1', updatedQuizData);
      expect(updatedQuiz).toBeDefined();
      expect(updatedQuiz.title).toBe(updatedQuizData.title);
    });
  });

  describe('Deleting Logics', () => {
    test('deleteQuiz', async () => {
      const mockQuiz = { id: '1', title: 'Delete Quiz', description: 'Quiz Description', courseId: 'courseId', score: 100, deletedAt: new Date() };
      prisma.quiz.update.mockResolvedValue(mockQuiz);

      const deletedQuiz = await deleteQuiz('1');
      expect(deletedQuiz).toBeDefined();
      expect(deletedQuiz.id).toBe(mockQuiz.id);
    });
  });
});