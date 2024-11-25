import { useEffect, useRef, useState } from "react";
import { ISegment } from "../types/notes";

export interface IProps {
  segment: ISegment;
  onChange: (value: ISegment) => void;
}


function STextSegment(props: IProps) {
  const { segment, onChange } = props;

  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLSpanElement | null>(null)

  const className = `px-0.5 w-full h-full rounded-lg resize-none	h-full focus:outline-none ${segment.userMention ? 'cursor-pointer font-bold text-indigo-500' : ''}`

  const onModelChange = (value: string = '') => {
    setValue(value);
    onChange({ ...segment, text: value })
  }

  useEffect(() => {
    let text = segment.text;
    if (segment.userMention) {
      text = `${segment.userMention.first_name} ${segment.userMention.last_name}`
    }

    inputRef.current!.textContent = text
    setValue(text)
  }, [segment.text])

  return (
    <span
      ref={inputRef}
      contentEditable={!segment.userMention}
      className={className}
      onInput={(e) => onModelChange(e.currentTarget.textContent ?? '')}
    />
  );
}

export default STextSegment;
