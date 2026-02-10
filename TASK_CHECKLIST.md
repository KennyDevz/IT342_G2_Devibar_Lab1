# Lab 2 Task Checklist

- [x] **Project Setup** (d881bfc)
  - [x] Initialize Spring Boot Backend 
  - [x] Create MySQL Database Connection (Port 3309) 
  - [x] Configure `application.properties` for MySQL 

- [x] **Backend Implementation** (d92ad4e)
  - [x] Create `User` Entity 
  - [x] Create `UserRepository` 
  - [x] Implement `UserDTO` and `LoginRequest` DTOs 
  - [x] Implement Password Encryption (BCrypt) 
  - [x] Create `AuthService` (Register & Authenticate Logic) 
  - [x] Implement `POST /api/auth/register` Endpoint 
  - [x] Implement `POST /api/auth/login` Endpoint 
  - [x] Implement `TokenProvider` for JWT Generation
        
- [x] **Backend Security & Finalization** (88b6ef3)
  - [x] Update `AuthController` to return JWT Token
  - [x] Implement `JwtAuthenticationFilter`
  - [x] Configure `SecurityConfig` to use JWT Filter
  - [x] Implement `GET /api/user/me` (Protected Endpoint)

## IN-PROGRESS
- [ ] **Frontend (React)**
  - [x] Initialize React Project (`/web`) (7e8ae69)
  - [x] Setup API Service (Axios/Fetch) (ae0008f)
      
  - [x] Create **Register Page** (c26d5c3) 
  - [x] Create **Login Page** (c26d5c3)
        
  - [ ] Create **Dashboard & Profile Page** (Protected Route)
  - [ ] Implement **Logout Functionality**

## TODO

