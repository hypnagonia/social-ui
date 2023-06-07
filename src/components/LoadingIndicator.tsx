import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useNavigation() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Timeout duration depends on your expectation of loading time.

    // Clean up
    return () => clearTimeout(timer);
  }, [location]);

  return { state: loading ? 'loading' : 'idle' };
}

export default function LoadingIndicator() {
	const navigation = useNavigation();
  
	if (navigation.state === 'loading') {
	  return <span className="loader" />;
	}
  
	return null;
  }
  