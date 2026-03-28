# AcademiaPortal

A Full Stack Teacher Management Portal built with CodeIgniter 4 (Backend) and ReactJS (Frontend).

## Requirements
- XAMPP (PHP 8.x + MySQL)
- Composer
- Node.js

## Backend Setup
1. Clone repo and go to teacher-backend folder
2. Run `composer install`
3. Rename `env` to `.env`
4. Set database config in `.env`:
   - database = teacher_db
   - username = root
   - password = (blank)
5. Import `teacher_db.sql` in phpMyAdmin
6. Run `php spark serve`

## Frontend Setup
1. Go to teacher-frontend folder
2. Run `npm install`
3. Run `npm start`
4. Open `http://localhost:3000`

## API Endpoints
| Method | Endpoint | Auth |
|--------|----------|------|
| POST | /api/register | No |
| POST | /api/login | No |
| POST | /api/teacher/create | Yes |
| GET | /api/teachers | Yes |
| GET | /api/auth-users | Yes |
