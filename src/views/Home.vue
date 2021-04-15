<template>
  <div class="home">{{ $t('title.login') }}</div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  computed: {
    ...mapGetters('user', ['userLoading'])
  },
  mounted() {
    console.log('userLoading', this.userLoading);
  }
});
</script>
