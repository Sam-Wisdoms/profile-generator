const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
// const Manager = require("./lib/Manager");

const ManagerData = [ 
    {
        type: 'input',
        name: 'name',
        message: 'What is the team manager\'s name?',      
    },
    {
        type: 'number',
        name: 'id',
        message: 'What is the team manager\'s id?', 
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the team manager\'s email?'
    },
    {
        type: 'number',
        name: 'officeNumber',
        message: 'What is the team manager\'s office number'
    }
]

function getInfo(){
    inquirer
    .prompt(ManagerData)
    .then((data) =>{

        const Manager1 = new Manager(data.name, data.id, data.email, data.officeNumber)
        console.log(Manager1)
    })
}

getInfo()






// TODO: Write Code to gather information about the development team members, and render the HTML file.
// create employee, engineer, intern, manager classes so that it will pass the test
// create the inquiirer prompt to ask for manager info
// create the inquirer flow so that it will ask for different 
// set of inquirer prompt based on user choice
//Write html result to file

//Example

