import React, { Fragment, useState } from "react";

import styles from "./shipment.module.scss";
import ModalpopUp from "../modalpopup/index";

interface Todo {
  id: number;
  title: string;
  subtitle: string;
  amount: string;
}

const ShipmentPage = () => {
  const [datas, setDatas] = useState([
    {
      title: "Total transit Days",
      days: "28 Days",
      days2: "31 Days",
      days3: "35 Days",
    },
    {
      title: "Free Days",
      days: "7 Days",
      days2: "5 Days",
      days3: "10 Days",
    },
    {
      title: " Fuel surcharge (SSC)",
      days: "$2000",
      days2: "$2000",
      days3: "$2000",
    },
  ]);

  const [tableHeads, setTableHeadsTodos] = useState<Todo[]>([
    {
      id: 1,
      title: "Interasia",
      subtitle: "Highland Supply",
      amount: "$19,000",
    },

    {
      id: 2,
      title: "Interasia",
      subtitle: "Highland Supply",
      amount: "$19,000",
    },

    {
      id: 3,
      title: "Interasia",
      subtitle: "Highland Supply",
      amount: "$19,000",
    },
  ]);

  return (
    <>
      <div className="container">
        <h1 className={styles.title}>Quote Comparision</h1>
        <div className={styles.table_content}>
          <table>
            <thead>
              <tr>
                <th>
                  <h2 className={styles.title}></h2>
                  <p
                    className={styles.subtitle}
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    {" "}
                  </p>
                  <p className={styles.amount}></p>

                  {/* <ModalpopUp /> */}
                </th>

                {tableHeads.map((todo, index) => {
                  return (
                    <Fragment key={index}>
                      <th>
                        <h2 className={styles.title}>{todo.title}</h2>
                        <p
                          className={styles.subtitle}
                          style={{
                            whiteSpace: "nowrap",
                          }}
                        >
                          {" "}
                          {todo.subtitle}
                        </p>
                        <p className={styles.amount}>{todo.amount}</p>

                        <ModalpopUp />
                      </th>
                    </Fragment>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {datas.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>
                    <b>{item.days}</b>
                  </td>
                  <td>
                    <b>{item.days2}</b>
                  </td>
                  <td>
                    <b>{item.days3}</b>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <hr className={styles.line} />

        <div
          className={styles.footer}
          style={{
            position: "sticky",
            top: 0,
            background: "#fff",
            zIndex: 1,
          }}
        >
          <button className={styles.footer_discard}>Discard</button>
          <button className={styles.footer_btn}>Compare</button>
        </div> */}
      </div>
    </>
  );
};

export default ShipmentPage;
