var readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let reports = [];
const gradeRubric = [
  {
    base: 80,
    cap: 100,
    grade: 'A'
  },
  {
    base: 60,
    cap: 79,
    grade: 'B'
  },
  {
    base: 35,
    cap: 59,
    grade: 'C'
  },
  {
    base: 0,
    cap: 34,
    grade: 'F'
  },
]

const displayGrades = (scores) => {    
  const grades = scores.map((score) => {
    return findGrade(score)   
  })
  return grades
}

const findGrade = (score) => {    
    const roundedScore = Math.round(score)
    const letter = gradeRubric.find((grade) => 
      roundedScore <= grade.cap && roundedScore >= grade.base 
    ) 
    return letter.grade    
}


const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question(
      "Congrats! You finished your tests. Enter a test score to get your grade ", 
      answer => {
      reports.push(answer)
      const grade  = findGrade(answer)
      console.log(`You got a ${grade}`);
      resolve();
    });
  });
};

const question2 = () => {
  return new Promise((resolve, reject) => {
    rl.question(
      "Enter another score or enter 'Q' to see your final report card ", 
      async answer => {
      if(answer.toLowerCase() === "q" ) {
         return resolve()
      }
      reports.push(answer)
      const grade  = findGrade(answer)
      console.log(`You got a ${grade}`);
      await question2()
      resolve()
    });
  });
};

const question3 = () => {
  return new Promise((resolve, reject) => {
    const reportCard = displayGrades(reports)
      console.log(`Here is your final report card: ${reportCard}`);
      resolve();
    });
};

async function askQuestions() {
  await question1();
  await question2();
  await question3();
  console.log('Thank you for using Medicines Sans Frantiers Score Reporting App!')
  rl.close();
}

module.exports = () => {
  console.log("Welcome to the Medicines Sans Frantiers Score Reporting App");
  askQuestions();
};
