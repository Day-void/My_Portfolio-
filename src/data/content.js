export const profile = {
  bio: "Give me a working system and I'll spend the afternoon trying to break it — that's usually how I end up understanding how it actually works. It's why my projects lean toward hashed logins, rate-limited forms, and databases that quietly refuse to be fooled twice. Outside of code, I teach programming to primary-school kids in my community, which has a way of forcing you to actually understand what you're explaining. Right now I'm studying software engineering at Uncommon.org and building with React, Next.js and Supabase.",
  location: "Harare, Zimbabwe",
  availability: "Open to internships, junior roles and freelance work",
};

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
    items: ["Git & GitHub", "Markdown documentation", "MediaPipe", "Groq API", "Resend"],
  },
];

export const projectCategories = ["Frontend", "Full-stack", "AI", "Martial arts"];

export const projects = [
  {
    title: "OAK Zimbabwe Partner Gathering Platform",
    categories: ["Full-stack", "Frontend"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    role: "Team project — backend, admin authentication and QR check-in",
    description:
      "A registration and attendance platform for the OAK Zimbabwe Partner Gathering: attendees get a QR entry pass, staff check them in by scanning it, and coordinators run the event through role-based access and a live attendance dashboard.",
    image: "/Logo-Oak-Foundation.svg (1) 1 (2).svg",
    imageAlt: "OAK Foundation logo",
    live: "https://oak-project-2.vercel.app/",
    note: "Live event site — please don't submit test registrations.",
  },
  {
    title: "Shadow Coach",
    categories: ["AI", "Full-stack", "Martial arts"],
    status: "Live",
    stack: ["React", "MediaPipe", "Groq API"],
    role: "Solo project",
    description:
      "A real-time AI fitness coach that tracks jabs, squats, and slip/duck defense reps through your webcam, with live spoken coaching and an AI-generated workout routine via a Groq-powered backend.",
    live: "https://apex-vert-ten.vercel.app/",
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
  {
    title: "Weather App",
    categories: ["Frontend"],
    status: "Live",
    description: "A weather application for checking current conditions and forecasts.",
    live: "https://weatherapp-xi-plum-53.vercel.app/",
  },
  {
    title: "Quizmaster",
    categories: ["Frontend"],
    status: "Live",
    description: "An interactive quiz application for answering questions and testing your knowledge.",
    live: "https://quizmaster-taupe.vercel.app/",
  },
  {
    title: "Password Generator",
    categories: ["Frontend"],
    status: "Live",
    description: "A tool for generating passwords.",
    live: "https://passwordgenerator-nine-rho.vercel.app/",
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
  whatsapp: `https://wa.me/263778733749?text=${encodeURIComponent("Hi Day, I came across your portfolio and would like to connect.")}`,
};
