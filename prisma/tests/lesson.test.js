const { PrismaClient } = require('@prisma/client');
const {
  createLesson,
  updateLesson,
  deleteLesson,
} = require('../lesson'); // Adjust the path as necessary

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    lesson: {
      create: jest.fn(),
      update: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient();

describe('Lesson Model', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Creating Logics', () => {
    test('createLesson', async () => {
      const mockLesson = { id: '1', title: 'New Lesson', content: 'Lesson Content', courseId: 'courseId', deletedAt: null };
      prisma.lesson.create.mockResolvedValue(mockLesson);

      const lessonData = {
        title: 'New Lesson',
        content: 'Lesson Content',
        courseId: 'courseId',
      };

      const lesson = await createLesson(lessonData);
      expect(lesson).toBeDefined();
      expect(lesson.title).toBe(lessonData.title);
    });
  });

  describe('Updating Logics', () => {
    test('updateLesson', async () => {
      const mockLesson = { id: '1', title: 'Updated Lesson', content: 'Updated Content', courseId: 'courseId', deletedAt: null };
      prisma.lesson.update.mockResolvedValue(mockLesson);

      const updatedLessonData = {
        title: 'Updated Lesson',
        content: 'Updated Content',
        courseId: 'courseId',
      };

      const updatedLesson = await updateLesson('1', updatedLessonData);
      expect(updatedLesson).toBeDefined();
      expect(updatedLesson.title).toBe(updatedLessonData.title);
    });
  });

  describe('Deleting Logics', () => {
    test('deleteLesson', async () => {
      const mockLesson = { id: '1', title: 'Delete Lesson', content: 'Lesson Content', courseId: 'courseId', deletedAt: new Date() };
      prisma.lesson.update.mockResolvedValue(mockLesson);

      const deletedLesson = await deleteLesson('1');
      expect(deletedLesson).toBeDefined();
      expect(deletedLesson.id).toBe(mockLesson.id);
    });
  });
});