import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({children}) {
  const elementRef = useRef(null);
  if (!elementRef.current) {
    elementRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elementRef.current);

    //funkcja wykonana po odmontowaniu komponentu
    return () => {
      modalRoot.removeChild(elementRef.current);
    };
  }, []);

  return createPortal(<div>{children}</div>, elementRef.current);
}

export default Modal;
