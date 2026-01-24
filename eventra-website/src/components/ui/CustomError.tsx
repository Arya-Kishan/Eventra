"use client";

interface CustomErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function CustomError({
  title = "Something went wrong",
  message = "Please try again later.",
  onRetry,
}: CustomErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-4xl mb-4">⚠️</div>

      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-500 mt-2">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Retry
        </button>
      )}
    </div>
  );
}
