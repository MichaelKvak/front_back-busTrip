import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    busList: [],
    editedObj: null,
    loading: false,
    error: null,
  },
  getters: {
    getBusList: (state) => state.busList,
    getEditedObj: (state) => state.editedObj,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
  },
  mutations: {
    deleteBus(state, busId) {
      state.busList = state.busList.filter((item) => item._id !== busId);
    },
    setEditedObj(state, obj) {
      state.editedObj = obj;
    },
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
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3000/buses/add", {
            busDestination,
            busDepart,
            busDuration,
            busPrice,
          })
          .then((res) => res.data)
          .then((resData) => {
            if (resData.success) resolve(true);
            else throw new Error("Fetch failed!");
          })
          .catch((err) => {
            commit("setError", err);
            reject(err);
          })
          .finally(() => commit("setLoading", false));
      });
    },

    deleteBusTrip({ commit }, busId) {
      commit("setLoading", true);
      commit("setError", null);

      axios
        .delete("http://localhost:3000/buses", {
          busId,
        })
        .then((res) => res.data)
        .then((resData) => {
          if (resData.success) commit("deleteBus", busId);
          else throw new Error("Fetch failed!");
        })
        .catch((err) => {
          commit("setError", err);
        })
        .finally(() => commit("setLoading", false));
    },

    getBusById({ commit }, busId) {
      commit("setLoading", true);
      commit("setError", null);
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:3000/buses/${busId}`)
          .then((res) => res.data)
          .then((resData) => {
            if (resData.success) {
              commit("setEditedObj", resData.data);
              resolve(resData.data);
            } else throw new Error("Fetch failed!");
          })
          .catch((err) => {
            commit("setError", err);
            reject(err);
          })
          .finally(() => commit("setLoading", false));
      });
    },

    updateBus(
      { commit, state },
      { busDestination, busDepart, busDuration, busPrice }
    ) {
      commit("setLoading", true);
      commit("setError", null);
      return new Promise((resolve, reject) => {
        axios
          .put("http://localhost:3000/buses/update", {
            busId: state.editedObj._id,
            busDestination,
            busDepart,
            busDuration,
            busPrice,
          })
          .then((res) => res.data)
          .then((resData) => {
            if (resData.success) resolve(true);
            else throw new Error("Fetch failed!");
          })
          .catch((err) => {
            commit("setError", err);
            reject(err);
          })
          .finally(() => commit("setLoading", false));
      });
    },
  },
});
