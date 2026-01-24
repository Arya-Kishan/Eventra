interface CustomEmptyProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export default function CustomEmpty({
  title = "No data found",
  description = "Try adjusting your filters or add new items.",
  action,
}: CustomEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <div className="text-4xl mb-4">📭</div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-500 mt-2">{description}</p>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
