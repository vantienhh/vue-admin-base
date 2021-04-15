<template>
  <section id="app">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </section>
</template>

<script lang="ts">
export default {
  name: 'App'
};
</script>
