import UserDetail from "../component/UserDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function UserPage({ params }: Props) {
  const { id } = await params;

  return <UserDetail userId={id} />;
}
