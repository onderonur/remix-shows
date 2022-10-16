import { useLocation } from '@remix-run/react';
import { useEffect, useState } from 'react';

export function useScrollToTopOnRouteChange() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);
}

// We can use this hook to implement a behavior like `getDerivedStateFromProps`
// and update some state **during** render.
// https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
export function useHasChanged<Val>(val: Val) {
  const [prevVal, setPrevVal] = useState(val);

  if (val !== prevVal) {
    setPrevVal(val);
    return true;
  }
}
