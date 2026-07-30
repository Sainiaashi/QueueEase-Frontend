function ConfirmModal({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = true,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-8 animate-in fade-in zoom-in duration-200">

        {/* Icon */}

        <div className="flex justify-center mb-5">

          <div
            className={`h-16 w-16 rounded-full flex items-center justify-center text-3xl ${
              danger
                ? "bg-red-100"
                : "bg-blue-100"
            }`}
          >
            {danger ? "⚠️" : "ℹ️"}
          </div>

        </div>


        {/* Content */}

        <div className="text-center">

          <h3 className="text-2xl font-bold text-gray-800">
            {title}
          </h3>

          <p className="mt-3 text-gray-500 text-sm leading-relaxed">
            {message}
          </p>

        </div>


        {/* Actions */}

        <div className="mt-8 flex gap-3">

          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            {cancelText}
          </button>


          <button
            onClick={onConfirm}
            className={`flex-1 rounded-xl py-3 font-semibold text-white transition ${
              danger
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmModal;