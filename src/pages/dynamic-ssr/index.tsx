// pages/[id].tsx

import { GetServerSideProps } from 'next';

type Post = {
  id: string;
  title: string;
  body: string;
};

interface PostPageProps {
  post: Post;
}

const PostPage = ({ post }: PostPageProps) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PostPageProps> = async ({ params }) => {
//   const { id } = params;
  
  // Fetch data for the specific post using the dynamic route parameter (id)
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const post: Post = await res.json();

  return {
    props: {
      post,
    },
  };
};

export default PostPage;
