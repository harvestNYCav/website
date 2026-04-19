"use client";

import { useState } from "react";
import Link from "next/link";

type Language = "en" | "es";

const aboutContent = {
  aboutUs: {
    en: "About Us",
    es: "Acerca de Nosotros",
  },
  missionTitle: {
    en: "Harvest is a vibrant ministry within Remnant Church NYC dedicated to loving and living like Jesus. We're committed to creating a community where people encounter God's love, grow in faith, and serve others with compassion.",
    es: "Harvest es un ministerio vibrante dentro de Iglesia Remanente NYC dedicado a amar y vivir como Jesús. Nos comprometemos a crear una comunidad donde las personas encuentren el amor de Dios, crezcan en fe y sirvan a otros con compasión.",
  },
  ourStaff: {
    en: "Our Staff",
    es: "Nuestro Personal",
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
    en: "A blurb about their family, kids bay, when they started blah blah xyz blah blah xyz blah blah xyz blah blah xyz",
    es: "Un párrafo sobre su familia, hijos, cuándo comenzaron blah blah xyz blah blah xyz blah blah xyz blah blah xyz",
  },
  servingStaff: {
    en: "Serving Staff",
    es: "Personal Sirviente",
  },
  servingDesc: {
    en: "A general blurb about the group of people who serve, blah blah blah blah xyz blah blah xyz blah blah xyz blah blah xyz",
    es: "Un párrafo general sobre el grupo de personas que sirven, blah blah blah blah xyz blah blah xyz blah blah xyz blah blah xyz",
  },
  interestedBtn: {
    en: "Interested in Serving?",
    es: "¿Interesado en Servir?",
  },
};

export default function AboutPage() {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const translations = aboutContent[key as keyof typeof aboutContent];
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
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
              <span className="text-sm font-semibold text-gray-800">
                Harvest
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/about" className="text-sm text-black hover:text-green-700 uppercase font-semibold">
                About Us
              </Link>
              <Link href="/#ministries" className="text-sm text-black hover:text-green-700 uppercase font-semibold">
                Ministries
              </Link>
              <Link href="/#involved" className="text-sm text-black hover:text-green-700 uppercase font-semibold">
                Get Involved
              </Link>
              <Link href="/connect" className="text-sm text-black hover:text-green-700 uppercase font-semibold">
                Connect
              </Link>
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
      <section className="relative h-96 md:h-screen bg-gray-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=800&fit=crop')",
          }}
        ></div>

        <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold">
            {t("aboutUs")}
          </h1>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-center">
            {t("missionTitle")}
          </p>
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            {t("ourStaff")}
          </h2>

          {/* Pastor Section */}
          <div className="mb-24">
            <div
              className="h-64 md:h-96 bg-cover bg-center rounded-lg mb-8"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop')",
              }}
            ></div>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-6">
              <u>{t("pastorRichard")} | {t("pastorErika")}</u>
            </h3>
            <p className="text-center text-gray-700 text-lg max-w-3xl mx-auto">
              {t("pastorDesc")}
            </p>
          </div>

          {/* Serving Staff Section */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
              <u>{t("servingStaff")}</u>
            </h3>
            <p className="text-center text-gray-700 text-lg max-w-3xl mx-auto mb-8">
              {t("servingDesc")}
            </p>
            <div className="text-center">
              <button className="px-8 py-3 border-2 border-black text-black rounded-full font-bold hover:bg-gray-100 transition uppercase">
              {t("interestedBtn")}
            </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-center text-2xl font-bold mb-8 underline text-black uppercase">HARVEST NYC</h3>
          <div className="flex justify-center items-center gap-12 mb-8">
            <a href="https://www.youtube.com/@harvestinthecity" target="_blank" rel="noopener noreferrer">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F210b813151b44169899945b09fd43873%2Ffc234dd74fca47339292514ea22e61c2?format=webp&width=100"
                alt="YouTube"
                className="w-16 h-16"
                draggable="false"
              />
            </a>
            <a href="mailto:harvestinthecitynyc@gmail.com">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F210b813151b44169899945b09fd43873%2F4e33951a443c48028a4f03ea89d1e34c?format=webp&width=100"
                alt="Email"
                className="w-16 h-16"
                draggable="false"
              />
            </a>
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F210b813151b44169899945b09fd43873%2Fd2a5926a2a294ef4a6be01d573e936d5?format=webp&width=200"
              alt="Remnant Church"
              className="h-16"
              draggable="false"
            />
          </div>
        </div>
      </footer>
    </>
  );
}
