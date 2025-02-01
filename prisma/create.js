const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CREATE USER
async function createUser(data) {
  const { username, email, password, role, roleId, name } = data;

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
      roleId,
      role: {
        connect: { id: roleId },
      },
      ...(role === 'STUDENT' && {
        student: {
          create: {
            name,
          },
        },
      }),
      ...(role === 'TEACHER' && {
        teacher: {
          create: {
            name,
          },
        },
      }),
    },
  });

  return user;
}

// CREATE LESSON
async function createLesson(data) {
  const { title, content, courseId } = data;

  const lesson = await prisma.lesson.create({
    data: {
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      courseId,
    },
  });

  return lesson;
}

// CREATE ROLE
async function createRole(data) {
  const { name, description } = data;

  const role = await prisma.role.create({
    data: {
      name,
      description,
    },
  });

  return role;
}

// CREATE COURSE
async function createCourse(data) {
  const { title, description, teacherId } = data;

  const course = await prisma.course.create({
    data: {
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      teacherId,
    },
  });

  return course;
}

// CREATE STUDENTCOURSE
async function createStudentCourse(data) {
  const { studentId, courseId } = data;

  const studentCourse = await prisma.studentCourse.create({
    data: {
      studentId,
      courseId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return studentCourse;
}

// CREATE QUIZ
async function createQuiz(data) {
  const { title, description, courseId, score } = data;

  const quiz = await prisma.quiz.create({
    data: {
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      courseId,
      score,
    },
  });

  return quiz;
}

module.exports = {
  createUser,
  createLesson,
  createRole,
  createCourse,
  createStudentCourse,
  createQuiz,
};
