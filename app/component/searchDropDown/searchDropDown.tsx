"use client"
// components/SearchDropdown.tsx
import { useState, useEffect, useCallback } from 'react';
import { debounce } from "lodash"


// https://www.carlrippon.com/using-lodash-debounce-with-react-and-ts/

interface User {
  id: number;
  name: string;
}

interface SearchDropdownProps {
    fetchUsers: (searchTerm: string) => Promise<User[]>;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ fetchUsers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const handleSearch = useCallback(
    debounce(async (term: string) => {
      if (term) {
        console.log(`term ${term}`)
        const users = await fetchUsers(term);
        setFilteredUsers(users.slice(0, 5));
      } else {
        setFilteredUsers([]);
      }
    }, 300, {'maxWait': 1000, 'trailing': true }),
    [fetchUsers]
  );

//   useEffect(() => {
//     return () => {
//         handleSearch.cancel();
//     };
//   }, [handleSearch]);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);

  return (
    <div className="relative w-full max-w-xs text-blue-600 md:text-green-600">
      <input
        type="text"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search users..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <ul className="absolute z-10 w-full mt-2 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <li
                key={user.id}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                {user.name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2">Item not found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;
