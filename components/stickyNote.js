import { useDraggable } from "@dnd-kit/core";
import { MdModeEditOutline } from "react-icons/md";

export default function StickyNote({ id, title, text, position, background }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const x = (position?.x || 0) + (transform?.x || 0);
  const y = (position?.y || 0) + (transform?.y || 0);

  const style = {
    transform: `translate3d(${x}px, ${y}px, 0)`,
    position: "absolute",
    background,
  };
  function getPos() {
    return { x: position.x, y: position.y };
  }

  return (
    <div ref={setNodeRef} style={style} className="sticky-note">
      <MdModeEditOutline className="absolute top-2 right-2 z-10 cursor-pointer" />
      <div className="thumb-tack" {...listeners} {...attributes}></div>
      <div className="decoration-0 text-blacs block h-[10em] w-[10em] p-[1em] relative">
        <h1 className="font-bold size-[2rem]">{title}</h1>
        <p className="size-[1rem] font-normal">{text}</p>
        <div className="absolute bottom-2 right-2"></div>
      </div>
    </div>
  );
}
