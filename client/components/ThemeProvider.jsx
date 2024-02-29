import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  
  // Define Tailwind classes based on the current theme
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-[rgb(16,23,42)]';
  const textColorClass = theme === 'light' ? 'text-gray-700' : 'text-gray-200';

  return (
    <div className={`min-h-screen ${bgClass} ${textColorClass}`}>
      {children}
    </div>
  );
}
