import NotesCreation from "../layouts/NotesCreation";
import NotesList from "../layouts/NotesList";

function Home() {
  return (
    <div className="relative min-h-screen flex-col justify-center overflow-hidden p-6 sm:p-12">
      <NotesCreation />

      <NotesList />
    </div>
  );
}

export default Home;
