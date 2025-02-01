const { PrismaClient } = require('@prisma/client');
const {
  getStudentCourseById,
  getStudentCourseByStudentId,
  getStudentCourseByCourseId,
  createStudentCourse,
  updateStudentCourse,
  deleteStudentCourse,
} = require('../studentCourse'); // Adjust the path as necessary

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    studentCourse: {
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

describe('StudentCourse Model', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Fetching Logics', () => {
    test('getStudentCourseById', async () => {
      const mockStudentCourse = { id: '1', studentId: 'studentId', courseId: 'courseId', deletedAt: null };
      prisma.studentCourse.findUnique.mockResolvedValue(mockStudentCourse);

      const fetchedStudentCourse = await getStudentCourseById('1');
      expect(fetchedStudentCourse).toBeDefined();
      expect(fetchedStudentCourse.id).toBe(mockStudentCourse.id);
    });

    test('getStudentCourseByStudentId', async () => {
      const mockStudentCourses = [{ id: '1', studentId: 'studentId', courseId: 'courseId', deletedAt: null }];
      prisma.studentCourse.findMany.mockResolvedValue(mockStudentCourses);

      const studentCourses = await getStudentCourseByStudentId('studentId');
      expect(studentCourses).toBeDefined();
      expect(studentCourses.length).toBeGreaterThan(0);
    });

    test('getStudentCourseByCourseId', async () => {
      const mockStudentCourses = [{ id: '1', studentId: 'studentId', courseId: 'courseId', deletedAt: null }];
      prisma.studentCourse.findMany.mockResolvedValue(mockStudentCourses);

      const studentCourses = await getStudentCourseByCourseId('courseId');
      expect(studentCourses).toBeDefined();
      expect(studentCourses.length).toBeGreaterThan(0);
    });
  });

  describe('Creating Logics', () => {
    test('createStudentCourse', async () => {
      const mockStudentCourse = { id: '1', studentId: 'studentId', courseId: 'courseId', deletedAt: null };
      prisma.studentCourse.create.mockResolvedValue(mockStudentCourse);

      const studentCourseData = {
        studentId: 'studentId',
        courseId: 'courseId',
      };

      const studentCourse = await createStudentCourse(studentCourseData);
      expect(studentCourse).toBeDefined();
      expect(studentCourse.studentId).toBe(studentCourseData.studentId);
    });
  });

  describe('Updating Logics', () => {
    test('updateStudentCourse', async () => {
      const mockStudentCourse = { id: '1', studentId: 'newStudentId', courseId: 'newCourseId', deletedAt: null };
      prisma.studentCourse.update.mockResolvedValue(mockStudentCourse);

      const updatedStudentCourseData = {
        studentId: 'newStudentId',
        courseId: 'newCourseId',
      };

      const updatedStudentCourse = await updateStudentCourse('1', updatedStudentCourseData);
      expect(updatedStudentCourse).toBeDefined();
      expect(updatedStudentCourse.studentId).toBe(updatedStudentCourseData.studentId);
    });
  });

  describe('Deleting Logics', () => {
    test('deleteStudentCourse', async () => {
      const mockStudentCourse = { id: '1', studentId: 'studentId', courseId: 'courseId', deletedAt: new Date() };
      prisma.studentCourse.update.mockResolvedValue(mockStudentCourse);

      const deletedStudentCourse = await deleteStudentCourse('1');
      expect(deletedStudentCourse).toBeDefined();
      expect(deletedStudentCourse.id).toBe(mockStudentCourse.id);
    });
  });
});