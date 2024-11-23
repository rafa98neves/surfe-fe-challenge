import { useState } from "react";
import STextarea, { IModel } from "../components/STextarea";

const DEFAULT_MODEL: IModel = { text: "", title: "" };

function NotesCreation() {
  const [model, onChange] = useState<IModel>(DEFAULT_MODEL);

  return (
    <div className="w-full h-full bg-gray-50 rounded-lg px-4 py-6">
      <STextarea model={model} onChange={onChange} />
    </div>
  );
}

export default NotesCreation;
