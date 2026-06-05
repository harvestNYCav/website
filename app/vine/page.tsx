"use client";

import { useState } from "react";
import Link from "next/link";

type Language = "en" | "es";

const translations = {
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
  connect: {
    en: "CONNECT",
    es: "CONECTAR",
  },
  vineTutoring: {
    en: "VINE TUTORING",
    es: "VINE TUTORÍA",
  },
  vineTitle: {
    en: "VINE TUTORING",
    es: "VINE TUTORÍA",
  },
  vineDesc: {
    en: "A tutoring program that reaches out to families in the NYC community through tutoring students & sharing the message of Christ, at no cost. Tutors & students gather on Saturday mornings for two hours, including a time of worship and hearing the Word of God.",
    es: "Un programa de tutoría que llega a las familias en la comunidad de Nueva York a través de estudiantes de tutoría y compartir el mensaje de Cristo, sin costo. Los tutores y estudiantes se reúnen los sábados por la mañana durante dos horas, incluyendo un tiempo de adoración y escuchar la Palabra de Dios.",
  },
  mission: {
    en: "Our mission is to transform lives through the love & compassion of Jesus Christ with the goals of:",
    es: "Nuestra misión es transformar vidas a través del amor y la compasión de Jesucristo con los objetivos de:",
  },
  goal1: {
    en: "1 | improving English & subject knowledge across all ages",
    es: "1 | mejorar el inglés y el conocimiento de materias en todas las edades",
  },
  goal2: {
    en: "2 | building students' confidence",
    es: "2 | construir la confianza de los estudiantes",
  },
  goal3: {
    en: "3 | teaching them Gospel",
    es: "3 | enseñarles el Evangelio",
  },
  whenWeMeet: {
    en: "WHEN WE MEET",
    es: "CUANDO NOS REUNIMOS",
  },
  meetingTime: {
    en: "Saturdays | 9:30-11:30 AM | 223 E. 30th Street (RNC)",
    es: "Sábados | 9:30-11:30 AM | 223 E. 30th Street (RNC)",
  },
  springSession: {
    en: "2026 Spring Session",
    es: "Sesión de Primavera 2026",
  },
  sessionDates: {
    en: "January 10 - May 30, 2026",
    es: "10 de Enero - 30 de Mayo de 2026",
  },
  sessionInfo: {
    en: "15 Sessions Total | Break: 2/15, 4/12, 4/19",
    es: "15 Sesiones en Total | Descanso: 2/15, 4/12, 4/19",
  },
  interested: {
    en: "INTERESTED?",
    es: "¿INTERESADO?",
  },
  whatToExpect: {
    en: "WHAT TO EXPECT",
    es: "QUÉ ESPERAR",
  },
  tutoringDesc: {
    en: "Tutoring for 1-2 ESL & NYC students on Grade School English/Math",
    es: "Tutoría para 1-2 estudiantes ESL y de Nueva York en Inglés/Matemáticas de escuela primaria",
  },
  conversationsJesus: {
    en: "Having conversations about Jesus",
    es: "Teniendo conversaciones sobre Jesús",
  },
  buildCommunity: {
    en: "BUILD COMMUNITY RELATIONSHIPS",
    es: "CONSTRUIR RELACIONES COMUNITARIAS",
  },
  joinCommunity: {
    en: "JOIN OUR TUTORING COMMUNITY",
    es: "ÚNETE A NUESTRA COMUNIDAD DE TUTORÍA",
  },
  harvestNyc: {
    en: "HARVEST NYC",
    es: "HARVEST NYC",
  },
};

export default function VinePage() {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: keyof typeof translations): string => {
    return translations[key][language];
  };

  return (
    <>
      {/* Navigation */}
      <nav className="site-nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            HARVEST<br />NYC
          </Link>

          <div className="nav-links">
            <Link href="/about" className="nav-link nav-link-about">
              <span className="nav-link-full">{t("aboutUs")}</span>
              <span className="nav-link-short">{t("aboutUsShort")}</span>
            </Link>
            <div className="nav-dropdown">
              <button className="nav-link nav-dropdown-trigger">
                {t("ministries")}
              </button>
              <div className="nav-dropdown-menu">
                <Link href="/vine" className="nav-dropdown-item">
                  {t("vineTutoring")}
                </Link>
                <span className="nav-dropdown-item">Children</span>
              </div>
            </div>
            <Link href="/connect" className="nav-link nav-link--active">
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
          alt="NYC Skyline"
          className="hero-img"
          draggable="false"
        />
        <div className="hero-overlay">
          <h1 className="hero-title">{t("vineTitle")}</h1>
        </div>
      </div>

      {/* About Section */}
      <section className="intro-section">
        <p className="intro-text vine-intro-text">
          {t("vineDesc")}
        </p>
        <p className="intro-text vine-intro-text">
          {t("mission")}<br />
          {t("goal1")}<br />
          {t("goal2")}<br />
          {t("goal3")}
        </p>
      </section>

      {/* Team Photo Section */}
      <section className="vine-team-section">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=400&fit=crop"
          alt="Vine team"
          className="vine-team-image"
          draggable="false"
        />
      </section>

      {/* When We Meet Section */}
      <section className="when-we-meet-section">
        <h2 className="when-we-meet-title">{t("whenWeMeet")}</h2>
        <p className="vine-meeting-detail">{t("meetingTime")}</p>

        <div className="vine-session-box">
          <h3 className="vine-session-title">{t("springSession")}</h3>
          <p className="vine-session-dates">{t("sessionDates")}</p>
          <p className="vine-session-info">{t("sessionInfo")}</p>
          <button className="vine-interested-btn">{t("interested")}</button>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="vine-expect-section">
        <h2 className="vine-expect-title">{t("whatToExpect")}</h2>

        <div className="vine-expect-labels">
          <h3 className="vine-expect-label">{t("buildCommunity")}</h3>
          <h3 className="vine-expect-label">{t("joinCommunity")}</h3>
        </div>

        <div className="vine-expect-grid">
          <div className="vine-expect-card">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F210b813151b44169899945b09fd43873%2Fa40622fd49024d2d9c82279a4ea61954?format=webp&width=800&height=1200"
              alt="Tutoring"
              className="vine-expect-image"
              draggable="false"
            />
            <p className="vine-expect-text">{t("tutoringDesc")}</p>
          </div>

          <div className="vine-expect-card">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F210b813151b44169899945b09fd43873%2Fa40622fd49024d2d9c82279a4ea61954?format=webp&width=800&height=1200"
              alt="Conversations"
              className="vine-expect-image"
              draggable="false"
            />
            <p className="vine-expect-text">{t("conversationsJesus")}</p>
          </div>

          <div className="vine-expect-card">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F210b813151b44169899945b09fd43873%2Fa40622fd49024d2d9c82279a4ea61954?format=webp&width=800&height=1200"
              alt="Community"
              className="vine-expect-image"
              draggable="false"
            />
            <p className="vine-expect-text">{t("tutoringDesc")}</p>
          </div>

          <div className="vine-expect-card">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F210b813151b44169899945b09fd43873%2Fa40622fd49024d2d9c82279a4ea61954?format=webp&width=800&height=1200"
              alt="Join Community"
              className="vine-expect-image"
              draggable="false"
            />
            <p className="vine-expect-text">{t("conversationsJesus")}</p>
          </div>
        </div>
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
