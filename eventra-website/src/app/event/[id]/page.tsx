import EventDetail from "../component/EventDetail";

type Props = {
  params: {
    id: string;
  };
};

export default function EventDetails({ params }: Props) {
  return <EventDetail eventId={params.id} />;
}
