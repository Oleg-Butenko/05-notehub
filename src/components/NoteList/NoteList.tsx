import css from './NoteList.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteNote } from '../../services/noteService'
import type { Note } from '../../types/note'

interface NoteListProps {
    notes: Note[]
}

const NoteList = ({ notes }: NoteListProps) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (taskId: string) => deleteNote(taskId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["notes"]})
        }
    })
    const handleDelete = (noteId: string) => { 
        mutation.mutate(noteId)
     }
  return (
      <ul className={css.list}>
          {notes.map((note) => {
              return <li key={note.id} className={css.listItem}>
                        <h2 className={css.title}>{note.title}</h2>
                        <p className={css.content}>{note.content}</p>
                        <div className={css.footer}>
                            <span className={css.tag}>{note.tag}</span>
                            <button onClick={() => handleDelete(note.id)} className={css.button}>Delete</button>
                        </div>
                     </li>
          })}
</ul>

  )
}

export default NoteList