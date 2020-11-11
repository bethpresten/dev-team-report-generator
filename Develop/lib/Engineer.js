// grabbing the constructor info from the js file
const Employee = require("./Employee");

// extending the employee class
class Engineer extends Employee {
    constructor(name, id, email, github) {
        // passing in the consistent info from employee
        super(name, id, email);
        //hard coding engineer and grabbing the github info
        this.role = "Engineer";
        this.github = github;
    }
    // methods to grab role and github
    getGithub() {
        return this.github;
    }
    getRole() {
        return this.role;
    }

};
// defining engineer and passing in the methods
const engineer = new Engineer();
engineer.getRole();
engineer.getGithub();
// exporting info from this file
module.exports = Engineer;
