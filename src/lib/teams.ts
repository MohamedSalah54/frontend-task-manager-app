// src/lib/teams.ts
import axios from 'axios';
import { Team, CreateTeamDto, UpdateTeamDto } from '@/interfaces/team';
import toast from 'react-hot-toast';
import api from './api';


export const getMyTeam = async (): Promise<Team | null> => {
  try {
    const response = await api.get(`/teams/my-team`);

    if (!response.data || response.data.message === 'No team found') {
      return null;
    }

    const teamData = response.data.team ? response.data.team : response.data;

    return teamData;
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};




export const createTeam = async (data: CreateTeamDto): Promise<Team> => {
  try {
    const response = await api.post(`/teams/create`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message as string;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
    toast.error(' failed to create team');
    throw new Error('something went wrong');
  }
};

export const updateTeam = async (id: string, data: UpdateTeamDto): Promise<Team> => {
  if (!data) {
    throw new Error("No data provided for update.");
  }

  const safeData = {
    ...data,
    members: data.members ?? [],
  };

  try {
    const response = await api.put(`/teams/${id}`, safeData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to update team');
    }
    throw new Error('An unknown error occurred');
  }
};





export const deleteTeam = async (id: string): Promise<void> => {
  try {
    await api.delete(`/teams/${id}`);
    toast.success('Team deleted successfully!');
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to delete team');
    }
    throw new Error('An unknown error occurred');
  }
};


export const checkUserInTeam = async (email: string): Promise<any> => {
  try {
    const response = await api.get(`/teams/check-user`, { 
      params: { email },
    });
    return response.data;  
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to check user');
    }
    throw new Error('An unknown error occurred');
  }
};


export const getTeamMembers = async () => {
  try {
    const res = await api.get(`/teams/my-members`, {
    });

    return res.data.members;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to fetch team members");
    return [];
  }
};

export const getAllTeams = async () => {
  try {
    const response = await api.get(`/teams/all`, );
    return response.data; 
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

