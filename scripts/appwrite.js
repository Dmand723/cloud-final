import { Client, Databases } from "appwrite";

// Initialize Appwrite client
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(projectId);

const databases = new Databases(client);
const databaseId = "6837325700155d4656b6";
const collectionId = "School";
/**
 * Fetches all documents from a given Appwrite database collection.
 * @param {string} databaseId - The database ID.
 * @param {string} collectionId - The collection ID.
 * @returns {Promise<Array>} - Array of documents.
 */
async function getAllNotes() {
  try {
    const response = await databases.listDocuments(databaseId, collectionId);
    return response.documents;
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
}
async function updateNotePos(noteId = "", x = 0.0, y = 0.0) {
  try {
    const res = await databases.updateDocument(
      databaseId,
      collectionId,
      noteId,
      { x, y }
    );
    return res;
  } catch (error) {
    console.log("error updating document", error);
    return "error";
  }
}
async function deleteNote(noteId = "") {
  try {
    const res = await databases.deleteDocument(
      databaseId,
      collectionId,
      noteId
    );
    return res;
  } catch (error) {
    console.log("Error deleting document", error);
    return error;
  }
}

export { getAllNotes, updateNotePos, deleteNote };
