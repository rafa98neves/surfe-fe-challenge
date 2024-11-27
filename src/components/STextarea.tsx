import { useRef, useState } from "react";

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

  const segRefs: any[] = []

  const [lastCursor, setLastCursor] = useState<number>(0)
  const [lastSegment, setLastSegment] = useState<number>(0)
  const [users, setUsers] = useState<IItem[]>([])
  const [sidePanelVisible, setVisibleToggle] = useState(false)

  const setUser = (username: string) => {
    const user = store.users.get(username);

    if (!sel || !user) return

    const foundSegment = segments[lastSegment]
    const wordData = getWordFromIndex(foundSegment.text, lastCursor)

    let newSegment = { text: user.fullname, userMention: user }

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
  }

  const selectSegment = (index?: number) => {

    if (!index) {
      // TODO remake
      segRefs[segRefs.length - 1]?.current.focus()
    }
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
    <div className="relative cursor-text w-full h-full p-4 rounded-lg resize-none	h-full focus:outline-none" onClick={() => selectSegment()}>
      <p>
        {segments.map((segment, index) => (
          <STextSegment setRef={(e) => segRefs[index] = e} key={index} segment={segment} onSegmentChange={(e) => changeSegment(e, index)} />
        ))}
      </p>

      {sidePanelVisible && <SSideMenu items={users} onSelect={setUser} />}
    </div>
  );
}

export default STextarea;
