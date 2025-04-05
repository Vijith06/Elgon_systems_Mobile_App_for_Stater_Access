# Smart Motor Control App

A mobile application built for **ELGON SYSTEMS** to enable remote control of devices such as pumps and motors. The app provides secure user authentication, admin-based access control, and a customizable control panel — all built using modern, scalable technologies.

## 🏢 Client

**ELGON SYSTEMS**

## 🚀 Features

- **User Authentication**
  - Email-based sign-up with password confirmation.
  - Secure login system.
  - Admin-controlled user approval.

- **Admin Console**
  - Special admin credentials allow access to the user management dashboard.
  - Admin can view, approve, or deny new user accounts.
  - Approved users are stored in MongoDB and allowed to log in.

- **Device Control Panel**
  - Post-login, users land on a dashboard to control devices like:
    - Pumps
    - Motors
  - Devices can be turned **ON/OFF** with a tap.
  - UI is built to support adding more devices dynamically.

## 🛠 Tech Stack

| Layer        | Technology            |
|--------------|------------------------|
| Frontend     | React Native           |
| Backend      | Node.js + AWS Lambda   |
| Database     | MongoDB Atlas          |
| Hosting      | AWS Lambda (serverless)|

## 🔐 Admin Flow

1. Admin logs in with default credentials.
2. Views a list of pending user signup requests.
3. Can approve or deny users.
4. Approved users can log in to access the control panel.

## 📱 User Flow

1. User signs up with email and password.
2. Account remains inactive until approved by the admin.
3. Once approved, the user can log in and control devices.


## ⚙️ Deployment

- **Frontend**: Built in React Native.
- **Backend**: Hosted on **AWS Lambda** (serverless architecture).
- **Database**: Cloud-based MongoDB Atlas for secure, scalable storage.

## 📈 Future Roadmap

- Real-time device status tracking
- SMS/Email notifications for events
- OTP verification during signup
- Multi-device grouping and scheduling
- Analytics dashboard for admin

## 🧑‍💻 Developed By

This project was developed as a consultancy solution by **[VIJITH S B]** for **ELGON SYSTEMS**.

---


