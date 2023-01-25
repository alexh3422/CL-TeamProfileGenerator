const employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const generateTeam = require('./util/generateHtml');
const generateManager = require('./util/generateHtml');
const generateEngineer = require('./util/generateHtml');
const generateIntern = require('./util/generateHtml');



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

const init = async () => { 

    
    const answers = await inquirer.prompt(questions);
    let employee;
    switch(answers.role) {
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
    team.push(employee);
    if(answers.addEmployee) {
        await init();
    } else {
        console.log(team)
        const html = generateTeam(team);
       
        await writeFileAsync(path.join(__dirname, 'dist', 'index.html'), html);


    }
}

init();





