import { User } from "./user";

export interface Task {
  assignedTo?: User | null; 
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    category: string;
    completed: boolean;
    id?: string;
    commentsCount: number;
  }
  
  export interface TaskCreateData {
    title: string;
    description: string;
    dueDate: string;
    category?: string;
    assignedTo?: string;
  }
  
  export interface TaskUpdateData {
    title?: string;
    description?: string;
    dueDate?: string;
    category?: string;
    completed?: boolean;
  }
  