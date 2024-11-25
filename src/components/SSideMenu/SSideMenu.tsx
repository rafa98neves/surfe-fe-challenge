
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

    if (items.length === 0) return null

    const itemComponents = items.map((item) => (<div
        key={item.value}
        className="hover:bg-gray-200 rounded px-2 py-1 cursor-pointer "
        onClick={() => onSelect(item.value)}
    >
        {item.label}
        <div className="text-gray-400"> {item.afterLabel} </div>
    </div>))

    return (
        <div className="absolute left-0 top-7 w-80 border border-t-grey bg-white rounded">
            <div> {itemComponents} </div>
        </div>
    );
};

export default SSideMenu;

