const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./src/page-template.js");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

if(!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

// Empty array for pasasing in all employee objects
const teamMembers = [];

const ManagerData = [ 
    {
        type: 'input',
        name: 'name',
        message: 'What is the team manager\'s name?', 
        validate: (input) => {
            return input.trim() !== '' ? true : 'Manager name cannot be empty'
        }     
    },
    {
        type: 'number',
        name: 'id',
        message: 'What is the team manager\'s id?', 
        validate: (input) => {
            return (!isNaN(input) && input.trim() !== '') ? true: 'Please enter a valid number for id.'
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the team manager\'s email?',
        validate: function (input) {
            // Email validation using regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(input) ? true : 'Please enter a valid email'
        }
    },
    {
        type: 'number',
        name: 'officeNumber',
        message: 'What is the team manager\'s office number',
        validate: (input) => {
            return (!isNaN(input) && input.trim() !== '') ? true: 'Please enter a valid number'
        }
    },
]



const menuItemsData = [
    {
        type: 'list',
        name: 'menuItem',
        message: 'What do you want to do next?',
        choices: ['\n Add Engineer', '\n Add Intern', '\n Finish building app']
    }
]

// function getInfo(){
//     inquirer
//     .prompt(ManagerData)
//     .then((data) =>{

//         const Manager1 = new Manager(data.name, data.id, data.email, data.officeNumber)
//         console.log(Manager1)
//     })
// }
//getInfo()

// 
function getManagerInfo(){
    return inquirer.prompt(ManagerData)
}

function selectMenuItemsData(){
    return inquirer.prompt(menuItemsData)
}


function startApp(){
    getManagerInfo()
        .then(managerInfo =>{
            //console.log(managerInfo)
            const manager = new Manager(managerInfo.name, managerInfo.id, managerInfo.email, managerInfo.officeNumber)
            console.log(manager)
        })

        function createTeamMembers(){

        }
    // console.log('The app has started')
}

startApp()




// TODO: Write Code to gather information about the development team members, and render the HTML file.
// create employee, engineer, intern, manager classes so that it will pass the test
// create the inquiirer prompt to ask for manager info
// create the inquirer flow so that it will ask for different 
// set of inquirer prompt based on user choice
//Write html result to file
