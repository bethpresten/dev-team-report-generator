// grabbing the employee information from that file
const Employee = require("./Employee");

// extending the employee class
class Manager extends Employee {
    //passing in pertinent information to manager
    constructor(name, id, email, officeNumber) {
        // grabbing the employee code from that file
        super(name, id, email);
        this.role = "Manager";
        this.officeNumber = officeNumber;
    }

    //methods to return "manager" and their office number
    getRole() {
        return this.role;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

}

// defining manager and passing in the methods to that role
const manager = new Manager();
manager.getRole();
manager.getOfficeNumber();

// exporting information from manager to app.js
module.exports = Manager;