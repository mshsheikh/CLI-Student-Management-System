#!/usr/bin/env node
import inquirer from "inquirer";
class Student {
    static studentCount = 0;
    studentID;
    name;
    courses;
    balance;
    constructor(name) {
        this.studentID = this.generateStudentID();
        this.name = name;
        this.courses = [];
        this.balance = 0;
        Student.studentCount++;
    }
    generateStudentID() {
        return Math.floor(10000 + Math.random() * 90000).toString();
    }
    enrollCourse(course) {
        this.courses.push(course);
        console.log(`${this.name} enrolled in ${course} successfully.`);
    }
    viewBalance() {
        console.log(`${this.name}'s balance: $${this.balance}`);
    }
    payTuition(amount) {
        this.balance += amount;
        console.log(`${this.name} paid $${amount}. Remaining balance: $${this.balance}`);
    }
    showStatus() {
        console.log(`Student Name: ${this.name}`);
        console.log(`Student ID: ${this.studentID}`);
        console.log(`Courses Enrolled: ${this.courses.join(", ")}`);
        console.log(`Balance: $${this.balance}`);
    }
}
class StudentManagementSystem {
    students;
    constructor() {
        this.students = [];
    }
    async addStudent() {
        const { name } = await inquirer.prompt([
            { name: "name", message: "Enter student name:" },
        ]);
        const newStudent = new Student(name);
        this.students.push(newStudent);
        console.log(`${newStudent.name} added to the system with ID ${newStudent.studentID}`);
    }
    async enrollStudentInCourse() {
        const { studentID, course } = await inquirer.prompt([
            { name: "studentID", message: "Enter student ID:" },
            { name: "course", message: "Enter course name:" },
        ]);
        const student = this.findStudentByID(studentID);
        if (student) {
            student.enrollCourse(course);
        }
        else {
            console.log("Student not found.");
        }
    }
    async viewStudentBalance() {
        const { studentID } = await inquirer.prompt([
            { name: "studentID", message: "Enter student ID:" },
        ]);
        const student = this.findStudentByID(studentID);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log("Student not found.");
        }
    }
    async payStudentTuition() {
        const { studentID, amount } = await inquirer.prompt([
            { name: "studentID", message: "Enter student ID:" },
            { name: "amount", message: "Enter tuition amount to pay:" },
        ]);
        const student = this.findStudentByID(studentID);
        if (student) {
            student.payTuition(Number(amount));
        }
        else {
            console.log("Student not found.");
        }
    }
    async showStudentStatus() {
        const { studentID } = await inquirer.prompt([
            { name: "studentID", message: "Enter student ID:" },
        ]);
        const student = this.findStudentByID(studentID);
        if (student) {
            student.showStatus();
        }
        else {
            console.log("Student not found.");
        }
    }
    findStudentByID(studentID) {
        return this.students.find((student) => student.studentID === studentID);
    }
}
async function main() {
    const sms = new StudentManagementSystem();
    while (true) {
        const { action } = await inquirer.prompt([
            {
                name: "action",
                message: "Select an action:",
                type: "list",
                choices: [
                    "Add Student",
                    "Enroll Student in Course",
                    "View Student Balance",
                    "Pay Student Tuition",
                    "Show Student Status",
                    "Exit",
                ],
            },
        ]);
        switch (action) {
            case "Add Student":
                await sms.addStudent();
                break;
            case "Enroll Student in Course":
                await sms.enrollStudentInCourse();
                break;
            case "View Student Balance":
                await sms.viewStudentBalance();
                break;
            case "Pay Student Tuition":
                await sms.payStudentTuition();
                break;
            case "Show Student Status":
                await sms.showStudentStatus();
                break;
            case "Exit":
                console.log("Exiting Student Management System.");
                process.exit(0);
        }
    }
}
main();
