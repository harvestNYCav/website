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
  volunteeringTutor: {
    en: "VOLUNTEERING AS A TUTOR",
    es: "VOLUNTARIADO COMO TUTOR",
  },
  enrollStudent: {
    en: "ENROLL AS A STUDENT",
    es: "INSCRIBIRSE COMO ESTUDIANTE",
  },
  signUpTutor: {
    en: "How do I sign up to be a tutor?",
    es: "¿Cómo me inscribo para ser tutor?",
  },
  signUpStudent: {
    en: "How do I sign up to be a student?",
    es: "¿Cómo me inscribo para ser estudiante?",
  },
  timeCommitment: {
    en: "What's the time commitment?",
    es: "¿Cuál es el compromiso de tiempo?",
  },
  expectStudent: {
    en: "What can I expect as a student?",
    es: "¿Qué puedo esperar como estudiante?",
  },
  tutorSkills: {
    en: "What skills does a tutor need?",
    es: "¿Qué habilidades necesita un tutor?",
  },
  tutorSignupAnswer: {
    en: "Please reach out to our coordinators for more information.",
    es: "Comuníquese con nuestros coordinadores para obtener más información.",
  },
  tutorCommitmentAnswer: {
    en: "Tutors meet on Saturday mornings for 2 hours during the spring and fall sessions.",
    es: "Los tutores se reúnen los sábados por la mañana durante 2 horas en las sesiones de primavera e invierno.",
  },
  tutorSkillsAnswer: {
    en: "We ask tutors to be open and willing to teach a variety of grade school subjects such as English & Math. Bi-lingual proficiency is not required.",
    es: "Pedimos a los tutores que estén dispuestos a enseñar una variedad de materias de escuela primaria como inglés y matemáticas. No se requiere competencia bilingüe.",
  },
  studentSignupAnswer: {
    en: "Please reach out to our coordinators to register as a student.",
    es: "Comuníquese con nuestros coordinadores para registrarse como estudiante.",
  },
  studentExpectAnswer: {
    en: "We ask that students commit for both semesters (Fall & Spring) and be ready and willing to learn.",
    es: "Pedimos que los estudiantes se comprometan durante ambos semestres (Otoño e Invierno) y estén listos y dispuestos a aprender.",
  },
  getInvolved: {
    en: "GET INVOLVED",
    es: "INVOLÚCRATE",
  },
  reachOut: {
    en: "Please reach out to our Vine coordinators for more information:",
    es: "Comuníquese con nuestros coordinadores de Vine para obtener más información:",
  },
  aldoWiloto: {
    en: "Aldo Wiloto:",
    es: "Aldo Wiloto:",
  },
  rachelGuen: {
    en: "Rachel Guen:",
    es: "Rachel Guen:",
  },
  harvestNyc: {
    en: "HARVEST NYC",
    es: "HARVEST NYC",
  },
};

export default function VinePage() {
  const [language, setLanguage] = useState<Language>("en");
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const t = (key: keyof typeof translations): string => {
    return translations[key][language];
  };

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
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
            <Link href="/about" className="nav-link nav-link-about" id="menu">
              <span className="nav-link-full">{t("aboutUs")}</span>
              <span className="nav-link-short">{t("aboutUsShort")}</span>
            </Link>
            <div className="nav-dropdown">
              <button className="nav-link nav-dropdown-trigger" id="menu">
                {t("ministries")}
              </button>
              <div id="menu-dropdown" className="nav-dropdown-menu">
                <Link href="/vine" className="nav-dropdown-item">
                  {t("vineTutoring")}
                </Link>
                <span className="nav-dropdown-item">Children</span>
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
          A tutoring program<br className="mobile-break" /> that reaches out to families in the NYC community<br className="mobile-break" /> through tutoring students & sharing<br className="mobile-break" /> the message of Christ, at no cost.<br className="mobile-break" /> Tutors & students gather<br className="mobile-break" /> on Saturday mornings for two hours,<br className="mobile-break" /> including a time of worship and hearing<br className="mobile-break" /> the Word of God.
        </p>
        <p className="intro-text vine-intro-text">
          Our mission is to transform lives<br /> through the love & compassion of Jesus Christ with the goals of:<br /><br />
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
        <p className="vine-meeting-detail">Saturdays<br className="meeting-break" /> | 9:30-11:30 AM<br className="meeting-break" /> | 223 E. 30th Street (RNC)</p>

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
          <h3 className="vine-expect-label">BUILD<br className="label-break" /> COMMUNITY RELATIONSHIPS</h3>
          <h3 className="vine-expect-label">JOIN OUR<br className="label-break" /> TUTORING COMMUNITY</h3>
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
            <p className="vine-expect-text">Put a caption here</p>
          </div>

          <div className="vine-expect-card">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F210b813151b44169899945b09fd43873%2Fa40622fd49024d2d9c82279a4ea61954?format=webp&width=800&height=1200"
              alt="Join Community"
              className="vine-expect-image"
              draggable="false"
            />
            <p className="vine-expect-text">Put a caption here</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="vine-faq-section">
        <div className="vine-faq-grid">
          {/* Volunteering as Tutor */}
          <div className="vine-faq-column">
            <h3 className="vine-faq-heading">{t("volunteeringTutor")}</h3>

            <div className="vine-faq-item">
              <button
                className="vine-faq-question"
                onClick={() => toggleFaq("tutor-signup")}
              >
                <span>{t("signUpTutor")}</span>
                <span className={`vine-faq-arrow ${openFaq === "tutor-signup" ? "open" : ""}`}>▼</span>
              </button>
              {openFaq === "tutor-signup" && (
                <div className="vine-faq-answer">
                  <p>{t("tutorSignupAnswer")}</p>
                </div>
              )}
            </div>

            <div className="vine-faq-item">
              <button
                className="vine-faq-question"
                onClick={() => toggleFaq("tutor-commitment")}
              >
                <span>{t("timeCommitment")}</span>
                <span className={`vine-faq-arrow ${openFaq === "tutor-commitment" ? "open" : ""}`}>▼</span>
              </button>
              {openFaq === "tutor-commitment" && (
                <div className="vine-faq-answer">
                  <p>{t("tutorCommitmentAnswer")}</p>
                </div>
              )}
            </div>

            <div className="vine-faq-item">
              <button
                className="vine-faq-question"
                onClick={() => toggleFaq("tutor-skills")}
              >
                <span>{t("tutorSkills")}</span>
                <span className={`vine-faq-arrow ${openFaq === "tutor-skills" ? "open" : ""}`}>▼</span>
              </button>
              {openFaq === "tutor-skills" && (
                <div className="vine-faq-answer">
                  <p>{t("tutorSkillsAnswer")}</p>
                </div>
              )}
            </div>
          </div>

          {/* Enroll as Student */}
          <div className="vine-faq-column">
            <h3 className="vine-faq-heading">{t("enrollStudent")}</h3>

            <div className="vine-faq-item">
              <button
                className="vine-faq-question"
                onClick={() => toggleFaq("student-signup")}
              >
                <span>{t("signUpStudent")}</span>
                <span className={`vine-faq-arrow ${openFaq === "student-signup" ? "open" : ""}`}>▼</span>
              </button>
              {openFaq === "student-signup" && (
                <div className="vine-faq-answer">
                  <p>{t("studentSignupAnswer")}</p>
                </div>
              )}
            </div>

            <div className="vine-faq-item">
              <button
                className="vine-faq-question"
                onClick={() => toggleFaq("student-expect")}
              >
                <span>{t("expectStudent")}</span>
                <span className={`vine-faq-arrow ${openFaq === "student-expect" ? "open" : ""}`}>▼</span>
              </button>
              {openFaq === "student-expect" && (
                <div className="vine-faq-answer">
                  <p>{t("studentExpectAnswer")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="contact-section vine-get-involved">
        <h2 className="ministries-title">{t("getInvolved")}</h2>
        <p className="intro-text">
          {t("reachOut")}
        </p>

        <div className="contact-list vine-contact-list">
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
