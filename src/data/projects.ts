import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "smart-attendance",
    title: "Smart Attendance System",
    category: "Web Application · QR System · Dashboard",
    type: "College Team Project",
    short:
      "A QR-based attendance management system that helps teachers mark attendance quickly, reduce proxy attendance, and maintain organized digital records.",
    features: [
      "Time-bound QR codes that automatically expire",
      "Teacher dashboard for managing classes and attendance",
      "Secure attendance storage in SQLite",
      "Duplicate attendance prevention",
      "CSV export for attendance reports",
    ],
    stack: ["Python", "Flask", "SQLite", "HTML", "CSS", "JavaScript", "QR Code"],
    caseStudy:
      "Manual attendance is time-consuming, prone to proxy marking, and difficult to manage. Smart Attendance System solves this by generating a time-limited QR code for each class session. Students scan the QR to mark attendance, while teachers monitor records through a web dashboard and export reports as CSV files.",
    github: "https://github.com/salonichouhan13/Minor_project_5thsem",
    gradient: "from-amber-700/40 via-orange-900/30 to-stone-700/20",
  },
  {
    slug: "expense-tracker",
    title: "Expense Tracker",
    category: "Web Application · Personal Finance",
    type: "Personal Project",
    short:
      "A clean and simple web application that helps users record daily expenses, track spending habits, and view clear expense summaries.",
    features: [
      "Add and manage daily expenses",
      "Track spending by category and date",
      "View expense summaries",
      "Simple, responsive user interface",
      "Component-based React architecture",
    ],
    stack: ["React.js", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
    caseStudy:
      "Managing daily expenses manually can be confusing and inconsistent. Expense Tracker provides a simple digital solution where users can add expenses, monitor spending, and view summaries to understand where their money goes.",
    gradient: "from-yellow-700/30 via-amber-800/25 to-stone-700/20",
  },
  {
    slug: "college-bus-tracking",
    title: "Smart College Bus Tracking & Management System",
    category: "Web Application · Management System",
    type: "College Project",
    short:
      "A web-based platform for managing college transportation, including bus routes, schedules, driver details, student information, notifications, and complaints.",
    features: [
      "Separate Student, Driver, and Admin logins",
      "Bus route and timing management",
      "Notifications for schedule updates",
      "Bus and driver management dashboard",
      "Student complaint submission system",
    ],
    stack: ["Python", "Flask", "PostgreSQL", "HTML", "CSS", "JavaScript"],
    caseStudy:
      "College transportation often suffers from unclear schedules, route confusion, and poor communication during sudden changes. This system centralizes bus routes, timings, driver details, notifications, and complaints in one web-based platform, making transportation management easier for students, drivers, and administrators.",
    gradient: "from-orange-700/35 via-red-900/25 to-stone-700/20",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
