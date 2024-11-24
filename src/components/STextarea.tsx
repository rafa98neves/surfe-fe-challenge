import { useEffect, useState } from "react";
import useDebounce from "../composables/useDebounce";

export interface IProps {
  model: string;
  delay: number;
  onChange: (value: string) => void;
}

function STextarea(props: IProps) {
  const { onChange, model, delay } = props;

  const [value, setValue] = useState(model);

  const debouncedInputValue = useDebounce(value, delay);

  useEffect(() => {
    if (debouncedInputValue) {
      onChange(debouncedInputValue)
    }
  }, [debouncedInputValue]);

  return (
    <div>
      <textarea
        placeholder="Add your note"
        className="w-full h-full px-2 py-4 rounded-b-lg focus:outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default STextarea;
