// grabbing info from the employee file
const Employee = require("./Employee");

// extending the class of employee to intern
class Intern extends Employee {
    // passing in the school info
    constructor(name, id, email, school) {
        // grabbing the name, id, and email from employee
        super(name, id, email);
        this.role = "Intern";
        this.school = school;
    }

    //methods to return role and school
    getRole() {
        return this.role;
    }

    getSchool() {
        return this.school;
    }

};

// defining intern and passing in the information into intern
const intern = new Intern();
intern.getRole();
intern.getSchool();

//exporting the intern information
module.exports = Intern;