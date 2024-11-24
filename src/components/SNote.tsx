import { INote } from "../types/notes";
import SCard from "./SCard";

interface IProps {
    note: INote;
    onClick: () => void
}

function SNote(props: IProps) {
    const { note, onClick } = props

    return (
        <SCard onClick={onClick} children={
            <>
                <div className="text-end opacity-20	">#{note.id + 1}</div>
                <p>{note.body}</p>
            </>
        } />
    )
}

export default SNote;