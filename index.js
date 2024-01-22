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
            return (!isNaN(input)) ? true: 'Please enter a valid number for id.'
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
            return (!isNaN(input)) ? true: 'Please enter a valid number'
        }
    },
]

const engineerData = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the engineer name:',
        validate: (input) => {
            return input.trim() !== '' ? true : 'Engineer name cannot be empty.'
        }
    },
    {
        type: 'number',
        name: 'id',
        message: 'Enter engineer id:',
        validate: (input) => {
            return (!isNaN(input)) ? true : 'Please enter a valid number for id.'
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter your Engineer email',
        validate: function(input){
            // Email validation using regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(input) ? true : 'Please enter a valid email.'
        }
    },
    {
        type: 'input',
        name: 'GitHub',
        message: 'Enter Engineer GitHub',
        validate: (input) => {
            return input.trim() !== '' ? true: 'Engineer gitHub cannot be empty.'
        }
    },
]

const internData = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of intern?',
        validate: (input) => {
            return input.trim() !== '' ? true: 'Please enter a valid name for intern.'
        }
    },
    {
        type: 'number',
        name: 'id',
        message: 'What is the id for intern?.',
        validate: (input) => {
            return(!isNaN(input)) ? true : 'Please enter a valid id for intern.'
        }
    },
    {
        type: 'input',
        name: 'Email',
        message: 'Please enter email for intern',
        validate: function(input){
            // Email validation using regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(input) ? true : 'Please enter a valid email.'
        }
    },
    {
        type: 'input',
        name: 'school',
        message: 'What is the school of your intern?',
        validate: (input) => {
            return input.trim() !== '' ? true : 'Intern school cannot be empty.'
        }
    },
]

const menuItemsData = [
    {
        type: 'list',
        name: 'menuItem',
        message: 'What do you want to do next?',
        choices: ['Add an Engineer', 'Add an Intern', 'Finish building the team']
    }
]

function getManagerInfo(){
    return inquirer.prompt(ManagerData)
}

function getEngineerInfo(){
    return inquirer.prompt(engineerData)
}

function getInternInfo(){
    return inquirer.prompt(internData)
}

function selectMenuItems(){
    return inquirer.prompt(menuItemsData)
}

function startApp(){
    getManagerInfo()
        .then(managerInfo =>{
            const manager = new Manager(managerInfo.name, managerInfo.id, managerInfo.email, managerInfo.officeNumber)
            teamMembers.push(manager);

            let selectedMenuItem = '';

            const createTeamMembers = () => {
                selectMenuItems()
                .then((menu) => {
                    selectedMenuItem = menu.menuItem;

                    if(selectedMenuItem === 'Add an Engineer'){
                        return getEngineerInfo();
                    }else if(selectedMenuItem === 'Add an Intern') {
                        return getInternInfo();
                    }
                })
                .then((gatheredInfo) =>{
                    if(selectedMenuItem === 'Add an Engineer'){
                        const engineer = new Engineer (gatheredInfo.name, gatheredInfo.id, gatheredInfo.email, gatheredInfo.github);
                        teamMembers.push(engineer);
                    } else if(selectedMenuItem === 'Add an Intern'){
                        const intern = new Intern(gatheredInfo.name, gatheredInfo.id, gatheredInfo.email, gatheredInfo.school);
                        teamMembers.push(intern);
                    }
                    if(selectedMenuItem === 'Finish building the team'){
                    
                        const htmlContent = render(teamMembers);

                        fs.writeFileSync(outputPath, htmlContent);
                        console.log(`Team HTML has been gathered at ${outputPath}`);
                    }
                    else {
                        createTeamMembers();
                    }
                });
            };
            createTeamMembers();
        })  
}

startApp()


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
// TODO: Write Code to gather information about the development team members, and render the HTML file.
// create employee, engineer, intern, manager classes so that it will pass the test
// create the inquiirer prompt to ask for manager info
// create the inquirer flow so that it will ask for different 
// set of inquirer prompt based on user choice
//Write html result to file
