import { useEffect, useRef, useState } from "react";
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

    const [selected, setSelected] = useState(0)

    const controls = useSideMenuControls({
        maxIndex: items.length - 1,
        onSelect: (idx: number) => {
            onSelect(items[idx].value)
        },
        onChange: (idx: number) => {
            setSelected(idx)
        }
    })

    useEffect(() => {
        const reaction = (e: any) => controls.onKeyDown(e);

        document.addEventListener('keydown', reaction)
        return () => {
            document.removeEventListener('keydown', reaction)
        }
    }, [])

    if (items.length === 0) return null

    const itemComponents = items.map((item, index) => (
        <button
            key={item.value}
            className={`justify-items-start hover:bg-gray-200 w-full rounded px-2 py-1 cursor-pointer border-none outline-none ${selected === index ? 'bg-gray-200' : ''}`}
            onClick={() => onSelect(item.value)}
            onMouseDown={(e) => e.preventDefault()}
        >
            <span className="font-bold">{item.label}</span>
            <div className="text-gray-400"> {item.afterLabel} </div>
        </button >
    ))

    return (
        <div className="absolute left-0 top-10 w-80 border border-t-grey bg-white rounded">
            <div> {itemComponents} </div>
        </div>
    );
};

export default SSideMenu;

