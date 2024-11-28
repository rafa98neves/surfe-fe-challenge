import STextSegment from "./../STextSegment";
import { ISegment } from "../../types/notes";
import useTextareaControls from "./STextarea.controls";

export interface IProps {
  segments: ISegment[];
  onChange: (value: ISegment[]) => void;
}

function STextarea(props: IProps) {
  const { segments, onChange } = props;

  const controls = useTextareaControls()

  const changeSegment = (segment: ISegment, index: number) => {
    segments[index] = segment;
    onChange(segments)
  }

  const createSegment = (segment: ISegment, index: number, shouldFocus = true) => {
    segments.splice(index + 1, 0, segment);
    onChange(segments)

    if (shouldFocus) {
      setTimeout(() => {
        const spans = document.querySelectorAll<HTMLInputElement>('#editable-span')
        spans[index + 1]?.focus()
      })
    }
  }

  return (
    <div
      className="relative cursor-text w-full h-full p-4 rounded-lg resize-none	h-full focus:outline-none"
      onClick={controls.onClick}
      onKeyDown={controls.onKeyDown}>

      {segments.map((segment, index) => (
        <STextSegment
          key={index}
          segment={segment}
          onSegmentChange={(segment) => changeSegment(segment, index)}
          onCreate={(segment, focus) => createSegment(segment, index, focus)}
        />
      ))}
    </div>
  );
}

export default STextarea;
