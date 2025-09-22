import axios from "axios";
import type { CreateNoteRequest, Note } from "../types/note";


export default interface FetchNotesResponse  {
    notes: Note[],
    totalPages: number
}



const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;

export const fetchNotes = async (notes: string, page: number ): Promise<FetchNotesResponse> => {
    const response = await axios.get<FetchNotesResponse>(
    `https://notehub-public.goit.study/api/notes`, {
  params: {
        search: `${notes}`,
            page,
            perPage: 12
  },
  headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
  }
}
  );
  
  return response.data;
}

export const createNote = async (newNote: CreateNoteRequest) => {
    const response = await axios.post<Note>(`https://notehub-public.goit.study/api/notes`, newNote,  {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      }
    });
    return response.data
}

export const deleteNote = async (noteId: string) => {
    const response = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${noteId}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      }
    });
  return response.data
}