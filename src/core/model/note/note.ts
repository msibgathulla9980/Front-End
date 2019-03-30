import { Collaborator } from '../collaborator/collaborator';

export interface Note {
    noteId: string;
    title: string;
    description: string;
     archive: boolean;
     pinned: boolean;
     inTrash: boolean;
     userId: string;
     reminder: string;
     collaborators: Collaborator[];
}
