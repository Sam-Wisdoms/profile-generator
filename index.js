const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
// create employee, engineer, intern, manager classes so that it will pass the test
// create the inquiirer prompt to ask for manager info
// create the inquirer flow so that it will ask for different 
// set of inquirer prompt based on user choice
//Write html result to file

//Example

