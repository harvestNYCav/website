"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Language = "en" | "es";

const translations = {
  announcement1: {
    en: "JOIN US FOR WORSHIP ON SUNDAYS AT 3:30PM",
    es: "ÚNETE A NOSOTROS PARA ADORAR LOS DOMINGOS A LAS 3:30PM",
  },
  announcement2: {
    en: "WELCOME TO HARVEST IN THE CITY",
    es: "BIENVENIDO A HARVEST EN LA CIUDAD",
  },
  announcement: {
    en: "SOME SORT OF ANNOUNCEMENT HERE",
    es: "ALGÚN TIPO DE ANUNCIO AQUÍ",
  },
  aboutUs: {
    en: "ABOUT US",
    es: "ACERCA DE NOSOTROS",
  },
  aboutUsShort: {
    en: "ABOUT",
    es: "ACERCA",
  },
  ministries: {
    en: "MINISTRIES",
    es: "MINISTERIOS",
  },
  getInvolved: {
    en: "GET INVOLVED",
    es: "INVOLÚCRATE",
  },
  connect: {
    en: "CONNECT",
    es: "CONECTAR",
  },
  children: {
    en: "CHILDREN",
    es: "NIÑOS",
  },
  heroTitle: {
    en: "ABOUT US",
    es: "ACERCA DE NOSOTROS",
  },
  introText: {
    en: "Harvest is a vibrant ministry within Remnant Church NYC dedicated to loving and living like Jesus. We're committed to creating a community where people encounter God's love, grow in faith, and serve others with compassion.",
    es: "Harvest es un ministerio vibrante dentro de Iglesia Remanente NYC dedicado a amar y vivir como Jesús. Nos comprometemos a crear una comunidad donde las personas encuentren el amor de Dios, crezcan en fe y sirvan a otros con compasión.",
  },
  ourStaff: {
    en: "OUR STAFF",
    es: "NUESTRO PERSONAL",
  },
  pastorRichard: {
    en: "Pastor Richard",
    es: "Pastor Richard",
  },
  pastorErika: {
    en: "Pastor Erika",
    es: "Pastor Erika",
  },
  pastorDesc: {
    en: "A blurb about their family, kids, when they started blah blah xyz blah blah xyz blah blah xyz blah blah xyz",
    es: "Un párrafo sobre su familia, hijos, cuándo comenzaron blah blah xyz blah blah xyz blah blah xyz blah blah xyz",
  },
  servingStaff: {
    en: "SERVING STAFF",
    es: "PERSONAL SIRVIENTE",
  },
  servingDesc: {
    en: "A general blurb about the group of people who serve, blah blah blah blah xyz blah blah xyz blah blah xyz blah blah xyz",
    es: "Un párrafo general sobre el grupo de personas que sirven, blah blah blah blah xyz blah blah xyz blah blah xyz blah blah xyz",
  },
  interestedBtn: {
    en: "INTERESTED IN SERVING?",
    es: "¿INTERESADO EN SERVIR?",
  },
  harvestNyc: {
    en: "HARVEST NYC",
    es: "HARVEST NYC",
  },
};

export default function AboutPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const t = (key: keyof typeof translations): string => {
    return translations[key][language];
  };

  const announcements = ["announcement1", "announcement2"] as const;

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Announcement Banner */}
      <div className="announcement-bar">
        <span key={announcementIndex} className="announcement-text">
          {t(announcements[announcementIndex])}
        </span>
      </div>

      {/* Navigation */}
      <nav className="site-nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo" id="HARVEST LOGO">
            HARVEST<br />NYC
          </Link>

          <div className="nav-links">
            <Link href="/about" className="nav-link nav-link-about nav-link--active" id="menu">
              <span className="nav-link-full">{t("aboutUs")}</span>
              <span className="nav-link-short">{t("aboutUsShort")}</span>
            </Link>
            <div className="nav-dropdown">
              <button className="nav-link nav-dropdown-trigger" id="menu">
                {t("ministries")}
              </button>
              <div id="menu-dropdown" className="nav-dropdown-menu">
                <span className="nav-dropdown-item">
                  {t("children")}
                </span>
              </div>
            </div>
            <Link href="/connect" className="nav-link" id="menu">
              {t("connect")}
            </Link>
          </div>

          <button
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            className="lang-btn"
          >
            {language === "en" ? "ESPAÑOL" : "ENGLISH"}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-wrapper">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/b773ef0aae50cfd2f32785cd1f35aada44632d0a?width=2926"
          alt=""
          className="hero-img"
          draggable="false"
        />
        <div className="hero-overlay">
          <h1 className="hero-title" id="header-text">
            {language === "en" ? "ABOUT US" : "ACERCA"}<br />{language === "en" ? "" : "DE NOSOTROS"}
          </h1>
        </div>
      </div>

      {/* Intro Section */}
      <section className="intro-section">
        <p className="intro-text">
          {t("introText")}
        </p>
      </section>

      {/* Our Staff Section */}
      <section className="contact-section">
        <h2 className="ministries-title">{t("ourStaff")}</h2>
        
        <div className="contact-grid">

          {/* Pastors */}
          <div className="contact-column">
            <h3 className="contact-heading">{t("pastorRichard")} | {t("pastorErika")}</h3>
            <div className="contact-list">
              <p className="contact-line">
                {t("pastorDesc")}
              </p>
            </div>
          </div>

          {/* Serving Staff */}
          <div className="contact-column">
            <h3 className="contact-heading">{t("servingStaff")}</h3>
            <div className="contact-list">
              <p className="contact-line">
                {t("servingDesc")}
              </p>
            </div>
            <button className="connect-btn">{t("interestedBtn")}</button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <h3 className="footer-title" id="FOOTER HARVEST">{t("harvestNyc")}</h3>
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
