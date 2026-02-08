import VenueDetail from "../component/VenueDetail";

type Props = {
  params: {
    id: string;
  };
};

export default function VenueDetails({ params }: Props) {
  return <VenueDetail venueId={params.id} />;
}
