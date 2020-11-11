// main employee class with constructor; obtained the constructor info from the employee-test

class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        // hard coded role since all wiil be employees
        this.role = "Employee";
    }
    // methods obtained from employee-test
    getName() {
        return this.name;
    };

    getId() {
        return this.id;
    };

    getEmail() {
        return this.email;
    };

    getRole() {
        return this.role;
    };
};

//esporting the information from this js file

module.exports = Employee;