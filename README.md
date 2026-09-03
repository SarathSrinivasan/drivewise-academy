# DriveWise Academy

A modern, premium driving school management platform built with React and Vite. DriveWise Academy combines a polished public-facing driving school website with dedicated student and administrator dashboards for course discovery, instructor management, bookings, payments, schedules, enquiries, fleet management, and analytics.

## ✨ Highlights

- Premium, responsive driving school website
- Public pages for Home, About, Courses, Instructors, Pricing, and Contact
- Student authentication and role-based access
- Student dashboard with:
  - Profile management
  - Profile photo upload
  - Course browsing
  - Class booking
  - Upcoming and completed bookings
  - Payment status
  - Course progress
  - Cancel/reschedule actions
- Admin dashboard with:
  - Student management
  - Instructor management
  - Course management
  - Booking management
  - Payment overview
  - Schedule management
  - Fleet management
  - Enquiry management
  - Analytics
  - Settings
- Booking → payment flow
- Pay Now action for pending payments
- Dark / light theme
- RTL / LTR direction toggle
- Responsive layouts for mobile, tablet, and desktop
- Professional icons and animations
- Google Maps contact section
- Local demo authentication for frontend demonstration
- Axios API layer ready for backend integration

## 🛠️ Technology Stack

- React
- Vite
- React Router v6
- Axios
- Tailwind CSS
- Framer Motion
- Lucide React
- JavaScript / JSX
- Local Storage for demo authentication and frontend state persistence

## 📁 Project Structure

```text
drivewise-frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── api/
│   │   └── axiosInstance.js
│   ├── components/
│   │   ├── DirectionToggle.jsx
│   │   ├── PublicLayout.jsx
│   │   └── ThemeToggle.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── AuthExtraPages.jsx
│   │   ├── BookingPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── InfoPages.jsx
│   │   ├── LoginPage.jsx
│   │   ├── PaymentPage.jsx
│   │   └── UserDashboard.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

Install:

- Node.js
- npm
- Git

Check your versions:

```bash
node --version
npm --version
git --version
```

### 1. Clone the repository

```bash
git clone https://github.com/SarathSrinivasan/drivewise-academy.git
```

### 2. Open the project

```bash
cd drivewise-academy
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Vite will display the local development URL in the terminal, normally:

```text
http://localhost:5173
```

### 5. Create a production build

```bash
npm run build
```

The production files will be generated in:

```text
dist/
```

### 6. Preview the production build

```bash
npm run preview
```

## 🔐 Authentication

The frontend includes role-aware authentication for demonstration and development. Login and registration screens intentionally do not display account credentials in the public UI. In production, connect these flows to secure server-side authentication and authorization.

## 🌐 Application Routes

### Public

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About Us |
| `/courses` | Driving Courses |
| `/instructors` | Instructors |
| `/pricing` | Pricing |
| `/contact` | Contact |

### Authentication

| Route | Page |
|---|---|
| `/login` | Login |
| `/signup` | Registration |
| `/forgot-password` | Forgot Password |

### Student

| Route | Page |
|---|---|
| `/book` | Book a Driving Class |
| `/payment` | Payment |
| `/dashboard` | Student Dashboard |

### Admin

| Route | Page |
|---|---|
| `/admin` | Admin Dashboard |

## 👨‍🎓 Student Dashboard

Students can access a dedicated dashboard containing:

- Student profile
- Profile editing
- Profile image upload
- Course discovery
- Driving class booking
- Instructor and time selection
- Upcoming bookings
- Completed bookings
- Payment status
- Payment action
- Course progress
- Cancellation/rescheduling controls
- Account updates

The student profile card in the sidebar can be clicked to open the profile area.

## 🧑‍💼 Admin Dashboard

The administrator interface provides management tools for the driving school.

### Students

- Search students
- Add students
- Edit student information
- Delete students

### Instructors

- Add instructors
- Edit instructors
- Delete instructors
- Manage instructor information

### Courses

- Add courses
- Edit courses
- Manage course information

### Bookings

- View bookings
- Search/filter booking information
- Manage booking status

### Payments

- Review payment information
- Monitor pending/completed payment status

### Schedules

- Create driving slots
- Manage availability
- Toggle slot availability
- Delete schedules

### Fleet

- Add vehicles
- Delete vehicles
- View fleet status

### Enquiries

- Open enquiries
- Email students
- Call students
- Mark enquiries as resolved

### Analytics

Provides an overview of operational KPIs and dashboard statistics.

### Settings

Provides the interface for application-level administration settings.

## 💳 Booking & Payment Flow

The frontend includes a complete demonstration flow:

```text
Browse Courses
      ↓
Select Course
      ↓
Select Instructor
      ↓
Select Date & Time
      ↓
Enter Student Details
      ↓
Proceed to Payment
      ↓
Payment Page
      ↓
Payment Confirmation
      ↓
Receipt / Payment Status
```

Pending student payments expose a highlighted **Pay Now** action from the student dashboard.

## 🎨 UI & UX

DriveWise Academy uses a premium visual system designed for a modern driving academy.

### Visual direction

- Deep navy / slate foundation
- Champagne-gold accents
- Glassmorphism surfaces
- Soft borders and shadows
- Professional dashboard cards
- Responsive navigation
- Medium, readable typography
- Subtle Framer Motion transitions
- Lucide iconography
- Image-based hero sections
- Professional favicon and branding

### Theme

Users can switch between:

- Dark mode
- Light mode

### Direction

Users can switch between:

- LTR
- RTL

The direction preference is persisted locally.

## 🗺️ Contact & Location

The Contact page includes a Google Maps embedded location section and an option to open the location in Maps.

## 🔌 API Integration

Axios is configured through:

```text
src/api/axiosInstance.js
```

The current frontend is designed so a real backend API can be connected later.

Before production deployment, configure the API base URL for your deployed backend instead of relying on the local development endpoint.

## ⚠️ Production Considerations

This repository is a frontend demonstration/application foundation. Before production use, implement and verify:

- Real backend authentication
- Secure password handling
- Server-side role authorization
- Real database persistence
- Production payment gateway
- Server-side booking validation
- Real instructor availability
- Secure API authentication
- Environment variables for secrets
- Server-side input validation
- Error monitoring
- Rate limiting
- HTTPS
- Production CORS configuration
- Secure file/image upload handling

Never place private API keys, payment secrets, database credentials, or other sensitive values directly in frontend source code.

## 📦 Build

Run:

```bash
npm run build
```

Then deploy the generated `dist` directory using your preferred static hosting provider.

## 🚢 Git Workflow

After making changes:

```bash
git status
git add .
git commit -m "Describe your changes"
git push
```

The repository is available at:

https://github.com/SarathSrinivasan/drivewise-academy

## 🔄 Updating the Project

Pull the latest GitHub changes:

```bash
git pull origin main
```

Install dependencies when `package.json` changes:

```bash
npm install
```

Start development:

```bash
npm run dev
```

## 🖼️ Screenshots

Add project screenshots here when available.

Example:

```markdown
![DriveWise Home](screenshots/home.png)
![Student Dashboard](screenshots/student-dashboard.png)
![Admin Dashboard](screenshots/admin-dashboard.png)
```

## 🧭 Future Enhancements

Potential next-stage improvements include:

- Real backend integration
- PostgreSQL/MySQL database
- JWT or secure session authentication
- Real payment gateway integration
- Email/SMS notifications
- Instructor mobile experience
- Calendar synchronization
- Online theory lessons
- Driving test scheduling
- Certificate generation
- Advanced analytics
- Audit logs
- Multi-branch driving school support
- Cloud image storage

## 📄 License

This project is currently intended as a custom DriveWise Academy application/frontend.

Add your preferred commercial or open-source license before distributing the project publicly.

---

## 👤 Project

**DriveWise Academy**

Modern driving school website and management dashboard.

**Repository:**  
https://github.com/SarathSrinivasan/drivewise-academy
