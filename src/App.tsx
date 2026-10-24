import { useEffect, useMemo, useState } from 'react';
import profileImage from './assets/profile-portrait.svg';

type Project = {
  name: string;
  category: string;
  description: string;
  tech: string[];
  status: 'In Progress' | 'Concept' | 'Active';
  liveLink?: string;
  sourceLink?: string;
};

type Service = {
  title: string;
  description: string;
};

type SkillGroup = {
  title: string;
  items: string[];
};

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const heroWords = ['Web Developer', 'Programmer', 'Creative Problem Solver'];

const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    title: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Responsive Design', 'Debugging'],
  },
];

const aboutHighlights = [
  {
    title: 'Creative engineering',
    text: 'I enjoy turning product ideas into polished digital experiences that feel useful and memorable.',
  },
  {
    title: 'Problem solving',
    text: 'From structure and logic to interface details, I focus on building clear, sustainable solutions.',
  },
  {
    title: 'Continuous learning',
    text: 'I keep exploring modern tools and patterns to sharpen both my technical and design decisions.',
  },
];

const projects: Project[] = [
  {
    name: 'NextSocial',
    category: 'Social',
    description:
      'A social networking project concept focused on modern user experiences and scalable web application development.',
    tech: ['React', 'TypeScript', 'Node.js', 'Tailwind'],
    status: 'In Progress',
    liveLink: undefined,
    sourceLink: 'https://github.com/mortazaakbari01388-beep/MORTAZA-AK',
  },
  {
    name: 'Portfolio Platform',
    category: 'Portfolio',
    description:
      'A personal digital portfolio designed to present work, experience, and technical strengths in a premium format.',
    tech: ['Vite', 'React', 'Tailwind', 'Framer Motion'],
    status: 'Active',
    liveLink: undefined,
    sourceLink: 'https://github.com/mortazaakbari01388-beep/MORTAZA-AK',
  },
];

const services: Service[] = [
  {
    title: 'Web Development',
    description: 'Building modern, responsive web experiences that combine clean UI and usable functionality.',
  },
  {
    title: 'Responsive Website Design',
    description: 'Designing interfaces that adapt elegantly across desktop, tablet, and mobile breakpoints.',
  },
  {
    title: 'Frontend Development',
    description: 'Creating polished frontends with strong accessibility, smooth interactions, and maintainable code.',
  },
  {
    title: 'Backend Development',
    description: 'Implementing API-driven logic, routing, data handling, and robust application structure.',
  },
  {
    title: 'Website Optimization',
    description: 'Improving performance, structure, and usability for a faster and more efficient user experience.',
  },
  {
    title: 'Bug Fixing & Code Improvement',
    description: 'Reviewing and improving existing codebases for stability, clarity, and long-term maintainability.',
  },
];

const codeSnippets = {
  html: `
<section class="hero">
  <div class="hero__content">
    <p class="eyebrow">HELLO, WORLD! 👋</p>
    <h1>Hi, I'm Mortaza Akbari</h1>
    <p>I build modern web experiences with clean code and thoughtful design.</p>
  </div>
</section>
  `.trim(),
  css: `
:root {
  --bg: #070b14;
  --primary: #8b5cf6;
  --secondary: #38bdf8;
}

.hero {
  background: radial-gradient(circle at top, rgba(139, 92, 246, 0.3), transparent 50%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
}
  `.trim(),
  javascript: `
const typedWords = ['Web Developer', 'Programmer', 'Creative Problem Solver'];
let index = 0;
let charIndex = 0;

function typeLoop() {
  const activeWord = typedWords[index % typedWords.length];
  const nextText = activeWord.slice(0, charIndex + 1);
  charIndex++;

  if (charIndex > activeWord.length) {
    charIndex = 0;
    index++;
  }

  return nextText;
}
  `.trim(),
};

const socialLinks = {
  github: 'https://github.com/mortazaakbari01388-beep',
  linkedin: null,
  youtube: null,
  email: null,
};

function App() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [navOpen, setNavOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<keyof typeof codeSnippets>('html');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const tick = () => {
      const word = heroWords[wordIndex % heroWords.length];

      if (!isDeleting && charIndex <= word.length) {
        setTypedText(word.slice(0, charIndex));
        charIndex += 1;

        if (charIndex > word.length) {
          isDeleting = true;
          setTimeout(tick, 1500);
          return;
        }
      }

      if (isDeleting && charIndex >= 0) {
        setTypedText(word.slice(0, charIndex));
        charIndex -= 1;

        if (charIndex < 0) {
          isDeleting = false;
          wordIndex += 1;
        }
      }

      const duration = isDeleting ? 48 : 100;
      setTimeout(tick, duration);
    };

    const timeout = setTimeout(tick, 250);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (scrollTop / total) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippets[activeTab]);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 1500);
    } catch {
      setCopyState('error');
      setTimeout(() => setCopyState('idle'), 1500);
    }
  };

  const validateForm = () => {
    const nextErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      nextErrors.email = 'Please enter your email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = 'Please use a valid email address.';
    }
    if (!formData.subject.trim()) nextErrors.subject = 'Please add a subject.';
    if (!formData.message.trim()) nextErrors.message = 'Please write a message.';

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      setSubmitState('error');
      return;
    }

    setSubmitState('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setFormErrors({});
  };

  const projectFilters = ['All', 'Social', 'Portfolio', 'UI/UX'];

  return (
    <div className="min-h-screen bg-bg text-white selection:bg-primary/50">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-white/90">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-glow">
              MA
            </span>
            Mortaza
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-slate-300 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-medium text-white transition hover:border-primary/70 hover:bg-primary/20 md:inline-flex"
          >
            Let&apos;s Talk
          </a>

          <button
            type="button"
            className="inline-flex rounded-xl border border-white/10 bg-white/5 p-2 md:hidden"
            aria-label="Toggle navigation menu"
            onClick={() => setNavOpen((open) => !open)}
          >
            <span className="sr-only">Toggle menu</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </nav>

        {navOpen && (
          <div className="border-t border-white/10 bg-slate-950/95 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col px-4 py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
                  onClick={() => setNavOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="relative overflow-hidden">
          <div className="intro-grid" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.2),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),_transparent_32%)]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pb-24 lg:pt-20">
            <div>
              <p className="mb-6 inline-flex items-center rounded-full border border-primary/35 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-violet-200">
                HELLO, WORLD! 👋
              </p>

              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
                Hi, I&apos;m Mortaza Akbari
              </h1>

              <div className="mt-5 h-16 text-2xl font-medium text-slate-100 md:text-3xl">
                <span className="bg-gradient-to-r from-violet-300 via-sky-300 to-teal-300 bg-clip-text text-transparent">
                  {typedText}
                </span>
                <span className="ml-1 inline-block h-7 w-[2px] animate-pulse bg-white/80 align-middle" />
              </div>

              <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
                I build modern web experiences, write clean code, and turn creative ideas into functional digital products.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02] hover:shadow-[0_0_42px_rgba(56,189,248,0.35)]"
                >
                  Explore My Projects
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-primary/60 hover:bg-primary/10"
                >
                  Contact Me
                </a>
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-400 opacity-70"
                >
                  Download CV
                </button>
              </div>

              <div className="mt-12 grid max-w-xl gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 glass-panel">
                  <p className="text-lg font-semibold text-white">Modern UI</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">Design-first</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 glass-panel">
                  <p className="text-lg font-semibold text-white">Clean Code</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">Readable</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 glass-panel">
                  <p className="text-lg font-semibold text-white">Scalable</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">Future-ready</p>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute h-96 w-96 rounded-full border border-primary/30 bg-primary/5 blur-2xl" />

              <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-[0_0_90px_rgba(139,92,246,0.18)] backdrop-blur-xl">
                <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-950/70 to-slate-900/80 p-3">
                  <img
                    src={profileImage}
                    alt="Mortaza Akbari"
                    className="h-[520px] w-full object-cover object-center rounded-[1.25rem]"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">About</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">More Than Just Code</h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 text-slate-300">
              <p className="text-lg leading-8">
                I&apos;m passionate about web development, programming, and building useful digital experiences. I enjoy exploring modern technologies, solving technical problems, and continuously improving my skills through practical projects.
              </p>
              <p className="leading-8">
                My approach blends technical precision with product thinking. I care about usability, clarity, performance, and creating digital experiences that feel thoughtful from the first interaction to the final detail.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                {aboutHighlights.map((item) => (
                  <div key={item.title} className="glass-panel rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h3 className="mb-2 text-base font-semibold text-white">{item.title}</h3>
                    <p className="text-sm leading-6 text-slate-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="glass-panel rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Focus</p>
                <h3 className="mt-4 text-2xl font-semibold text-white">Building polished digital products</h3>
                <ul className="mt-5 space-y-3 text-slate-300">
                  <li>• Frontend architecture and interface systems</li>
                  <li>• User-first web experiences</li>
                  <li>• Clean implementation and maintainable code</li>
                </ul>
              </div>
              <div className="glass-panel rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Learning path</p>
                <h3 className="mt-4 text-2xl font-semibold text-white">Growth through practice</h3>
                <ul className="mt-5 space-y-3 text-slate-300">
                  <li>• Exploring modern frameworks and workflows</li>
                  <li>• Improving product thinking and interaction quality</li>
                  <li>• Turning ideas into working, measurable projects</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="bg-slate-950/50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Skills</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-5xl">Skills & Technologies</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {skillGroups.map((group) => (
                <div key={group.title} className="glass-panel rounded-3xl border border-white/10 bg-white/5 p-6">
                  <h3 className="mb-6 text-xl font-semibold text-white">{group.title}</h3>
                  <div className="flex flex-wrap gap-3">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-primary/25 bg-primary/10 px-3 py-2 text-sm text-slate-100 transition hover:border-primary/60 hover:bg-primary/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Work</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-5xl">Featured Projects</h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow'
                      : 'border border-white/10 bg-white/5 text-slate-300 hover:border-primary/50 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {filteredProjects.map((project) => (
              <article
                key={project.name}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-[0_0_50px_rgba(15,23,42,0.8)] transition duration-300 hover:-translate-y-1 hover:border-primary/30"
              >
                <div className="mb-5 rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-400" />
                      <span className="h-3 w-3 rounded-full bg-yellow-400" />
                      <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-violet-200">
                      {project.status}
                    </span>
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/80 p-6 text-slate-300">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Project</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{project.name}</h3>
                    <p className="mt-4 leading-7 text-slate-300">{project.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {project.liveLink ? (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-semibold text-white"
                    >
                      Live Demo
                    </a>
                  ) : (
                    <button type="button" disabled className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-400 opacity-70">
                      Live Demo
                    </button>
                  )}

                  {project.sourceLink ? (
                    <a
                      href={project.sourceLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-primary/45 hover:bg-primary/10"
                    >
                      Source Code
                    </a>
                  ) : (
                    <button type="button" disabled className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-400 opacity-70">
                      Source Code
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="bg-slate-950/50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Services</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-5xl">What I Can Help With</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <article key={service.title} className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-primary/35 hover:bg-white/10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600/30 to-sky-500/30 text-xl shadow-glow">
                    ✦
                  </div>
                  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-4 leading-7 text-slate-300">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Code</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">Inside My Code</h2>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-[0_0_80px_rgba(56,189,248,0.12)]">
            <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-800/80 p-1 text-xs">
                {(['html', 'css', 'javascript'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-3 py-1.5 capitalize ${
                      activeTab === tab ? 'bg-white/10 text-white' : 'text-slate-400'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 transition hover:border-primary/40 hover:bg-primary/10"
              >
                {copyState === 'copied' ? 'Copied' : copyState === 'error' ? 'Failed' : 'Copy Code'}
              </button>
            </div>

            <div className="overflow-x-auto bg-[#0b1120] p-4 font-mono text-sm leading-6 text-slate-200">
              <pre className="min-w-[640px] whitespace-pre-wrap">
                <code>
                  {codeSnippets[activeTab].split('\n').map((line, index) => (
                    <div key={`${activeTab}-${index}`} className="flex gap-4">
                      <span className="w-8 select-none text-right text-slate-500">{index + 1}</span>
                      <span>{line || ' '}</span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Contact</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-5xl">Let&apos;s Build Something Great</h2>
              <p className="mt-5 max-w-lg text-lg leading-8 text-slate-300">
                Have an idea, a project, or an interesting coding challenge? Let&apos;s connect.
              </p>

              <div className="mt-8 space-y-4 text-slate-300">
                {socialLinks.github ? (
                  <a href={socialLinks.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-primary/40 hover:bg-primary/10">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/80 text-lg">G</span>
                    Github
                  </a>
                ) : null}
                {socialLinks.linkedin ? (
                  <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-primary/40 hover:bg-primary/10">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/80 text-lg">in</span>
                    LinkedIn
                  </a>
                ) : null}
                {socialLinks.youtube ? (
                  <a href={socialLinks.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-primary/40 hover:bg-primary/10">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/80 text-lg">▶</span>
                    YouTube
                  </a>
                ) : null}
                {socialLinks.email ? (
                  <a href={`mailto:${socialLinks.email}`} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-primary/40 hover:bg-primary/10">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/80 text-lg">@</span>
                    {socialLinks.email}
                  </a>
                ) : null}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm text-slate-300">Name</label>
                  <input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-primary/60"
                    placeholder="Your name"
                  />
                  {formErrors.name && <p className="mt-2 text-sm text-rose-300">{formErrors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm text-slate-300">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-primary/60"
                    placeholder="you@example.com"
                  />
                  {formErrors.email && <p className="mt-2 text-sm text-rose-300">{formErrors.email}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="subject" className="mb-2 block text-sm text-slate-300">Subject</label>
                <input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-primary/60"
                  placeholder="Project inquiry"
                />
                {formErrors.subject && <p className="mt-2 text-sm text-rose-300">{formErrors.subject}</p>}
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-2 block text-sm text-slate-300">Message</label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-primary/60"
                  placeholder="Tell me about your project or idea"
                />
                {formErrors.message && <p className="mt-2 text-sm text-rose-300">{formErrors.message}</p>}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.01]"
                >
                  Send Message
                </button>

                <div aria-live="polite" className="min-h-6 text-sm">
                  {submitState === 'success' && <span className="text-emerald-300">Form is ready for a backend integration.</span>}
                  {submitState === 'error' && <span className="text-rose-300">Please review the highlighted fields.</span>}
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
          <div>
            <h3 className="text-xl font-semibold text-white">Mortaza Akbari</h3>
            <p className="mt-4 max-w-sm text-slate-300">
              Web Developer & Programmer focused on crafting modern, useful, and technically thoughtful digital experiences.
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Navigation</p>
            <ul className="mt-4 space-y-3 text-slate-300">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Connect</p>
            <ul className="mt-4 space-y-3 text-slate-300">
              {socialLinks.github ? <li><a href={socialLinks.github} target="_blank" rel="noreferrer" className="transition hover:text-white">GitHub</a></li> : null}
              {socialLinks.linkedin ? <li><a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-white">LinkedIn</a></li> : null}
              {socialLinks.youtube ? <li><a href={socialLinks.youtube} target="_blank" rel="noreferrer" className="transition hover:text-white">YouTube</a></li> : null}
              {socialLinks.email ? <li><a href={`mailto:${socialLinks.email}`} className="transition hover:text-white">Email</a></li> : null}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Mortaza Akbari. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
