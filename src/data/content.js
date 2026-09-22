// All the text on the site lives here. Every project field except `title`
// and `description` is optional — anything left out is simply not shown.

export const profile = {
  bio: "I like taking systems apart to understand how they work, and where they break. That curiosity shapes how I build: hashed admin logins, rate-limited forms, and databases that refuse duplicate check-ins. I'm studying software engineering at Uncommon.org, and I build with React, Next.js and Supabase.",
  location: "Harare, Zimbabwe",
  availability: "Open to internships, junior roles and freelance work",
};

// Words the hero types out after "I'm ...".
export const heroRoles = [
  "a Software Developer",
  "a React & Next.js Developer",
  "a Security-Minded Builder",
];

export const skillGroups = [
  {
    title: "Frontend",
    items: [
      "JavaScript",
      "React",
      "Vite",
      "HTML & CSS",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "UI/UX design",
    ],
  },
  {
    title: "Backend & data",
    items: ["Supabase (PostgreSQL)", "REST API routes", "Python (learning)"],
  },
  {
    title: "Tools & workflow",
    items: ["Git & GitHub", "Markdown documentation", "MediaPipe", "Groq API", "EmailJS"],
  },
];

// Filter buttons on the Projects section, in display order. A button only
// appears if at least one project uses that category.
export const projectCategories = ["Frontend", "Full-stack", "AI"];

export const projects = [
  {
    title: "OAK Zimbabwe Partner Gathering Platform",
    categories: ["Full-stack", "Frontend"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    role: "Team project — backend, admin authentication and QR check-in",
    description:
      "A registration and attendance platform for the OAK Zimbabwe Partner Gathering: attendees get a QR entry pass, staff check them in by scanning it, and coordinators run the event through role-based access and a live attendance dashboard.",
    live: "https://oak-project-2.vercel.app/",
    note: "Live event site — please don't submit test registrations.",
  },
  {
    title: "Shadow Coach",
    categories: ["AI", "Full-stack"],
    status: "In progress",
    stack: ["React", "MediaPipe", "Groq API"],
    role: "Solo project",
    description:
      "A real-time AI fitness coach that tracks jabs, squats, and slip/duck defense reps through your webcam, with live spoken coaching and an AI-generated workout routine via a Groq-powered backend.",
    repo: "https://github.com/Day-void/ShadowCoach",
  },
  {
    title: "To Do List Application",
    categories: ["Full-stack"],
    stack: ["Python", "JavaScript"],
    role: "Solo class project",
    description:
      "A responsive task management application with Python backend functionality and local storage for persisting tasks.",
    live: "https://to-do-app-qyst.onrender.com/",
  },
];

export const experience = [
  {
    role: "Youth Coding Instructor",
    organisation: "Primary schools in my community",
    detail:
      "Taught coding fundamentals to primary-school learners, travelling from school to school in the community. Broke technical concepts into clear, accessible lessons and supported hands-on practice.",
  },
];

export const education = [
  {
    title: "Software Engineering Bootcamp — Uncommon.org",
    period: "2026 – Present",
    detail:
      "Project-based bootcamp; certificate on completion. Built the OAK Zimbabwe Partner Gathering platform as a team project.",
  },
];

export const contact = {
  email: "maringisanwaday@gmail.com",
  github: "https://github.com/Day-void",
  linkedin: "https://www.linkedin.com/in/day-maringisanwa",
};
