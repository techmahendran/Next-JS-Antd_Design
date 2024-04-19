/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";

const productIdPage = () => {
  const router = useRouter();

  const productId = router.query.productId;
  
  return <h1>productIdPage {productId}</h1>;
};

export default productIdPage;
