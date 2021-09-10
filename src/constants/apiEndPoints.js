export default {
  buses: {
    readList: `${process.env.VUE_APP_API_URL}/buses`,
    createList: `${process.env.VUE_APP_API_URL}/buses/add`,
    updateList: `${process.env.VUE_APP_API_URL}/buses/update`,
    deleteList: `${process.env.VUE_APP_API_URL}/buses`,
    getBusById: (busId) => `${process.env.VUE_APP_API_URL}/buses`,
  },
};
