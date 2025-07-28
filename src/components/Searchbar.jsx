import { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 justify-center">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city..."
        className="p-2 rounded-md w-72 bg-white text-black shadow-md"
      />
      <button
        type="submit"
        className="bg-white text-black px-4 rounded shadow hover:bg-gray-200 flex items-center gap-1"
      >
        <Search className="w-4 h-4" /> Search
      </button>
    </form>
  );
};

export default SearchBar;