<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  props: ["id"],
  async created() {
    try {
      await this.fetchEvent(this.id);
    } catch (error) {
      this.$router.push({
        name: "ErrorDisplay",
        params: { error: (error as Error).message },
      });
    }
  },
  methods: {
    ...mapActions(["fetchEvent"]),
  },
  computed: {
    ...mapState(["event"]),
  },
});
</script>
