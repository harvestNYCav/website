"use client";

import { useState } from "react";
import Link from "next/link";

type Language = "en" | "es";

const translations = {
  aboutUs: { en: "ABOUT US", es: "ACERCA DE NOSOTROS" },
  aboutUsShort: { en: "ABOUT", es: "ACERCA" },
  ministries: { en: "MINISTRIES", es: "MINISTERIOS" },
  connect: { en: "CONNECT", es: "CONECTAR" },
  vineTutoring: { en: "VINE TUTORING", es: "VINE TUTORÍA" },
  children: { en: "CHILDREN", es: "NIÑOS" },
  pageTitle: { en: "CHILDREN'S MINISTRY", es: "MINISTERIO DE NIÑOS" },
  intro: {
    en: "A loving space where children encounter Jesus and grow in their faith through engaging activities and Bible teaching.",
    es: "Un espacio amoroso donde los niños encuentran a Jesús y crecen en su fe a través de actividades atractivas y enseñanza bíblica.",
  },
  whenWeMeet: { en: "WHEN WE MEET", es: "CUANDO NOS REUNIMOS" },
  youthHeading: { en: "Youth", es: "Jóvenes" },
  youthDesc: {
    en: "A blurb about youth ministry, age range, brief idea of what/when blah blah blah blah xyz",
    es: "Un párrafo sobre el ministerio juvenil, rango de edad, breve idea de qué/cuándo blah blah blah blah xyz",
  },
  toddlersHeading: { en: "Toddlers", es: "Niños pequeños" },
  toddlersDesc: {
    en: "A blurb about toddler ministry, age range, brief idea of what/when blah blah blah blah xyz",
    es: "Un párrafo sobre el ministerio para niños pequeños, rango de edad, breve idea de qué/cuándo blah blah blah blah xyz",
  },
  interestedBtn: { en: "INTERESTED?", es: "¿INTERESADO?" },
  upcomingEvents: { en: "UPCOMING EVENTS?", es: "¿PRÓXIMOS EVENTOS?" },
  vineMusicStudio: { en: "VINE MUSIC STUDIO", es: "VINE MÚSICA ESTUDIO" },
  vineMusicDesc: {
    en: "A tutoring program serving the local & migrant communities, at no cost. The goal is to help students develop academic success, English language skills, etc.",
    es: "Un programa de tutoría que sirve a las comunidades locales y migrantes, sin costo. El objetivo es ayudar a los estudiantes a lograr éxito académico, habilidades del idioma inglés, etc.",
  },
  vineTutoringEvent: { en: "VINE TUTORING", es: "VINE TUTORÍA" },
  vineTutoringEventDesc: {
    en: "A loving space where children encounter Jesus & grow in their faith through engaging activities and Bible teaching.",
    es: "Un espacio amoroso donde los niños encuentran a Jesús y crecen en su fe a través de actividades atractivas y enseñanza bíblica.",
  },
  learnMore: { en: "LEARN MORE", es: "APRENDE MÁS" },
  getInvolved: { en: "GET INVOLVED", es: "INVOLÚCRATE" },
  reachOut: { en: "For more information, please reach out below:", es: "Para más información, comuníquese con nosotros:" },
  erika: { en: "Erika:", es: "Erika:" },
  erikaEmail: { en: "email@gmail.com", es: "email@gmail.com" },
  whoeverElse: { en: "Whoever else:", es: "Quien más:" },
  whoeverElseEmail: { en: "email@gmail.com", es: "email@gmail.com" },
  harvestNyc: { en: "HARVEST NYC", es: "HARVEST NYC" },
};

export default function ChildrenPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [contactOpen, setContactOpen] = useState(false);

  const t = (key: keyof typeof translations): string => translations[key][language];

  return (
    <>
      {/* Navigation */}
      <nav className="site-nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            HARVEST<br />NYC
          </Link>
          <div className="nav-links">
            <Link href="/about" className="nav-link nav-link-about" id="menu">
              <span className="nav-link-full">{t("aboutUs")}</span>
              <span className="nav-link-short">{t("aboutUsShort")}</span>
            </Link>
            <div className="nav-dropdown">
              <button className="nav-link nav-dropdown-trigger" id="menu">
                {t("ministries")}
              </button>
              <div id="menu-dropdown" className="nav-dropdown-menu">
                <Link href="/vine" className="nav-dropdown-item">{t("vineTutoring")}</Link>
                <Link href="/children" className="nav-dropdown-item">{t("children")}</Link>
              </div>
            </div>
            <Link href="/connect" className="nav-link nav-link--active" id="menu">{t("connect")}</Link>
          </div>
          <button
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            className="lang-btn"
          >
            {language === "en" ? "ESPAÑOL" : "ENGLISH"}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero-wrapper">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/9a02063c94458362b75b23aa57ac1d1b5ac7c939?width=2926"
          alt="Children's Ministry"
          className="hero-img"
          draggable="false"
        />
        <div className="hero-overlay">
          <h1 className="hero-title">{t("pageTitle")}</h1>
        </div>
      </div>

      {/* Intro */}
      <section className="intro-section">
        <p className="intro-text">{t("intro")}</p>
      </section>

      {/* Group Photo */}
      <div className="children-group-photo-wrapper">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/5e00ce062568973718bf6485dd6810e3913e2ebd?width=2944"
          alt="Children's Ministry group"
          className="children-group-photo"
          draggable="false"
        />
      </div>

      {/* When We Meet */}
      <section className="children-when-section">
        <h2 className="when-we-meet-title">{t("whenWeMeet")}</h2>
        <div className="children-age-groups">
          <p className="children-age-text">
            <span className="children-age-heading">{t("youthHeading")}</span>
            <br />
            {t("youthDesc")}
          </p>
          <p className="children-age-text">
            <span className="children-age-heading">{t("toddlersHeading")}</span>
            <br />
            {t("toddlersDesc")}
          </p>
        </div>
        <button className="children-interested-btn">{t("interestedBtn")}</button>
      </section>

      {/* Upcoming Events */}
      <section className="children-events-section">
        <h2 className="ministries-title">{t("upcomingEvents")}</h2>
        <div className="children-events-grid">
          <div className="children-event-card">
            <h3 className="children-event-title">{t("vineMusicStudio")}</h3>
            <p className="children-event-desc">{t("vineMusicDesc")}</p>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/8fb2c6668a0991b14315c11e46f24d584a8d70eb?width=918"
              alt="Vine Music Studio"
              className="children-event-image"
              draggable="false"
            />
            <button className="ministry-btn">{t("learnMore")}</button>
          </div>
          <div className="children-event-card">
            <h3 className="children-event-title">{t("vineTutoringEvent")}</h3>
            <p className="children-event-desc">{t("vineTutoringEventDesc")}</p>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/8fb2c6668a0991b14315c11e46f24d584a8d70eb?width=918"
              alt="Vine Tutoring"
              className="children-event-image"
              draggable="false"
            />
            <Link href="/vine" className="ministry-btn">{t("learnMore")}</Link>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="contact-section children-get-involved">
        <h2 className="ministries-title">{t("getInvolved")}</h2>
        <p className="intro-text children-reach-out-text">{t("reachOut")}</p>
        <button className="connect-btn">{t("connect")}</button>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <h3 className="footer-title">{t("harvestNyc")}</h3>
        <div className="footer-icons">
          <a href="https://www.youtube.com/@harvestinthecity/streams" target="_blank" rel="noopener noreferrer">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/62d640b0b7413ecd1eb34c8d2a6733a1699cfafb?width=180"
              alt="YouTube"
              className="footer-icon"
              draggable="false"
            />
          </a>
          <a href="mailto:harvestinthecitynyc@gmail.com">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/e94bdc79b9e6397731ea714e81845699cb463ee2?width=170"
              alt="Email"
              className="footer-icon"
              draggable="false"
            />
          </a>
          <a href="https://www.remnantchurch.org/" target="_blank" rel="noopener noreferrer">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/d4de61100a8688fad8f49f3af86899013ee08870?width=224"
              alt="Remnant Church"
              className="footer-icon footer-icon--wide"
              draggable="false"
            />
          </a>
        </div>
      </footer>
    </>
  );
}
