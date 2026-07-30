import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

const ToastContext = createContext(null);


export function ToastProvider({ children }) {

  const [toasts, setToasts] = useState([]);


  const showToast = useCallback(
    (message, type = "info") => {

      const id = Date.now();

      setToasts((prev) => [
        ...prev,
        {
          id,
          message,
          type,
        },
      ]);


      setTimeout(() => {

        setToasts((prev) =>
          prev.filter(
            (toast) => toast.id !== id
          )
        );

      }, 3500);

    },
    []
  );



  const removeToast = (id) => {

    setToasts((prev) =>
      prev.filter(
        (toast) => toast.id !== id
      )
    );

  };



  const toastStyles = {
    success: {
      bg: "bg-green-600",
      icon: "✅",
    },

    error: {
      bg: "bg-red-600",
      icon: "❌",
    },

    warning: {
      bg: "bg-yellow-500",
      icon: "⚠️",
    },

    info: {
      bg: "bg-blue-600",
      icon: "ℹ️",
    },
  };



  return (

    <ToastContext.Provider
      value={{
        showToast,
      }}
    >

      {children}


      <div className="fixed top-6 right-6 z-[100] space-y-3">

        {toasts.map((toast) => {

          const style =
            toastStyles[toast.type] ||
            toastStyles.info;


          return (

            <div
              key={toast.id}
              onClick={() =>
                removeToast(toast.id)
              }
              className={`
                ${style.bg}
                flex items-center gap-3
                min-w-[280px]
                rounded-2xl
                px-5 py-4
                text-white
                shadow-xl
                cursor-pointer
                animate-[slideIn_0.3s_ease-out]
              `}
            >

              <span className="text-xl">
                {style.icon}
              </span>


              <p className="text-sm font-medium">
                {toast.message}
              </p>


            </div>

          );

        })}

      </div>


    </ToastContext.Provider>

  );

}



export function useToast() {

  const context = useContext(ToastContext);


  if (!context) {

    throw new Error(
      "useToast must be used inside ToastProvider"
    );

  }


  return context;

}