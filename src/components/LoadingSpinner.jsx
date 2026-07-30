function LoadingSpinner({
  text = "Loading...",
  fullScreen = true,
}) {
  return (
    <div
      className={`${
        fullScreen ? "min-h-screen" : "py-16"
      } flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50`}
    >
      <div className="flex flex-col items-center">

        {/* Spinner */}

        <div className="relative h-16 w-16">

          <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>

          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>

          <div className="absolute inset-3 rounded-full bg-blue-600 animate-pulse"></div>

        </div>

        <h3 className="mt-6 text-lg font-semibold text-gray-800">
          Please wait
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          {text}
        </p>

      </div>
    </div>
  );
}

export default LoadingSpinner;