import React, { useState } from "react";
import { Button, Modal } from "antd";
import styles from "./modalpop.module.scss";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={showModal}
        style={{
          width: "100%",
        }}
        className={styles.btn}
      >
        Approve
      </Button>

      <Modal
        title="Are you sure you want to Approve this Quote?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className={styles.para}>
          By confirming this, Quote will be accepted and cannot be undone.
        </p>
      </Modal>
    </>
  );
};

export default App;
