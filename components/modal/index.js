import React, { useContext } from "react";
import cn from "classnames";

import ModalContext from "../../store/modal";
import { Close } from "../icons";
import Button from "../button";
import styles from "./modal.module.scss";

const Modal = ({ children, className, ...props }) => {
  const { ref, setIsVis } = useContext(ModalContext);
  return (
    <>
      <div className={cn(styles.modal, className)} {...props}>
        <div ref={ref} className={styles.modalDialog}>
          <Button
            className={styles.closeButton}
            onClick={() => setIsVis((isOpen) => !isOpen)}
          >
            <Close />
          </Button>
          {children}
        </div>
      </div>
    </>
  );
};
