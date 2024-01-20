import { useState } from "react";

export default function useToggle(
  initialState = false
): [boolean, (override?: boolean) => void] {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = (override?: boolean) => {
    setState(override === undefined ? !state : override);
  };

  return [state, toggle];
}
