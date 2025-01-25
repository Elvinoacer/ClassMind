import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";
import headerimg from "../assets/header.jpg";

function LandingPage() {
  return (
    <>
      <nav>
        <div className="nav__logo">
          <div>C</div>
          ClassMind
        </div>
        <LoginLink
          postLoginRedirectURL="/redirect"
          style={{
            backgroundColor: "#6EB0EC",
            color: "white",
            padding: "5px 10px",
            borderRadius: 30,
            fontWeight: "bold",
          }}
        >
          Login
        </LoginLink>
      </nav>
      <header className="header__container">
        <div className="header__image">
          <Image src={headerimg} alt="header" className="image" />
        </div>
        <div className="header__content">
          <h1>
            Single Platform For All Your <span>Learning</span> Needs.
          </h1>
          <p>
            Are you tired of disorganized notes and PDFs? Struggling to find the
            right file at the right moment? Look no further. ClassMind is the
            ultimate cloud storage solution designed to streamline your academic
            life. Organize your work effortlessly, access your files instantly,
            and preserve your academic journey for years to come.
          </p>
          <RegisterLink
            style={{
              backgroundColor: "#6EB0EC",
              color: "white",
              padding: "15px 30px",
              borderRadius: 30,
              fontWeight: "bold",
            }}
            postLoginRedirectURL="/redirect"
          >
            Get Started
          </RegisterLink>
        </div>

        <section>
          <ul className="nav__socials">
            <li>
              <a href="https://x.com/Elvinoace" target="_blank">
                <FaXTwitter />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=100092661322616"
                target="_blank"
              >
                <FaFacebook />
              </a>
            </li>
            <li>
              <a href="https://wa.me/254792156094" target="_blank">
                <RiWhatsappFill />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/elvinomondi/" target="_blank">
                <FaInstagram />
              </a>
            </li>

            <li className="nav__contact">
              <div className="nav__contact__card">
                <span>
                  <i className="ri-phone-line"></i>
                </span>
                <div className="border-[0.5px] px-4  rounded-full">
                  <h4>
                    <a
                      className="call-text text-gray-500"
                      href="tel:+254792156094"
                    >
                      Quick Call
                    </a>
                  </h4>
                </div>
              </div>
              <div className="nav__contact__card">
                <span>
                  <i className="ri-mail-line"></i>
                </span>
                <div className="">
                  <h4>
                    <a href="mailto:omondielvin@gmail.com">Email</a>
                  </h4>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </header>
    </>
  );
}

export default LandingPage;
