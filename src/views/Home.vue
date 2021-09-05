<template>
  <div>
    <div v-if="isLoading">loading...</div>
    <div v-if="hasError">error</div>
    <div v-if="!isLoading && !hasError">
      <div v-for="bus in getBusList" :key="bus._id">
        <span>Destination station - {{ bus.destination }}</span> <br />
        <span>Depart station - {{ bus.depart }}</span> <br />
        <span>Bus trip duration - {{ bus.duration }}</span> <br />
        <span>Bus ticket price - {{ bus.price }}</span>
        <div><button @click="onDelete(bus._id)">delete trip</button></div>
        <button @click="onEdit(bus._id)">edit trip</button>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapGetters(["getBusList", "isLoading", "hasError"]),
  },
  methods: {
    ...mapActions(["loadBus", "deleteBusTrip"]),
    onDelete(id) {
      this.deleteBusTrip(id);
    },
    onEdit(id) {
      this.$router.push({ name: "About", params: { id } });
    },
  },
  mounted() {
    this.loadBus();
  },
};
</script>
