import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Notes from '@/components/Notes';

export default function Home() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/signin');
    } else {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      setCurrentUser(user);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    router.push('/signin');
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="h-screen px-10 bg-gray-100">
      <Notes />
    </div>
  );
}
