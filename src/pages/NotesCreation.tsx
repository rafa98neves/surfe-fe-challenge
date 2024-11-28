import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import STextarea from "../components/STextarea/STextarea";
import Spinner from "../icons/Spinner";
import useStore from "../store";
import { INote, ISegment } from "../types/notes";
import useDebounce from "../composables/useDebounce";
import { transformSegmentsToText, transformTextToSegments } from "../helpers";

const SAVE_DELAY = 500

function NotesCreation() {
  const [segments, setSegments] = useState<ISegment[]>([]);
  const [note, setNote] = useState<INote | null>(null);

  const navigate = useNavigate();

  const store = useStore()
  const params = useParams()
  const debouncedInputValue = useDebounce(segments, SAVE_DELAY);

  const onSegmentChange = (segments: ISegment[]) => {
    const parsedSegment = segments.reduce((acc, segment, index) => {
      // if the last segment is a mention, add an empty segment
      if (segment.userMention && index === segments.length - 1) {
        acc.push(segment)
        acc.push({ text: '' })
      } else if (segment.text !== '') {
        if (index && acc[index - 1] && !segment.userMention && !acc[index - 1].userMention) {
          acc[index - 1].text += segment.text
        } else {
          acc.push(segment)
        }
      }
      return acc
    }, [] as ISegment[])

    if (parsedSegment.length === 0) {
      parsedSegment.push({ text: '' })
    }

    setSegments(parsedSegment)
  }

  const onChange = async (value: string) => {
    let newNote: INote;

    if (note) {
      newNote = await store.updateNote(note.id, value);
    } else {
      newNote = await store.addNote(value)
      navigate(`/${newNote.id}`, { replace: true });
    }

    setNote(newNote)
  }

  useEffect(() => {
    if (debouncedInputValue.length) {
      const text = transformSegmentsToText(debouncedInputValue)
      onChange(text)
    }
  }, [debouncedInputValue])

  useEffect(() => {
    // Initialize new note
    if (!params.id) {
      setSegments([{ text: '' }])
      return
    }

    // Fetch new note from ID
    Promise.all([store.fetchNote(parseInt(params.id)), store.fetchUsers()])
      .then(([note, users]) => {
        if (note) {
          const segments = transformTextToSegments(note.body, users)
          setSegments(segments)
          setNote(note)
        }
      })
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
          <STextarea segments={[...segments]} onChange={onSegmentChange} />
        </div>
        {statusMessage}
      </div>

      <div className="flex items-center justify-end">
        <button className="bg-white rounded mt-4">
          <Link className="block px-6 py-1" to="/">Go to your notes</Link>
        </button>
      </div>
    </div>
  );
}

export default NotesCreation;
