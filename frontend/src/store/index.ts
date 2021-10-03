import { EventService } from "@/services/EventService";
import { createStore } from "vuex";

export const rootStore = createStore<EventState>({
  state: {
    user: "Adam Jahr",
    events: [],
    event: null,
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
  },
  actions: {
    async createEvent({ commit }, event) {
      await EventService.postEvent(event);
      commit("ADD_EVENT", event);
    },
    async fetchEvents({ commit }) {
      const response = await EventService.getEvents();
      commit("SET_EVENTS", response.data);
    },
    async fetchEvent({ commit, state }, id) {
      const existingEvent = state.events.find((event) => event.id === id);
      if (existingEvent) {
        commit("SET_EVENT", existingEvent);
      } else {
        const response = await EventService.getEvent(id);
        commit("SET_EVENT", response.data);
        return response.data;
      }
    },
  },
  modules: {},
});
