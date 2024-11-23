import { Dispatch } from "react";
import { ACTION_TYPE, IAction } from "./types";
import NotesService from "../services/notesService";
import { INote } from "../types/notes";


export async function fetchNotes(session: string, dispatch: Dispatch<IAction>) {
    dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });

    try {
        const service = new NotesService(session);
        const response = await service.getNotes();
        dispatch({ type: ACTION_TYPE.SET_NOTES, payload: response });
    } finally {
        dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
    }
}

export async function addNote(note: INote, session: string, dispatch: Dispatch<IAction>) {
    dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });

    try {
        const service = new NotesService(session);
        await service.setNote(note);
    } finally {
        dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
    }
}