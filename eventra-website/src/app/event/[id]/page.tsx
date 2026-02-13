import EventDetail from "../component/EventDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EventDetails({ params }: Props) {
  const { id } = await params;
  return <EventDetail eventId={id} />;
}
