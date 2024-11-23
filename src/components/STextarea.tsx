import { useEffect } from "react";
import useInput from "../composables/useInput";
import useKeyboard from "../composables/useKeyboard";

export interface IModel {
  title: string;
  text: string;
}

export interface IProps {
  model: IModel;
  onChange: (value: IModel) => void;
}

function STextarea({ onChange, model }: IProps) {
  let textarea: HTMLTextAreaElement | null = null;

  const inputProps = useInput(model.title);
  const textProps = useInput(model.text);

  const inputKeyboard = useKeyboard({
    Enter: { action: () => textarea?.focus() },
  });

  useEffect(() => {
    if (!onChange) return;
    onChange({ title: inputProps.value, text: textProps.value });
  }, [onChange, inputProps.value, textProps.value]);

  return (
    <>
      <h3> Write your notes </h3>
      <input
        placeholder="Note Title"
        className="w-full h-full mt-2 px-2 py-4 rounded-t-lg focus:outline-none"
        {...inputKeyboard}
        {...inputProps}
      />
      <textarea
        ref={(input) => (textarea = input)}
        placeholder="Add you note"
        className="w-full h-full px-2 py-4 rounded-b-lg focus:outline-none"
        {...textProps}
      />
    </>
  );
}

export default STextarea;
