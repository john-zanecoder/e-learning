const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// UPDATE USER
async function updateUser(userId, data) {
  const { username, email, password, role, roleId, name } = data;

  const user = await prisma.user.update({
    where: { id: userId, deletedAt: null },
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

  return user;
}

// UPDATE LESSON
async function updateLesson(lessonId, data) {
  const { title, content, courseId } = data;

  const lesson = await prisma.lesson.update({
    where: { id: lessonId, deletedAt: null },
    data: {
      title,
      content,
      updatedAt: new Date(),
      courseId,
    },
  });

  return lesson;
}

// UPDATE ROLE
async function updateRole(roleId, data) {
  const { name, description } = data;

  const role = await prisma.role.update({
    where: { id: roleId, deletedAt: null },
    data: {
      name,
      description,
    },
  });

  return role;
}

// UPDATE COURSE
async function updateCourse(courseId, data) {
  const { title, description, teacherId } = data;

  const course = await prisma.course.update({
    where: { id: courseId, deletedAt: null },
    data: {
      title,
      description,
      updatedAt: new Date(),
      teacherId,
    },
  });

  return course;
}

// UPDATE STUDENTCOURSE
async function updateStudentCourse(studentCourseId, data) {
  const { studentId, courseId } = data;

  const studentCourse = await prisma.studentCourse.update({
    where: { id: studentCourseId, deletedAt: null },
    data: {
      studentId,
      courseId,
      updatedAt: new Date(),
    },
  });

  return studentCourse;
}

// UPDATE QUIZ
async function updateQuiz(quizId, data) {
  const { title, description, courseId, score } = data;

  const quiz = await prisma.quiz.update({
    where: { id: quizId, deletedAt: null },
    data: {
      title,
      description,
      updatedAt: new Date(),
      courseId,
      score,
    },
  });

  return quiz;
}

module.exports = {
  updateUser,
  updateLesson,
  updateRole,
  updateCourse,
  updateStudentCourse,
  updateQuiz,
};
