type CustomLoaderProps = {
  size?: number; // px
  text?: string;
  fullScreen?: boolean;
};

export default function CustomLoader({
  size = 40,
  text,
  fullScreen = false,
}: CustomLoaderProps) {
  const spinner = (
    <div
      className="animate-spin rounded-full border-4 border-gray-300 border-t-black"
      style={{ width: size, height: size }}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
        {spinner}
        {text && <p className="mt-3 text-sm text-gray-600">{text}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {spinner}
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  );
}
