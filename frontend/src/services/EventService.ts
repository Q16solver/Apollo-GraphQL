import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const EventService = {
  getEvents() {
    return apiClient.get("/events");
  },
  getEvent(id: string) {
    return apiClient.get("/events/" + id);
  },
  postEvent(event: any) {
    return apiClient.post("/events", event);
  },
};
