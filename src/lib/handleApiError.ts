export function handleApiError(error: any): string {
  if (!error.response) {
    return "Network error: Unable to reach the server ⚠️";
  }

  const status = error.response.status;
  const message = error.response.data?.message || "An unexpected error occurred.";

  if (status === 400) return "Bad request. Please check your input.";
  if (status === 401) return "Unauthorized. Please log in again.";
  if (status === 403) return "You don’t have permission to perform this action.";
  if (status === 404) return "Resource not found.";
  if (status === 500) return "Internal server error. Please try again later.";

  if (message.includes("Profile with userId") && message.includes("not found")) {
    return "User not found or has already been deleted.";
  }

  return message;
}
