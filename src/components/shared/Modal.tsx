"use client";
import React, {
  useEffect,
  useState,
  ReactNode,
  forwardRef,
  useImperativeHandle,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/shared/Icon";

export interface ModalHandle {
  slideTo: (index: number) => void;
}

const Modal = forwardRef<
  ModalHandle,
  {
    open: boolean;
    onClose: () => void;
    children: ReactNode[] | ReactNode;
    title: string;
  }
>(function Modal({ open, onClose, children, title }, ref) {
  // Stelle sicher, dass children ein Array ist
  const slides = React.Children.toArray(children);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Scrollen der Seite deaktivieren, wenn Modal geöffnet ist
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "inherit";
  }, [open]);

  // Methode zum externen Steuern der Slides
  const slideTo = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index);
    }
  };

  // Exponiere die slideTo-Methode an die übergebene ref
  useImperativeHandle(ref, () => ({
    slideTo,
  }));

  // Reset des aktuellen Slides, wenn das Modal geschlossen wird
  useEffect(() => {
    if (!open) {
      setCurrentSlide(0);
    }
  }, [open]);

  return (
    open && (
      <div
        className="fixed inset-0 bg-purple-very-dark bg-opacity-75 flex justify-center items-center z-30"
      >
        <div
          className="relative bg-purple-dark p-5 rounded-main shadow-main border-purple-light border-2 z-40"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header des Modals */}
          <div className="flex justify-between items-center pb-4">
            <div className="flex-1"></div>
            <div className="w-[80%]">
              <p className="fs-8 font-medium text-pink-very-light text-center">
                {title}
              </p>
            </div>
            <div className="flex-1 flex justify-end">
              <Icon name="close" color="pink-very-light" onClick={onClose} />
            </div>
          </div>

          {/* Slide Container */}

          <AnimatePresence mode="wait">
            <div key={currentSlide} className="w-full">
              {slides[currentSlide]}
            </div>
          </AnimatePresence>
        </div>
      </div>
    )
  );
});
export default Modal;

export const Slide = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      className={`min-w-[500px] flex justify-center items-center flex-col ${className} gap-[--spacing-7]`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.div>
  );
};
