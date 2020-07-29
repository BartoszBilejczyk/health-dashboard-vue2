<template>
  <header class="app-header">
    <div
      v-if="modalOpen"
      class="modal"
    >
      <AppHeaderAppointmentModal
        @close="handleCloseModal"
        @submit="handleEmitAppointment"
      />
    </div>
    <BaseButton @click.native="handleOpenAppointmentModal">
      Make an appointment
    </BaseButton>
    <div class="app-header__user">
      <img :src="user.photo" alt="User image">
      <span>
        {{ user.name }}
      </span>
    </div>
  </header>
</template>

<script>
  import AppHeaderAppointmentModal from './AppHeaderAppointmentModal';
  import BaseButton from './common/BaseButton';

  export default {
    name: 'AppHeader',
    components: {
      AppHeaderAppointmentModal,
      BaseButton
    },
    props: {
      user: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        modalOpen: false,
      }
    },
    methods: {
      handleCloseModal() {
        this.modalOpen = false;
      },
      handleOpenAppointmentModal() {
        this.modalOpen = true;
      },
      handleEmitAppointment(data) {
        this.$emit('submit-appointment', data);
        this.handleCloseModal();
      }
    }
  }
</script>

<style scoped lang="scss">
  .app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: $ui-default-measure3x;

    img {
      border-radius: $ui-default-border-radius--circle;
    }

    &__user {
      height: 56px;
      display: flex;
      align-items: center;

      span {
        display: inline-block;
        margin-left: $ui-default-measure2x;
        @include font(16, 500);
        color: $color-copy--dark;
      }
    }
  }
</style>
