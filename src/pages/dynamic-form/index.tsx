import React, { useState } from "react";
import { Form, InputNumber, Button, Typography } from "antd";
import styles from "./dynamic-form.module.scss";
// import { MinusCircleOutlined } from "@ant-design/icons";

import Head from "next/head";

const { Title } = Typography;

// declare InputValues
interface InputValues {
  id: number;
  value1: number;
  value2: number;
}

const FormGroup: React.FC = () => {
  const [inputValues, setInputValues] = useState<InputValues[]>([
    // { id: 1, value1: 0, value2: 0 },
  ]);
  const [total, setTotal] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleChange = (id: number, field: string, value: number) => {
    const newInputValues = inputValues.map((input) =>
      input.id === id ? { ...input, [field]: value } : input
    );
    setInputValues(newInputValues);
    calculateSum(newInputValues);
  };

  const calculateSum = (values: InputValues[]) => {
    const sum = values.reduce(
      (acc, curr) => acc + curr.value1 + curr.value2,
      0
    );
    setTotal(sum);
  };

  const handleAddInput = () => {
    const newId = inputValues.length + 1;
    setInputValues([
      ...inputValues,
      { id: newId, value1: 0, value2: 0 }, // Add a new item with default values
    ]);
    setIsActive(true); // Activate form items
  };

  return (
    <>
      <Head>
        <title>Dynamic Form Fields</title>
      </Head>

      <Title level={2} style={{ textAlign: "center", paddingBottom: 10 }}>
        Dynamic Field
      </Title>

      <Form layout="vertical" autoComplete="off" className={styles.form}>
        {isActive && // Conditional rendering based on isActive state
          inputValues.map((input, index) => (
            <div key={input.id} className={styles.container}>
              <span className={styles.row}>{`Row ${input.id}`}</span>
              <Form.Item
                // label={`Number ${input.id}`}
                className={styles.inputItem}
              >
                <InputNumber
                  value={input.value1}
                  onChange={(value) =>
                    handleChange(input.id, "value1", value as number)
                  }
                />
              </Form.Item>
              <Form.Item>
                <InputNumber
                  value={input.value2}
                  onChange={(value) =>
                    handleChange(input.id, "value2", value as number)
                  }
                />
              </Form.Item>
            </div>
          ))}
        <div className={styles.formBtn}>
          <Form.Item>
            <Button
              type="dashed"
              onClick={handleAddInput}
              style={{
                width: "20%",
                textAlign: "center",
                backgroundColor: "#5c20cf",
              }}
            >
              Add Input Item
            </Button>
          </Form.Item>
          {isActive && (
            <Typography>
              <h5>
                Sum value is :{" "}
                <span style={{ fontSize: "25px" }}> {total}</span>
              </h5>
            </Typography>
          )}
        </div>
      </Form>
    </>
  );
};

export default FormGroup;
