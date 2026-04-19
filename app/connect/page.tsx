"use client";

import { useState } from "react";
import Link from "next/link";

type Language = "en" | "es";

const connectContent = {
  connectUs: {
    en: "Connect With Us",
    es: "Conecta Con Nosotros",
  },
  getToKnow: {
    en: "We'd love to get to know you!",
    es: "¡Nos encantaría conocerte!",
  },
  moreInfo: {
    en: "For more information, blahblah blah xyz xyz xyz lah blah",
    es: "Para más información, blahblah blah xyz xyz xyz lah blah",
  },
  harvest: {
    en: "Harvest",
    es: "Harvest",
  },
  vineTutoring: {
    en: "Vine Tutoring",
    es: "Vine Tutoría",
  },
  aldoWiloto: {
    en: "Aldo Wiloto",
    es: "Aldo Wiloto",
  },
  rachelGuen: {
    en: "Rachel Guen",
    es: "Rachel Guen",
  },
  connect: {
    en: "Connect",
    es: "Conectar",
  },
};

export default function ConnectPage() {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const translations = connectContent[key as keyof typeof connectContent];
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
              <Link href="/about" className="text-sm text-gray-700 hover:text-green-700">
                About Us
              </Link>
              <Link href="/#ministries" className="text-sm text-gray-700 hover:text-green-700">
                Ministries
              </Link>
              <Link href="/#involved" className="text-sm text-gray-700 hover:text-green-700">
                Get Involved
              </Link>
              <Link href="/connect" className="text-sm text-gray-700 hover:text-green-700">
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
            {t("connectUs")}
          </h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl mb-6 text-gray-800">
            {t("getToKnow")}
          </h2>
          <p className="text-lg text-gray-700 mb-2">
            {t("moreInfo")}
          </p>
          <p className="text-lg text-gray-700">
            xyz xyz xyz lah blah
          </p>
        </div>
      </section>

      {/* Contact Sections */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Harvest Contact */}
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-8">
                <u>{t("harvest")}</u>
              </h3>
              <div className="space-y-4 mb-8">
                <div>
                  <p className="font-bold text-gray-800">{t("aldoWiloto")}</p>
                  <a
                    href="mailto:aldowiloto@gmail.com"
                    className="text-green-700 hover:underline"
                  >
                    aldowiloto@gmail.com
                  </a>
                </div>
                <div>
                  <p className="font-bold text-gray-800">{t("rachelGuen")}</p>
                  <a
                    href="mailto:rguen97@gmail.com"
                    className="text-green-700 hover:underline"
                  >
                    rguen97@gmail.com
                  </a>
                </div>
              </div>
              <button className="px-8 py-3 border-2 border-green-700 text-green-700 rounded-full font-bold hover:bg-green-50 transition">
                {t("connect")}
              </button>
            </div>

            {/* Vine Tutoring Contact */}
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-8">
                <u>{t("vineTutoring")}</u>
              </h3>
              <div className="space-y-4 mb-8">
                <div>
                  <p className="font-bold text-gray-800">{t("aldoWiloto")}</p>
                  <a
                    href="mailto:aldowiloto@gmail.com"
                    className="text-green-700 hover:underline"
                  >
                    aldowiloto@gmail.com
                  </a>
                </div>
                <div>
                  <p className="font-bold text-gray-800">{t("rachelGuen")}</p>
                  <a
                    href="mailto:rguen97@gmail.com"
                    className="text-green-700 hover:underline"
                  >
                    rguen97@gmail.com
                  </a>
                </div>
              </div>
              <button className="px-8 py-3 border-2 border-green-700 text-green-700 rounded-full font-bold hover:bg-green-50 transition">
                {t("connect")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-center text-2xl font-bold mb-8 underline">HARVEST NYC</h3>
          <div className="flex justify-center items-center gap-12 mb-8">
            <a href="https://www.youtube.com/@harvestinthecity" target="_blank" rel="noopener noreferrer">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F210b813151b44169899945b09fd43873%2Ffc234dd74fca47339292514ea22e61c2?format=webp&width=100"
                alt="YouTube"
                className="w-16 h-16"
              />
            </a>
            <a href="mailto:harvestinthecitynyc@gmail.com">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F210b813151b44169899945b09fd43873%2F4e33951a443c48028a4f03ea89d1e34c?format=webp&width=100"
                alt="Email"
                className="w-16 h-16"
              />
            </a>
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F210b813151b44169899945b09fd43873%2Fd2a5926a2a294ef4a6be01d573e936d5?format=webp&width=200"
              alt="Remnant Church"
              className="h-16"
            />
          </div>
        </div>
      </footer>
    </>
  );
}
