<template>
  <div>
    <div v-if="isLoading">loading...</div>
    <div v-if="hasError">error</div>
    <div v-if="!isLoading && !hasError">
      <div v-for="bus in getBusList" :key="bus.id">
        <span>Destination station - {{ bus.destination }}</span> <br />
        <span>Depart station - {{ bus.depart }}</span> <br />
        <span>Bus trip duration - {{ bus.duration }}</span> <br />
        <span>Bus ticket price - {{ bus.price }}</span>
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
    ...mapActions(["loadBus"]),
  },
  mounted() {
    this.loadBus();
  },
};
</script>
