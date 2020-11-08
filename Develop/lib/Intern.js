
// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee {
    constructor(username, id, email, school) {
        super(username, id, email);
        this.role = "Intern";
        this.school = school;
    }

    getRole() {
        return this.role;
    }

    getSchool() {
        return this.school;
    }

};

const intern = new Intern();
intern.getRole();
intern.getSchool();

module.exports = Intern;