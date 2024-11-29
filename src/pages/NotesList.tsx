import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useStore from "../store";
import SNote from "../components/SNote";
import SNoteAdd from "../components/SNoteAdd";
import { IUser } from "../types/users";
import { INote } from "../types/notes";
import { deepClone } from "../helpers";
import Spinner from "../icons/Spinner";

function NotesList() {
  const { loading, fetchNotes, fetchUsers } = useStore()

  const navigate = useNavigate()
  const [notes, setNotes] = useState<INote[]>([])

  const onNoteClick = (id?: number) => () => {
    if (id === undefined) navigate('/create')
    else navigate(`/${id}`)
  }

  const parseMentions = (note: INote, users: Map<string, IUser>) => {
    const regex = /@(\w+)/g;

    const newNote = deepClone(note)

    newNote.body = newNote.body.replace(regex, (match, username) => {
      const user = users.get(username)
      if (user) return user.fullname
      else return match
    })

    return newNote
  }

  useEffect(() => {
    Promise.all([fetchNotes(true), fetchUsers('', true)]).then(([notes, users]) => {
      setNotes(notes.map(note => parseMentions(note, users)))
    })
  }, [])

  if (loading) {
    return (
      <div className="flex-initial text-center mt-24 items-center">
        <div className="text-slate-50">Loading your notes...</div>
        <Spinner className="text-slate-50 mx-auto mt-4" />
      </div>
    )
  }

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
