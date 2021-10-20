<template>
  <h1>Events for {{ user }}</h1>
  <div class="events">
    <EventCard v-for="event in getEvent" :key="event.id" :event="event" />
  </div>
</template>

<script lang="ts">
import EventCard from '@/components/EventCard.vue';
import { defineComponent } from '@vue/runtime-core';
import { mapActions, mapState } from 'vuex';
import gql from 'graphql-tag';
export default defineComponent({
  components: { EventCard },
  apollo: {
    // Vue-Apollo options here
    getEvent: gql`
      query Event {
        getEvent {
          id
          category
          title
          description
          location
          date
          time
          organizer
        }
      }
    `,
  },
  created() {},
  methods: {
    ...mapActions(['fetchEvents']),
  },
  computed: {
    ...mapState(['events', 'user']),
  },
  data() {
    return {
      getEvent: [],
    };
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
