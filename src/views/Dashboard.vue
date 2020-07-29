<template>
  <div class="dashboard">
    <AppHeader
      :user="user"
      class="app__header"
      @submit-appointment="handleSubmitAppointment"
    ></AppHeader>
    <div
      v-if="newsModalOpen"
      class="modal"
    >
      <DashboardNewsModal
        :data="activeNews"
        @close="handleCloseNewsModal"
      />
    </div>
    <div class="dashboard__upper">
      <BaseBox title="Upcoming appointments">
        <DashboardAppointments
          :data="appointments"
          @confirm="handleChangeAppointmentStatus($event, 'confirmed')"
          @reject="handleChangeAppointmentStatus($event, 'rejected')"
        ></DashboardAppointments>
      </BaseBox>
      <BaseBox title="Recent results">
        <DashboardResults
          :data="currentResultsData"
          :month="month"
          :type="type"
          @change-month="handleChangeMonth"
          @change-type="handleChangeType"
        ></DashboardResults>
      </BaseBox>
    </div>
    <div class="dashboard__lower">
      <BaseBox title="News">
        <DashboardNews
          :data="news"
          @open="handleOpenNewsModal"
        />
      </BaseBox>
      <BaseBox title="Current prescriptions">
        <DashboardPrescriptions :data="prescriptions" />
      </BaseBox>
      <BaseBox title="Notifications">
        <DashboardNotifications
          :data="notifications"
          @dismiss="handleNotificationsDismissal"
        />
      </BaseBox>
    </div>
  </div>
</template>

<script>
  import BaseBox from '../components/common/BaseBox';
  import DashboardAppointments from '../components/dashboard/DashboardAppointments';
  import DashboardNews from '../components/dashboard/DashboardNews';
  import DashboardPrescriptions from '../components/dashboard/DashboardPrescriptions';
  import DashboardNotifications from '../components/dashboard/DashboardNotifications';
  import DashboardResults from '../components/dashboard/DashboardResults';
  import DashboardNewsModal from '../components/dashboard/DashboardNewsModal';
  import AppHeader from '@/components/AppHeader.vue';
  import {
    resultsDataMock,
    appointmentsMock,
    prescriptionsMock,
    notificationsMock,
    newsMock
  } from '@/mocks/mocks';

  export default {
    name: 'Dashboard',
    components: {
      BaseBox,
      DashboardAppointments,
      DashboardNews,
      DashboardPrescriptions,
      DashboardNotifications,
      DashboardResults,
      DashboardNewsModal,
      AppHeader
    },
    props: {
      user: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        newsModalOpen: false,
        activeNews: null,
        month: 'july',
        type: 'glucose',
        resultsData: resultsDataMock,
        appointments: appointmentsMock,
        news: newsMock,
        prescriptions: prescriptionsMock,
        notifications: notificationsMock
      }
    },
    computed: {
      currentResultsData() {
        return this.resultsData[this.type]['2020'][this.month];
      }
    },
    methods: {
      handleCloseNewsModal() {
        this.newsModalOpen = false;
        this.activeNews = null;
      },
      handleOpenNewsModal(news) {
        this.newsModalOpen = true;
        this.activeNews = news;
      },
      handleNotificationsDismissal(id) {
        this.notifications = this.notifications.filter(notif => notif.id !== id)
      },
      handleChangeAppointmentStatus(id, status) {
        const index = this.appointments.findIndex(app => app.id === id);

        this.appointments = [
          ...this.appointments.slice(0, index),
          {
            ...this.appointments[index],
            status
          },
          ...this.appointments.slice(index + 1)
        ]

        if (status === 'rejected') {
          this.addNotification('action', `You rejected the appointment with ${this.appointments[index].doctor.name}, ${this.appointments[index].doctor.specialty}`)

        } else {
          this.addNotification('info', `You confirmed the appointment with ${this.appointments[index].doctor.name}, ${this.appointments[index].doctor.specialty}`)
        }
      },
      handleSubmitAppointment({specialty, name, date}) {
        this.appointments = [
          {
            id: this.appointments.length + 1,
            date,
            status: null,
            doctor: {
              photo: 'user',
              name,
              specialty
            }
          },
          ...this.appointments
        ]
        this.addNotification('action', `You made an appointment with ${name}, ${specialty}`)
      },
      handleChangeType(type) {
        this.type = type;
      },
      handleChangeMonth(month) {
        this.month = month;
      },
      addNotification(type, message) {
        this.notifications = [
          {
            id: this.notifications.length + 1,
            type,
            message,
            date: '01/08/2020'
          },
          ...this.notifications
        ]
      }
    }
  };
</script>

<style lang="scss">
  .dashboard {
    display: flex;
    flex-direction: column;
    padding: $ui-default-measure4x;

    @include xl-up {
      padding: $ui-default-measure4x 70px;
    }

    &__upper,
    &__lower {
      display: flex;
      flex-wrap: nowrap;

      > .base-box {
        &:not(:first-of-type) {
          margin-left: $ui-default-measure2x;
        }
      }
    }

    &__upper {
      height: 55%;
      padding-bottom: $ui-default-measure3x;

      > .base-box {
        &:first-of-type {
          flex: 1;
        }

        &:nth-of-type(2) {
          flex: 2;
        }
      }
    }

    &__lower {
      height: 45%;

      > .base-box {
        &:first-of-type {
          flex: 3;
        }

        &:nth-of-type(2) {
          flex: 3;
        }

        &:nth-of-type(3) {
          flex: 4;
        }
      }
    }
  }
</style>
