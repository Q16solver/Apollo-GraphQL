<template>
  <h1>Create an event</h1>

  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <select v-model="event.category">
        <option v-for="option in categories" :value="option" :key="option" :selected="option === event.category">
          {{ option }}
        </option>
      </select>

      <h3>Name & describe your event</h3>

      <label>Title</label>
      <input v-model="event.title" type="text" placeholder="Title" />

      <label>Description</label>
      <input v-model="event.description" type="text" placeholder="Description" />

      <h3>Where is your event?</h3>

      <label>Location</label>
      <input v-model="event.location" type="text" placeholder="Location" />

      <h3>When is your event?</h3>
      <label>Date</label>
      <input v-model="event.date" type="text" placeholder="Date" />

      <label>Time</label>
      <input v-model="event.time" type="text" placeholder="Time" />

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Event, EventState } from "@/store/types";
import { ref } from "@vue/runtime-core";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore<EventState>();
const router = useRouter();
const categories = ["sustainability", "nature", "animal welfare", "housing", "education", "food", "community"];
const event = ref({
  id: "",
  category: "",
  title: "",
  description: "",
  location: "",
  date: "",
  time: "",
  organizer: "",
});

const onSubmit = async () => {
  const newEvent: Event = {
    ...event.value,
    id: uuidv4(),
    organizer: store.getters.user,
  };

  try {
    await store.dispatch("createEvent", newEvent);
    await router.push({
      name: "EventDetails",
      params: { id: newEvent.id },
    });
  } catch (error) {
    await router.push({
      name: "ErrorDisplay",
      params: { error },
    });
  }
};
</script>
