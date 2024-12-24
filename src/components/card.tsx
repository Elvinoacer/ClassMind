"use client";
import { LoadingButton } from "@mui/lab";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CircularColor from "./material-ui/circular-progress";

function Card({
  logo,
  image,
  name,
  institutionId,
}: {
  logo: string;
  image: string;
  name: string;
  institutionId?: string;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <article className="card__article">
        <Image
          height={40}
          width={40}
          src={logo}
          alt="image"
          className="card__img"
        />

        <div className="card__data">
          <h3 className="card__title">
            {/* Elegant <br /> Queen Bee */}
            {name}
          </h3>
          {/* <span className="card__price">$5999</span> */}
        </div>

        <Image
          height={300}
          width={300}
          src={image}
          alt="image"
          className="card__bg"
        />

        <Link
          onClick={() => setLoading(true)}
          href={`/institutions/${institutionId}`}
          // loading={loading}
          className="card__button"
        >
          {loading ? <CircularColor size={15} /> : "Continue "}
        </Link>
      </article>
    </>
  );
}

export default Card;
