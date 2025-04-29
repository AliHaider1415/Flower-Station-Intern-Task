# Flower-Station-Intern-Task

# 🌸 Event Reminder System

A full-stack web application where users can set up to **three event reminders** (like birthdays, anniversaries, or custom events) via a modern, responsive interface. On the selected date, an **automated email reminder** will be sent to the specified email address.

---

## 🚀 Features

- 🖥️ Beautiful landing page with a modal form to collect event details  
- ➕ Supports up to **three event reminders per submission**  
- 📁 Reminders are saved in a local JSON file (`reminders.json`)  
- 📧 Sends automated **email reminders** on event dates  
- 🔐 Backend built with **Node.js** and **Express**  
- 💅 Frontend built with **HTML, CSS, JS**, and **Bootstrap**

---

## 🛠️ Tech Stack

- Frontend: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5  
- Backend: Node.js, Express.js  
- Data Storage: JSON File (`reminders.json`)  
- Email Service: `nodemailer` (SMTP setup required)

---

## 📦 Installation

### 1. Clone the Repository

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
```

### 4. Start the Server

```bash
node server.js
node emailScheduler.js
```

Server will run at: [http://localhost:3000](http://localhost:3000)

### 5. Open Frontend

Use the **Live Server extension** (in VS Code or similar) to serve `index.html`.  
Do **not** open the file directly in the browser (`file://` protocol blocks API calls).

---

## 📝 Project Structure

```
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── reminders.json
├── server.js
├── .env
└── README.md
```
