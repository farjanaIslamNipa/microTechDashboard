import responseErrorHandler from "../helper/responseErrorHandler";



export const state = () => ({
  orderNotes: [],
  paginateLinks: {},
  orderNote: {},
});


export const getters = {
  orderNotes: (state) => {
    return state.orderNotes;
  },

  paginateLinks: (state) => {
    return state.paginateLinks;
  },

  orderNote: (state) => {
    return state.orderNote;
  },
};


export const mutations = {
  SET_ORDER_NOTES(state, orderNotes) {
    state.orderNotes = orderNotes;
  },

  SET_PAGINATE_LINKS(state, paginateLinks) {
    state.paginateLinks = paginateLinks;
  },

  SET_ORDER_NOTE(state, orderNote) {
    state.orderNote = orderNote;
  },

  CREATE_ORDER_NOTE_ON_LIST(state, orderNote) {
    state.orderNotes.unshift(orderNote);
  },

  CREATE_ORDER_NOTE(state, orderNote) {
    state.orderNote = orderNote;
  },

  UPDATE_ORDER_NOTE_ON_LIST(state, orderNote) {
    let index = state.orderNotes.findIndex(item => item.id === orderNote.id);
    state.orderNotes.splice(index, 1, orderNote);
  },

  UPDATE_ORDER_NOTE(state, orderNote) {
    state.orderNote = orderNote;
  },

  DELETE_ORDER_NOTE_ON_LIST(state, orderNoteId) {
    let index = state.orderNotes.findIndex(item => item.id === orderNoteId);
    state.orderNotes.splice(index, 1);
  },

  DELETE_ORDER_NOTE(state) {
    state.orderNote = {};
  },

  RESET_ORDER_NOTES(state) {
    state.orderNotes = [];
  },

  RESET_ORDER_NOTE(state) {
    state.orderNote = {};
  },
};

export const actions = {
  commitSetOrderNotes: async ({ commit }, responseData) => {
    await commit('SET_ORDER_NOTES', responseData.data);
  },

  commitSetPaginateLinks: async ({ commit }, responseData) => {
    await commit('SET_PAGINATE_LINKS', responseData.meta);
  },

  commitSetOrderNote: async ({ commit }, responseData) => {
    await commit('SET_ORDER_NOTE', responseData.data)
  },

  commitCreateOrderNoteOnList: async ({ commit }, responseData) => {
    await commit('CREATE_ORDER_NOTE_ON_LIST', responseData.data);
  },

  commitCreateOrderNote: async ({ commit }, responseData) => {
    await commit('CREATE_ORDER_NOTE', responseData.data);
  },

  commitUpdateOrderNoteOnList: async ({ commit }, responseData) => {
    await commit('UPDATE_ORDER_NOTE_ON_LIST', responseData.data);
  },

  commitUpdateOrderNote: async ({ commit }, responseData) => {
    await commit('UPDATE_ORDER_NOTE', responseData.data);
  },

  commitDeleteOrderNoteOnList: async ({ commit }, orderNoteId) => {
    await commit('DELETE_ORDER_NOTE_ON_LIST', orderNoteId);
  },

  commitDeleteOrderNote: async ({ commit }) => {
    await commit('DELETE_ORDER_NOTE');
  },

  commitResetOrderNotes: async ({ commit }) => {
    await commit('RESET_ORDER_NOTES');
  },

  commitResetOrderNote: async ({ commit }) => {
    await commit('RESET_ORDER_NOTE');
  },

  // get list of orderNote by api call.
  async getOrderNotes ({ dispatch }, params = {})  {
    const path = `v1/order-notes`;

    return this.$axios.get(path, { params: params }).then(response => {
      dispatch('commitSetOrderNotes', response.data);
      dispatch('commitSetPaginateLinks', response.data);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch(error => {
      return responseErrorHandler(error);
    });
  },

  // get single orderNote by api call.
  async getOrderNote ({ dispatch }, paramObj)  {
    const path = `v1/order-notes/${paramObj.id}`;
    const params = paramObj.params ?? {};

    return this.$axios.get(path, { params: params }).then(response => {
      dispatch('commitSetOrderNote', response.data);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch(error => {
      return responseErrorHandler(error);
    });
  },

  // create new orderNote on list by api call.
  async postOrderNoteOnList ({ dispatch }, data)  {
    const path = `v1/order-notes`;

    return this.$axios.post(path, data).then((response) => {
      dispatch('commitCreateOrderNoteOnList', response.data);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch((error) => {
      return responseErrorHandler(error);
    });
  },

  // create new orderNote by api call.
  async postOrderNote ({ dispatch }, data)  {
    const path = `v1/order-notes`;

    return this.$axios.post(path, data).then((response) => {

      dispatch('commitCreateOrderNote', response.data);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch((error) => {
      return responseErrorHandler(error);
    });
  },

  // update single existing orderNote on list by api call.
  async putOrderNoteOnList ({ dispatch }, dataObj)  {
    const path = `v1/order-notes/${dataObj.id}`;
    const data = dataObj.data;

    return this.$axios.put(path, data).then((response) => {
      dispatch('commitUpdateOrderNoteOnList', response.data);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch((error) => {
      return responseErrorHandler(error);
    });
  },

  // update single existing orderNote by api call.
  async putOrderNote ({ dispatch }, dataObj)  {
    const path = `v1/order-notes/${dataObj.id}`;
    const data = dataObj.data;

    return this.$axios.put(path, data).then((response) => {
      dispatch('commitUpdateOrderNote', response.data);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch((error) => {
      return responseErrorHandler(error);
    });
  },

  // delete a particular orderNote on list by api call.
  async deleteOrderNoteOnList ({ dispatch }, id)  {
    const path = `v1/order-notes/${id}`;

    return this.$axios.delete(path).then((response) => {
      dispatch('commitDeleteOrderNoteOnList', id);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch((error) => {
      return responseErrorHandler(error);
    });
  },

  // delete a particular orderNote by api call.
  async deleteOrderNote ({ dispatch }, id)  {
    const path = `v1/order-notes/${id}`;

    return this.$axios.delete(path).then((response) => {
      dispatch('commitDeleteOrderNote', response.data);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch((error) => {
      return responseErrorHandler(error);
    });
  },

  // reset orderNotes state.
  async resetOrderNotes ({ dispatch })  {
    dispatch('commitResetOrderNotes');
  },

  // reset orderNote state.
  async resetOrderNote ({ dispatch }) {
    dispatch('commitResetOrderNote')
  },

}

