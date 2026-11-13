# CampusTrack – Full-Stack Student Management System

CampusTrack is a modern, clean, beginner-friendly Student Management System built from scratch using **Java 17**, **Spring Boot 3**, **MySQL**, and **React.js + Vite**. Designed specifically for college assignments and viva demonstrations, the codebase is clearly structured, modular, and easy to explain.

---

## 1. Technologies Used

- **Backend:** Java 17, Spring Boot 3.2.5, Spring Data JPA, Hibernate, Maven Wrapper (`mvnw`)
- **Database:** MySQL (Relational Database)
- **Frontend:** React 18, Vite, Vanilla CSS Design System, Lucide React Icons
- **API Architecture:** RESTful APIs with JSON payloads and standard HTTP status codes
- **API Testing:** Postman & cURL

---

## 2. Key Features

- **Full CRUD Functionality:** Add, View, Edit, and Delete student records.
- **Course-Based Filtering:** Direct backend endpoint integration (`/api/students/course/{course}`).
- **Real-Time Client Search:** Filter students instantly by name or email.
- **Academic Metrics Dashboard:** Live stat cards for total enrolled students, available courses, and average student age.
- **Modern Campus Theme:** Deep navy (`#0f172a`) and vibrant teal (`#0d9488`) aesthetics with soft shadows and rounded cards.
- **Modal Dialogs:** Clean modal for creating/updating student profiles and deletion confirmation.
- **Robust Exception Handling:** Centralized `@RestControllerAdvice` returning standard `ErrorResponse` with HTTP status codes (201, 200, 204, 404, 400).
- **Graceful UI Feedback:** Toast notifications, loading spinners, and empty states.

---

## 3. Project Directory Structure

```text
CampusTrack_Student_System/
├── campustrack-backend/
│   ├── .mvn/wrapper/                  # Maven Wrapper binaries
│   ├── src/main/java/com/campustrack/
│   │   ├── CampusTrackApplication.java # Spring Boot Main Entry Point
│   │   ├── entity/
│   │   │   └── Student.java           # JPA Entity (@Entity, @Table)
│   │   ├── repository/
│   │   │   └── StudentRepository.java # Spring Data JpaRepository
│   │   ├── service/
│   │   │   ├── StudentService.java    # Service Interface
│   │   │   └── StudentServiceImpl.java# Business Logic Implementation
│   │   ├── controller/
│   │   │   └── StudentController.java # REST Controller (@CrossOrigin)
│   │   └── exception/
│   │       ├── StudentNotFoundException.java
│   │       ├── ErrorResponse.java
│   │       └── GlobalExceptionHandler.java
│   ├── src/main/resources/
│   │   └── application.properties     # MySQL DB config & server port 8080
│   ├── mvnw / mvnw.cmd                # Maven wrapper execution scripts
│   └── pom.xml                        # Maven dependencies & build config
│
├── campustrack-frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx             # Campus header & connection status
│   │   │   ├── StatsCards.jsx         # Summary metrics cards
│   │   │   ├── StudentTable.jsx       # Student directory records table
│   │   │   ├── StudentModal.jsx       # Add/Edit student form dialog
│   │   │   ├── ConfirmModal.jsx       # Delete confirmation dialog
│   │   │   └── Toast.jsx              # Success/error toast notifications
│   │   ├── services/
│   │   │   └── studentService.js      # REST API communication client
│   │   ├── App.jsx                    # Root state coordinator
│   │   ├── index.css                  # Navy & Teal Design System
│   │   └── main.jsx                   # React DOM Entry point
│   ├── package.json                   # Frontend dependencies & scripts
│   └── vite.config.js                 # Vite bundler configuration
│
├── CampusTrack_Postman_Collection.json# Ready-to-import Postman Collection
└── README.md                          # Comprehensive documentation
```

---

## 4. MySQL Database Setup

1. Make sure your **MySQL Server** is running (e.g., MySQL 8.0 service).
2. The backend is configured to **automatically create** the database `campustrack_db` on first startup if it does not already exist via:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/campustrack_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
   ```
3. Open `campustrack-backend/src/main/resources/application.properties` and verify your MySQL password:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=your_mysql_password_here
   ```
   *(You can also pass it via the environment variable `DB_PASSWORD` without editing the file).*

---

## 5. How to Run the Project

### Step A: Start the Backend (Port 8080)
1. Open a terminal in the backend directory:
   ```bash
   cd campustrack-backend
   ```
2. Run using the Maven wrapper:
   - **Windows (PowerShell/CMD):**
     ```powershell
     .\mvnw.cmd spring-boot:run
     ```
   - **macOS / Linux:**
     ```bash
     ./mvnw spring-boot:run
     ```
3. The backend starts at: `http://localhost:8080`

### Step B: Start the Frontend (Port 5173)
1. Open a separate terminal in the frontend directory:
   ```bash
   cd campustrack-frontend
   ```
2. Install dependencies (first time only):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

---

## 6. REST API Endpoints Documentation

Base URL: `http://localhost:8080/api/students`

| # | HTTP Method | Endpoint | Description | Status Code |
|---|---|---|---|---|
| 1 | `POST` | `/api/students` | Add a new student record | `201 CREATED` |
| 2 | `GET` | `/api/students` | Retrieve all student records | `200 OK` |
| 3 | `GET` | `/api/students/{id}` | Retrieve single student by ID | `200 OK` / `404 NOT FOUND` |
| 4 | `PUT` | `/api/students/{id}` | Update student details by ID | `200 OK` / `404 NOT FOUND` |
| 5 | `DELETE` | `/api/students/{id}` | Delete student record by ID | `204 NO CONTENT` / `404 NOT FOUND` |
| 6 | `GET` | `/api/students/course/{course}` | Retrieve students enrolled in a course | `200 OK` |

---

## 7. Sample Postman JSON Requests

You can either import `CampusTrack_Postman_Collection.json` directly into Postman, or use the following JSON payloads:

### 1. Add Student (POST `/api/students`)
**URL:** `http://localhost:8080/api/students`  
**Method:** `POST`  
**Headers:** `Content-Type: application/json`  
**Body (Raw JSON):**
```json
{
  "name": "Sarah Connor",
  "email": "sarah.connor@campus.edu",
  "course": "Computer Science",
  "age": 21
}
```

### 2. Get All Students (GET `/api/students`)
**URL:** `http://localhost:8080/api/students`  
**Method:** `GET`

### 3. Get Student by ID (GET `/api/students/{id}`)
**URL:** `http://localhost:8080/api/students/1`  
**Method:** `GET`

### 4. Update Student (PUT `/api/students/{id}`)
**URL:** `http://localhost:8080/api/students/1`  
**Method:** `PUT`  
**Headers:** `Content-Type: application/json`  
**Body (Raw JSON):**
```json
{
  "name": "Sarah Connor",
  "email": "sarah.connor@campus.edu",
  "course": "Artificial Intelligence",
  "age": 22
}
```

### 5. Delete Student (DELETE `/api/students/{id}`)
**URL:** `http://localhost:8080/api/students/1`  
**Method:** `DELETE`  
**Response Status:** `204 No Content`

### 6. Filter by Course (GET `/api/students/course/{course}`)
**URL:** `http://localhost:8080/api/students/course/Computer Science`  
**Method:** `GET`

### 7. Test StudentNotFoundException (GET `/api/students/9999`)
**URL:** `http://localhost:8080/api/students/9999`  
**Method:** `GET`  
**Response Status:** `404 Not Found`  
**Response Body:**
```json
{
  "timestamp": "2026-11-13T21:54:18.6304645",
  "status": 404,
  "error": "Not Found",
  "message": "Student not found with ID: 9999",
  "path": "/api/students/9999"
}
```

---

## 8. Viva Presentation Tips

1. **Architecture Explanation:** Point out the classic 3-tier layering:
   - **Controller Layer** (`StudentController`) handles incoming HTTP requests, status codes, and cross-origin policies (`@CrossOrigin`).
   - **Service Layer** (`StudentService` / `StudentServiceImpl`) enforces business validation and rules.
   - **Repository Layer** (`StudentRepository`) uses Spring Data JPA's `JpaRepository` for type-safe database queries.
2. **Exception Handling:** Explain how `@RestControllerAdvice` intercepts `StudentNotFoundException` across the application to avoid returning raw stack traces.
3. **Database Independence:** Point out that JPA / Hibernate automatically generates the SQL tables (`students`) and updates schemas according to Java entity definitions.
