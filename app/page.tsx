"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Language = "en" | "es";

const translations = {
  announcement1: {
    en: "WELCOME TO HARVEST IN THE CITY",
    es: "BIENVENIDO A HARVEST EN LA CIUDAD",
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
    en: "LOVING & LIVING LIKE JESUS",
    es: "AMANDO Y VIVIENDO COMO JESÚS",
  },
  location: {
    en: "LOCATION:",
    es: "UBICACIÓN:",
  },
  address: {
    en: "206 E 29TH STREET",
    es: "206 E 29TH STREET",
  },
  sundayService: {
    en: "SUNDAY SERVICE:",
    es: "SERVICIO DOMINICAL:",
  },
  sundayTime: {
    en: "SUNDAYS AT 3:30 PM",
    es: "DOMINGOS A LAS 3:30 PM",
  },
  youtubeBtn: {
    en: "SUNDAY YOUTUBE LIVESTREAM",
    es: "TRANSMISIÓN EN VIVO YOUTUBE DOMINICAL",
  },
  missionTitle: {
    en: "OUR MISSION",
    es: "NUESTRA MISIÓN",
  },
  missionText: {
    en: "Harvest is a vibrant ministry within Remnant Church NYC dedicated to loving and living like Jesus. We're committed to creating a community where people encounter God's love, grow in faith, and serve others with compassion.",
    es: "Harvest es un ministerio vibrante dentro de Remnant Church NYC dedicado a amar y vivir como Jesús. Nos comprometemos a crear una comunidad donde las personas encuentren el amor de Dios, crezcan en fe y sirvan a otros con compasión.",
  },
  learnMoreBtn: {
    en: "LEARN MORE",
    es: "APRENDE MÁS",
  },
  introText: {
    en: "We'd love to get to know you!\nFor more information, blahblahb blah xyz\nxyz xyz xyz lah blah",
    es: "¡Nos encantaría conocerte!\nPara más información, blahblahb blah xyz\nxyz xyz xyz lah blah",
  },
  vineTutoring: {
    en: "VINE TUTORING",
    es: "VINE TUTORÍA",
  },
  ministriesTitle: {
    en: "MINISTRIES",
    es: "MINISTERIOS",
  },
  childrenMinistry: {
    en: "CHILDREN'S MINISTRY",
    es: "MINISTERIO DE NIÑOS",
  },
  vineTutoringDesc: {
    en: "A tutoring program serving the local & migrant communities, at no cost. The goal is to help students develop academic success, English language skills, etc.",
    es: "Un programa de tutoría que sirve a las comunidades locales y migrantes, sin costo. El objetivo es ayudar a los estudiantes a lograr éxito académico, habilidades del idioma inglés, etc.",
  },
  childrenDesc: {
    en: "A loving space where children encounter Jesus & grow in their faith through engaging activities and Bible teaching.",
    es: "Un espacio amoroso donde los niños encuentran a Jesús y crecen en su fe a través de actividades atractivas y enseñanza bíblica.",
  },
  whenWeMetTitle: {
    en: "WHEN WE MEET",
    es: "CUANDO NOS REUNIMOS",
  },
  sundays: {
    en: "SUNDAYS",
    es: "DOMINGOS",
  },
  tuesdays: {
    en: "TUESDAYS",
    es: "MARTES",
  },
  thursdays: {
    en: "THURSDAYS",
    es: "JUEVES",
  },
  sundaysMeeting: {
    en: "WORSHIP SERVICE | 3:30PM",
    es: "SERVICIO DE ADORACIÓN | 3:30PM",
  },
  sundaysBilingual: {
    en: "(BILINGUAL)",
    es: "(BILINGÜE)",
  },
  livestream: {
    en: "LIVESTREAM",
    es: "TRANSMISIÓN EN VIVO",
  },
  tuesdaysMeeting: {
    en: "SMALL GROUP | 7:30PM",
    es: "GRUPO PEQUEÑO | 7:30PM",
  },
  tuesdaysEnglish: {
    en: "(ENGLISH)",
    es: "(INGLÉS)",
  },
  moreInfo: {
    en: "MORE INFO",
    es: "MÁS INFO",
  },
  thursdaysMeeting: {
    en: "BIBLE STUDY | 7PM",
    es: "ESTUDIO BÍBLICO | 7PM",
  },
  thursdaysSpanish: {
    en: "(SPANISH)",
    es: "(ESPAÑOL)",
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
  }, [announcements.length]);

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
          id="hero-img"
          src="https://api.builder.io/api/v1/image/assets/TEMP/b773ef0aae50cfd2f32785cd1f35aada44632d0a?width=2926"
          alt=""
          className="hero-img"
          draggable="false"
        />
        <div className="hero-overlay">
          <h1 className="hero-title" id="header-text">
            {language === "en" ? "LOVING & LIVING" : "AMANDO Y VIVIENDO"}<br />{language === "en" ? "LIKE JESUS" : "COMO JESÚS"}
          </h1>

          <div className="hero-info">
            <div className="hero-info-column hero-location">
              <div className="hero-info-label">{t("location")}</div>
              <div className="hero-info-value">{t("address")}</div>
            </div>

            <div className="hero-info-column hero-service">
              <div className="hero-info-label">{t("sundayService")}</div>
              <div className="hero-info-value">{t("sundayTime")}</div>
            </div>
          </div>

          <a id="livestream button" href="https://www.youtube.com/@harvestinthecity/streams" target="_blank" rel="noopener noreferrer" className="hero-youtube-btn">
            {t("youtubeBtn")}
          </a>
        </div>
      </div>

      {/* Mission Section */}
      <section className="intro-section">
        <h2 className="mission-title">{t("missionTitle")}</h2>
        <p className="intro-text">
          {language === "en" ? (
            <>
              Harvest is a vibrant ministry within{" "}
              <a href="https://www.remnantchurch.org/" target="_blank" rel="noopener noreferrer" className="mission-link">
                Remnant Church NYC
              </a>
              {" "}dedicated to loving and living like Jesus. We&apos;re committed to creating a community where people encounter God&apos;s love, grow in faith, and serve others with compassion.
            </>
          ) : (
            <>
              Harvest es un ministerio vibrante dentro de{" "}
              <a href="https://www.remnantchurch.org/" target="_blank" rel="noopener noreferrer" className="mission-link">
                Remnant Church NYC
              </a>
              {" "}dedicado a amar y vivir como Jesús. Nos comprometemos a crear una comunidad donde las personas encuentren el amor de Dios, crezcan en fe y sirvan a otros con compasión.
            </>
          )}
        </p>
        <button className="connect-btn">{t("learnMoreBtn")}</button>
      </section>

      {/* Ministries Section */}
      <section className="ministries-section">
        <h2 className="ministries-title">{t("ministriesTitle")}</h2>
        <div className="ministries-grid">
          {/* Vine Tutoring */}
          <div className="ministry-card">
            <h3 className="ministry-name">{t("vineTutoring")}</h3>
            <p className="ministry-desc">{t("vineTutoringDesc")}</p>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/b773ef0aae50cfd2f32785cd1f35aada44632d0a?width=500"
              alt="Vine Tutoring"
              className="ministry-image"
              draggable="false"
            />
            <button className="ministry-btn">{t("learnMoreBtn")}</button>
          </div>

          {/* Children's Ministry */}
          <div className="ministry-card">
            <h3 className="ministry-name">{t("childrenMinistry")}</h3>
            <p className="ministry-desc">{t("childrenDesc")}</p>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/b773ef0aae50cfd2f32785cd1f35aada44632d0a?width=500"
              alt="Children's Ministry"
              className="ministry-image"
              draggable="false"
            />
            <button className="ministry-btn">{t("learnMoreBtn")}</button>
          </div>
        </div>
      </section>

      {/* When We Meet Section */}
      <section className="when-we-meet-section">
        <h2 className="when-we-meet-title">{t("whenWeMetTitle")}</h2>
        <div className="when-we-meet-grid">
          {/* Sundays */}
          <div className="meeting-card">
            <h3 className="meeting-day">{t("sundays")}</h3>
            <p className="meeting-time">{t("sundaysMeeting")}</p>
            <p className="meeting-language">{t("sundaysBilingual")}</p>
            <button className="meeting-btn">{t("livestream")}</button>
          </div>

          {/* Tuesdays */}
          <div className="meeting-card">
            <h3 className="meeting-day">{t("tuesdays")}</h3>
            <p className="meeting-time">{t("tuesdaysMeeting")}</p>
            <p className="meeting-language">{t("tuesdaysEnglish")}</p>
            <button className="meeting-btn">{t("moreInfo")}</button>
          </div>

          {/* Thursdays */}
          <div className="meeting-card">
            <h3 className="meeting-day">{t("thursdays")}</h3>
            <p className="meeting-time">{t("thursdaysMeeting")}</p>
            <p className="meeting-language">{t("thursdaysSpanish")}</p>
            <button className="meeting-btn">{t("moreInfo")}</button>
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
