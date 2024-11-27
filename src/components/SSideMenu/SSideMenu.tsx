import { useEffect, useRef } from "react";
import useSideMenuControls from "./SSideMenu.controls";

export interface IItem {
    value: string
    afterLabel: string
    label: string
}

interface IProps {
    items: IItem[],
    onSelect: (value: string) => void
}


const SSideMenu = (props: IProps) => {
    const { items, onSelect } = props

    const refs = useRef<any[]>([]);

    const controls = useSideMenuControls({
        maxIndex: items.length - 1,
        onSelect: (idx) => onSelect(items[idx].value),
        onChange: (idx) => refs.current[idx]?.focus()
    })

    useEffect(() => {
        document.addEventListener('keydown', controls.onKeyDown)
        return () => {
            document.removeEventListener('keydown', controls.onKeyDown)
        }
    }, [])

    if (items.length === 0) return null

    const itemComponents = items.map((item, index) => (
        <button
            ref={(el) => refs.current[index] = el}
            key={item.value}
            className="justify-items-start focus:bg-gray-200 hover:bg-gray-200 w-full rounded px-2 py-1 cursor-pointer border-none outline-none"
            onClick={() => onSelect(item.value)}
        >
            <span className="font-bold">{item.label}</span>
            <div className="text-gray-400"> {item.afterLabel} </div>
        </button>
    ))

    return (
        <div className="absolute left-0 top-10 w-80 border border-t-grey bg-white rounded">
            <div> {itemComponents} </div>
        </div>
    );
};

export default SSideMenu;

