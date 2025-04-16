const ProgressBar = ({ progress }) => {
  const color = progress === 100 ? 'bg-green-500' : progress < 50 ? 'bg-yellow-400' : 'bg-indigo-600';
  return (
    <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${color}`}
        style={{ width: \`\${progress}%\` }}
      />
    </div>
  );
};

export default ProgressBar;
