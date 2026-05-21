"use client";

import { useState } from "react";

export const useRenderTrigger = (): [boolean, () => void] => {
  const [renderTriggerState, setRenderTriggerState] = useState(false);

  const triggerReRender = () =>
    setRenderTriggerState((value: boolean) => !value);

  return [renderTriggerState, triggerReRender];
};
