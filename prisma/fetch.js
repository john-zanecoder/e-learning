const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// FETCH USING ID
async function getUserById(userId) {
  return await prisma.user.findUnique({
    where: { id: userId, deletedAt: null },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          userId: true,
          teacherId: true,
          enrollments: true,
          assignments: true,
          courseGrades: true,
          courses: true,
        },
      },
      teacher: {
        include: {
          students: {
            select: {
              id: true,
              name: true,
              userId: true,
              teacherId: true,
              enrollments: true,
              assignments: true,
              courseGrades: true,
              courses: true,
            },
          },
        },
      },
    },
  });
}

// FETCH USING ROLE
async function getUsersByRole(role) {
  return await prisma.user.findMany({
    where: { role, deletedAt: null },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          userId: true,
          teacherId: true,
          enrollments: true,
          assignments: true,
          courseGrades: true,
          courses: true,
        },
      },
      teacher: {
        include: {
          students: {
            select: {
              id: true,
              name: true,
              userId: true,
              teacherId: true,
              enrollments: true,
              assignments: true,
              courseGrades: true,
              courses: true,
            },
          },
        },
      },
    },
  });
}

// FETCH ALL USERS
async function getAllUsers() {
  return await prisma.user.findMany({
    where: { deletedAt: null },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          userId: true,
          teacherId: true,
          enrollments: true,
          assignments: true,
          courseGrades: true,
          courses: true,
        },
      },
      teacher: {
        include: {
          students: {
            select: {
              id: true,
              name: true,
              userId: true,
              teacherId: true,
              enrollments: true,
              assignments: true,
              courseGrades: true,
              courses: true,
            },
          },
        },
      },
    },
  });
}

// FETCH STUDENTCOURSE BY ID
async function getStudentCourseById(studentCourseId) {
  return await prisma.studentCourse.findUnique({
    where: { id: studentCourseId, deletedAt: null },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          userId: true,
          teacherId: true,
          enrollments: true,
          assignments: true,
          courseGrades: true,
          courses: true,
        },
      },
      course: {
        select: {
          id: true,
          title: true,
          description: true,
          teacherId: true,
          teacher: true,
          lessons: true,
          assignments: true,
          quizzes: true,
          students: true,
        },
      },
    },
  });
}

// FETCH STUDENTCOURSE BY STUDENT ID
async function getStudentCourseByStudentId(studentId) {
  return await prisma.studentCourse.findMany({
    where: { studentId, deletedAt: null },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          userId: true,
          teacherId: true,
          enrollments: true,
          assignments: true,
          courseGrades: true,
          courses: true,
        },
      },
      course: {
        select: {
          id: true,
          title: true,
          description: true,
          teacherId: true,
          teacher: true,
          lessons: true,
          assignments: true,
          quizzes: true,
          students: true,
        },
      },
    },
  });
}

// FETCH STUDENTCOURSE BY COURSE ID
async function getStudentCourseByCourseId(courseId) {
  return await prisma.studentCourse.findMany({
    where: { courseId, deletedAt: null },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          userId: true,
          teacherId: true,
          enrollments: true,
          assignments: true,
          courseGrades: true,
          courses: true,
        },
      },
      course: {
        select: {
          id: true,
          title: true,
          description: true,
          teacherId: true,
          teacher: true,
          lessons: true,
          assignments: true,
          quizzes: true,
          students: true,
        },
      },
    },
  });
}

// FETCH QUIZ BY ID
async function getQuizById(quizId) {
  return await prisma.quiz.findUnique({
    where: { id: quizId, deletedAt: null },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          description: true,
          teacherId: true,
          teacher: true,
          lessons: true,
          assignments: true,
          quizzes: true,
          students: true,
        },
      },
    },
  });
}

module.exports = {
  getUserById,
  getUsersByRole,
  getAllUsers,
  getStudentCourseById,
  getStudentCourseByStudentId,
  getStudentCourseByCourseId,
  getQuizById,
};
