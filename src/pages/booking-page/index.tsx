import { TbRefresh } from "react-icons/tb";
import { FaPen } from "react-icons/fa6";
import Tabs from "../../components/Tabs";
import TickImg from "../../asset/green_tick_circle.svg";
import styles from "./booking.module.scss";
import { Modal, Button } from "antd";

import Head from "next/head";
import Image from "next/image";

import React, { useState } from "react";

const BookingPage = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isActiveTick, setIsActiveTick] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const refreshBtn = () => {
    setIsActive(!isActive);
  };

  const bookingConfirm = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setIsActiveTick(true);
    setStartDate("");
    setEndDate("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Head>
        <title>Bookings | Wiz</title>
      </Head>
      <style jsx global>{`
        body {
          padding: 0px !important;
        }
      `}</style>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.title}>
            <h3>Shipment Tracking </h3>
            <TbRefresh
              className={`${styles.refresh} ${
                isActive ? styles.activeRefresh : ""
              }`}
            />
            <span
              className={styles.textcolor}
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
              }}
              onClick={refreshBtn}
            >
              Refresh
            </span>
          </div>

          <div className={styles.bookingarea}>
            <div className="book-seecld">
              <h4>Booking created</h4>
              <p>Completed on 30-Jan-2024</p>
            </div>
            <div className="book-seecld">
              <h4>
                Booking Confirmed - CB{" "}
                <span className={styles.textcolor} onClick={bookingConfirm}>
                  <FaPen style={{ width: 30, fontSize: "1rem" }} />
                </span>
                <Modal
                  // style={{margin:0, fontWeight:'500', borderBottom:'1px solid #dddddd'}}
                  style={{ padding: 0 }}
                  title={
                    <h4 style={{ margin: 0, fontWeight: "500" }}>
                      Add Booking Confirmed - CB Details
                    </h4>
                  }
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={[
                    <>
                      <div style={{ textAlign: "center" }}>
                        <Button
                          key="ok"
                          onClick={handleOk}
                          className={styles.addbtn}
                          style={{
                            backgroundColor: "#5c20cf",
                            color: "#fff",
                            padding: "1rem 5rem 2rem",
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </>,
                  ]}
                >
                  <div>
                    <div style={{ marginTop: "2rem", marginBottom: "4rem" }}>
                      <label
                        style={{
                          color: "#666666",
                          marginBottom: "1rem",
                          display: "inline-block",
                        }}
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className={styles.dateInput}
                      />
                    </div>
                    <div style={{ marginTop: "1rem", marginBottom: "2rem" }}>
                      <label
                        style={{
                          color: "#666666",
                          marginBottom: "1rem",
                          display: "inline-block",
                        }}
                      >
                        Date
                      </label>

                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className={styles.dateInput}
                      />
                    </div>
                  </div>
                </Modal>
              </h4>
              <p>Estimate 31 Jan 2024</p>
            </div>
            <div className="book-seecld">
              <h4>Booking completed</h4>
              <p>Estimate 01 Feb 2024</p>
            </div>

            <div className={styles.virtual}></div>

            <div className={styles.tickimg}>
              <Image src={TickImg} width={14} height={14} alt="TickImg" />
            </div>

            <div className={styles.ellipse}>
              {isActiveTick ? (
                <>
                  <Image
                    src={TickImg}
                    width={14}
                    height={14}
                    alt="TickImg"
                    style={{ position: "relative", top: "-2px", left: "-1px" }}
                  />
                </>
              ) : (
                ""
              )}
            </div>
            <div className={styles.ellipse2}></div>
          </div>
        </div>

        <Tabs />
      </div>
    </>
  );
};

export default BookingPage;
