<template>
  <div id="app" class="app">
    <template v-if="!loading">
      <AppNav class="app__nav"></AppNav>
      <main class="app__main">
        <router-view
          :user="user"
          class="app__router-view"
        />
      </main>
    </template>
    <template v-else>
      <div class="app__loading">Loading...</div>
    </template>
  </div>
</template>

<script>
  import axios from 'axios';
  import AppNav from '@/components/AppNav.vue';

  export default {
    name: 'App',
    components: {
      AppNav,
    },
    data() {
      return {
        loading: false,
        user: {
          photo: null,
          name: null
        }
      }
    },
    async mounted() {
      this.loading = true;
      const { data } = await axios.get('https://randomuser.me/api/');
      this.loading = false;

      this.user = {
        photo: data.results[0].picture.thumbnail,
        name: `${data.results[0].name.first} ${data.results[0].name.last}`
      }
    }
  };
</script>


<style lang="scss" scoped>
  .app {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    background: $color-primary-background--light;

    &__nav {
      width: 100px;
      box-shadow: 0 8px 22px 0 rgba(132, 137, 155, 0.09);
    }

    &__main {
      width: calc(100vw - 100px);
    }

    &__header {
      height: 90px;
      width: 100%;
    }

    &__router-view {
      height: 100vh;
      width: 100%;
      background: $color-primary-background;
    }

    &__loading {
      height: 100vh;
      width: 100%;
      background: $color-primary-background;
      display: flex;
      align-items: center;
      justify-content: center;
      @include font(20, 500);
    }
  }
</style>
