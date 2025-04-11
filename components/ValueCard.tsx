'use client';

interface ValueItem {
  text: string;
}

interface ValueCardProps {
  title: string;
  items: ValueItem[];
  className?: string;
}

export default function ValueCard({
  title,
  items,
  className = ''
}: ValueCardProps) {
  return (
    <div className={`hover-lift mac-glass p-6 rounded-xl ${className}`}>
      <h4 className="text-lg font-semibold text-blue-600 mb-3">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
