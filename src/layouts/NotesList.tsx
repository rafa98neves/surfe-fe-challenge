import { useEffect } from "react";
import useStore from "../store";

function NotesList() {
  const { notes, fetchNotes } = useStore()

  useEffect(() => {
    fetchNotes()
  }, [])

  const noteElements = notes.map((note) => <div key={note.id}>{note.body}</div>)

  return (
    <div>
      {noteElements}
    </div>
  )
}

export default NotesList;
