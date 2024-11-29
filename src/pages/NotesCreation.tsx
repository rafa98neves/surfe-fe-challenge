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
    let isUserMention: Boolean
    let isLastSegment: Boolean
    let beforeSegment: ISegment | null

    const parsedSegment = segments.reduce((acc, segment, index) => {
      isUserMention = !!segment.userMention;
      isLastSegment = index === segments.length - 1
      beforeSegment = acc[index - 1] ?? null

      // if the last segment is a mention, add an empty segment
      if (isUserMention && isLastSegment) {
        acc.push(segment)
        acc.push({ text: '' })
      } else {
        if (!isUserMention && beforeSegment && !beforeSegment.userMention) {
          beforeSegment.text += segment.text
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
    Promise.all([store.fetchNote(parseInt(params.id)), store.fetchUsers('', true)])
      .then(([note, users]) => {
        if (note) {
          const segments = transformTextToSegments(note.body, users)
          setSegments(segments)
          setNote(note)
        }
      })
  }, [params.id])

  const statusMessage = (
    <div className="flex items-center justify-end text-xs mr-4 min-h-8">
      {store.loading && <Spinner />}
      {!store.loading && <div className="text-lime-700">Saved</div>}
    </div>
  )

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex-grow grid grid-rows-10 bg-white rounded-lg pb-2">
        <div className="row-span-9">
          <STextarea segments={[...segments]} onChange={onSegmentChange} />
        </div>
        {statusMessage}
      </div>

      <div className="flex items-center justify-center">
        <button className="bg-white rounded mt-4">
          <Link className="block px-6 py-1" to="/">Go to your notes</Link>
        </button>
      </div>
    </div>
  );
}

export default NotesCreation;
