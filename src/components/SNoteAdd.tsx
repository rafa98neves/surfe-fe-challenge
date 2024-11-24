import SCard from "./SCard";

interface IProps {
    onClick: () => void
}

function SNote(props: IProps) {
    const { onClick } = props

    const children = (
        <div className="flex items-center justify-center text-slate-50 h-full">
            Add a note
        </div>)

    return (
        <SCard
            classProps="shadow-none border border-white border-dashed bg-transparent"
            onClick={onClick}
            children={children} />
    )
}

export default SNote;