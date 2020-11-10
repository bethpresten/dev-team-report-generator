const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


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
    .then((answers) => {
      if (answers.role === "manager") {
        return renderManager(answers)
      } else if (answers.role === "intern") {
        return renderIntern()
      } else if (answers.role === "engineer") {
        return renderEngineer()
      }
      return (employeeQuestions.role);
    }).then(function (answers) {
      console.log(answers);
      writeHTML(outputPath, answers)
    });


employeeQuestions();
const employees = [];

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
  ]).then(function (managerAnswers) {
    const manager = new Manager(answers.name, answers.role, answers.id, answers.email, managerAnswers.officeNumber);
    employees.push(manager);

    console.log(answers);
    if (answers.addEmployee === "yes") {
      return employeeQuestions();
    } else if (answers.addEmployee === "no") {
      return writeHTML();
    }
  });
};

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
  ]).then(function (internAnswers) {
    const intern = new Intern(answers.name, answers.role, answers.id, answers.email, internAnswers.officeNumber);
    employees.push(intern);

    console.log(answers);
    if (answers.addEmployee === "yes") {
      return employeeQuestions();
    } else if (answers.addEmployee === "no") {
      return writeHTML();
    }
  });
};

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
  ]).then(function (engineerAnswers) {
    const engineer = new Engineer(answers.name, answers.role, answers.id, answers.email, engineerAnswers.officeNumber);
    employees.push(manager);

    console.log(answers);
    if (answers.addEmployee === "yes") {
      return employeeQuestions();
    } else if (answers.addEmployee === "no") {
      return writeHTML();
    }
  });
};



function writeHTML() {

  fs.writeFile(outputPath, render(employees), null, function (err) {
    if (err) {
      return console.log(err);
    } else {
      console.log("Successfully wrote to HTML");
    }
  });
};
