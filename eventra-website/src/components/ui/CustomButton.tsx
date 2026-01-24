"use client";

interface CustomButtonProps {
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function CustomButton({
  loading = false,
  disabled = false,
  onClick,
  children,
  className = "",
}: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md
        bg-blue-600 text-white disabled:opacity-50 ${className}`}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
