import React, { ReactChild, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useKeyPress, useOutsideClick } from "../../hooks";

interface Props {
  children: ReactChild;
  open: boolean;
  onClose: () => void;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
}

const modalRoot = document.getElementsByTagName("body");
const element = document.createElement("div");

const Overlay: React.FC<Props> = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const escPressed = useKeyPress("Escape");

  const closeOverlay = () => {
    props.onClose();
  };

  const handleOutsideClick = () => {
    if (props.closeOnOutsideClick) {
      closeOverlay();
    }
  };
  useOutsideClick(ref, handleOutsideClick);

  useEffect(() => {
    if (escPressed && props.closeOnEscape) {
      closeOverlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [escPressed]);

  useEffect(() => {
    if (modalRoot.length === 0) {
      throw new Error("cannot find body tag");
    }
    modalRoot[0].appendChild(element);
    return () => {
      if (modalRoot.length !== 0) modalRoot[0].removeChild(element);
    };
  }, []);

  if (!props.open) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="sm:block sm:p-0 flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div
          className="bg-slate-500 fixed inset-0 transition-opacity bg-opacity-75"
          aria-hidden="true"
        ></div>

        <span
          className="sm:inline-block sm:align-middle sm:h-screen hidden"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          ref={ref}
          className="sm:my-8 sm:align-middle sm:max-w-lg sm:w-full inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl"
        >
          <div className="sm:p-6 sm:pb-4 px-4 pt-5 pb-4 bg-white">
            <div className="sm:flex sm:items-start">
              {props.open && props.children}
            </div>
          </div>
        </div>
      </div>
    </div>,
    element
  );
};

export default Overlay;
