"use client";
import { useRef, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { addNote } from "@/scripts/appwrite";

export default function AddNote({ setAddingNote, update }) {
  const titleRef = useRef("");
  const textRef = useRef("");
  const parentRef = useRef(null);

  const colors = {
    yellow: "#FFE082",
    pink: "#ff65a3",
    blue: "#71d7ff",
  };
  const [curColor, setCurColor] = useState(colors.yellow);
  function getPos() {
    if (parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      return { x: rect.left, y: rect.top };
    } else return { x: 0, y: 0 };
  }
  function handleCreateNote() {
    const rect = getPos();
    const data = {
      title: titleRef.current.value || "",
      text: textRef.current.value || "",
      color: curColor,
      x: rect.x,
      y: rect.y,
    };
    addNote(data);
    setAddingNote(false);
    update(data);
  }
  return (
    <div
      ref={parentRef}
      className="fixed top-[50%] left-[45%] z-50"
      style={{ background: curColor }}
    >
      <IoMdCheckmark
        size={25}
        color="green"
        className="absolute top-2 right-2 z-10 cursor-pointer"
        onClick={handleCreateNote}
      />
      <div className="sticky-note relative">
        <div className="thumb-tack-add" />
        <div className="decoration-0 text-blacs block h-[10em] w-[10em] p-[1em] relative">
          <input
            type="text"
            placeholder="Title"
            className="font-bold block"
            ref={titleRef}
          />
          <input
            type="text"
            placeholder="Text"
            className="font-normal block"
            ref={textRef}
          />
          {/* Color squares */}
          <div className="absolute bottom-2 right-2 flex gap-1">
            <div
              className="w-4 h-4 rounded cursor-pointer"
              style={{ background: colors.yellow }}
              onClick={() => {
                setCurColor(colors.yellow);
              }}
            ></div>
            <div
              className="w-4 h-4 rounded cursor-pointer"
              style={{ background: colors.pink }}
              onClick={() => {
                setCurColor(colors.pink);
              }}
            ></div>
            <div
              className="w-4 h-4 rounded cursor-pointer"
              style={{ background: colors.blue }}
              onClick={() => {
                setCurColor(colors.blue);
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
