"use client";

import image2 from "@/assets/img/trophy_processed.jpg";
import { Student } from "@/types/prismatypes";
import Image from "next/image";
import { useRef } from "react";
import { IoStar } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import FavoritedList from "./favorited-list";

function FavoritedByModal({
  favoritedBys,
  studentId,
}: {
  studentId: string;
  favoritedBys: { filename: string; favBys: Student[] }[];
}) {
  const modalContainer = useRef<HTMLDivElement | null>(null);
  const openBtn = useRef<HTMLButtonElement | null>(null);
  const showModal = () => {
    if (openBtn && modalContainer) {
      modalContainer.current!.classList.add("show-modal-FAV");
    }
  };

  function closeModal() {
    modalContainer.current!.classList.remove("show-modal-FAV");
  }

  // modal-FAV container-FAV  TODO REMOVE THESE CLASSNAMES

  return (
    <section className="">
      <button
        onClick={showModal}
        className="button-FAV modal__button-FAV font-bold uppercase"
        ref={openBtn}
      >
        My Fans
      </button>

      <div className="modal__container-FAV bg-blue-500" ref={modalContainer}>
        <div className="modal__content-FAV">
          <div
            onClick={closeModal}
            className="modal__close-FAV close-modal"
            title="Close"
          >
            <MdClose />
          </div>

          <div className="w-full flex justify-center">
            <Image
              src={image2}
              alt=""
              width={100}
              className="img-FAV modal__img-FAV"
            />
          </div>

          <h1 className="modal__title-FAV static">Good Job!</h1>

          <div className="description-Fav">
            <div className="modal__description-FAV static">
              Here&apos;s the list of people who enjoy your files
            </div>
            <div className="">
              <IoStar size={16} color="gold" />
            </div>
          </div>

          <div className="list-fav">
            <FavoritedList studentId={studentId} favoritedBys={favoritedBys} />
          </div>

          <button
            onClick={closeModal}
            className="modal__button-link-FAV close-modal static button-FAV "
          >
            <span className="text-[whitesmoke] font-bold uppercase">Close</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default FavoritedByModal;
