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
  vineTutoring: {
    en: "VINE TUTORING",
    es: "VINE TUTORÍA",
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
    en: "Harvest is a multi-ethnic ministry dedicated to sharing the Gospel and building a community of devoted believers. People from all walks of life and diverse backgrounds are welcome to worship our God, build meaningful relationships, and experience real fellowship together. The gospel of Jesus Christ speaks directly to the life of the community, and the church remains committed to biblical reconciliation and justice. Matthew 13:23 states, \"The seed that fell on good soil represents those who truly hear and understand God's word and produce a harvest of thirty, sixty, or even a hundred times as much as had been planted!\"\n\nOur mission is to cultivate a culture of heaven on earth through worship, service, love, and sharing with people from all walks of life, nations, cities, and neighborhoods! Our vision, inspired by 1 Timothy 2:8, is for all places of worship to be filled with prayer, holy hands lifted to God, and freedom from anger and controversy.\n\nHarvest in the City held its first worship services in August 2014, meeting in the cafeteria of Remnant Church. Supported by members of the local church, it was a way to connect with people in the Kips Bay neighborhood and the surrounding community. What started as an outreach ministry grew into a rich season of collective worship, raising up leaders and congregants who stepped into a new chapter of renewal, evangelism, and shared life. Today, we are connected with people from many nations, forming a multiethnic community united in spirit and purpose, with Jesus at the heart of our worship as the Lord of the Harvest.",
    es: "Harvest es un ministerio multiétnico dedicado a compartir el Evangelio y construir una comunidad de creyentes devotos. Personas de todos los ámbitos de la vida y de diversos orígenes son bienvenidas a adorar a nuestro Dios, construir relaciones significativas y experimentar una verdadera comunión juntos. El evangelio de Jesucristo habla directamente a la vida de la comunidad, y la iglesia permanece comprometida con la reconciliación bíblica y la justicia. Mateo 13:23 dice: \"La semilla que cayó en buen terreno representa a quienes realmente escuchan y entienden la palabra de Dios y producen una cosecha de treinta, sesenta o incluso cien veces más de lo que se había plantado.\"\n\nNuestra misión es cultivar una cultura del cielo en la tierra a través de la adoración, el servicio, el amor y la comunión con personas de todos los ámbitos de la vida, naciones, ciudades y vecindarios. Nuestra visión, inspirada en 1 Timoteo 2: 8, es que todos los lugares de adoración se llenen de oración, manos santas levantadas a Dios y libertad de la ira y la controversia.\n\nHarvest en la Ciudad celebró sus primeros servicios de adoración en agosto de 2014, reuniéndose en la cafetería de la Iglesia Remanente. Apoyado por miembros de la iglesia local, fue una forma de conectarse con personas en el vecindario de Kips Bay y la comunidad circundante. Lo que comenzó como un ministerio de extensión se convirtió en una rica temporada de adoración colectiva, levantando líderes y congregantes que dieron un paso hacia un nuevo capítulo de renovación, evangelismo y vida compartida. Hoy, estamos conectados con personas de muchas naciones, formando una comunidad multiétnica unida en espíritu y propósito, con Jesús en el corazón de nuestra adoración como el Señor de la Cosecha.",
  },
  ourStaff: {
    en: "OUR STAFF",
    es: "NUESTRO PERSONAL",
  },
  aguirreFamily: {
    en: "The Aguirre Family",
    es: "La Familia Aguirre",
  },
  pastorDesc: {
    en: "In 2006, Pastor Richard, Erika, and their family moved to Kips Bay, led by a clear calling into a new season of ministry. Both he and his wife saw the deep need for urban ministry in this community. He gave himself to serving and building programs for homeless outreach and inner-city youth ministries, connecting with various groups in the neighborhood and local community leaders. He also started a homeless ministry and a tutoring program for the children of Kips Bay. In May of 2012, Pastor Richard connected with Remnant Church. By 2013, he had joined the church as an Outreach Pastor, and in 2026, he became an Associate Pastor of Remnant Church. Pastor Richard and Erika have been married for over 30 years and are blessed with three sons: Richard, Paul, and Matheux, all of whom are currently serving in their local church as Worship Leaders and Youth Leaders.",
    es: "En 2006, el Pastor Richard, Erika y su familia se mudaron a Kips Bay, guiados por un claro llamado a una nueva temporada de ministerio. Tanto él como su esposa vieron la profunda necesidad del ministerio urbano en esta comunidad. Se dedicó a servir y construir programas para la asistencia a los sin hogar y ministerios para jóvenes de la ciudad, conectando con varios grupos en el vecindario y líderes comunitarios locales. También comenzó un ministerio para personas sin hogar y un programa de tutoría para los niños de Kips Bay. En mayo de 2012, el Pastor Richard se conectó con la Iglesia Remanente. Para 2013, se había unido a la iglesia como Pastor de Extensión, y en 2026, se convirtió en Pastor Asociado de la Iglesia Remanente. El Pastor Richard y Erika han estado casados por más de 30 años y están bendecidos con tres hijos: Richard, Paul y Matheux, todos los cuales actualmente sirven en su iglesia local como Líderes de Adoración y Líderes de Jóvenes.",
  },
  servingStaff: {
    en: "SERVING STAFF",
    es: "PERSONAL SIRVIENTE",
  },
  servingDesc: {
    en: "Matthew 9:38: \"Therefore, entreat the Lord of the harvest to dispatch laborers into His harvest.\"\n\nThis is a dedicated team of people who serve according to the biblical principles laid out in the Book of Acts. We want to understand what drives our serving staff and why they do what they do.",
    es: "Mateo 9:38: \"Por lo tanto, ruega al Señor de la cosecha que envíe obreros a su cosecha.\"\n\nEste es un equipo dedicado de personas que sirven de acuerdo con los principios bíblicos establecidos en el Libro de los Hechos. Queremos entender qué impulsa a nuestro personal de servicio y por qué hacen lo que hacen.",
  },
  interestedBtn: {
    en: "INTERESTED IN SERVING?",
    es: "¿INTERESADO EN SERVIR?",
  },
  childrenProgram: {
    en: "CHILDREN'S PROGRAM",
    es: "PROGRAMA INFANTIL",
  },
  childrenDesc: {
    en: "Matthew 19:14: \"But Jesus said, 'Permit the children to come to Me, and do not hinder them; for the kingdom of heaven belongs to such as these.'\"\n\nEvery Sunday, children come together for age-appropriate activities and teaching grounded in the biblical foundations of the Christian faith.",
    es: "Mateo 19:14: \"Pero Jesús dijo: 'Permitan que los niños vengan a Mí, y no se lo impidan; porque el reino de los cielos es para los que son como estos.'\" \n\nCada domingo, los niños se reúnen para actividades y enseñanzas apropiadas para su edad, fundamentadas en los fundamentos bíblicos de la fe cristiana.",
  },
  youthProgram: {
    en: "YOUTH PROGRAM",
    es: "PROGRAMA JUVENIL",
  },
  youthDesc: {
    en: "We believe the younger generation needs to be prepared well for their future. God's culture calls young people into worship and into understanding the language and promises of God. To support that, we have built a music program and offer free tutoring for students from third grade through high school.",
    es: "Creemos que la generación más joven necesita ser bien preparada para su futuro. La cultura de Dios llama a los jóvenes a adorar y a entender el lenguaje y las promesas de Dios. Para apoyar eso, hemos construido un programa de música y ofrecemos tutoría gratuita para estudiantes de tercero a duodécimo grado.",
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
                <Link href="/vine" className="nav-dropdown-item">
                  {t("vineTutoring")}
                </Link>
                <Link href="/children" className="nav-dropdown-item">
                  {t("children")}
                </Link>
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
        {t("introText").split("\n\n").map((paragraph, index) => (
          <p key={index} className="intro-text">
            {paragraph}
          </p>
        ))}
      </section>

      {/* Our Staff Section */}
      <section className="contact-section">
        <h2 className="ministries-title">{t("ourStaff")}</h2>
        
        <div className="contact-grid">

          {/* Pastors */}
          <div className="contact-column">
            <h3 className="contact-heading">{t("aguirreFamily")}</h3>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/b773ef0aae50cfd2f32785cd1f35aada44632d0a?width=2926"
              alt="NYC Skyline"
              className="staff-image"
              draggable="false"
            />
            <div className="contact-list">
              <p className="contact-line">
                {t("pastorDesc")}
              </p>
            </div>
          </div>

          {/* Serving Staff */}
          <div className="contact-column">
            <h3 className="contact-heading">{t("servingStaff")}</h3>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/b773ef0aae50cfd2f32785cd1f35aada44632d0a?width=2926"
              alt="NYC Skyline"
              className="staff-image"
              draggable="false"
            />
            <div className="contact-list">
              <p className="contact-line">
                {t("servingDesc")}
              </p>
            </div>
            <Link href="/connect" className="connect-btn">{t("interestedBtn")}</Link>
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
