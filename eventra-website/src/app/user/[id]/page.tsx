import UserDetail from "../component/UserDetail";

type Props = {
  params: {
    id: string;
  };
};

export default function UserPage({ params }: Props) {
  return <UserDetail userId={params.id} />;
}
