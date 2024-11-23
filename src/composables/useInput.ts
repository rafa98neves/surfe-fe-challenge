import { useState } from "react";

export default function useInput(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValue(e.target.value);
  }

  return { value, onChange };
}
