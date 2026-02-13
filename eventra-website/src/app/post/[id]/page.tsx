import PostDetail from "../component/PostDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostDetails({ params }: Props) {
  const { id } = await params;

  return <PostDetail postId={id} />;
}
