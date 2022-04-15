import { useLocation, useNavigate } from "@remix-run/react";
import type * as History from "history";
import { isOfType } from "~/common/CommonUtils";

export function useGoBack({ getFallback }: { getFallback: () => History.To }) {
  const location = useLocation();
  const navigate = useNavigate();

  function goBack() {
    if (isOfType<{ canGoBack: boolean }>(location.state, ["canGoBack"])) {
      navigate(-1);
    } else {
      navigate(getFallback());
    }
  }

  return goBack;
}
