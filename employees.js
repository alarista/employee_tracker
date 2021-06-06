const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'mysql14231',
  database: 'employees_DB',
});

connection.connect((err) => {
  if (err) throw err;
  runProgram();
});

const runProgram = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'See all employees',
        'Add department',
        'Add role',
        'Add employee',
        'View department',
        'View role',
        'View employee',
        'Update employee role'
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Add department':
          addDepartment();
          break;
          
        case 'See all employees':
          seeAll();
          break;

        case 'Add role':
          addRole();
          break;

        case 'Add employee':
          addEmployee();
          break;

        case 'View department':
          viewDeparment();
          break;

        case 'View role':
          viewRole();
          break;
        
        case 'View employee':
          viewEmployee();
          break;

        case 'Update employee role':
          updateEmployeeRole();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const seeAll = () => {
  let query = 'SELECT * FROM employee, role, department;';
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.log(res);
      runProgram();
    });
}

const addEmployee = () => {
    inquirer
      .prompt([
        {
          name: 'first_name',
          type: 'input',
          message: "Employee's first name?",
        },
        {
          name: 'last_name',
          type: 'input',
          message: "Employee's last name?",
        },
        {
          name: 'role_id',
          type: 'list',
          choices: [
            '1: Engineering Related Job',
            '2: Sales Related Job'
          ],
          message: "What is the employee's role?",
        },
        {
          name: 'manager_id',
          type: 'list',
          choices: [
            '1: Tyler Wright - Engineering VP',
            '2: Erin Altea - Sales VP'
          ],
          message: "Employee's manager?",
        },
      ])
      .then((answer) => {
        var newEmployeeManager = answer.manager_id;
        newEmployeeManager = newEmployeeManager[0];

        var newEmployeeRole = answer.role_id;
        newEmployeeRole = newEmployeeRole[0];

        let query = 'INSERT INTO employee SET ?';
        connection.query(
          query,
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: newEmployeeRole,
            manager_id: newEmployeeManager,
          },
          (err) => {
            if (err) {
              throw err,
              console.log("Error, try again");
            };
            console.log('Success!');
            runProgram();
          }
        );
      });
    };

    const addRole = () => {
        inquirer
          .prompt([
            {
              name: 'name_role',
              type: 'input',
              message: 'Name of new role?',
            },
            {
              name: 'salary_role',
              type: 'input',
              message: 'Salary of new role?',
            },
            {
              name: 'dep_choice',
              type: 'list',
              choices: [
                '1: Engineering',
                '2: Sales'
              ],
              message: 'Department of the new role?',
            },
          ])
          .then((answer) => {
            var newRoleDepartment = answer.dep_choice;
            newRoleDepartment = newRoleDepartment[0];
    
            let query = 'INSERT INTO role SET ?';
            connection.query(
              query,
              {
                title: answer.name_role,
                salary: answer.salary_role,
                department_id: newRoleDepartment,
              },
              (err) => {
                if (err) throw err;
                console.log('Success!');
                runProgram();
              }
            );
          })
    }

    const addDepartment = () => {
      inquirer
        .prompt([
          {
            name: 'name_dep',
            type: 'input',
            message: 'What is the name of the department?',
          }
        ])
        .then((answer) => {
          let query = 'INSERT INTO department SET ?';
          connection.query(
            query,
            {
              name: answer.name,
            },
            (err) => {
              if (err) throw err;
              console.log('Success');
              runProgram();
            }
          );
        });
    }
  

    const viewRole = () => {
      let query = 'SELECT id, title FROM role';
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(res);
        runProgram();
      });
    }

    const viewDeparment = () => {
      let query = 'SELECT id, name FROM department';
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(res);
        runProgram();
      });
    }