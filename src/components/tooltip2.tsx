import Image from "next/image";
import image from "../assets/img/insect-1.png";
import React from "react";

function ToolTip2() {
  return (
    <div className="card__content">
      <header className="card__header">
        <span>Social</span>

        <div className="card__social">
          <a href="https://www.linkedin.com/" target="_blank">
            <i className="ri-linkedin-box-line"></i>
          </a>

          <a href="https://github.com/" target="_blank">
            <i className="ri-github-fill"></i>
          </a>

          <a href="https://dribbble.com/" target="_blank">
            <i className="ri-dribbble-line"></i>
          </a>
        </div>
      </header>

      <div className="card__data">
        <div className="card__image">
          <div className="card__mask">
            <Image src={image} alt="image" className="card__img" />
          </div>

          <span className="card__status"></span>
        </div>

        <h2 className="card__name">Evalyn Adson</h2>
        <h3 className="card__profession">Web designer</h3>

        <a href="#" className="card__button">
          <i className="ri-chat-3-line"></i> <span>Send Message</span>
        </a>
      </div>
    </div>
  );
}

export default ToolTip2;
