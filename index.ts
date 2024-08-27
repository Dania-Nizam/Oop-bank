#!/usr/bin/env node

import { faker } from "@faker-js/faker";
import chalk from "chalk";
import inquirer from "inquirer";

class customer {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  mobNumber: number;
  accNumber: number;

  constructor(
    fName: string,
    lName: string,
    age: number,
    mob: number,
    acc: number,
    gen: string
  ) {
    this.firstName = fName;
    this.lastName = lName;
    this.age = age;
    this.accNumber = acc;
    this.mobNumber = mob;
    this.gender = gen;
  }
}
interface BankAccount {
  accNumber: number;
  balance: number;
}

class bank {
  customer: customer[] = [];
  account: BankAccount[] = [];

  addCustomer(obj: customer) {
    this.customer.push(obj);
  }

  addAccountNumber(obj: BankAccount) {
    this.account.push(obj);
  }
  transction(accobj: BankAccount) {
    let NewAccounts = this.account.filter(
      (acc) => acc.accNumber !== accobj.accNumber
    );
    this.account = [...NewAccounts, accobj];
  }
}
let myBank = new bank();

//customer create
for (let i: number = 1; i <= 7; i++) {
  let fName = faker.person.firstName("male");
  let lName = faker.person.lastName();
  let num = parseInt(faker.phone.number("3##########"));
  const cus = new customer(fName, "male", 25 * i, num, 1000 + i, lName);
  myBank.addCustomer(cus);
  myBank.addAccountNumber({ accNumber: cus.accNumber, balance: 1000 * i });
}

//bank functionality


  async function bankService(bank: bank) {
    do{
      let Service = await inquirer.prompt({
        type: "list",
        message: "select one option",
        name: "select",
        choices: ["veiw balance", "cash withdraw", "cash deposite","Exit"],
      });
      //veiw balance
      if (Service.select == "veiw balance") {
        let res = await inquirer.prompt({
          type: "input",
          name: "number",
          message: "please enter your account no",
        });
        let account = myBank.account.find((acc) => acc.accNumber == res.number);
        if (!account) {
          console.log(chalk.red.bold("invalid account number"));
        }
        if (account) {
          console.log(`Dear ${chalk.green.italic("Account exist")}`);
          if (account) {
            let name = myBank.customer.find(
              (item) => item.accNumber == account?.accNumber
            );
            console.log(
              `Dear ${chalk.green.italic(name?.firstName)} ${chalk.green.italic(
                name?.lastName
              )} your account balance is ${chalk.bold.blueBright(
                "$",
                account.balance
              )} `
            );
          }
        }
      }
    
      //cash withdraw
    
      if (Service.select == "cash withdraw") {
        let res = await inquirer.prompt({
          type: "input",
          name: "number",
          message: "please enter your account no",
        });
        let account = myBank.account.find((acc) => acc.accNumber == res.number);
        if (!account) {
          console.log(chalk.red.bold.italic("invalid account number"));
        }
        if (account) {
          let ans = await inquirer.prompt({
            type: "number",
            message: "please enter your amount",
            name: "rupee",
          });
          if (ans.rupee > account.balance) {
            console.log(chalk.red.bold("you have insufficent balance"));
          }
          let newBalance = account.balance - ans.rupee;
          // transction method
    
          bank.transction({ accNumber: account.accNumber, balance: newBalance });
        }
      }
    
      //cash deposite
    
      if (Service.select == "cash deposite") {
        console.log("cash deposite");
        if (Service.select == "cash deposite") {
          let res = await inquirer.prompt({
            type: "input",
            name: "number",
            message: "please enter your Account number",
          });
          let account = myBank.account.find((acc) => acc.accNumber == res.number);
          if (!account) {
            console.log(chalk.red.bold.italic("invalid account number"));
          }
          if (account) {
            let ans = await inquirer.prompt({
              type: "number",
              message: "please enter your amount",
              name: "rupee",
            });
            let newBalance = account.balance + ans.rupee;
            // transction method
    
            bank.transction({ accNumber: account.accNumber, balance: newBalance });
            
          }
        }
      }
      if (Service.select == "Exit") {
        
        if (Service.select == "cash deposite") {
          let res = await inquirer.prompt({
            type: "input",
            name: "number",
            message: "please enter your Account number",
          });
          let account = myBank.account.find((acc) => acc.accNumber == res.number);
          if (!account) {
            console.log(chalk.red.bold.italic("invalid account number"));
          }
          if (account) {
            let ans = await inquirer.prompt({
              type: "number",
              message: "please enter your amount",
              name: "rupee",
            });
            let newBalance = account.balance + ans.rupee;
            // transction method
    
            bank.transction({ accNumber: account.accNumber, balance: newBalance });
            
          }
        }
     
     return;
     }
    }
    while(true);
  }

bankService(myBank);
