import React from "react";
import { Button, Modal } from "@mui/material";
import styles from "./confirmationModal.module.scss";

type ExecFunction = (...args: any[]) => any;
type Props = {
  handleClose: (...args: any[]) => void;
  confirmationTxt: string;
  execFunc: ExecFunction;
  open: boolean;
};
const ConfirmationModal: React.FC<Props> = ({
  handleClose,
  confirmationTxt,
  execFunc,
  open,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={styles.modal}
    >
      <div className={styles.modalContainer}>
        <h2 id="simple-modal-title">{confirmationTxt}</h2>
        <div className={styles.buttonContainer}>
          <Button
            onClick={execFunc}
            variant="contained"
            color="error"
            className={styles.execButton}
          >
            はい
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            color="success"
            className={styles.cancelButton}
          >
            いいえ
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
