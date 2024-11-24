import { useState } from "react";
import STextarea from "../components/STextarea";
import useStore from "../store";
import { INote } from "../types/notes";


function NotesCreation() {
  const store = useStore()

  const [model, setModel] = useState('');
  const [note, setNote] = useState<INote | null>(null);

  async function onChange(value: string) {
    let newNote

    if (note) {
      newNote = await store.updateNote(note.id, value);
    } else {
      newNote = await store.addNote(value)
    }

    setNote(newNote)
    setModel(value);
  }

  return (
    <div className="w-full h-full bg-gray-50 rounded-lg px-4 py-6">
      <h3> Write your notes </h3>
      <STextarea model={model} onChange={onChange} delay={600} />
    </div>
  );
}

export default NotesCreation;
