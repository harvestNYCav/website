"use client";

import { useState } from "react";

type Language = "en" | "es";

const content: Record<string, { en: string; es: string }> = {
  tagline: {
    en: "loving & living like Jesus",
    es: "amando y viviendo como Jesús",
  },
  serviceTime: {
    en: "Sunday Service | 3:30 PM | 206 E 29th Street",
    es: "Servicio Dominical | 3:30 PM | 206 E 29th Street",
  },
  liveStream: {
    en: "LIVE STREAM YOUTUBE",
    es: "TRANSMISIÓN EN VIVO YOUTUBE",
  },
  aboutUs: {
    en: "About Us",
    es: "Acerca de Nosotros",
  },
  ministries: {
    en: "Ministries",
    es: "Ministerios",
  },
  getInvolved: {
    en: "Get Involved",
    es: "Únete",
  },
  contact: {
    en: "Contact",
    es: "Contacto",
  },
  give: {
    en: "Give",
    es: "Diezmos",
  },
  childrenMinistry: {
    en: "Children's Ministry",
    es: "Ministerio de Niños",
  },
  worship: {
    en: "Worship",
    es: "Adoración",
  },
  vine: {
    en: "Vine",
    es: "Vine",
  },
  ourMission: {
    en: "Our Mission",
    es: "Nuestra Misión",
  },
  weeklyRhythms: {
    en: "Weekly Rhythms",
    es: "Ritmo Semanal",
  },
  sundayWorship: {
    en: "Sunday Worship",
    es: "Adoración Dominical",
  },
  sundayDesc: {
    en: "Join us for our Sunday service at 3:30 PM as we worship together and encounter God's presence.",
    es: "Únete a nuestro servicio dominical a las 3:30 PM para adorar juntos y encontrar la presencia de Dios.",
  },
  communityFeed: {
    en: "Community Feed",
    es: "Comunidad",
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const translations = content[key as keyof typeof content];
    return translations ? translations[language] : key;
  };

  return (
    <>
      {/* Announcement Banner */}
      <div className="bg-gray-200 text-gray-800 text-sm py-2 text-center">
        SOME SORT OF ANNOUNCEMENT HERE
      </div>

      {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded"></div>
                <span className="text-sm font-semibold text-gray-800">
                  Harvest
                </span>
              </div>

              <div className="hidden md:flex items-center gap-8">
                <a href="/about" className="text-sm text-gray-700 hover:text-blue-600">
                  {t("aboutUs")}
                </a>
                <a href="#ministries" className="text-sm text-gray-700 hover:text-blue-600">
                  {t("ministries")}
                </a>
                <a href="#involved" className="text-sm text-gray-700 hover:text-blue-600">
                  {t("getInvolved")}
                </a>
                <a href="/connect" className="text-sm text-gray-700 hover:text-blue-600">
                  {t("contact")}
                </a>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setLanguage(language === "en" ? "es" : "en")}
                  className="px-3 py-1 text-sm border border-gray-800 text-gray-800 rounded hover:bg-gray-100"
                >
                  {language === "en" ? "ESPAÑOL" : "ENGLISH"}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative h-96 md:h-screen bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=800&fit=crop')",
            }}
          ></div>

          <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4">
            <p className="text-sm md:text-base uppercase tracking-widest mb-4 opacity-80">
              {t("aboutUs")}
            </p>
            <h1 className="text-4xl md:text-6xl font-light mb-8 max-w-3xl">
              {t("tagline")}
            </h1>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 max-w-2xl">
              <p className="text-lg md:text-xl mb-4">{t("serviceTime")}</p>
              <a
                href="https://www.youtube.com/@harvestinthecity/streams"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold transition"
              >
                {t("liveStream")}
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              {t("ourMission")}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">
              {language === "en"
                ? "Harvest is a vibrant ministry within Remnant Church NYC dedicated to loving and living like Jesus. We're committed to creating a community where people encounter God's love, grow in faith, and serve others with compassion."
                : "Harvest es un ministerio vibrante dentro de Remnant Church NYC dedicado a amar y vivir como Jesús. Nos comprometemos a crear una comunidad donde las personas encuentren el amor de Dios, crezcan en fe y sirvan a otros con compasión."}
            </p>
          </div>
        </section>

        {/* Ministries Section */}
        <section id="ministries" className="py-16 md:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              {t("ministries")}
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Children's Ministry */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                <div
                  className="h-48 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1503454537688-e6c8944f3814?w=500&h=400&fit=crop')",
                  }}
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">
                    {t("childrenMinistry")}
                  </h3>
                  <p className="text-gray-600">
                    {language === "en"
                      ? "A loving space where children encounter Jesus and grow in their faith through engaging activities and Bible teaching."
                      : "Un espacio amoroso donde los niños encuentran a Jesús y crecen en su fe a través de actividades atractivas y enseñanza bíblica."}
                  </p>
                </div>
              </div>

              {/* Vine */}
              <a
                href="/vine"
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer block"
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1427504494785-cdaa41d10ae0?w=500&h=400&fit=crop')",
                  }}
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{t("vine")}</h3>
                  <p className="text-gray-600">
                    {language === "en"
                      ? "A tutoring program serving the local and migrant communities, helping students develop English language skills and academic success."
                      : "Un programa de tutoría que sirve a las comunidades locales y migrantes, ayudando a los estudiantes a desarrollar habilidades en inglés y éxito académico."}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Weekly Rhythms */}
        <section id="involved" className="py-16 md:py-24 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              {t("weeklyRhythms")}
            </h2>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="mb-8 pb-8 border-b">
                <h3 className="text-2xl font-bold mb-3">{t("sundayWorship")}</h3>
                <p className="text-gray-600 mb-4">{t("sundayDesc")}</p>
                <p className="text-lg font-semibold text-blue-600">
                  3:30 PM • 206 E 29th Street
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">
                  {language === "en" ? "Connect With Us" : "Conecta Con Nosotros"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {language === "en"
                    ? "Have questions? Want to get involved? We'd love to hear from you!"
                    : "¿Preguntas? ¿Quieres involucrarte? ¡Nos encantaría saber de ti!"}
                </p>
                <a
                  href="https://wa.me/19175977498"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-green-500 text-white rounded font-semibold hover:bg-green-600 transition"
                >
                  {language === "en" ? "Message on WhatsApp" : "Mensaje por WhatsApp"}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">{t("contact")}</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div>
                <h3 className="font-bold mb-3">
                  {language === "en" ? "Phone" : "Teléfono"}
                </h3>
                <a
                  href="tel:+19175977498"
                  className="text-blue-600 hover:underline"
                >
                  +1 (917) 597-7498
                </a>
              </div>

              <div>
                <h3 className="font-bold mb-3">
                  {language === "en" ? "Email" : "Correo Electrónico"}
                </h3>
                <a
                  href="mailto:harvestinthecitynyc@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  harvestinthecitynyc@gmail.com
                </a>
              </div>

              <div>
                <h3 className="font-bold mb-3">
                  {language === "en" ? "Location" : "Ubicación"}
                </h3>
                <p className="text-gray-600">206 E 29th Street, NYC</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <a
                href="https://app.easytithe.com/App/Giving/remnantchurch"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
              >
                {t("give")}
              </a>
              <a
                href="https://www.youtube.com/@harvestinthecity/streams"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded font-semibold hover:bg-blue-50 transition"
              >
                {language === "en" ? "YouTube" : "YouTube"}
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                  <span className="text-sm font-semibold">Harvest</span>
                </div>
                <p className="text-gray-400 text-sm">
                  {language === "en"
                    ? "Part of Remnant Church NYC"
                    : "Parte de Iglesia Remanente NYC"}
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-4">
                  {language === "en" ? "Quick Links" : "Enlaces Rápidos"}
                </h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>
                    <a href="#about" className="hover:text-white">
                      {t("aboutUs")}
                    </a>
                  </li>
                  <li>
                    <a href="#ministries" className="hover:text-white">
                      {t("ministries")}
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:text-white">
                      {t("contact")}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">
                  {language === "en" ? "Follow Us" : "Síguenos"}
                </h4>
                <div className="flex gap-4 text-gray-400">
                  <a
                    href="https://www.youtube.com/@harvestinthecity/streams"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    YouTube
                  </a>
                  <a
                    href="https://wa.me/19175977498"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
              <p>
                {language === "en"
                  ? "© 2026 Harvest Ministry. Part of Remnant Church NYC."
                  : "© 2026 Ministerio Harvest. Parte de Iglesia Remanente NYC."}
              </p>
            </div>
          </div>
        </footer>
    </>
  );
}
