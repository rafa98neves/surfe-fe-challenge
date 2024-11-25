import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import STextarea from "../components/STextarea";
import Spinner from "../icons/Spinner";
import useStore from "../store";
import { INote, ISegment } from "../types/notes";
import useDebounce from "../composables/useDebounce";
import { transformSegmentsToText, transformTextToSegments } from "../helpers";

const SAVE_DELAY = 500

function NotesCreation() {
  const [segments, setSegments] = useState<ISegment[]>([]);
  const [note, setNote] = useState<INote | null>(null);

  const store = useStore()
  const params = useParams()
  const debouncedInputValue = useDebounce(segments, SAVE_DELAY);

  const onChange = async (value: string) => {
    if (!note) return

    let newNote: INote;

    if (note) {
      newNote = await store.updateNote(note.id, value);
    } else {
      newNote = await store.addNote(value)
    }

    setNote(newNote)
  }

  useEffect(() => {
    if (debouncedInputValue) {
      const text = transformSegmentsToText(debouncedInputValue, store.users)
      onChange(text)
    }
  }, [debouncedInputValue])

  useEffect(() => {
    if (params.id) {
      Promise.all([store.fetchNote(parseInt(params.id)), store.fetchUsers()])
        .then(([note, users]) => {
          if (note) {
            const segments = transformTextToSegments(note.body, users)
            setSegments(segments)
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
          <STextarea segments={segments} onChange={setSegments} />
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
