import React from "react";
import useKeyboard from "../../composables/useKeyboard";

interface IProps {
    onDelete: (offset: number) => void
    onMove: (offset: number) => void
}

export default function useTextareaControls() {
    const sel = getSelection();

    const getSpans = () => document.querySelectorAll<HTMLInputElement>('#editable-span')

    const onMove = (e: React.KeyboardEvent, offset: number) => {
        const spans = getSpans();
        const focusedSpanIndex = Array.from(spans).findIndex(span => span === e.target)

        if (sel!.focusOffset + offset < 0 || sel!.focusOffset + offset >= spans[focusedSpanIndex].textContent!.length) {
            const nextFocus = spans[focusedSpanIndex + offset] as HTMLSpanElement

            if (nextFocus && sel) {
                nextFocus.focus()
                const range = document.createRange()
                const position = offset < 0 ? nextFocus.textContent!.length : 0
                const child = nextFocus.childNodes[0];

                if (child) {
                    range.setStart(child, position);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        }
    }


    const onClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement
        if (target?.id === 'editable-span') return

        const spans = getSpans();
        spans[spans.length - 1].focus()
    }

    return {
        onClick,
        ...useKeyboard({
            'Backspace': { action: (e: React.KeyboardEvent) => onMove(e, -1) },
            'ArrowLeft': { action: (e: React.KeyboardEvent) => onMove(e, -1) },
            'Delete': { action: (e: React.KeyboardEvent) => onMove(e, 1) },
            'ArrowRight': { action: (e: React.KeyboardEvent) => onMove(e, 1) }
        })
    };
}