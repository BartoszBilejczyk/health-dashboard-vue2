<template>
  <div class="modal-content appointment-modal">
    <label class="copy copy--small" for="city">
      City
    </label>
    <select
      v-model="city"
      id="city"
      class="form-field"
    >
      <option
        v-for="option in cities"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <label class="copy copy--small" for="specialty">
      Specialty
    </label>
    <select
      v-model="specialty"
      id="specialty"
      class="form-field"
    >
      <option
        v-for="option in specialties"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <label
      class="copy copy--small"
      for="name"
    >
      Doctor
    </label>
    <select
      :disabled="!specialty || !city"
      v-model="name"
      id="name"
      class="form-field"
    >
      <option
        v-for="option in specialtyDoctors"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <label class="copy copy--small" for="date">
      Date
    </label>
    <input
      class="form-field"
      type="date"
      id="date"
      v-model="date"
    >
    <BaseButton
      :small="true"
      class="appointment-modal__close"
      @click.native="$emit('close')"
    >
      Close
    </BaseButton>
    <BaseButton
      :disabled="!city || !specialty || !name || !date"
      @click.native="$emit('submit', {specialty, name, date})"
    >
      Submit
    </BaseButton>
  </div>
</template>

<script>
  import BaseButton from './common/BaseButton';
  import {
    appointmentModalMockSpecialties,
    appointmentModalMockDoctors,
    appointmentModalMockCities
  } from '@/mocks/mocks';

  export default {
    name: 'AppHeaderAppointmentModal',
    components: {
      BaseButton
    },
    data() {
      return {
        city: null,
        specialty: null,
        name: null,
        date: null,
        cities: appointmentModalMockCities,
        doctors: appointmentModalMockDoctors,
        specialties: appointmentModalMockSpecialties
      }
    },
    computed: {
      specialtyDoctors() {
        return this.doctors.filter(doc => doc.specialty === this.specialty && doc.city === this.city)
      }
    }
  }
</script>

<style lang="scss">
  .appointment-modal {
    button {
      margin: $ui-default-measure3x auto 0;

      &.appointment-modal__close {
        margin: 0;
        position: absolute;
        right: $ui-default-measure2x;
        top: $ui-default-measure2x;
      }
    }

    label {
      margin: 12px 0 4px;
    }
  }
</style>
