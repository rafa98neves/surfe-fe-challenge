import { useEffect, useState } from "react";

export interface IProps {
  model: string;
  onChange: (value: string) => void;
}

function STextarea(props: IProps) {
  const { onChange, model } = props;

  const [value, setValue] = useState('');

  const onModelChange = (value: string) => {
    setValue(value);
    onChange(value)
  }

  useEffect(() => setValue(model), [model])

  return (
    <textarea
      placeholder="Add your note"
      className="w-full h-full px-2 py-4 rounded-lg resize-none	h-full focus:outline-none"
      value={value}
      onChange={(e) => onModelChange(e.target.value)}
    />
  );
}

export default STextarea;
