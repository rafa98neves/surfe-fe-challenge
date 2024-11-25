import { useState } from "react";

import useStore from "../store";
import STextSegment from "./STextSegment";
import { ISegment } from "../types/notes";
import SSideMenu, { IItem } from "../components/SSideMenu/SSideMenu";
import { getWordFromIndex } from "../helpers";

export interface IProps {
  segments: ISegment[];
  onChange: (value: ISegment[]) => void;
}

function STextarea(props: IProps) {
  const { segments, onChange } = props;

  const store = useStore()

  const sel = getSelection();

  const [lastCursor, setLastCursor] = useState<number>(0)
  const [lastSegment, setLastSegment] = useState<number>(0)
  const [users, setUsers] = useState<IItem[]>([])
  const [sidePanelVisible, setVisibleToggle] = useState(false)

  const setUser = (username: string) => {
    if (!sel) return

    const foundSegment = segments[lastSegment]

    const wordData = getWordFromIndex(foundSegment.text, lastCursor)

    const user = store.users.find(user => user.username === username);
    if (!user) return
    let newSegment = { text: `${user.first_name} ${user.last_name}`, userMention: user }

    if (!wordData) {
      segments.splice(lastSegment, 0, newSegment)
    }
    else {
      const { start, end } = wordData

      const newSegments: ISegment[] = [
        { text: foundSegment.text.slice(0, start).trim() },
        newSegment,
        { text: foundSegment.text.slice(end).trim() }
      ]

      segments.splice(lastSegment, 1, ...newSegments)
    }
    setLastCursor(lastCursor)
    onChange(segments)
    setVisibleToggle(false)
  }

  const checkForMention = (text: string) => {
    if (!text.includes('@') || !sel) return;

    const { word } = getWordFromIndex(text, lastCursor) ?? {}

    if (word?.charAt(0) !== '@') {
      setVisibleToggle(false)
      return
    }

    store.fetchUsers(word.slice(1)).then(users => {
      setVisibleToggle(true)
      setUsers(users.map((user) => {
        return {
          label: `${user.first_name} ${user.last_name}`, afterLabel: `@${user.username}`, value: user.username
        }
      }))
    })
  }

  const changeSegment = (segment: ISegment, index: number) => {
    setLastSegment(index)
    setLastCursor(sel?.anchorOffset ?? 0)
    checkForMention(segment.text)
    const newArray = [...segments]
    newArray[index] = segment;
    onChange(newArray)
  }

  return (
    <div className="relative w-full h-full px-2 py-4 rounded-lg resize-none	h-full focus:outline-none">
      <p>
        {segments.map((segment, index) => (
          <STextSegment key={index} segment={segment} onChange={(e) => changeSegment(e, index)} />
        ))}
      </p>

      {sidePanelVisible && <SSideMenu items={users} onSelect={setUser} />}
    </div>
  );
}

export default STextarea;
