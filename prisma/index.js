const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const {
  getUserById,
  getUsersByRole,
  getAllUsers,
  getStudentCourseById,
  getStudentCourseByStudentId,
  getStudentCourseByCourseId,
  getQuizById,
} = require('./fetch');

const {
  createUser,
  createLesson,
  createRole,
  createCourse,
  createStudentCourse,
  createQuiz,
} = require('./create');

const {
  updateUser,
  updateLesson,
  updateRole,
  updateCourse,
  updateStudentCourse,
  updateQuiz,
} = require('./update');

const {
  deleteUser,
  deleteLesson,
  deleteRole,
  deleteCourse,
  deleteStudentCourse,
  deleteQuiz,
} = require('./delete');

async function main() {
  // You can call your functions here
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

module.exports = {
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
};
