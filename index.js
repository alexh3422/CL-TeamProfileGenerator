
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const buildHtml = require('./util/generateHtml');


const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);


const team = [];

const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of the employee?'

    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the id of the employee?'

    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the email of the employee?'

    },
    {
        type: 'list',
        name: 'role',
        message: 'What is the role of the employee?',
        choices: ['Manager', 'Engineer', 'Intern']
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the office number of the manager?',
        when: (answers) => answers.role === 'Manager'
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is the github username of the engineer?',
        when: (answers) => answers.role === 'Engineer'
    },
    {
        type: 'input',
        name: 'school',
        message: 'What is the school of the intern?',
        when: (answers) => answers.role === 'Intern'
    },
    {
        type: 'confirm',
        name: 'addEmployee',
        message: 'Would you like to add another employee?'

    }
];

const init = async () => { // async function to use await 

    
    const answers = await inquirer.prompt(questions); // answers is an object with all the answers to the questions
    let employee; // employee is a variable that will be assigned to a new instance of a class
    switch(answers.role) { // switch statement to determine which class to create a new instance of
        case 'Manager':
            employee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            break;
        case 'Engineer':
            employee = new Engineer(answers.name, answers.id, answers.email, answers.github);
            break;
        case 'Intern':
            employee = new Intern(answers.name, answers.id, answers.email, answers.school);
            break;
    }
    team.push(employee); // push the new employee to the team array
    if(answers.addEmployee) { // if the user wants to add another employee, run the init function again
        await init(); // await is used to wait for the init function to finish before moving on to the next line of code
    } else { // if the user does not want to add another employee, build the html and write it to a file
        console.log(team)
        const html = buildHtml(team);
       //write the html to a file in the generatedHTML folder in the root directory of the project 
        await writeFileAsync(path.join(__dirname, 'dist', 'index.html'), html); 


    }
}

init();





