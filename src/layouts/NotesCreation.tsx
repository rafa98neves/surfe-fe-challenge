import { useState } from "react";
import STextarea, { IModel } from "../components/STextarea";
import { useAppDispatch } from "../store/reducers";
import { addNote } from "../store/actions";
import useSession from "../composables/useSession";

const DEFAULT_MODEL: IModel = { text: "", title: "" };

function NotesCreation() {
  const { session } = useSession();
  const dispatch = useAppDispatch();

  const [model, onChange] = useState<IModel>(DEFAULT_MODEL);

  const onSubmit = () => {
    const newNote = {
      id: 1,
      body: model
    }

    addNote(newNote, session, dispatch);
  }

  return (
    <div className="w-full h-full bg-gray-50 rounded-lg px-4 py-6">
      <STextarea model={model} onChange={onChange} />
      <button onClick={onSubmit}> Submit </button>
    </div>
  );
}

export default NotesCreation;
