import { useState, useCallback } from "react";

export const useModal = (className = "no-scroll") => {
  const [isModalShow, setIsModalShow] = useState(false);

  const openModal = useCallback(() => {
    setIsModalShow(true);
    document.body.classList.add(className);
  }, [className]);

  const closeModal = useCallback(() => {
    document.body.classList.remove(className);
    setIsModalShow(false);
  }, [className]);

  return {
    isModalShow,
    openModal,
    closeModal,
  };
};
