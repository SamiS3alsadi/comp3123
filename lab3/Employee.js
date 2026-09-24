// Employee Module - exported for use in index.js

let employees = [
    {id: 1, firstName: "Pritesh", lastName: "Patel", email: "pritesh@gmail.com", Salary: 5000},
    {id: 2, firstName: "Krish", lastName: "Lee", email: "krish@gmail.com", Salary: 4000},
    {id: 3, firstName: "Racks", lastName: "Jacson", email: "racks@gmail.com", Salary: 5500},
    {id: 4, firstName: "Denial", lastName: "Roast", email: "denial@gmail.com", Salary: 9000}
]

// Return all employee records
function getAllEmployees() {
    return employees
}

// Return "firstName lastName" for every employee, sorted ascending
function getEmployeeNames() {
    return employees
        .map(e => `${e.firstName} ${e.lastName}`)
        .sort();
}

// Return the sum of all employee salaries
function getTotalSalary() {
    return employees.reduce((total, e) => total + e.Salary, 0)
}

module.exports = {
    getAllEmployees,
    getEmployeeNames,
    getTotalSalary
};
