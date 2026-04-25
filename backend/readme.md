# Hostel Issue Management System

A role-based complaint management system for hostel environments.

## Features

- Student can create complaints
- Admin can view and assign complaints
- Staff can resolve complaints
- Secure authentication using JWT
- Role-based access control

## Tech Stack

Node.js  
Express.js  
MongoDB  
JWT Authentication

## API Endpoints

### Authentication
POST /api/auth/register
POST /api/auth/login

### Complaints
POST /api/complaints
GET /api/complaints/my
GET /api/complaints
PUT /api/complaints/assign
PUT /api/complaints/status

## Workflow

Student → Create Complaint  
Admin → Assign Complaint  
Staff → Resolve Complaint

## Author
Amarpreet Kumar