<template>
  <h1>Events for {{ user }}</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script lang="ts">
import EventCard from "@/components/EventCard.vue";
import { defineComponent } from "@vue/runtime-core";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  components: { EventCard },
  async created() {
    try {
      await this.fetchEvents();
    } catch (error) {
      this.$router.push({
        name: "ErrorDisplay",
        params: { error: (error as Error).message },
      });
    }
  },
  methods: {
    ...mapActions(["fetchEvents"]),
  },
  computed: {
    ...mapState(["events", "user"]),
  },
});
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
