// TODO: Write code to define and export the Employee class

// const


class Employee{
    constructor(name, id, email){
        this.name = name,
        this.id = id,
        this.email = email
    }
    getName(){
        return this.name
    }
    getId(){
        return this.id
    }
    getEmail(){
       return this.email
    }
    getRole(){
        return 'Employee'
    }

}

module.exports = Employee;

const Employee1 = new Employee('Sam', 1, 'sam@mail.com')