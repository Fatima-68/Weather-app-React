import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

const RecentSearches = ({ onSelect }) => {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recent') || '[]');
    setRecent(stored);
  }, []);

  return (
    <div className="card w-full md:w-1/3">
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5" /> Recent Searches
      </h3>
      <ul className="space-y-2">
        {recent.map((city, idx) => (
          <li
            key={idx}
            onClick={() => onSelect(city)}
            className="cursor-pointer hover:underline"
          >
            <span className="font-bold mr-2">{idx + 1}.</span> {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;
