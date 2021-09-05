import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    busList: [],
    loading: false,
    error: null,
  },
  getters: {
    getBusList: (state) => state.busList,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
  },
  mutations: {
    setBusList(state, list) {
      state.busList = list;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    loadBus({ commit }) {
      commit("setLoading", true);
      commit("setError", null);
      axios
        .get("http://localhost:3000/buses")
        .then((res) => res.data)
        .then((resData) => {
          if (resData.success) commit("setBusList", resData.data);
          else throw new Error("Fetch failed!");
        })
        .catch((err) => {
          commit("setError", err);
        })
        .finally(() => commit("setLoading", false));
    },
    createBus(
      { commit },
      { busDestination, busDepart, busDuration, busPrice }
    ) {
      commit("setLoading", true);
      commit("setError", null);
      axios
        .get("http://localhost:3000/buses/add", {
          busDestination,
          busDepart,
          busDuration,
          busPrice,
        })
        .then((res) => res.data)
        .then((resData) => {
          if (resData.success) commit("setBusList", resData.data);
          else throw new Error("Fetch failed!");
        })
        .catch((err) => {
          commit("setError", err);
        })
        .finally(() => commit("setLoading", false));
    },
  },
  modules: {},
});
