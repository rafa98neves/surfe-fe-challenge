import useSession from "../composables/useSession";
import NotesService from "../services/notesService";
import { useAppDispatch, useAppState } from "./reducers";
import { ACTION_TYPE } from "./types";

export default function useStore() {

    const { session } = useSession();

    const state = useAppState();
    const dispatch = useAppDispatch();

    const notesService = new NotesService(session);
    // const usersService = new UsersService(session);

    const generateNewNoteId = () => {
        return state.notes.reduce((acc, note) => Math.max(acc, note.id), 0);
    }

    const addNote = async (body: string) => {
        dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });

        try {
            const response = await notesService.setNote({ id: generateNewNoteId() + 1, body });
            return response
        } finally {
            dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
        }
    }

    const updateNote = async (id: number, body: string) => {
        dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
        try {
            const note = await notesService.updateNote(id, { id, body });
            dispatch({ type: ACTION_TYPE.UPDATE_NOTE, payload: note });
            return note
        } finally {
            dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
        }
    }

    const fetchNotes = async () => {
        dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });

        try {
            const service = new NotesService(session);
            const response = await service.getNotes();
            dispatch({ type: ACTION_TYPE.SET_NOTES, payload: response });
        } finally {
            dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
        }
    }

    return { ...state, addNote, updateNote, fetchNotes }
}