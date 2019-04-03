import { Collaborator } from '../collaborator/collaborator';
import { Label } from '../label/label';

export interface Note {
    noteId: string;
    title: string;
    description: string;
     archive: boolean;
     pinned: boolean;
     inTrash: boolean;
     userId: string;
     reminder: string;
     labels: Label[];
     collaborators: Collaborator[];
}
