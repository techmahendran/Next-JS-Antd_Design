import { Segmented } from "antd";

import Head from "next/head";

const Demo: React.FC = () => (
  <>
    <Head>
      <title>Segment-page</title>
    </Head>

    <Segmented
      options={["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]}
      onChange={(value) => {
        console.log(value);
      }}
    />
  </>
);

export default Demo;
