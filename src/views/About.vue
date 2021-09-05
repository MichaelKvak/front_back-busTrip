<template>
  <div>
    <label>
      Bus Destination
      <input type="text" v-model="busDestination" />
    </label>
    <br />
    <label>
      Bus Depart
      <input type="text" v-model="busDepart" />
    </label>
    <br />
    <label>
      Bus trip duration
      <input type="number" v-model.number="busDuration" />
    </label>
    <br />
    <label>
      Bus ticket price
      <input type="number" v-model.number="busPrice" />
    </label>
    <div>
      <button @click="onSave" :disabled="!isDataValid">save</button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "About",
  data() {
    return {
      busDestination: null,
      busDepart: null,
      busDuration: null,
      busPrice: null,
    };
  },
  computed: {
    isDataValid() {
      return (
        this.busDestination &&
        this.busDepart &&
        this.busDuration &&
        this.busPrice
      );
    },
  },
  methods: {
    ...mapActions(["createBus"]),
    onSave() {
      this.createBus({
        busDestination: this.busDestination,
        busDepart: this.busDepart,
        busDuration: this.busDuration,
        busPrice: this.busPrice,
      });
    },
  },
};
</script>
<style scoped></style>
