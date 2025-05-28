"use client";

import StickyNote from "@/components/stickyNote";
import TrashZone from "@/components/trashZone";
import { getAllNotes, updateNotePos, deleteNote } from "@/scripts/appwrite";
import { useState, useEffect } from "react";
import { DndContext, pointerWithin, DragOverlay } from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";

export default function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getAllNotes().then(setNotes);
  }, []);

  useEffect(() => {
    setNewPos();
  }, [notes]);

  const handleDragEnd = (event) => {
    const { active, over, delta } = event;

    // Get container dimensions
    const container = document.body; // or use a ref to your main div if needed
    const containerRect = container.getBoundingClientRect();

    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.$id !== active.id) return note;

        // Calculate new position
        let newX = (note.x || 0) + delta.x;
        let newY = (note.y || 0) + delta.y;

        // Clamp to container bounds
        newX = Math.max(0, Math.min(newX, containerRect.width - 200)); // 200 = note width
        newY = Math.max(0, Math.min(newY, containerRect.height - 200)); // 200 = note height

        return { ...note, x: newX, y: newY };
      })
    );

    if (over && over.id === "droppable-zone") {
      deleteNote(active.id);
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.$id !== active.id)
      );
    }
  };

  function setNewPos() {
    if (Array.isArray(notes)) {
      notes.map((note) => {
        updateNotePos(note.$id, note.x, note.y);
      });
    }
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
        {Array.isArray(notes) &&
          notes.map((note) => (
            <StickyNote
              key={note.$id}
              id={note.$id}
              title={note.title}
              text={note.text}
              position={{ x: note.x || 0, y: note.y || 0 }}
              background={note.color || "#FFE082"}
            />
          ))}{" "}
        <TrashZone id="droppable-zone"></TrashZone>{" "}
        <DragOverlay modifiers={[restrictToWindowEdges]}></DragOverlay>
      </DndContext>
    </div>
  );
}
