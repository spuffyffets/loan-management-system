# 🏦 Loan Management System (Frontend)

**Loan Management System** is a full-stack loan application management platform that allows users to apply for loans, upload documents, track application status, view sanction letters, and more. This repository contains the **Angular frontend**.

> 🔗 **Backend Repo**: [Home_loan_Finance Backend](https://github.com/spuffyffets/Home_loan_Finance.git)  
> 🔗 **Frontend Repo**: [Loan Management System Frontend](https://github.com/spuffyffets/loan-management-system.git)

---

## 🚀 Features

- 🔐 **User Registration and Login**  
- 💼 **Loan Application Management**  
- 📄 **Document Upload and Tracking**  
- 📊 **View Application Status and Sanction Letters**  
- 🛠️ **Role-based Features** (e.g., Customer, Disbursement Manager)  
- 🔄 Responsive UI with real-time feedback  

---

## 🧑‍💻 Technologies Used

- **Frontend**: Angular 16.x  
- **Backend**: Spring Boot, Hibernate  
- **Security**: JWT Authentication  
- **Database**: MySQL  

---

## 📂 Project Structure (Frontend)

## 📂 Project Structure

```bash
loan-management-system/
 ├── README.md
 ├── angular.json
 ├── package.json
 ├── tsconfig.app.json
 ├── tsconfig.json
 ├── tsconfig.spec.json
 ├── .editorconfig
 ├── .hintrc
 └── src/
     ├── index.html
     ├── main.ts
     ├── styles.css
     ├── app/
     │   ├── auth/                 # Login, Registration, Guards
     │   │   └── auth/             # Auth component files
     │   ├── core/                 # Static pages like About Us, Contact Us, Gallery, Home, Navbar
     │   ├── customer/             # Customer-related components and services (apply loan, profile, documents, etc.)
     │   ├── dashboard/            # Dashboards for credit manager, customer, disbursement, loan officer
     │   ├── disbursement/         # Disbursement related components and history
     │   ├── loan-officer-dashboard/ # Loan officer dashboard components
     │   ├── shared/               # Shared services, pipes, and utilities
     │   └── app.module.ts
     ├── assets/
     │   └── .gitkeep
     └── typings/
         └── file-saver.d.ts


```

## 🔧 Setup Instructions

### ✅ Prerequisites
- 🟢 Node.js & npm installed  
- 🟢 Angular CLI installed:

```bash
npm install -g @angular/cli

``` 
## Installation (Frontend)
```bash
git clone https://github.com/spuffyffets/frontend.git
cd frontend
npm install
ng serve --open
```

🚀 App will run at: http://localhost:4200/

⚠️ Ensure the backend is running on: http://localhost:8080/  (Check Port no:- in application.properties)


✅ Make sure CORS is enabled on backend


```bash
git clone https://github.com/spuffyffets/Home_loan_Finance.git
cd Home_loan_Finance

```
- Open in IDE (Eclipse/IntelliJ/VSCode)
- Configure DB (MySQL) and run Spring Boot app

## ✅ Make sure:

MySQL is running

Database home_loan is created

Spring Boot app runs on: http://localhost:8080/ (Check Port no:- in application.properties)

## ✍️ Author

Suchit Chaudhari
📧 suchitchaudhari17@gmail.com