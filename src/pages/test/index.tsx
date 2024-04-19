import React, { useState } from "react";
import Head from "next/head";

const TestPage = () => {
  const [count, setCount] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);

  const increment = () => {
    setCount(count + 1);
  };

  const increment2 = () => {
    setCount2((prev) => prev + 3);
  };

  return (
    <>
      <Head>
        <title>Test Page</title>
      </Head>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <h1>Count: {count2}</h1>
      <button onClick={increment2}>Increment in three</button>
    </>
  );
};

export default TestPage;
