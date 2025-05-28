import { useDroppable } from "@dnd-kit/core";
import { IoTrashSharp } from "react-icons/io5";

export default function TrashZone({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        width: 100,
        height: 100,
        background: isOver ? "#ffbdbd" : "#eee",
        border: isOver ? "3px solid #f44336" : "3px solid black",
        borderRadius: "50%", // Make it circular
        position: "fixed",
        right: 50,
        bottom: 50,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IoTrashSharp color={isOver ? "red" : "black"} size={30} />
    </div>
  );
}
