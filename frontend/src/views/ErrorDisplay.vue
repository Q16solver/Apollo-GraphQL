<template>
  <h4>Oops! There was an error:</h4>
  <p>{{ error }}</p>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: { error: { type: String } },
});
</script>
