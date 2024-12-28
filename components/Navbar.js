import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        setUsername(currentUser.username);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    router.push('/signin');
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white p-4">
      <div className="text-2xl font-bold">Note App</div>
      <div className="flex items-center">
        {isAuthenticated && (
          <span className="mr-4 text-white font-semibold">{username}</span>
        )}
        {!isAuthenticated ? (
          <button
            onClick={() => router.push('/signin')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign In
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
