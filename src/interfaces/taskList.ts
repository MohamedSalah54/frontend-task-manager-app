import { Task } from "./task";

export interface TaskListProps {
  tasks: Task[];
  tooltipVisibleId: string | null;
  setTooltipVisible: (id: string | null) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onToggleComplete: (task: Task) => void;
  currentUser?: { role: string } 

}