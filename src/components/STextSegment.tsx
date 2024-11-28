import { useEffect, useRef, useState } from "react";
import { ISegment } from "../types/notes";
import useStore from "../store";
import SSideMenu, { IItem } from "./SSideMenu/SSideMenu";
import { getWordFromIndex } from "../helpers";

export interface IProps {
  segment: ISegment;
  onSegmentChange: (value: ISegment) => void;
  onCreate: (segment: ISegment, offset?: number) => void
}


function STextSegment(props: IProps) {
  const { segment, onSegmentChange, onCreate } = props;

  const sel = getSelection();

  const [users, setUsers] = useState<IItem[]>([])
  const [sidePanelVisible, setVisibleToggle] = useState(false)
  const inputRef = useRef<HTMLSpanElement | null>(null)

  const store = useStore()

  const checkMention = (value: string) => {
    const { word } = getWordFromIndex(value, sel?.anchorOffset ?? 0) ?? {}

    if (word?.charAt(0) === '@') {
      store.fetchUsers(word.slice(1)).then(users => {
        const userArray = Array.from(users.entries())
        const userOptions = userArray.map(([username, user]) => {
          return {
            label: user.fullname, afterLabel: `@${username}`,
            value: username
          }
        })
        setUsers(userOptions)
        setVisibleToggle(true)
      })
    } else {
      setVisibleToggle(false)
    }
  }

  const setUser = (username: string) => {
    const user = store.users.get(username);
    const wordData = getWordFromIndex(segment.text, sel?.anchorOffset ?? 0)

    if (!user || !wordData) return

    let newSegment = { text: user.fullname, userMention: user }

    const text = segment.text.slice(wordData.end)

    onSegmentChange({ text: segment.text.slice(0, wordData.start) })
    onCreate(newSegment, 1);
    onCreate({ text }, 2);

    setVisibleToggle(false)
  }

  const onModelChange = (value: string = '') => {
    checkMention(value);
    if (segment.userMention && sel!.focusOffset === segment.text.length + 1) {
      onCreate({ text: '' }, 1);
    } else {
      onSegmentChange({ text: value })
    }

  }

  useEffect(() => {
    let text = segment.text;
    if (segment.userMention) {
      text = segment.userMention.fullname
    }

    inputRef.current!.textContent = text
  }, [segment.text])

  return (
    <>
      <span
        ref={inputRef}
        contentEditable={true}
        id="editable-span"
        className={`w-full h-full rounded-lg resize-none	h-full focus:outline-none ${segment.userMention ? 'cursor-pointer font-bold text-indigo-500' : ''}`}
        onInput={(e) => onModelChange(e.currentTarget.innerText ?? '')}
        onBlur={() => setVisibleToggle(false)}
      />

      {sidePanelVisible && <SSideMenu items={users} onSelect={setUser} />}
    </>
  );
}

export default STextSegment;
