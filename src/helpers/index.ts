import { ISegment } from "../types/notes";
import { TUserMap } from "../types/users";

export function getWordFromIndex(sentence: string, index: number) {
    const words = sentence.split(' ');
    let currentIndex = 0;

    for (let word of words) {
        const wordLength = word.length;
        if (index >= currentIndex && index <= currentIndex + wordLength) {
            return { word, start: currentIndex, end: currentIndex + wordLength };
        }
        currentIndex += wordLength + 1;
    }

    return null
}

const MENTION_REGEX = /(\s*@\w+\s*)/g;

export function transformTextToSegments(text: string, users: TUserMap) {
    const segments: ISegment[] = [];

    let match = MENTION_REGEX.exec(text);
    let word: string;
    let lastIndex = 0;
    let previousSegment: ISegment | null = null;

    while (match !== null) {

        // Get text before mention
        if (match.index > lastIndex) {
            word = text.slice(lastIndex, match.index).trim();
            previousSegment = { text: word }
        }

        // Try to get mention
        word = match[0].trim()
        const userMention = users.get(word.slice(1));
        if (userMention) {
            if (previousSegment) segments.push(previousSegment);
            segments.push({ text: word, userMention });
            lastIndex = MENTION_REGEX.lastIndex;
        }

        match = MENTION_REGEX.exec(text);
    }

    // Get remaining
    if (lastIndex < text.length) {
        word = text.slice(lastIndex).trim();
        segments.push({ text: word });
    }

    if (segments[segments.length - 1].userMention) {
        segments.push({ text: '' })
    }

    return segments.filter(Boolean);
}

export function transformSegmentsToText(segments: ISegment[]) {
    let out: string[] = [];

    segments.forEach(segment => {
        const { userMention, text } = segment
        if (userMention) {
            out.push(`@${userMention.username}`)
        } else {
            out.push(text.trim())
        }
    })

    return out.join(' ');

}