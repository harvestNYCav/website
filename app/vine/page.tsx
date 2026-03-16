"use client";

import { useState } from "react";

type Language = "en" | "es";

const vineContent = {
  title: {
    en: "Vine",
    es: "Vine",
  },
  subtitle: {
    en: "Academic Tutoring & Community Outreach",
    es: "Tutoría Académica y Alcance Comunitario",
  },
  aboutTitle: {
    en: "About Vine",
    es: "Acerca de Vine",
  },
  aboutDesc: {
    en: "Vine is a tutoring program run by Harvest Ministry as part of our outreach and community service. We provide English language instruction to migrant communities and academic tutoring support to local students, helping all participants develop strong skills and reach their full potential.",
    es: "Vine es un programa de tutoría dirigido por el Ministerio Harvest como parte de nuestro alcance y servicio comunitario. Proporcionamos instrucción en idioma inglés a comunidades migrantes y apoyo de tutoría académica a estudiantes locales, ayudando a todos los participantes a desarrollar habilidades sólidas y alcanzar su máximo potencial.",
  },
  programDetails: {
    en: "Program Details",
    es: "Detalles del Programa",
  },
  session: {
    en: "2026 Spring Session",
    es: "Sesión de Primavera 2026",
  },
  dates: {
    en: "January 10 - May 30, 2026",
    es: "10 de Enero - 30 de Mayo de 2026",
  },
  schedule: {
    en: "Schedule",
    es: "Horario",
  },
  scheduleDetails: {
    en: "Saturdays, 9:30 AM - 11:30 AM at RNC (223 E 30th Street)",
    es: "Sábados, 9:30 AM - 11:30 AM en RNC (223 E 30th Street)",
  },
  sessions: {
    en: "15 Sessions Total",
    es: "15 Sesiones en Total",
  },
  noSession: {
    en: "No Vine on: February 15, April 12, April 19",
    es: "Sin Vine: 15 de Febrero, 12 de Abril, 19 de Abril",
  },
  whatWeOffer: {
    en: "What We Offer",
    es: "Lo Que Ofrecemos",
  },
  englishLearning: {
    en: "English Language Learning",
    es: "Aprendizaje del Idioma Inglés",
  },
  englishDesc: {
    en: "For our migrant community partners, we provide structured English instruction focusing on reading, writing, and speaking skills using beginner-friendly materials and resources.",
    es: "Para nuestros socios de la comunidad migrante, proporcionamos instrucción en inglés estructurada enfocada en habilidades de lectura, escritura y expresión oral utilizando materiales amigables para principiantes.",
  },
  academicTutoring: {
    en: "Academic Tutoring",
    es: "Tutoría Académica",
  },
  academicDesc: {
    en: "Local students receive personalized tutoring support in school subjects with mentors dedicated to helping them succeed academically and develop confidence in their learning.",
    es: "Los estudiantes locales reciben apoyo de tutoría personalizado en materias escolares con mentores dedicados a ayudarlos a tener éxito académico y desarrollar confianza en su aprendizaje.",
  },
  mentorship: {
    en: "Mentorship",
    es: "Mentoría",
  },
  mentorshipDesc: {
    en: "Beyond academics, our tutors serve as mentors, building meaningful relationships and providing encouragement and support to our students.",
    es: "Más allá de lo académico, nuestros tutores sirven como mentores, construyendo relaciones significativas y proporcionando aliento y apoyo a nuestros estudiantes.",
  },
  getInvolved: {
    en: "Get Involved",
    es: "Involúcrate",
  },
  contact: {
    en: "Contact",
    es: "Contacto",
  },
  questions: {
    en: "Questions about Vine?",
    es: "¿Preguntas sobre Vine?",
  },
  reachOut: {
    en: "Feel free to reach out to our Vine coordinators:",
    es: "Siéntete libre de comunicarte con nuestros coordinadores de Vine:",
  },
  back: {
    en: "← Back to Home",
    es: "← Volver al Inicio",
  },
};

export default function VinePage() {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const translations = vineContent[key as keyof typeof vineContent];
    return translations ? (translations as any)[language] : key;
  };

  return (
    <html lang={language} suppressHydrationWarning>
      <body className="bg-white text-gray-900">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <a href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded"></div>
                <span className="text-sm font-semibold text-gray-800">
                  Harvest
                </span>
              </a>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setLanguage(language === "en" ? "es" : "en")}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {language === "en" ? "ES" : "EN"}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative h-80 md:h-96 bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1427504494785-cdaa41d10ae0?w=1200&h=800&fit=crop')",
            }}
          ></div>

          <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-light mb-3">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl opacity-90">{t("subtitle")}</p>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              {t("aboutTitle")}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              {t("aboutDesc")}
            </p>
          </div>
        </section>

        {/* Program Details */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              {t("programDetails")}
            </h2>

            <div className="bg-blue-50 rounded-lg p-8 mb-12">
              <h3 className="text-2xl font-bold mb-6">{t("session")}</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-2">{t("dates")}</h4>
                  <p className="text-gray-700 mb-6">{t("dates")}</p>

                  <h4 className="font-bold text-lg mb-2">{t("schedule")}</h4>
                  <p className="text-gray-700 mb-2">{t("scheduleDetails")}</p>
                  <p className="text-gray-700 font-semibold mb-4">{t("sessions")}</p>
                  <p className="text-sm text-gray-600 italic">{t("noSession")}</p>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-4">
                    {language === "en" ? "Location" : "Ubicación"}
                  </h4>
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">RNC</span>
                    <br />
                    223 E 30th Street
                    <br />
                    New York, NY
                  </p>
                  <p className="text-sm text-gray-600">
                    {language === "en"
                      ? "In-person every Saturday"
                      : "En persona cada sábado"}
                  </p>
                </div>
              </div>
            </div>

            {/* What We Offer */}
            <h2 className="text-3xl font-bold mb-8">{t("whatWeOffer")}</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-3">
                  {t("englishLearning")}
                </h3>
                <p className="text-gray-600">{t("englishDesc")}</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-3">
                  {t("academicTutoring")}
                </h3>
                <p className="text-gray-600">{t("academicDesc")}</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-3">{t("mentorship")}</h3>
                <p className="text-gray-600">{t("mentorshipDesc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              {t("getInvolved")}
            </h2>

            <div className="bg-white rounded-lg p-8 shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-4">{t("questions")}</h3>
              <p className="text-gray-700 mb-6">{t("reachOut")}</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold mb-2">Aldo Wiloto</h4>
                  <a
                    href="mailto:aldowiloto@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    aldowiloto@gmail.com
                  </a>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Rachel Guen</h4>
                  <a
                    href="mailto:rguen97@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    rguen97@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <a
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
            >
              {t("back")}
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto text-center text-gray-400 text-sm">
            <p>
              {language === "en"
                ? "© 2024 Harvest Ministry. Part of Remnant Church NYC."
                : "© 2024 Ministerio Harvest. Parte de Iglesia Remanente NYC."}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
