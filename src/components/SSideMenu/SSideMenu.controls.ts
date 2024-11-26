import useKeyboard from "../../composables/useKeyboard";

interface IProps {
    onSelect: (index: number) => void
    onChange: (index: number) => void
    maxIndex: number
}

export default function useSideMenuControls(props: IProps) {
    const { maxIndex, onChange, onSelect } = props

    let currentFocus: number;

    return useKeyboard({
        'Enter': {
            action: (e) => {
                onSelect(currentFocus)
                e.preventDefault()
            },
        },
        'ArrowDown': {
            action: (e) => {
                if (currentFocus < props.maxIndex) currentFocus++;
                else currentFocus = 0;

                onChange(currentFocus)
                e.preventDefault()
            },
        },
        'ArrowUp': {
            action: (e) => {
                if (!currentFocus) currentFocus = maxIndex;
                else currentFocus--;

                onChange(currentFocus)
                e.preventDefault()
            },
        },
    });
}