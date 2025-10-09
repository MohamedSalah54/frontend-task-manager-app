import API from "./api";
import toast from "react-hot-toast";
import { Task, TaskCreateData, TaskUpdateData } from '@/interfaces/task';
import axios from "axios";

export const getTasks = async (category: string = "all"): Promise<Task[]> => {
  try {
    const normalizedCategory = category.toLowerCase();
    const endpoint = normalizedCategory === "all" ? "/tasks" : `/tasks?category=${normalizedCategory}`;
    const response = await API.get(endpoint);  
    const tasks: Task[] = response.data.map((task: Task) => ({
      ...task,
      id: task._id,
    }));
    return tasks;
  } catch (error) {
    toast.error("Something went wrong");
    return [];
  }
};

export const createTask = async (taskData: TaskCreateData, creatorId: string): Promise<Task> => {
  try {

    const newTaskData = {
      ...taskData,
      ...(taskData.category ? { category: taskData.category.toLowerCase() } : {}), 
      assignedTo: taskData.assignedTo || creatorId,
    };

    const response = await API.post("/tasks", newTaskData);

    if (!response.data || !response.data._id) {
      throw new Error("Failed to get task ID from response");
    }

    return response.data;
  } catch (error: any) {
    toast.error("Failed to Create Task");
    throw error;
  }
};

export const fetchTasksTeam = async (): Promise<Task[]> => {
  try {
    const response = await API.get(`/tasks`);

    if (!response.data) {
      throw new Error("Failed to fetch tasks");
    }

    return response.data; 
  } catch (error: any) {
    toast.error("Failed to fetch tasks");
    throw error;
  }
}

export const fetchTasksTeams = async (teamId: string): Promise<Task[]> => {
  try {
    const response = await API.get(`/tasks`, {
      params: { teamId }, // إرسال teamId للـ API
    });

    if (!response.data) {
      throw new Error("Failed to fetch tasks");
    }

    return response.data;
  } catch (error: any) {
    toast.error("Failed to fetch tasks");
    throw error;
  }
};


export const fetchAllTasksForTeamLead = async (teamId:string) => {
  try {
    const { data } = await API.get(`/tasks/team/all`, {
      params: { teamId }
    });
    return data;
  } catch (error) {
   
  }
};



export const toggleTaskComplete = async (id: string): Promise<Task> => {
  try {
    const response = await API.patch(`/tasks/${id}/toggle-complete`, {}, ); 
    return response.data;
  } catch (error) {
    toast.error("Failed to toggle task status");
    throw error;
  }
};

export const updateTask = async (_id: string, updatedData: TaskUpdateData): Promise<Task> => {
  try {
    const response = await API.patch(`/tasks/${_id}`, updatedData, );  
    return response.data;
  } catch (error: any) {
    toast.error("Failed to Update Task");
    throw error;
  }
};

export const deleteTask = async (_id: string): Promise<any> => {
  try {
    const response = await API.delete(`/tasks/${_id}`); 
    return response.data;
  } catch (error) {
    toast.error("Failed to Delete Task");
    throw error;
  }
};


export const getAllTasks = async () => {
  try {
    const response = await API.get(`${API}/tasks/all"`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTaskForSelf = async (taskData: any) => {
  try {
    const response = await API.post(`${API}/tasks/createTaskForSelf`, taskData);
    return response.data;
  } catch (error: unknown) {
  if (axios.isAxiosError(error) && error.response) {
    throw error.response.data;
  } else if (error instanceof Error) {
    throw error.message;
  } else {
    throw 'Something went wrong';
  }
}
}

export const fetchTasksWithTeamNameAndStatus = async (): Promise<any[]> => {
  try {
    const response = await API.get(`${API}/tasks/with-team-status`); 
    return response.data; 
  }  catch (error: unknown) {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    throw new Error(error.response.data.message);
  } else if (error instanceof Error) {
    throw error; 
  } else {
    throw new Error('Error fetching tasks');
  }
}
};