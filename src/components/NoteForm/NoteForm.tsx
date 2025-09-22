import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteForm.module.css';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  type FormikHelpers,
} from 'formik';
import { createNote } from '../../services/noteService';
import type { CreateNoteRequest } from '../../types/note';
import { object, string } from 'yup';

interface NoteFormProps {
  onClose: () => void;
}

interface NoteFormValues {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

const initialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newNote: CreateNoteRequest) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const handleSubmit = (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>
  ) => {
    mutation.mutate(values, {
      onSuccess: () => {
        actions.resetForm();
        onClose();
      },
    });
  };

  const NoteFormSchema = object().shape({
    title: string()
      .min(3, 'Title must be at least 3 characters')
      .max(50, 'Title must be less then 50 characters')
      .required('Title is required'),
    content: string().max(500, 'Title must be less then 500 characters'),
    tag: string()
      .required()
      .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']),
  });

  return (
    <Formik
      validationSchema={NoteFormSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage component="span" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button
            onClick={onClose}
            type="button"
            className={css.cancelButton}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className={css.submitButton}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Loading...' : 'Create note'}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
