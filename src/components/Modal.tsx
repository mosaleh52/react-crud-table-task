import { ReactNode } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
}) {
  return createPortal(
    <dialog open={isOpen} aria-modal="true" aria-labelledby="dialog-title">
      <h2 id="dialog-title">{title}</h2>
      <button onClick={onClose}>X</button>
      {children}
    </dialog>,
    document.body,
  );
}
