import { apiRequest } from "./client";

export function getTasks(token) {
  return apiRequest("/tasks", { token });
}

export function createTask(token, data) {
  return apiRequest("/tasks", { method: "POST", body: data, token });
}

export function updateTask(token, id, data) {
  return apiRequest(`/tasks/${id}`, { method: "PATCH", body: data, token });
}

export function deleteTask(token, id) {
  return apiRequest(`/tasks/${id}`, { method: "DELETE", token });
}