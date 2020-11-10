// code that was given to us; calling each one of the constructors, utilizing fs and path, naming the folder and the direct file
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// set of questions that any user will use/ inquirer.prompt utilizes node to prompt the user via command line
const employeeQuestions = () =>
  inquirer.prompt
    ([
      {
        type: "input",
        name: "name",
        message: "What is your name?",
      },
      {
        type: "list",
        name: "role",
        message: "What type of employee are you?",
        choices: ["manager", "engineer", "intern"]
      },
      {
        type: "number",
        name: "id",
        message: "What is your employee ID number?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your email address?",
      }
    ])
    // identifying the role and then sending back user-specific question(s)
    .then((answers) => {
      if (answers.role === "manager") {
        return renderManager(answers)
      } else if (answers.role === "intern") {
        return renderIntern()
      } else if (answers.role === "engineer") {
        return renderEngineer()
      }
      return (employeeQuestions.role);
      // pulling the answers, console logging the answers, and then writing the file
    }).then(function (answers) {
      console.log(answers);
      writeHTML(outputPath, answers)
    });

//calling the function to deliver the questions to the user
employeeQuestions();
// empty array to dump all the objects
const employees = [];
// manager-specific questions plus adding in additional team members
const renderManager = (answers) => {
  return inquirer.prompt([
    {
      type: "input",
      name: "officeNumber",
      message: "What is your office number?",
    },
    {
      type: "list",
      name: "addEmployee",
      message: "Would you like to add another employee??",
      choices: ["yes", "no"]
    },
    // pushing all the information to the constructor
  ]).then(function (managerAnswers) {
    const manager = new Manager(answers.name, answers.role, answers.id, answers.email, managerAnswers.officeNumber);
    employees.push(manager);

    // asking to add additional employees or writing to the HTML if finished
    console.log(answers);
    if (answers.addEmployee === "yes") {
      return employeeQuestions();
    } else if (answers.addEmployee === "no") {
      return writeHTML();
    }
  });
};

// intern specific questions delivered via node
const renderIntern = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "school",
      message: "Where did you or are you going to school?",
    },
    {
      type: "list",
      name: "addEmployee",
      message: "Would you like to add another employee??",
      choices: ["yes", "no"]
    },
    // writing all the answers to the constructor and pushing it to the empty array
  ]).then(function (internAnswers) {
    const intern = new Intern(answers.name, answers.role, answers.id, answers.email, internAnswers.officeNumber);
    employees.push(intern);
    // identifying if the user wants to add more team members
    console.log(answers);
    if (answers.addEmployee === "yes") {
      return employeeQuestions();
    } else if (answers.addEmployee === "no") {
      return writeHTML();
    }
  });
};
// engineer specific questions delivered via node
const renderEngineer = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "github",
      message: "What is your github name?",
    },
    {
      type: "list",
      name: "addEmployee",
      message: "Would you like to add another employee??",
      choices: ["yes", "no"]
    },
    // pushing engineer questions to the empty array
  ]).then(function (engineerAnswers) {
    const engineer = new Engineer(answers.name, answers.role, answers.id, answers.email, engineerAnswers.officeNumber);
    employees.push(manager);
    // asking if the user needs to add additional team members
    console.log(answers);
    if (answers.addEmployee === "yes") {
      return employeeQuestions();
    } else if (answers.addEmployee === "no") {
      return writeHTML();
    }
  });
};


// function to write to the team.html
function writeHTML() {
  fs.writeFile(outputPath, render(employees), null, function (err) {
    if (err) {
      return console.log(err);
    } else {
      console.log("Successfully wrote to HTML");
    }
  });
};
