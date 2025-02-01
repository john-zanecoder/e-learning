const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Soft DELETE USER
async function deleteUser(userId) {
  return await prisma.user.update({
    where: { id: userId },
    data: { deletedAt: new Date() },
  });
}

// Soft DELETE LESSON
async function deleteLesson(lessonId) {
  return await prisma.lesson.update({
    where: { id: lessonId },
    data: { deletedAt: new Date() },
  });
}

// Soft DELETE ROLE
async function deleteRole(roleId) {
  return await prisma.role.update({
    where: { id: roleId },
    data: { deletedAt: new Date() },
  });
}

// Soft DELETE COURSE
async function deleteCourse(courseId) {
  return await prisma.course.update({
    where: { id: courseId },
    data: { deletedAt: new Date() },
  });
}

// Soft DELETE STUDENTCOURSE
async function deleteStudentCourse(studentCourseId) {
  return await prisma.studentCourse.update({
    where: { id: studentCourseId },
    data: { deletedAt: new Date() },
  });
}

// Soft DELETE QUIZ
async function deleteQuiz(quizId) {
  return await prisma.quiz.update({
    where: { id: quizId },
    data: { deletedAt: new Date() },
  });
}

module.exports = {
  deleteUser,
  deleteLesson,
  deleteRole,
  deleteCourse,
  deleteStudentCourse,
  deleteQuiz,
};
