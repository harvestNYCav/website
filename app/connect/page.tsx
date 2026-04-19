"use client";

import { useState } from "react";
import Link from "next/link";

type Language = "en" | "es";

export default function ConnectPage() {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <>
      {/* Announcement Banner */}
      <div className="announcement-bar">
        SOME SORT OF ANNOUNCEMENT HERE
      </div>

      {/* Navigation */}
      <nav className="site-nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            HARVEST LOGO
          </Link>

          <div className="nav-links">
            <Link href="/about" className="nav-link">
              ABOUT US
            </Link>
            <Link href="/#ministries" className="nav-link">
              MINISTRIES
            </Link>
            <Link href="/#involved" className="nav-link">
              GET INVOLVED
            </Link>
            <Link href="/connect" className="nav-link nav-link--active">
              CONNECT
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
          <h1 className="hero-title">CONNECT WITH US</h1>
        </div>
      </div>

      {/* Intro Section */}
      <section className="intro-section">
        <p className="intro-text">
          We&apos;d love to get to know you!<br />
          For more information, blahblahb blah xyz<br />
          xyz xyz xyz lah blah
        </p>
      </section>

      {/* Contact Sections */}
      <section className="contact-section">
        <div className="contact-grid">

          {/* Harvest */}
          <div className="contact-column">
            <h3 className="contact-heading">HARVEST</h3>
            <div className="contact-list">
              <p className="contact-line">
                <span className="contact-name">Aldo Wiloto:</span>{" "}
                <a href="mailto:aldowiloto@gmail.com" className="contact-email">
                  aldowiloto@gmail.com
                </a>
              </p>
              <p className="contact-line">
                <span className="contact-name">Rachel Guen:</span>{" "}
                <a href="mailto:rguen97@gmail.com" className="contact-email">
                  rguen97@gmail.com
                </a>
              </p>
            </div>
            <button className="connect-btn">CONNECT</button>
          </div>

          {/* Vine Tutoring */}
          <div className="contact-column">
            <h3 className="contact-heading">VINE TUTORING</h3>
            <div className="contact-list">
              <p className="contact-line">
                <span className="contact-name">Aldo Wiloto:</span>{" "}
                <a href="mailto:aldowiloto@gmail.com" className="contact-email">
                  aldowiloto@gmail.com
                </a>
              </p>
              <p className="contact-line">
                <span className="contact-name">Rachel Guen:</span>{" "}
                <a href="mailto:rguen97@gmail.com" className="contact-email">
                  rguen97@gmail.com
                </a>
              </p>
            </div>
            <button className="connect-btn">CONNECT</button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <h3 className="footer-title">HARVEST NYC</h3>
        <div className="footer-icons">
          <a href="https://www.youtube.com/@harvestinthecity" target="_blank" rel="noopener noreferrer">
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
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/d4de61100a8688fad8f49f3af86899013ee08870?width=224"
            alt="Remnant Church"
            className="footer-icon footer-icon--wide"
            draggable="false"
          />
        </div>
      </footer>
    </>
  );
}
