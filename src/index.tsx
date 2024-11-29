import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import "./index.css";

import { StateProvider } from "./store/reducers";
import NotesCreation from "./pages/NotesCreation";
import NotesList from "./pages/NotesList";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <StateProvider>
      <div className="flex flex-col relative min-h-screen overflow-hidden py-8 xl:px-80 md:px-20 px-12">
        <h3 className="text-slate-50 text-center text-4xl text-title mb-6"> Surfe Notes </h3>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NotesList />} />
            <Route path="/create" element={<NotesCreation />} />
            <Route path="/:id" element={<NotesCreation />} />
          </Routes>
        </BrowserRouter>
      </div>
    </StateProvider>
  </React.StrictMode>
);
