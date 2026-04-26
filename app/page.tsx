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
    en: "CONNECT WITH US",
    es: "CONECTA CON NOSOTROS",
  },
  introText: {
    en: "We'd love to get to know you!\nFor more information, blahblahb blah xyz\nxyz xyz xyz lah blah",
    es: "¡Nos encantaría conocerte!\nPara más información, blahblahb blah xyz\nxyz xyz xyz lah blah",
  },
  harvest: {
    en: "HARVEST",
    es: "HARVEST",
  },
  vineTutoring: {
    en: "VINE TUTORING",
    es: "VINE TUTORÍA",
  },
  aldoWiloto: {
    en: "Aldo Wiloto:",
    es: "Aldo Wiloto:",
  },
  rachelGuen: {
    en: "Rachel Guen:",
    es: "Rachel Guen:",
  },
  connectBtn: {
    en: "CONNECT",
    es: "CONECTAR",
  },
  harvestNyc: {
    en: "HARVEST NYC",
    es: "HARVEST NYC",
  },
};

export default function HomePage() {
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

  const introLines = t("introText").split("\n");

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
            <Link href="/about" className="nav-link" id="menu">
              {t("aboutUs")}
            </Link>
            <div className="nav-dropdown">
              <button className="nav-link nav-dropdown-trigger" id="menu">
                {t("ministries")}
              </button>
              <div id="menu-dropdown" className="nav-dropdown-menu">
                <span className="nav-dropdown-item">
                  {t("vineTutoring")}
                </span>
                <span className="nav-dropdown-item">
                  {t("children")}
                </span>
              </div>
            </div>
            <Link href="/connect" className="nav-link nav-link--active" id="menu">
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
            {language === "en" ? "CONNECT" : "CONECTA"}<br />{language === "en" ? "WITH US" : "CON NOSOTROS"}
          </h1>
        </div>
      </div>

      {/* Intro Section */}
      <section className="intro-section">
        <p className="intro-text">
          {introLines[0]}<br />
          {introLines[1]}<br />
          {introLines[2]}
        </p>
      </section>

      {/* Contact Sections */}
      <section className="contact-section">
        <div className="contact-grid">

          {/* Harvest */}
          <div className="contact-column">
            <h3 className="contact-heading">{t("harvest")}</h3>
            <div className="contact-list">
              <p className="contact-line">
                <span className="contact-name">{t("aldoWiloto")}</span>{" "}
                <a href="mailto:aldowiloto@gmail.com" className="contact-email">
                  aldowiloto@gmail.com
                </a>
              </p>
              <p className="contact-line">
                <span className="contact-name">{t("rachelGuen")}</span>{" "}
                <a href="mailto:rguen97@gmail.com" className="contact-email">
                  rguen97@gmail.com
                </a>
              </p>
            </div>
            <button className="connect-btn">{t("connectBtn")}</button>
          </div>

          {/* Vine Tutoring */}
          <div className="contact-column">
            <h3 className="contact-heading">{t("vineTutoring")}</h3>
            <div className="contact-list">
              <p className="contact-line">
                <span className="contact-name">{t("aldoWiloto")}</span>{" "}
                <a href="mailto:aldowiloto@gmail.com" className="contact-email">
                  aldowiloto@gmail.com
                </a>
              </p>
              <p className="contact-line">
                <span className="contact-name">{t("rachelGuen")}</span>{" "}
                <a href="mailto:rguen97@gmail.com" className="contact-email">
                  rguen97@gmail.com
                </a>
              </p>
            </div>
            <button className="connect-btn">{t("connectBtn")}</button>
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
              src="https://api.builder.io/api/v1/image/assets/TEMP/e94bdc79b8e6397731ea714e81845699cb463ee2?width=170"
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
