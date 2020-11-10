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
        type: "list",
        name: "role",
        message: "What type of employee are you?",
        choices: ["manager", "engineer", "intern"]
      },
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
// const answers = [name, role, id, email];
// manager-specific questions plus adding in additional team members
const renderManager = (answers) => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
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
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is your office number?",
    },
    {
      type: "validate",
      name: "addEmployee",
      message: "Would you like to add another employee??",
    },
    // pushing all the information to the constructor
  ]).then(function (managerAnswers) {
    const manager = new Manager(managerAnswers.name, managerAnswers.role, managerAnswers.id, managerAnswers.email, managerAnswers.officeNumber);
    employees.push(manager);

    // asking to add additional employees or writing to the HTML if finished
    console.log(managerAnswers);
    if (managerAnswers.addEmployee === true) {
      return employeeQuestions();
    } else if (managerAnswers.addEmployee === false) {
      return writeHTML();
    }
    console.log("Here is your team with manager(s)!")
  });
};

// engineer specific questions delivered via node
const renderEngineer = () => {

  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
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
    },
    {
      type: "input",
      name: "github",
      message: "What is your github name?",
    },
    {
      type: "validate",
      name: "addEmployee",
      message: "Would you like to add another employee??",
    },
    // pushing engineer questions to the empty array
  ]).then(function (engineerAnswers) {
    const engineer = new Engineer(engineerAnswers.name, engineerAnswers.role, engineerAnswers.id, engineerAnswers.email, engineerAnswers.github);
    employees.push(engineer);
    // asking if the user needs to add additional team members
    console.log(engineerAnswers);
    if (engineerAnswers.addEmployee === false) {
      return employeeQuestions();
    } else if (engineerAnswers.addEmployee === true) {
      return writeHTML();
    }
    console.log("Here is your team with engineer(s)!")
  });
};

// intern specific questions delivered via node
const renderIntern = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
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
    },
    {
      type: "input",
      name: "school",
      message: "Where did you or are you going to school?",
    },
    {
      type: "validate",
      name: "addEmployee",
      message: "Would you like to add another employee??",
    },
    // writing all the answers to the constructor and pushing it to the empty array
  ]).then(function (internAnswers) {
    const intern = new Intern(internAnswers.name, internAnswers.role, internAnswers.id, internAnswers.email, internAnswers.school);
    employees.push(intern);
    // identifying if the user wants to add more team members
    console.log(internAnswers);
    if (internAnswers.addEmployee === true) {
      return employeeQuestions();
    } else if (internAnswers.addEmployee === false) {
      return writeHTML();
    }
    console.log("Here is your team with intern(s)!")
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
