import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import useStore from "../store";
import SNote from "../components/SNote";
import SNoteAdd from "../components/SNoteAdd";

function NotesList() {
  const { notes, fetchNotes } = useStore()
  const navigate = useNavigate()

  const onNoteClick = (id?: number) => () => {
    if (id === undefined) navigate('/create')
    else navigate(`/${id}`)
  }

  useEffect(() => {
    fetchNotes()
  }, [])



  if (!notes.length) {
    return (
      <div className="flex-initial text-center mt-24 ">
        <div className="text-slate-50">You don't have any notes yet.</div>
        <button className="bg-slate-50 px-6 py-1 rounded mt-4">
          <Link to="/create">Create one!</Link>
        </button>
      </div>
    )
  }



  return (
    <div className="grid md:grid-cols-2 gap-10">
      <SNoteAdd onClick={onNoteClick()} />
      {notes.map((note) => <SNote key={note.id} note={note} onClick={onNoteClick(note.id)} />)}
    </div>
  )
}

export default NotesList;
