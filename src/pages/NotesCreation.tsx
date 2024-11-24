import { useEffect, useState } from "react";

import STextarea from "../components/STextarea";
import useStore from "../store";
import { INote } from "../types/notes";
import useDebounce from "../composables/useDebounce";
import Spinner from "../icons/Spinner";
import { Link, useParams } from "react-router-dom";

const SAVE_DELAY = 500

function NotesCreation() {
  const [model, setModel] = useState('');
  const [note, setNote] = useState<INote | null>(null);

  const store = useStore()
  const params = useParams()
  const debouncedInputValue = useDebounce(model, SAVE_DELAY);

  const onChange = async (value: string) => {
    let newNote

    if (note) {
      newNote = await store.updateNote(note.id, value);
    } else {
      newNote = await store.addNote(value)
    }

    setNote(newNote)
  }

  useEffect(() => {
    if (debouncedInputValue) {
      onChange(debouncedInputValue)
    }
  }, [debouncedInputValue])

  useEffect(() => {
    if (params.id) {
      store.fetchNote(parseInt(params.id)).then(note => {
        if (note) {
          setModel(note.body)
          setNote(note)
        }
      })
    }
  }, [])

  const statusMessage = (
    <div className="flex items-center justify-end text-xs mr-4 min-h-8">
      {store.loading && <Spinner />}
      {!store.loading && <div className="text-lime-700">Saved</div>}
    </div>
  )

  return (
    <div className="h-full min-h-96">
      <div className="h-full grid grid-rows-10 bg-white rounded-lg pb-2">
        <div className="row-span-9">
          <STextarea model={model} onChange={setModel} />
        </div>
        {statusMessage}
      </div>

      <div className="flex items-center justify-center">
        <button className="text-center bg-white px-6 py-1 rounded mt-4">
          <Link to="/">Go back</Link>
        </button>
      </div>
    </div>
  );
}

export default NotesCreation;
