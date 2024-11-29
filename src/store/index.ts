import useSession from "../composables/useSession";
import { parseUserResponse } from "../helpers/parsers";
import NotesService from "../services/notesService";
import UsersService from "../services/usersService";
import { TUserMap } from "../types/users";
import { useAppDispatch, useAppState } from "./reducers";
import { ACTION_TYPE } from "./types";

const filterUsers = (users: TUserMap, query: string, shouldRetrieveAll = false) => {
    let userArray = Array.from(users.entries());

    if (query) {
        userArray = userArray.filter(user => {
            return user[0].toLowerCase().includes(query.toLowerCase())
        });
    }

    if (shouldRetrieveAll) {
        return new Map(userArray)
    }

    return new Map(userArray.slice(0, 5))
}

export default function useStore() {

    const { session } = useSession();

    const state = useAppState();
    const dispatch = useAppDispatch();

    const notesService = new NotesService(session);
    const usersService = new UsersService();

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

    const fetchNote = async (id: number, force = false) => {
        dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
        try {
            let note = state.notes.find(note => note.id === id);
            if (!note || force) note = await notesService.getNote(id);

            return note
        } finally {
            dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
        }
    }

    const fetchNotes = async (force = false) => {
        dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });

        try {
            if (state.notes && !force) return state.notes

            const response = await notesService.getNotes();
            dispatch({ type: ACTION_TYPE.SET_NOTES, payload: response });
            return response
        } catch (e) {
            return []
        } finally {
            dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
        }
    }


    const fetchUsers = async (query = '', all = false, force = false) => {

        dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });

        try {
            if (state.users.size > 0 && !force) {
                return filterUsers(state.users, query, all)
            }

            const res = await usersService.getUsers();
            const users = parseUserResponse(res);

            dispatch({ type: ACTION_TYPE.SET_USERS, payload: users });

            return filterUsers(users, query, all)

        } finally {
            dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
        }
    }

    return { ...state, addNote, updateNote, fetchNote, fetchNotes, fetchUsers }
}