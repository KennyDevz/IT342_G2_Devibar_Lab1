# Lab 2 Task Checklist

- [x] **Project Setup**
  - [x] Initialize Spring Boot Backend 
  - [x] Create MySQL Database Connection (Port 3309) 
  - [x] Configure `application.properties` for MySQL 

- [x] **Backend Implementation**
  - [x] Create `User` Entity 
  - [x] Create `UserRepository` 
  - [x] Implement `UserDTO` and `LoginRequest` DTOs 
  - [x] Implement Password Encryption (BCrypt) 
  - [x] Create `AuthService` (Register & Authenticate Logic) 
  - [x] Implement `POST /api/auth/register` Endpoint 
  - [x] Implement `POST /api/auth/login` Endpoint 
  - [x] Implement `TokenProvider` for JWT Generation 

## IN-PROGRESS
- [ ] **Backend Security & Finalization**
  - [ ] Update `AuthController` to return JWT Token
  - [ ] Implement `JwtAuthenticationFilter`
  - [ ] Configure `SecurityConfig` to use JWT Filter

## TODO
- [ ] **Backend Features**
  - [ ] Implement `GET /api/user/me` (Protected Endpoint)

- [ ] **Frontend (React)**
  - [ ] Initialize React Project (`/web`)
  - [ ] Setup API Service (Axios/Fetch)
  - [ ] Create **Register Page**
  - [ ] Create **Login Page**
  - [ ] Create **Dashboard/Profile Page** (Protected Route)
  - [ ] Implement **Logout Functionality**

- [ ] **Documentation**
  - [ ] Update FRS PDF with ERD
  - [ ] Update FRS PDF with Web UI Screenshots
    - [ ] Register Page Screenshot
    - [ ] Login Page Screenshot
    - [ ] Dashboard Screenshot