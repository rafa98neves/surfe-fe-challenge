import { ISegment } from "../types/notes";
import { TUserMap } from "../types/users";

/**
 * Given a sentence and an index, returns the word at that index in the sentence.
 * The return value is an object with the word, start index, and end index.
 * If the index is not a valid index in the sentence, returns null.
 */
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

/**
 * Given a sentence and a list of users, returns an array of segments.
 * A segment is either a string of text, or an object with a string of text
 * and a user object (from the list of users).
 *
 * The function works by iterating over the sentence and finding all matches
 * of a mention (i.e. a word that starts with '@'). For each match, the function
 * checks if the word is in the list of users. If it is, the function
 * adds a segment with the text and user object to the array. If it is not,
 * the function adds a segment with just the text to the array.
 *
 * The array is then filtered to remove any empty segments.
 *
 * @param {string} text - The sentence to be processed.
 * @param {TUserMap} users - The list of users.
 * @returns {ISegment[]} - An array of segments.
 */
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

    if (segments.length === 0 || segments[segments.length - 1].userMention) {
        segments.push({ text: '' })
    }

    return segments.filter(Boolean);
}

/**
 * Given an array of ISegments, convert them into a single string of text
 * ISegments with a userMention will be converted to '@username', and all other
 * ISegments will be converted to the text property with leading and trailing
 * whitespace removed
 * @param {ISegment[]} segments An array of ISegments to convert
 * @return {string} The string of text generated from the segments
 */
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

/**
 * Performs a deep clone of the given value. This is useful when you want a
 * complete copy of an object and don't want any references to the original
 * data.
 *
 * @param {any} value The value to clone
 * @return {any} The cloned value
 */
export function deepClone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value))
}