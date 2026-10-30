# 🚀 DevTrack

> A personal command center for developers — track what you're learning, the DSA problems you've solved, and the jobs you've applied to, all in one dashboard.

![Java](https://img.shields.io/badge/Java-17-orange?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1-6DB33F?logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)

---

## 📖 Overview

Preparing for a developer career means juggling many things at once: studying new topics, grinding DSA problems, and applying to companies. **DevTrack** brings all three into a single full-stack app so you can see your progress at a glance.

It is a **React + Vite** single-page app backed by a **Spring Boot REST API** and a **MySQL** database.

## ✨ Features

| Module | What you can do |
|---|---|
| 📊 **Dashboard** | See stats and charts across learning, DSA and job applications in one place |
| 📚 **Learning Tracker** | Add topics with a description, target date and notes; mark them *Not Started / In Progress / Completed* |
| 🧩 **DSA Tracker** | Log problems with platform, topic, difficulty, link, solved date and a *revision* flag |
| 💼 **Job Tracker** | Track applications by company and role through *Applied → Online Test → Interview → Offer / Rejected*, with applied/interview dates and notes |
| ✏️ **Full CRUD** | Create, view, edit and delete entries in every module |
| ⚠️ **Validation & error handling** | DTO validation and a global exception handler on the backend |

**Supported DSA platforms:** LeetCode, CodeChef, HackerRank, GeeksforGeeks, Codeforces
**Supported DSA topics:** Arrays, Strings, Linked List, Stack, Queue, Trees, Graphs, Dynamic Programming, Recursion, Sorting, Searching, Hashing, Greedy, Backtracking

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, React Router, Axios, Recharts, Tailwind CSS, shadcn/ui, Radix UI, Lucide icons |
| **Backend** | Java 17, Spring Boot, Spring Web MVC, Spring Data JPA, Bean Validation, Lombok |
| **Database** | MySQL (Hibernate `ddl-auto=update` creates the tables for you) |
| **Build tools** | Maven (with wrapper), npm |

## 📂 Project Structure

```
DevTrack/
├── devtrack/                      # Spring Boot backend
│   ├── pom.xml
│   └── src/main/java/devtrack/
│       ├── DevtrackApplication.java
│       ├── config/                # CORS configuration
│       ├── controller/            # REST controllers (Problem, Topic, Application, Dashboard)
│       ├── dto/                   # Request/response DTOs
│       ├── entity/                # JPA entities
│       ├── exception/             # Global exception handler, ResourceNotFoundException
│       ├── repository/            # Spring Data JPA repositories
│       └── service/               # Service interfaces + impl/
│   └── src/main/resources/
│       └── application.properties
│
└── frontend/                      # React + Vite frontend
    ├── index.html
    ├── package.json
    └── src/
        ├── App.jsx                # Routes
        ├── layouts/               # MainLayout (Navbar + Sidebar)
        ├── pages/                 # Dashboard, LearningPage, DsaTrackerPage, JobTrackerPage
        ├── components/            # Forms, tables, charts, cards, shadcn UI primitives
        ├── services/              # Axios API wrappers
        ├── hooks/                 # useFetch
        └── utils/                 # Constants (statuses, difficulties, platforms, topics)
```

## ✅ Prerequisites

Make sure you have installed:

- **Java 17+**
- **Node.js 18+** and **npm**
- **MySQL 8+** running locally
- **Git**

(Maven is optional — the project ships with the Maven wrapper `mvnw`.)

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/vulture02/DevTrack.git
cd DevTrack
```

### 2. Set up the database

Create an empty MySQL database:

```sql
CREATE DATABASE devtrack_db;
```

Tables are created automatically on first run.

### 3. Configure the backend

Open `devtrack/src/main/resources/application.properties` and set your own MySQL credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/devtrack_db
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
server.port=8080
```

> ⚠️ Don't commit real passwords. Consider using environment variables, e.g. `spring.datasource.password=${DB_PASSWORD}`.

### 4. Run the backend

```bash
cd devtrack
./mvnw spring-boot:run        # macOS / Linux
mvnw.cmd spring-boot:run      # Windows
```

The API starts at **http://localhost:8080**.

### 5. Run the frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app opens at **http://localhost:5173**.

> The frontend calls the API at `http://localhost:8080/api` (see `frontend/src/services/api.js`), and the backend only allows CORS from `http://localhost:5173` (see `CorsConfig.java`). Update both if you change ports or deploy.

## 🔌 API Reference

Base URL: `http://localhost:8080/api`

### DSA Problems — `/problems`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/problems` | List all problems |
| POST | `/problems` | Add a problem |
| PUT | `/problems/{id}` | Update a problem |
| DELETE | `/problems/{id}` | Delete a problem |

### Learning Topics — `/topic`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/topic` | List all topics |
| GET | `/topic/{id}` | Get one topic |
| POST | `/topic` | Add a topic |
| PUT | `/topic/{id}` | Update a topic |
| DELETE | `/topic/{id}` | Delete a topic |

### Job Applications — `/applications`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/applications` | List all applications |
| POST | `/applications` | Add an application |
| PUT | `/applications/{id}` | Update an application |
| DELETE | `/applications/{id}` | Delete an application |

### Dashboard — `/dashboard`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/dashboard/stats` | Aggregated counts for topics, problems and applications |

**Example response of `/dashboard/stats`:**

```json
{
  "totalTopics": 12,
  "completedTopics": 5,
  "inProgressTopics": 4,
  "notStartedTopics": 3,
  "totalProblems": 80,
  "easyProblems": 35,
  "mediumProblems": 35,
  "hardProblems": 10,
  "totalApplications": 20,
  "appliedCount": 10,
  "interviewCount": 5,
  "offerCount": 2,
  "rejectedCount": 3
}
```

## 🗄️ Data Model

**Problem** — `id`, `title`, `platform`, `topic`, `difficulty` (Easy/Medium/Hard), `problemLink`, `revisionStatus`, `solvedDate`

**LearningTopic** — `id`, `title`, `description`, `status` (Not Started/In Progress/Completed), `targetDate`, `notes`

**Application** — `id`, `company`, `role`, `status` (Applied/Online Test/Interview/Offer/Rejected), `appliedDate`, `interviewDate`, `notes`

## 🧭 Frontend Routes

| Route | Page |
|---|---|
| `/dashboard` | Overview stats and charts (default) |
| `/learning` | Learning topic tracker |
| `/dsa` | DSA problem tracker |
| `/jobs` | Job application tracker |

## 🏗️ Build for Production

```bash
# Backend — produces a runnable JAR in devtrack/target/
cd devtrack
./mvnw clean package

# Frontend — produces static files in frontend/dist/
cd frontend
npm run build
```

## 🗺️ Roadmap Ideas

- [ ] User authentication (login / signup)
- [ ] Search, sort and pagination
- [ ] Streaks and activity heatmap
- [ ] Revision reminders for flagged problems
- [ ] Docker Compose setup for one-command start
- [ ] Deployment guide (backend + frontend + hosted MySQL)

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request


**vulture02** — [GitHub](https://github.com/vulture02)
