// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");  //telling it to import the Employee class


class Engineer extends Employee { // Engineer class extends Employee class (inheriting name, id, and email from employee)
    constructor(name, id, email, github) { // everything that will be in the new Engineer class
        super(name, id, email); // everything to import from Employee class
        this.github = github; // what will be added on to the imported Employee class to create the new Engineer class
    }
    getGithub() { // method to get github username
        return this.github;
    }
    getRole() { // method to get role
        return "Engineer";
    }
}

module.exports = Engineer; // exporting Engineer class