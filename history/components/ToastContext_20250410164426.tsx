export function ToastProvider({
  children,
  position = 'bottom-right',
  maxVisible = 3,
  iconsOnly = false,
}: {
  children: React.ReactNode;
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
  maxVisible?: number;
  iconsOnly?: boolean;
}) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((type: ToastType, message: string, duration?: number) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message, duration }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration || 3000);
  }, []);

  const positionClassMap = {
    'top-right': 'toast-top-right',
    'top-center': 'toast-top-center',
    'bottom-right': 'toast-bottom-right',
    'bottom-center': 'toast-bottom-center',
  };

  const positionClass = positionClassMap[position] || 'toast-bottom-right';

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        <div className={positionClass}>
          {toasts.slice(-maxVisible).map(({ id, type, message, duration }) => (
            <Toast
              key={id}
              type={type}
              message={iconsOnly ? '' : message}
              duration={duration}
              onClose={() => setToasts((prev) => prev.filter((t) => t.id !== id))}
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== id))}
            />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}