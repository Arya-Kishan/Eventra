import VenueDetail from "../component/VenueDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function VenueDetails({ params }: Props) {
  const { id } = await params;
  return <VenueDetail venueId={id} />;
}
