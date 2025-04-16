const PopupWrapper = ({ children }) => (
  <div
    role="dialog"
    aria-modal="true"
    className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 opacity-100 scale-100"
  >
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl">
      {children}
    </div>
  </div>
);

export default PopupWrapper;
