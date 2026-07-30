function EmptyState({
  title = "No Data Found",
  message = "There is nothing to display here.",
  actionText,
  onAction,
  icon = "📭",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">

      <div className="text-6xl mb-5">
        {icon}
      </div>

      <h2 className="text-2xl font-bold text-gray-800">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        {message}
      </p>

      {actionText && (
        <button
          onClick={onAction}
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          {actionText}
        </button>
      )}

    </div>
  );
}

export default EmptyState;