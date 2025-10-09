import api from "./api";

export const fetchCommentsByTask = async (taskId: string) => {
  const response = await api.get(`/comments/${taskId}`);
  return response.data;
};

export const createComment = async (text: string, taskId: string) => {
  const response = await api.post("/comments", { text, taskId });
  return response.data;
};

export const updateComment = async (id: string, text: string) => {
  const response = await api.patch(`/comments/${id}`, { text });
  return response.data;
};

export const deleteComment = async (id: string) => {
  const response = await api.delete(`/comments/${id}`);
  return response.data;
};

