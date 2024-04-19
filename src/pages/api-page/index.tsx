import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, Typography } from "antd";
import Head from "next/head";

const { Title } = Typography;

interface postsData {
  id: number; // Unique identifier for the postsData
  title: string; // Title of the postsData
}

const APiPage: React.FC = () => {
  const [postDatas, setPostDatas] = useState<postsData[]>([]);

  const router = useRouter();

  // API URL to fetch data from
  const API_URL = "https://jsonplaceholder.typicode.com/posts";

  // Effect hook to fetch data from the API when the component mounts
  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        // Making a GET request to the API endpoint
        const response = await axios.get(API_URL);

        // Updating the state with the data received from the API
        setPostDatas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Rendering the component JSX
  return (
    <>
      <Head>
        <title>Api Post-Page</title>
      </Head>

      <Title level={1}>Post Datas</Title>

      <ol>
        {/* Mapping over the postDatas array to render each postData */}
        {postDatas.map((postData, index) => (
          <Fragment key={index}>
            <Title level={5} style={{ fontWeight: "300" }}>
              <li>
                {postData.title}{" "}
                <Button
                  style={{ marginLeft: 8 }}
                  onClick={() =>
                    router.push({
                      pathname: "/get-data", // Pathname of the target page
                      query: { postId: postData.id }, // Query parameter containing the postData's ID
                    })
                  }
                >
                  Get Data
                </Button>
              </li>
            </Title>
          </Fragment>
        ))}
      </ol>
    </>
  );
};

export default APiPage;
