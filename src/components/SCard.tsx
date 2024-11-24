interface IProps {
    children: React.ReactNode;
    onClick: () => void

    classProps?: string;
}

function SCard(props: IProps) {
    const { children, classProps, onClick } = props

    const className = `transition-all hover:scale-105 shadow-lg shadow-gray-600 bg-gray-200 cursor-pointer rounded-lg min-h-40 px-4 py-6 ${classProps}`

    return (<div className={className} onClick={onClick}>
        {children}
    </div>);
}

export default SCard;