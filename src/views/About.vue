<template>
  <div>
    <div v-if="isLoading">loading...</div>
    <div v-if="hasError">error</div>
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
        <button @click="onSave" :disabled="!isDataValid">{{ saveBtn }}</button>
      </div>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "About",
  data() {
    return {
      busDestination: null,
      busDepart: null,
      busDuration: null,
      busPrice: null,
      errorMessage: null,
    };
  },
  computed: {
    ...mapGetters(["isLoading", "hasError"]),
    isDataValid() {
      return (
        this.busDestination &&
        this.busDepart &&
        this.busDuration &&
        this.busPrice
      );
    },
    isEditing() {
      return !!this.$route.params.id;
    },
    saveBtn() {
      return this.isEditing ? "save" : "create";
    },
  },
  methods: {
    ...mapActions(["createBus", "getBusById", "updateBus"]),
    async onSave() {
      this.errorMessage = "";
      try {
        if (this.isEditing) {
          await this.updateBus({
            busDestination: this.busDestination,
            busDepart: this.busDepart,
            busDuration: this.busDuration,
            busPrice: this.busPrice,
          });
        } else {
          await this.createBus({
            busDestination: this.busDestination,
            busDepart: this.busDepart,
            busDuration: this.busDuration,
            busPrice: this.busPrice,
          });
        }
        this.$router.push({ name: "Home" });
      } catch {
        this.errorMessage = "Saving error";
      }
    },
  },
  async mounted() {
    if (this.isEditing) {
      try {
        const editedObj = await this.getBusById(this.$route.params.id);
        this.busDestination = editedObj.Destination;
        this.busDepart = editedObj.Depart;
        this.busDuration = editedObj.Duration;
        this.busPrice = editedObj.Price;
      } catch {
        this.errorMessage = "edited error";
      }
    }
  },
};
</script>
<style scoped></style>
