# Full-Stack Auth App  

A full-stack authentication system built with **NestJS (backend)** and **React + Tailwind (frontend)**.  
The app provides secure user authentication with JWT tokens, input validation, logging, testing, and API documentation.  

---

## 🚀 Features  

### Backend (NestJS + MongoDB)  
- 🔑 **Authentication APIs**:  
  - `POST /api/auth/register` → Register new users (with validation).  
  - `POST /api/auth/login` → Login and receive a JWT token.
  - `GET /api/users/me` → Get current user data (protected, requires token).  
- ✅ **Validation**:  
  - Email → must be valid format.  
  - Name → minimum 3 characters.  
  - Password → min 8 chars, includes number, letter, special character.  
- 🛡️ **Security**:  
  - JWT-based authentication (token expires after 1 hour).  
- 📊 **Logging**:  
  - Implemented with **Winston** (logs to console + file).  
- 🗄️ **Database**:  
  - MongoDB + Mongoose (ODM).  
- 📂 **DDD-Inspired Structure**:  
  - Separated by domain, application, and infrastructure layers.  
- 📖 **API Documentation**:  
  - Swagger UI at `/api-docs`.  
- 🧪 **Testing**:  
  - Jest unit tests with **97% coverage**.  
- 🧹 **Code Quality**:  
  - ESLint + Prettier integrated.  

---

### Frontend (React + Tailwind)  
- 🎨 Built with **React + TailwindCSS**.  
- 🔐 **Features**:  
  - Register, Login, Logout.  
  - Display current user profile (from protected API).  
- ✅ **Form Validation** (on register):  
  - Matches backend validation rules.  
- 🧪 **E2E Testing**:  
  - Cypress tests for login/register flows.  
- 🧹 **Code Quality**:  
  - ESLint + Prettier integrated.  

---
## 🔄 CI/CD  

This project includes a **GitHub Actions pipeline** to automate quality checks and testing for both backend and frontend.  

The pipeline runs on every push and pull request and includes the following steps:  
- **Backend (NestJS)**:  
  - Install dependencies.  
  - Run linting and formatting checks.  
  - Execute Jest unit tests with coverage.  

- **Frontend (React)**:  
  - Install dependencies.  
  - Run linting and formatting checks.  
  - Start the frontend application.  
  - Run Cypress end-to-end tests against the running frontend.  

This ensures that code quality, test coverage, and user flows are validated automatically before merging changes.  

## 📦 Tech Stack  

**Backend**  
- NestJS  
- MongoDB + Mongoose  
- JWT  
- Winston  
- Jest  

**Frontend**  
- React  
- TailwindCSS  
- Cypress  
- ESLint + Prettier  

---

## ⚡ Getting Started  
### Clone the Repository  
```bash
git clone https://github.com/your-username/Full-Stack-Task.git
cd Full-Stack-Task
```
### Backend  
```bash
cd full-stack-test-task-back-end
cp .env.example .env
npm install
npm run start
```
### Frontend  
```bash
cd Full-Stack-Test-Task-front-end
cp .env.example .env
npm install
npm run dev
```
#### running tests
##### Bakend test `npm run test` 
##### FrontEnd E2E test `npx cypress open`



