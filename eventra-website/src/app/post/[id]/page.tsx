import PostDetail from "../component/PostDetail";

type Props = {
  params: {
    id: string;
  };
};

export default function PostDetails({ params }: Props) {
  return <PostDetail postId={params.id} />;
}
