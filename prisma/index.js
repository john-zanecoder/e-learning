const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // PRISMA QUERIES


  //  --------------------------------
  // FETCHING LOGICS
  //  --------------------------------

  // FETCH USING ID
  async function getUserById(userId) {
    return await prisma.user.findUnique({
      where: { id: userId },
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
      where: { role },
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
      where: { id: studentCourseId },
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
      where: { studentId },
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
      where: { courseId },
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
      where: { id: quizId },
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



  //  --------------------------------
  // CREATING LOGICS
  //  --------------------------------

  // USERS

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
  

    //  --------------------------------
  // UPDATING  LOGICS
  //  --------------------------------

  // UPDATE USER
  async function updateUser(userId, data) {
    const { username, email, password, role, roleId, name } = data;
  
    const user = await prisma.user.update({
      where: { id: userId },
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
      where: { id: lessonId },
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
      where: { id: roleId },
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
      where: { id: courseId },
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
      where: { id: studentCourseId },
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
      where: { id: quizId },
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
  


    //  --------------------------------
  // DELETING  LOGICS
  //  --------------------------------

  // DELETE USER
  async function deleteUser(userId) {
    return await prisma.user.delete({
      where: { id: userId },
    });
  }

  // DELETE LESSON
  async function deleteLesson(lessonId) {
    return await prisma.lesson.delete({
      where: { id: lessonId },
    });
  }

  


// DELETE ROLE 
async function deleteRole(roleId) {
  return await prisma.role.delete({
    where: { id: roleId },
  });
}

// DELETE COURSE
async function deleteCourse(courseId) {
  return await prisma.course.delete({
    where: { id: courseId },
  });
}

// DELETE STUDENTCOURSE
async function deleteStudentCourse(studentCourseId) {
  return await prisma.studentCourse.delete({
    where: { id: studentCourseId },
  });
}

// DELETE QUIZ
async function deleteQuiz(quizId) {
  return await prisma.quiz.delete({
    where: { id: quizId },
  });
}



// QUIZQUESTION

async function createQuizQuestion(data) {
  const { text, type, quizId } = data;

  const quizQuestion = await prisma.quizQuestion.create({
    data: {
      text,
      type,
      createdAt: new Date(),
      updatedAt: new Date(),
      quizId,
    },
  });

  return quizQuestion;
}

// Function to update a quiz question
async function updateQuizQuestion(quizQuestionId, data) {
  const { text, type, quizId } = data;

  const quizQuestion = await prisma.quizQuestion.update({
    where: { id: quizQuestionId },
    data: {
      text,
      type,
      updatedAt: new Date(),
      quizId,
    },
  });

  return quizQuestion;
}

// Function to delete a quiz question
async function deleteQuizQuestion(quizQuestionId) {
  return await prisma.quizQuestion.delete({
    where: { id: quizQuestionId },
  });
} 


// QUIZOPTION
async function createQuizOption(data) {
  const { text, isCorrect, questionId } = data;

  const quizOption = await prisma.quizOption.create({
    data: {
      text,
      isCorrect,
      questionId,
    },
  });

  return quizOption;
}

// Function to update a quiz option
async function updateQuizOption(quizOptionId, data) {
  const { text, isCorrect, questionId } = data;

  const quizOption = await prisma.quizOption.update({
    where: { id: quizOptionId },
    data: {
      text,
      isCorrect,
      questionId,
    },
  });

  return quizOption;
}

// Function to delete a quiz option
async function deleteQuizOption(quizOptionId) {
  return await prisma.quizOption.delete({
    where: { id: quizOptionId },
  });
}

// EXAM
async function createExam(data) {
  const { title, description, courseId, score } = data;

  const exam = await prisma.exam.create({
    data: {
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      courseId,
      score,
    },
  });

  return exam;
}

// Function to update an exam
async function updateExam(examId, data) {
  const { title, description, courseId, score } = data;

  const exam = await prisma.exam.update({
    where: { id: examId },
    data: {
      title,
      description,
      updatedAt: new Date(),
      courseId,
      score,
    },
  });

  return exam;
}

// Function to delete an exam
async function deleteExam(examId) {
  return await prisma.exam.delete({
    where: { id: examId },
  });
}

async function getAllExams() {
  return await prisma.exam.findMany({
    include: {
      course: true,
      questions: true,
    },
  });
}

// Function to fetch all exams by teacherId
async function getExamsByTeacherId(teacherId) {
  return await prisma.exam.findMany({
    where: {
      course: {
        teacherId: teacherId,
      },
    },
    include: {
      course: true,
      questions: true,
    },
  });
}

// Function to fetch all exams by studentId
async function getExamsByStudentId(studentId) {
  return await prisma.exam.findMany({
    where: {
      enrollments: {
        some: {
          studentId: studentId,
        },
      },
    },
    include: {
      course: true,
      questions: true,
    },
  });
}


// EXAM QUESTION

// Function to create an exam question
async function createExamQuestion(data) {
  const { text, type, examId } = data;

  const examQuestion = await prisma.examQuestion.create({
    data: {
      text,
      type,
      createdAt: new Date(),
      updatedAt: new Date(),
      examId,
    },
  });

  return examQuestion;
}

// Function to update an exam question
async function updateExamQuestion(examQuestionId, data) {
  const { text, type, examId } = data;

  const examQuestion = await prisma.examQuestion.update({
    where: { id: examQuestionId },
    data: {
      text,
      type,
      updatedAt: new Date(),
      examId,
    },
  });

  return examQuestion;
}

// Function to delete an exam question
async function deleteExamQuestion(examQuestionId) {
  return await prisma.examQuestion.delete({
    where: { id: examQuestionId },
  });
}

// Function to fetch all exam questions by examId
async function getExamQuestionsByExamId(examId) {
  return await prisma.examQuestion.findMany({
    where: { examId },
    include: {
      options: true,
    },
  });
}


// EXAM OPTION
// Function to create an exam option
async function createExamOption(data) {
  const { text, isCorrect, questionId } = data;

  const examOption = await prisma.examOption.create({
    data: {
      text,
      isCorrect,
      questionId,
    },
  });

  return examOption;
}

// Function to update an exam option
async function updateExamOption(examOptionId, data) {
  const { text, isCorrect, questionId } = data;

  const examOption = await prisma.examOption.update({
    where: { id: examOptionId },
    data: {
      text,
      isCorrect,
      questionId,
    },
  });

  return examOption;
}

// Function to delete an exam option
async function deleteExamOption(examOptionId) {
  return await prisma.examOption.delete({
    where: { id: examOptionId },
  });
}

// Function to fetch all exam options by questionId
async function getExamOptionsByQuestionId(questionId) {
  return await prisma.examOption.findMany({
    where: { questionId },
  });
}


// ASSIGNMENT
async function getAssignmentsByStudentId(studentId) {
  return await prisma.assignment.findMany({
    where: { studentId },
    include: {
      course: true,
      student: true,
    },
  });
}

async function createAssignment(data) {
  const { title, description, dueDate, courseId, studentId, teacherId } = data;

  const assignment = await prisma.assignment.create({
    data: {
      title,
      description,
      dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      courseId,
      studentId,
      teacherId,
    },
  });

  return assignment;
}

// Function to update an assignment
async function updateAssignment(assignmentId, teacherId, data) {
  const { title, description, dueDate, courseId, studentId } = data;

  const assignment = await prisma.assignment.updateMany({
    where: { id: assignmentId, teacherId: teacherId },
    data: {
      title,
      description,
      dueDate,
      updatedAt: new Date(),
      courseId,
      studentId,
    },
  });

  return assignment;
}

// Function to delete an assignment
async function deleteAssignment(assignmentId, teacherId) {
  return await prisma.assignment.deleteMany({
    where: { id: assignmentId, teacherId: teacherId },
  });
}

// Function to fetch all assignments by teacherId
async function getAssignmentsByTeacherId(teacherId) {
  return await prisma.assignment.findMany({
    where: { teacherId },
    include: {
      course: true,
      student: true,
      teacher: true,
    },
  });
}

// ========================================
// ENROLLMENT
// ========================================
async function createEnrollment(data) {
  const { courseId, studentId, teacherId, date, status } = data;

  const enrollment = await prisma.enrollment.create({
    data: {
      courseId,
      studentId,
      teacherId,
      date,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return enrollment;
}

// Function to update an enrollment
async function updateEnrollment(enrollmentId, data) {
  const { courseId, studentId, teacherId, date, status } = data;

  const enrollment = await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: {
      courseId,
      studentId,
      teacherId,
      date,
      status,
      updatedAt: new Date(),
    },
  });

  return enrollment;
}

// Function to delete an enrollment
async function deleteEnrollment(enrollmentId) {
  return await prisma.enrollment.delete({
    where: { id: enrollmentId },
  });
}

// Function to fetch all enrollments by studentId
async function getEnrollmentsByStudentId(studentId) {
  return await prisma.enrollment.findMany({
    where: { studentId },
    include: {
      course: true,
      student: true,
      teacher: true,
    },
  });
}

// Function to fetch all enrollments by teacherId
async function getEnrollmentsByTeacherId(teacherId) {
  return await prisma.enrollment.findMany({
    where: { teacherId },
    include: {
      course: true,
      student: true,
      teacher: true,
    },
  });
}

// Function to fetch all enrollments by courseId
async function getEnrollmentsByCourseId(courseId) {
  return await prisma.enrollment.findMany({
    where: { courseId },
    include: {
      course: true,
      student: true,
      teacher: true,
    },
  });
}

// ========================================
// COURSE GRADE
// ========================================

// Function to create a course grade
async function createCourseGrade(data) {
  const { studentId, courseId, grade } = data;

  const courseGrade = await prisma.courseGrade.create({
    data: {
      studentId,
      courseId,
      grade,
      createdAt: new Date(),
    },
  });

  return courseGrade;
}

// Function to update a course grade
async function updateCourseGrade(courseGradeId, data) {
  const { studentId, courseId, grade } = data;

  const courseGrade = await prisma.courseGrade.update({
    where: { id: courseGradeId },
    data: {
      studentId,
      courseId,
      grade,
      updatedAt: new Date(),
    },
  });

  return courseGrade;
}

// Function to delete a course grade
async function deleteCourseGrade(courseGradeId) {
  return await prisma.courseGrade.delete({
    where: { id: courseGradeId },
  });
}

// Function to fetch all course grades by studentId
async function getCourseGradesByStudentId(studentId) {
  return await prisma.courseGrade.findMany({
    where: { studentId },
    include: {
      student: true,
      course: true,
    },
  });
}

// Function to fetch all course grades by courseId
async function getCourseGradesByCourseId(courseId) {
  return await prisma.courseGrade.findMany({
    where: { courseId },
    include: {
      student: true,
      course: true,
    },
  });
}



// Export all functions
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

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })