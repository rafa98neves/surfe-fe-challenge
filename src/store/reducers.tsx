import { createContext, Dispatch, useContext, useReducer } from "react";
import { ACTION_TYPE, IAction, IState } from "./types";

const initialState: IState = { notes: [], users: [], session: null, loading: false };

function reducer(state = initialState, action: IAction) {
  switch (action.type) {
    case ACTION_TYPE.ADD_NOTE:
      const notes = [...state.notes, action.payload];
      return { ...state, notes };

    case ACTION_TYPE.SET_NOTES:
      return { ...state, notes: action.payload };

    case ACTION_TYPE.UPDATE_NOTE:
      return { ...state, notes: state.notes.map(note => note.id === action.payload.id ? action.payload : note) };

    case ACTION_TYPE.SET_LOADING:
      return { ...state, loading: action.payload };

    case ACTION_TYPE.SET_SESSION:
      return { ...state, session: action.payload };

    case ACTION_TYPE.SET_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

const StateContext = createContext<IState | null>(null);
const DispatchContext = createContext<Dispatch<IAction> | null>(null);

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useAppState() {
  return useContext(StateContext)!;
}

export function useAppDispatch() {
  return useContext(DispatchContext)!;
}