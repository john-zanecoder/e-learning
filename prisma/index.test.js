const { PrismaClient } = require('@prisma/client');
const {
  getUserById,
  getUsersByRole,
  getAllUsers,
  getStudentCourseById,
  getStudentCourseByStudentId,
  getStudentCourseByCourseId,
  getQuizById,
  createUser,
  createLesson,
  createRole,
  createCourse,
  createStudentCourse,
  createQuiz,
  updateUser,
  updateLesson,
  updateRole,
  updateCourse,
  updateStudentCourse,
  updateQuiz,
  deleteUser,
  deleteLesson,
  deleteRole,
  deleteCourse,
  deleteStudentCourse,
  deleteQuiz,
} = require('./index'); // Adjust the path as necessary

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    studentCourse: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    quiz: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    lesson: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    role: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    course: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $disconnect: jest.fn(), // Mock the $disconnect method
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient();

describe('Prisma Client', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Fetching Logics', () => {
    test('getUserById', async () => {
      const mockUser = { id: '1', username: 'testuser', email: 'testuser@example.com' };
      prisma.user.findUnique.mockResolvedValue(mockUser);

      const fetchedUser = await getUserById('1');
      expect(fetchedUser).toBeDefined();
      expect(fetchedUser.id).toBe(mockUser.id);
    });

    test('getUsersByRole', async () => {
      const mockUsers = [{ id: '1', username: 'testuser', email: 'testuser@example.com' }];
      prisma.user.findMany.mockResolvedValue(mockUsers);

      const users = await getUsersByRole('STUDENT');
      expect(users).toBeDefined();
      expect(users.length).toBeGreaterThan(0);
    });

    test('getAllUsers', async () => {
      const mockUsers = [{ id: '1', username: 'testuser', email: 'testuser@example.com' }];
      prisma.user.findMany.mockResolvedValue(mockUsers);

      const users = await getAllUsers();
      expect(users).toBeDefined();
      expect(users.length).toBeGreaterThan(0);
    });

    test('getStudentCourseById', async () => {
      const mockStudentCourse = { id: '1', studentId: 'studentId', courseId: 'courseId' };
      prisma.studentCourse.findUnique.mockResolvedValue(mockStudentCourse);

      const fetchedStudentCourse = await getStudentCourseById('1');
      expect(fetchedStudentCourse).toBeDefined();
      expect(fetchedStudentCourse.id).toBe(mockStudentCourse.id);
    });

    test('getStudentCourseByStudentId', async () => {
      const mockStudentCourses = [{ id: '1', studentId: 'studentId', courseId: 'courseId' }];
      prisma.studentCourse.findMany.mockResolvedValue(mockStudentCourses);

      const studentCourses = await getStudentCourseByStudentId('studentId');
      expect(studentCourses).toBeDefined();
      expect(studentCourses.length).toBeGreaterThan(0);
    });

    test('getStudentCourseByCourseId', async () => {
      const mockStudentCourses = [{ id: '1', studentId: 'studentId', courseId: 'courseId' }];
      prisma.studentCourse.findMany.mockResolvedValue(mockStudentCourses);

      const studentCourses = await getStudentCourseByCourseId('courseId');
      expect(studentCourses).toBeDefined();
      expect(studentCourses.length).toBeGreaterThan(0);
    });

    test('getQuizById', async () => {
      const mockQuiz = { id: '1', title: 'Test Quiz', description: 'Test Description', courseId: 'courseId', score: 100 };
      prisma.quiz.findUnique.mockResolvedValue(mockQuiz);

      const fetchedQuiz = await getQuizById('1');
      expect(fetchedQuiz).toBeDefined();
      expect(fetchedQuiz.id).toBe(mockQuiz.id);
    });
  });

  describe('Creating Logics', () => {
    test('createUser', async () => {
      const mockUser = { id: '1', username: 'newuser', email: 'newuser@example.com' };
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

    test('createLesson', async () => {
      const mockLesson = { id: '1', title: 'New Lesson', content: 'Lesson Content', courseId: 'courseId' };
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

    test('createRole', async () => {
      const mockRole = { id: '1', name: 'New Role', description: 'Role Description' };
      prisma.role.create.mockResolvedValue(mockRole);

      const roleData = {
        name: 'New Role',
        description: 'Role Description',
      };

      const role = await createRole(roleData);
      expect(role).toBeDefined();
      expect(role.name).toBe(roleData.name);
    });

    test('createCourse', async () => {
      const mockCourse = { id: '1', title: 'New Course', description: 'Course Description', teacherId: 'teacherId' };
      prisma.course.create.mockResolvedValue(mockCourse);

      const courseData = {
        title: 'New Course',
        description: 'Course Description',
        teacherId: 'teacherId',
      };

      const course = await createCourse(courseData);
      expect(course).toBeDefined();
      expect(course.title).toBe(courseData.title);
    });

    test('createStudentCourse', async () => {
      const mockStudentCourse = { id: '1', studentId: 'studentId', courseId: 'courseId' };
      prisma.studentCourse.create.mockResolvedValue(mockStudentCourse);

      const studentCourseData = {
        studentId: 'studentId',
        courseId: 'courseId',
      };

      const studentCourse = await createStudentCourse(studentCourseData);
      expect(studentCourse).toBeDefined();
      expect(studentCourse.studentId).toBe(studentCourseData.studentId);
    });

    test('createQuiz', async () => {
      const mockQuiz = { id: '1', title: 'New Quiz', description: 'Quiz Description', courseId: 'courseId', score: 100 };
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
    test('updateUser', async () => {
      const mockUser = { id: '1', username: 'updateduser', email: 'updateduser@example.com' };
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

    test('updateLesson', async () => {
      const mockLesson = { id: '1', title: 'Updated Lesson', content: 'Updated Content', courseId: 'courseId' };
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

    test('updateRole', async () => {
      const mockRole = { id: '1', name: 'Updated Role', description: 'Updated Description' };
      prisma.role.update.mockResolvedValue(mockRole);

      const updatedRoleData = {
        name: 'Updated Role',
        description: 'Updated Description',
      };

      const updatedRole = await updateRole('1', updatedRoleData);
      expect(updatedRole).toBeDefined();
      expect(updatedRole.name).toBe(updatedRoleData.name);
    });

    test('updateCourse', async () => {
      const mockCourse = { id: '1', title: 'Updated Course', description: 'Updated Description', teacherId: 'teacherId' };
      prisma.course.update.mockResolvedValue(mockCourse);

      const updatedCourseData = {
        title: 'Updated Course',
        description: 'Updated Description',
        teacherId: 'teacherId',
      };

      const updatedCourse = await updateCourse('1', updatedCourseData);
      expect(updatedCourse).toBeDefined();
      expect(updatedCourse.title).toBe(updatedCourseData.title);
    });

    test('updateStudentCourse', async () => {
      const mockStudentCourse = { id: '1', studentId: 'newStudentId', courseId: 'newCourseId' };
      prisma.studentCourse.update.mockResolvedValue(mockStudentCourse);

      const updatedStudentCourseData = {
        studentId: 'newStudentId',
        courseId: 'newCourseId',
      };

      const updatedStudentCourse = await updateStudentCourse('1', updatedStudentCourseData);
      expect(updatedStudentCourse).toBeDefined();
      expect(updatedStudentCourse.studentId).toBe(updatedStudentCourseData.studentId);
    });

    test('updateQuiz', async () => {
      const mockQuiz = { id: '1', title: 'Updated Quiz', description: 'Updated Description', courseId: 'courseId', score: 90 };
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
    test('deleteUser', async () => {
      const mockUser = { id: '1', username: 'deleteuser', email: 'deleteuser@example.com' };
      prisma.user.delete.mockResolvedValue(mockUser);

      const deletedUser = await deleteUser('1');
      expect(deletedUser).toBeDefined();
      expect(deletedUser.id).toBe(mockUser.id);
    });

    test('deleteLesson', async () => {
      const mockLesson = { id: '1', title: 'Delete Lesson', content: 'Lesson Content', courseId: 'courseId' };
      prisma.lesson.delete.mockResolvedValue(mockLesson);

      const deletedLesson = await deleteLesson('1');
      expect(deletedLesson).toBeDefined();
      expect(deletedLesson.id).toBe(mockLesson.id);
    });

    test('deleteRole', async () => {
      const mockRole = { id: '1', name: 'Delete Role', description: 'Role Description' };
      prisma.role.delete.mockResolvedValue(mockRole);

      const deletedRole = await deleteRole('1');
      expect(deletedRole).toBeDefined();
      expect(deletedRole.id).toBe(mockRole.id);
    });

    test('deleteCourse', async () => {
      const mockCourse = { id: '1', title: 'Delete Course', description: 'Course Description', teacherId: 'teacherId' };
      prisma.course.delete.mockResolvedValue(mockCourse);

      const deletedCourse = await deleteCourse('1');
      expect(deletedCourse).toBeDefined();
      expect(deletedCourse.id).toBe(mockCourse.id);
    });

    test('deleteStudentCourse', async () => {
      const mockStudentCourse = { id: '1', studentId: 'studentId', courseId: 'courseId' };
      prisma.studentCourse.delete.mockResolvedValue(mockStudentCourse);

      const deletedStudentCourse = await deleteStudentCourse('1');
      expect(deletedStudentCourse).toBeDefined();
      expect(deletedStudentCourse.id).toBe(mockStudentCourse.id);
    });

    test('deleteQuiz', async () => {
      const mockQuiz = { id: '1', title: 'Delete Quiz', description: 'Quiz Description', courseId: 'courseId', score: 100 };
      prisma.quiz.delete.mockResolvedValue(mockQuiz);

      const deletedQuiz = await deleteQuiz('1');
      expect(deletedQuiz).toBeDefined();
      expect(deletedQuiz.id).toBe(mockQuiz.id);
    });
  });
});