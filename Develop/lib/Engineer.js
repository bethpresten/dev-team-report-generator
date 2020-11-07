// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

// const Engineer = new Employee();

class Engineer extends Employee {
    constructor(username, id, email, github) {
        super(username, id, email);
        this.role = "Engineer";
        this.github = github;
    }

    getGithub() {
        return this.github;
    }
    getRole() {
        return this.role;
    }

}

// const engineer = new Employee();

const engineer = new Engineer();
engineer.getRole();
engineer.getGithub();

module.exports = Engineer;
