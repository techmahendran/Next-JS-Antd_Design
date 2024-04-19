/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Typography } from "antd";

import Head from "next/head";

const { Title } = Typography;

interface PostData {
  id: number;
  title: string;
  body: string;
}

const GetDataPage: React.FC = () => {
  // Next.js router hook for accessing the router object
  const router = useRouter();

  // Destructuring postId from the router query
  const { postId } = router.query;

  // State variable to store the fetched post data
  const [postData, setPostData] = useState<PostData | null>(null);

  // State variable to store any error occurred during data fetching
  const [error, setError] = useState<string | null>(null);

  // State variable to track loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const API_URL = `https://jsonplaceholder.typicode.com/posts/${postId}`;

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        // Making a GET request to the API endpoint and expecting response of type PostData
        const response = await axios.get<PostData>(API_URL);

        // Updating the state with the data received from the API
        setPostData(response.data);

        // Clearing any previous errors if data fetching is successful
        setError(null);
      } catch (error) {
        // Handling errors if any occurred during data fetching
        setError(`Error: ${(error as Error).message}`);
      } finally {
        // Setting isLoading to true to indicate the end of data fetching process
        setIsLoading(true);
      }
    };

    setTimeout(() => {
      if (postId) {
        fetchData();
      }
    }, 2000);
  }, [postId]);

  return (
    <>
      <Head>
        <title>Api Get Data-Page</title>
      </Head>
      {/* Display loading message while data is being fetched */}
      {!isLoading && <Title level={5}>Loading...</Title>}

      {/* Display error message if an error occurred during data fetching */}
      {error && <h2>{error}</h2>}

      {/* Display fetched post data if loading is complete and no error occurred */}
      {isLoading && !error && postData && (
        <>
          <Title level={1}>Get Data</Title>
          <Title level={5} style={{ fontWeight: "300" }}>
            {/* Displaying title and body of the fetched post */}
            <p>
              <b>Title:</b> {postData.title}
            </p>
            <p style={{ width: "50%" }}>
              <b>Body:</b> {postData.body}
            </p>
          </Title>
        </>
      )}
    </>
  );
};

export default GetDataPage;
