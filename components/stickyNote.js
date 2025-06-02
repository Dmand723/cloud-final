import { useDraggable } from "@dnd-kit/core";
import { useRef, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { updateNote } from "@/scripts/appwrite";

export default function StickyNote({ id, text, position, background, update }) {
  const [isEdit, setIdEdit] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const textRef = useRef(text);

  const colors = {
    yellow: "#FFE082",
    pink: "#ff65a3",
    blue: "#71d7ff",
  };
  const [curColor, setCurColor] = useState(background);

  const x = (position?.x || 0) + (transform?.x || 0);
  const y = (position?.y || 0) + (transform?.y || 0);

  function handleEdit() {
    const newData = {
      text: textRef.current.value,
      color: curColor,
      x: position.x,
      y: position.y,
    };
    updateNote(id, newData);
    update(newData, id);
    setIdEdit(false);
  }

  const style = {
    transform: `translate3d(${x}px, ${y}px, 0)`,
    position: "absolute",
    background: curColor,
  };
  function getPos() {
    return { x: position.x, y: position.y };
  }

  return (
    <>
      {isEdit ? (
        <div style={style} className="sticky-note">
          <IoMdCheckmark
            size={25}
            color="green"
            className="absolute top-1 right-2 z-10 cursor-pointer"
            onClick={handleEdit}
          />
          <div className="sticky-note relative">
            <div className="thumb-tack-add" />
            <div className="decoration-0 text-blacs block h-[10em] w-[10em] p-[1em] relative">
              <textarea
                placeholder="Text"
                className="font-normal block w-full resize-none break-words whitespace-pre-wrap text-font"
                ref={textRef}
                defaultValue={text}
                rows={5}
                maxLength={64}
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
      ) : (
        <div ref={setNodeRef} style={style} className="sticky-note">
          <MdModeEditOutline
            className="absolute top-1 right-2 z-10 cursor-pointer"
            onClick={() => {
              setIdEdit(true);
            }}
          />
          <div className="thumb-tack" {...listeners} {...attributes}></div>
          <div className="decoration-0 text-blacs block h-[10em] w-[10em] p-[1em] relative">
            <p className=" font-normal break-words whitespace-pre-wrap text-font">
              {text}
            </p>
            <div className="absolute bottom-2 right-2"></div>
          </div>
        </div>
      )}
    </>
  );
}
