/* eslint-disable prettier/prettier */
<template>
  <h1>Create an event</h1>
  <div v-if="loading">Loading...</div>
  <div v-if="error">Error...</div>
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

<script lang="ts">
import { useCreateEventMutation, useGetEventQuery } from "@/generated/graphql";
import { EventState } from "@/store/types";
import { ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const { result, loading, error } = useGetEventQuery({});
    const categories = ["sustainability", "nature", "animal welfare", "housing", "education", "food", "community"];
    const event = ref({
      category: "",
      title: "",
      description: "",
      location: "",
      date: "",
      time: "",
      organizer: "",
    } );
    // Your data & logic here...

    const store = useStore<EventState>();
    const router = useRouter();

    const { mutate: createEvent } = useCreateEventMutation({});
    const onSubmit = async () => {
      const response = await createEvent({
        input:event.value
      });

      if (response?.data?.createEvent) {
        delete response?.data?.createEvent.__typename;
        await store.dispatch("createEvent", response.data.createEvent);
        await router.push({
          name: "EventDetails",
          params: { id: response.data.createEvent.id },
        });
      } else {
        await router.push({
          name: "ErrorDisplay",
          params: { error: "Failed to create event" },
        });
      }
    };
    return {
      result,
      loading,
      error,
      categories,
      event,
      onSubmit
    };
  },
};
</script>
