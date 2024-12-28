import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace('/signin');
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
