import { useEffect, useRef, useState } from "react";
import { ISegment } from "../types/notes";

export interface IProps {
  segment: ISegment;
  setRef: (ref: React.RefObject<HTMLSpanElement>) => void;
  onSegmentChange: (value: ISegment) => void;
}


function STextSegment(props: IProps) {
  const { segment, setRef, onSegmentChange } = props;

  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLSpanElement | null>(null)

  const onModelChange = (value: string = '') => {
    setValue(value);
    onSegmentChange({ ...segment, text: value })
  }

  useEffect(() => {
    let text = segment.text;
    if (segment.userMention) {
      text = segment.userMention.fullname
    }

    inputRef.current!.textContent = text
    setValue(text)
  }, [segment.text])

  setRef(inputRef);

  return (
    <span
      ref={inputRef}
      contentEditable={!segment.userMention}
      className={`px-0.5 w-full h-full rounded-lg resize-none	h-full focus:outline-none ${segment.userMention ? 'cursor-pointer font-bold text-indigo-500' : ''}`}
      onInput={(e) => onModelChange(e.currentTarget.textContent ?? '')}
    />
  );
}

export default STextSegment;
