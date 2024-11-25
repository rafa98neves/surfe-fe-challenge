import useKeyboard from "../../composables/useKeyboard";

export default function useSideMenuControls() {
    return useKeyboard({
        'Enter': {
            action: (e) => {
                console.log("Select")
                e.preventDefault()
            },
        },
        'ArrowDown': {
            action: () => {
                console.log("ArrowDown")
            },
        },
        'ArrowUp': {
            action: () => {
                console.log("ArrowUp")
            },
        }
    });
}