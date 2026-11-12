import { useEffect, useRef, useState } from 'react'
import {
  profile,
  hero,
  about,
  focusAreas,
  tools,
  process,
  projects,
  experience,
} from './data'
import './App.css'

const YEAR = new Date().getFullYear()
const NAV = ['about', 'expertise', 'process', 'work', 'experience', 'contact']
const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------- helpers ---------- */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (REDUCED) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Spotlight() {
  const ref = useRef(null)
  useEffect(() => {
    if (REDUCED || window.matchMedia('(hover: none)').matches) return
    const onMove = (e) => {
      ref.current?.style.setProperty('--mx', `${e.clientX}px`)
      ref.current?.style.setProperty('--my', `${e.clientY}px`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  return <div ref={ref} className="spotlight" aria-hidden="true" />
}

function Particles() {
  const ref = useRef(null)
  useEffect(() => {
    if (REDUCED) return
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf
    let w, h
    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.0004,
      vy: -(Math.random() * 0.0005 + 0.0002),
      a: Math.random() * 0.5 + 0.2,
    }))
    const resize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio
      h = canvas.height = canvas.offsetHeight * devicePixelRatio
    }
    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const d of dots) {
        d.x += d.vx
        d.y += d.vy
        if (d.y < -0.02) {
          d.y = 1.02
          d.x = Math.random()
        }
        if (d.x < -0.02) d.x = 1.02
        if (d.x > 1.02) d.x = -0.02
        ctx.beginPath()
        ctx.arc(d.x * w, d.y * h, d.r * devicePixelRatio, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(167, 139, 250, ${d.a})`
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    resize()
    tick()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])
  return <canvas ref={ref} className="particles" aria-hidden="true" />
}

function Words({ text, delay = 0 }) {
  return text.split(' ').map((w, i) => (
    <span key={i} className="word" style={{ '--i': i, '--d': `${delay}ms` }}>
      {w}&nbsp;
    </span>
  ))
}

/* ---------- header ---------- */

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#top" className="logo" onClick={() => setOpen(false)}>
          <span className="logo__mark">{profile.initials}</span>
          <span className="logo__name">{profile.name}</span>
        </a>
        <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="Main">
          {NAV.map((id) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {id[0].toUpperCase() + id.slice(1)}
            </a>
          ))}
          <a href="#contact" className="btn btn--small nav__cta" onClick={() => setOpen(false)}>
            Let's Talk
          </a>
        </nav>
        <button
          className="menu-btn"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`burger ${open ? 'burger--open' : ''}`} />
        </button>
      </div>
    </header>
  )
}

/* ---------- QA dashboard animation ---------- */

const CHECKS = [
  { id: 'exec', label: 'Test Execution' },
  { id: 'func', label: 'Functional Tests' },
  { id: 'bug', label: 'Bug Detection' },
  { id: 'reg', label: 'Regression Testing' },
  { id: 'qual', label: 'Quality Status' },
]

// Each frame: statuses for the 5 rows + which test cases are done + bug count.
const FRAMES = [
  { exec: 'running', func: 'pending', bug: 'pending', reg: 'pending', qual: 'pending', cases: 0, bugs: 0 },
  { exec: 'running', func: 'running', bug: 'pending', reg: 'pending', qual: 'pending', cases: 1, bugs: 0 },
  { exec: 'running', func: 'passed', bug: 'running', reg: 'pending', qual: 'pending', cases: 2, bugs: 1 },
  { exec: 'running', func: 'passed', bug: 'failed', reg: 'pending', qual: 'pending', cases: 3, bugs: 3 },
  { exec: 'running', func: 'passed', bug: 'failed', reg: 'running', qual: 'pending', cases: 4, bugs: 3 },
  { exec: 'passed', func: 'passed', bug: 'failed', reg: 'passed', qual: 'running', cases: 5, bugs: 3 },
  { exec: 'passed', func: 'passed', bug: 'failed', reg: 'passed', qual: 'verified', cases: 5, bugs: 3 },
]

const STATUS_TEXT = {
  pending: 'Pending',
  running: 'Running',
  passed: 'Passed',
  failed: '3 Issues Found',
  verified: 'Verified',
}

const CASES = [
  'TC-101 Login with valid credentials',
  'TC-114 Checkout total matches cart',
  'TC-127 Date picker rejects past dates',
  'TC-133 API returns 401 without token',
  'TC-140 Report export opens in Excel',
]

function QADashboard() {
  const [i, setI] = useState(REDUCED ? FRAMES.length - 1 : 0)
  useEffect(() => {
    if (REDUCED) return
    const t = setInterval(() => setI((n) => (n + 1) % FRAMES.length), 1700)
    return () => clearInterval(t)
  }, [])
  const f = FRAMES[i]
  const progress = Math.round((f.cases / CASES.length) * 100)
  return (
    <div className="dash glass" aria-label="Illustrative QA testing dashboard">
      <div className="dash__bar">
        <span /><span /><span />
        <em>qa-run · build #{248 + (i % 2)}</em>
        <small>illustrative</small>
      </div>
      <div className="dash__body">
        <div className="dash__col">
          <h4>Test Run</h4>
          <ul className="dash__checks">
            {CHECKS.map((c) => (
              <li key={c.id} data-status={f[c.id]}>
                <span className="dash__dot" />
                <span className="dash__label">{c.label}</span>
                <span className="dash__status">{STATUS_TEXT[f[c.id]]}</span>
              </li>
            ))}
          </ul>
          <div className="dash__progress">
            <div style={{ width: `${progress}%` }} />
          </div>
          <div className="dash__meta">
            <span>{f.cases}/{CASES.length} cases</span>
            <span className={f.bugs ? 'is-bad' : ''}>{f.bugs} bugs</span>
            <span>{progress}%</span>
          </div>
        </div>
        <div className="dash__col">
          <h4>Test Cases</h4>
          <ul className="dash__cases">
            {CASES.map((c, idx) => {
              const done = idx < f.cases
              const isBug = idx === 2 && f.bugs >= 1
              return (
                <li key={c} data-state={isBug ? 'failed' : done ? 'passed' : idx === f.cases ? 'running' : 'pending'}>
                  <span className="dash__tick" />
                  <span>{c}</span>
                </li>
              )
            })}
          </ul>
          <div className={`bugcard ${f.bugs >= 1 ? 'bugcard--show' : ''}`}>
            <div className="bugcard__head">
              <span className="bugcard__id">BUG-2041</span>
              <span className="bugcard__sev">High</span>
            </div>
            <p>Past dates accepted in delivery date picker</p>
            <small>Steps · Expected · Actual · Screenshot attached</small>
          </div>
        </div>
      </div>
      <div className={`dash__seal ${f.qual === 'verified' ? 'dash__seal--show' : ''}`}>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Quality Verified
      </div>
    </div>
  )
}

/* ---------- sections ---------- */

function Hero() {
  return (
    <section className="hero" id="top">
      <Particles />
      <div className="hero__glow hero__glow--a" aria-hidden="true" />
      <div className="hero__glow hero__glow--b" aria-hidden="true" />
      <div className="float float--1 glass" aria-hidden="true">
        <span className="pill pill--fail">FAILED</span> TC-127 · date validation
      </div>
      <div className="float float--2 glass" aria-hidden="true">
        <span className="pill pill--pass">PASSED</span> 48 / 48 regression
      </div>
      <div className="float float--3 glass" aria-hidden="true">
        <span className="pill pill--bug">BUG</span> Severity: High · Reproducible
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          {profile.available && (
            <span className="status">
              <span className="status__dot" /> {hero.status}
            </span>
          )}
          <h1 className="hero__title">
            <Words text={hero.headline} delay={200} />
          </h1>
          <p className="hero__sub">
            <Words text={hero.subheading} delay={900} />
          </p>
          <p className="hero__text">{hero.text}</p>
          <div className="hero__cta">
            <a href="#work" className="btn btn--primary">Explore My Work</a>
            <a href="#contact" className="btn btn--ghost">Let's Talk</a>
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} className="btn btn--ghost" download>Download Resume</a>
            )}
          </div>
        </div>
        <div className="hero__dash">
          <QADashboard />
        </div>
      </div>
      <a href="#about" className="scroll-hint" aria-label="Scroll down">
        <span />
      </a>
    </section>
  )
}

function Ticker() {
  const items = [...focusAreas.map((f) => f.name), ...tools]
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {[...items, ...items].map((t, i) => (
          <span key={i}>{t}<i>✦</i></span>
        ))}
      </div>
    </div>
  )
}

function Section({ id, kicker, title, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="container">
        <div className="section__head" data-reveal>
          <p className="kicker">{kicker}</p>
          <h2>{title}</h2>
        </div>
        {children}
      </div>
    </section>
  )
}

function About() {
  return (
    <Section id="about" kicker="About" title={about.headline}>
      <div className="about">
        <div className="about__text" data-reveal>
          <blockquote className="quote">{profile.positioning}</blockquote>
          {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          <p className="muted">📍 {profile.location}</p>
        </div>
        <div className="about__cards">
          {about.principles.map((p, i) => (
            <div key={p.title} className="glass card" data-reveal style={{ '--delay': `${i * 120}ms` }}>
              <span className="card__num">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Expertise() {
  return (
    <Section id="expertise" kicker="Expertise" title="What I test, and how deep I go.">
      <div className="grid grid--4">
        {focusAreas.map((f, i) => (
          <div key={f.name} className="glass card card--tilt" data-reveal style={{ '--delay': `${(i % 4) * 90}ms` }}>
            <span className="card__icon" />
            <h3>{f.name}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
      <div className="tools" data-reveal>
        <span className="tools__label">Tools & tech</span>
        <ul className="chips">
          {tools.map((t) => <li key={t} className="chip">{t}</li>)}
        </ul>
      </div>
    </Section>
  )
}

function Process() {
  return (
    <Section id="process" kicker="Process" title="How I turn requirements into verified quality.">
      <ol className="process">
        {process.map((p, i) => (
          <li key={p.step} className="process__item" data-reveal style={{ '--delay': `${i * 100}ms` }}>
            <span className="process__step">{p.step}</span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function Work() {
  return (
    <Section id="work" kicker="Selected Work" title="Projects I've helped ship with confidence.">
      <div className="grid work-grid">
        {projects.map((p, i) => (
          <article key={p.title} className="glass card project card--tilt" data-reveal style={{ '--delay': `${(i % 2) * 100}ms` }}>
            {p.image && (
              <div className="project__media">
                <img src={p.image} alt="" loading="lazy" width="1200" height="750" />
              </div>
            )}
            <div className="project__top">
              <span className="project__domain">{p.domain}</span>
              <span className="pill pill--pass">{p.platform || 'QA'}</span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <ul className="chips chips--small">
              {p.tags.map((t) => <li key={t} className="chip">{t}</li>)}
            </ul>
            {p.link && (
              <a className="project__link" href={p.link} target="_blank" rel="noreferrer">View project →</a>
            )}
          </article>
        ))}
      </div>
    </Section>
  )
}

function Experience() {
  return (
    <Section id="experience" kicker="Experience" title="Where I've put quality to work.">
      <ol className="timeline">
        {experience.map((job) => (
          <li key={job.role + job.company} className="timeline__item" data-reveal>
            <div className="timeline__head">
              <h3>{job.role} <span className="muted">· {job.company}</span></h3>
              <span className="timeline__period">
                {job.period}
                {job.type && <span className="timeline__type">{job.type}</span>}
              </span>
            </div>
            <ul>
              {job.points.map((pt) => <li key={pt}>{pt}</li>)}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  // Opens the visitor's email app with the message pre-filled.
  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }
  return (
    <Section id="contact" kicker="Contact" title="Let's make your next release the most reliable one yet.">
      <div className="contact">
        <div data-reveal>
          <p className="contact__lead">
            Hiring a QA engineer, or need someone to break your product before your users do? Reach me by email or on LinkedIn and I'll reply quickly.
          </p>
          <a className="contact__email" href={`mailto:${profile.email}`}>{profile.email}</a>
          <ul className="socials">
            {profile.socials.map((s) => (
              <li key={s.label}><a href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a></li>
            ))}
          </ul>
          {profile.resumeUrl && (
            <a className="btn btn--ghost" href={profile.resumeUrl} download>Download Resume</a>
          )}
        </div>
        <form className="glass card form" onSubmit={submit} data-reveal>
          <label>Name<input name="name" value={form.name} onChange={update} required /></label>
          <label>Email<input type="email" name="email" value={form.email} onChange={update} required /></label>
          <label>Message<textarea name="message" rows="5" value={form.message} onChange={update} required /></label>
          <button className="btn btn--primary" type="submit">Send message</button>
        </form>
      </div>
    </Section>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <Spotlight />
      <Header />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Expertise />
        <Process />
        <Work />
        <Experience />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer__inner">
          <span>© {YEAR} {profile.name}</span>
          <span className="muted">{profile.role}</span>
        </div>
      </footer>
    </>
  )
}
