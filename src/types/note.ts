export default interface Note {
    id: string
    title: string
    content: string
    tag: string
}

export interface CreateNoteRequest {
    title: string
    content: string
    tag: string
}