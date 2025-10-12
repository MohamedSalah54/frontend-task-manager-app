import api from "./api";
import toast from "react-hot-toast";
import { Task, TaskCreateData, TaskUpdateData } from '@/interfaces/task';
import axios from "axios";

export const getTasks = async (category: string = "all"): Promise<Task[]> => {
  try {
    const normalizedCategory = category.toLowerCase();
    let endpoint = "/tasks";
    
    // Add category parameter if it's not "all"
    if (normalizedCategory !== "all") {
      endpoint = `/tasks?category=${normalizedCategory}`;
    }
    
    const response = await api.get(endpoint);
    console.log("API Response:", response.data);
    console.log("API Response type:", typeof response.data);
    console.log("API Response is array:", Array.isArray(response.data));
    
    // Handle both array and object responses
    let tasksData = response.data;
    if (!Array.isArray(tasksData)) {
      // If response.data is an object, try to find the tasks array
      if (tasksData.tasks && Array.isArray(tasksData.tasks)) {
        tasksData = tasksData.tasks;
      } else if (tasksData.data && Array.isArray(tasksData.data)) {
        tasksData = tasksData.data;
      } else {
        console.warn("Unexpected API response format:", tasksData);
        return [];
      }
    }
    
    const tasks: Task[] = tasksData.map((task: Task) => ({
      ...task,
      id: task._id,
    }));
    console.log("Processed tasks:", tasks);
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
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

    const response = await api.post("/tasks", newTaskData);

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
    const response = await api.get(`/tasks`);

    if (!response.data) {
      throw new Error("Failed to fetch tasks");
    }

    return response.data; 
  } catch (error: any) {
    toast.error("Failed to fetch tasks");
    throw error;
  }
}

export const fetchTasksTeamById = async (teamId: string): Promise<Task[]> => {
  try {
    const response = await api.get(`/tasks/team/all`, {
      params: { teamId },
    });

    if (!response.data) {
      throw new Error("Failed to fetch team tasks");
    }

    return response.data;
  } catch (error: any) {
    toast.error("Failed to fetch team tasks");
    throw error;
  }
};


export const fetchTasksTeams = async (teamId: string): Promise<Task[]> => {
  try {
    const response = await api.get(`/tasks`, {
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
    const { data } = await api.get(`/tasks/team/all`, {
      params: { teamId }
    });
    return data;
  } catch (error) {
   
  }
};



export const toggleTaskComplete = async (id: string): Promise<Task> => {
  try {
    const response = await api.patch(`/tasks/${id}/toggle-complete`, {}, ); 
    return response.data;
  } catch (error) {
    toast.error("Failed to toggle task status");
    throw error;
  }
};

export const updateTask = async (_id: string, updatedData: TaskUpdateData): Promise<Task> => {
  try {
    const response = await api.patch(`/tasks/${_id}`, updatedData, );  
    return response.data;
  } catch (error: any) {
    toast.error("Failed to Update Task");
    throw error;
  }
};

export const deleteTask = async (_id: string): Promise<any> => {
  try {
    const response = await api.delete(`/tasks/${_id}`); 
    return response.data;
  } catch (error) {
    toast.error("Failed to Delete Task");
    throw error;
  }
};


export const getAllTasks = async () => {
  try {
    const response = await api.get(`/tasks/all"`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// export const createTaskForSelf = async (taskData: any) => {
//   try {
//     console.log("Sending taskData:", taskData);
//     const response = await api.post(`/tasks/createTaskForSelf`, taskData);
//     return response.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error) && error.response) {
//       console.error("Error response:", error.response.data);
//       throw error.response.data;
//     } else if (error instanceof Error) {
//       throw error.message;
//     } else {
//       throw "Something went wrong";
//     }
//   }
// };
export const createTaskForSelf = async (taskData: any) => {
  try {
    console.log("🟩 [API] Sending taskData to backend:", taskData);
    const response = await api.post(`/tasks/createTaskForSelf`, taskData);
    console.log("🟦 [API] Response from backend (createTaskForSelf):", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("🟥 [API] Error while creating task:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("🟥 [API] Error response data:", error.response.data);
      throw error.response.data;
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw "Something went wrong";
    }
  }
};


export const fetchTasksWithTeamNameAndStatus = async (): Promise<any[]> => {
  try {
    const response = await api.get(`/tasks/with-team-status`); 
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