import type { To } from '@remix-run/router';
import { useLocation, useNavigate } from '@remix-run/react';
import { isOfType } from '~/common/common-utils';

export function useGoBack({ getFallback }: { getFallback: () => To }) {
  const location = useLocation();
  const navigate = useNavigate();

  function goBack() {
    if (isOfType<{ canGoBack: boolean }>(location.state, ['canGoBack'])) {
      navigate(-1);
    } else {
      navigate(getFallback());
    }
  }

  return goBack;
}
