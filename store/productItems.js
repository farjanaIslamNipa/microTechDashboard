import responseErrorHandler from "../helper/responseErrorHandler";



export const state = () => ({
  productItems: [],
  paginateLinks: {},
  productItem: {},
});


export const getters = {
  productItems: (state) => {
    return state.productItems;
  },

  paginateLinks: (state) => {
    return state.paginateLinks;
  },

  productItem: (state) => {
    return state.productItem;
  },
};


export const mutations = {
  SET_PRODUCT_ITEMS(state, productItems) {
    state.productItems = productItems;
  },

  SET_PAGINATE_LINKS(state, paginateLinks) {
    state.paginateLinks = paginateLinks;
  },

  SET_PRODUCT_ITEM(state, productItem) {
    state.productItem = productItem;
  },

  CREATE_PRODUCT_ITEM_ON_LIST(state, productItem) {
    state.productItems.unshift(productItem);
  },

  CREATE_PRODUCT_ITEM(state, productItem) {
    state.productItem = productItem;
  },

  UPDATE_PRODUCT_ITEM_ON_LIST(state, productItem) {
    let index = state.productItems.findIndex(item => item.id === productItem.id);
    state.productItems.splice(index, 1, productItem);
  },

  UPDATE_PRODUCT_ITEM(state, productItem) {
    state.productItem = productItem;
  },

  DELETE_PRODUCT_ITEM_ON_LIST(state, productId) {
    let index = state.productItems.findIndex(item => item.id === productId);
    state.productItems.splice(index, 1);
  },

  DELETE_PRODUCT_ITEM(state) {
    state.productItem = {};
  },

  RESET_PRODUCT_ITEMS(state) {
    state.productItems = [];
  },

  RESET_PRODUCT_ITEM(state) {
    state.productItem = {};
  },
};

export const actions = {
  commitSetProductItems: async ({ commit }, responseData) => {
    await commit('SET_PRODUCT_ITEMS', responseData.data);
  },

  commitSetPaginateLinks: async ({ commit }, responseData) => {
    await commit('SET_PAGINATE_LINKS', responseData.meta);
  },

  commitSetProductItem: async ({ commit }, responseData) => {
    await commit('SET_PRODUCT_ITEM', responseData.data)
  },

  commitCreateProductItemOnList: async ({ commit }, responseData) => {
    await commit('CREATE_PRODUCT_ITEM_ON_LIST', responseData.data);
  },

  commitCreateProductItem: async ({ commit }, responseData) => {
    await commit('CREATE_PRODUCT_ITEM', responseData.data);
  },

  commitUpdateProductItemOnList: async ({ commit }, responseData) => {
    await commit('UPDATE_PRODUCT_ITEM_ON_LIST', responseData.data);
  },

  commitUpdateProductItem: async ({ commit }, responseData) => {
    await commit('UPDATE_PRODUCT_ITEM', responseData.data);
  },

  commitDeleteProductItemOnList: async ({ commit }, productId) => {
    await commit('DELETE_PRODUCT_ITEM_ON_LIST', productId);
  },

  commitDeleteProductItem: async ({ commit }) => {
    await commit('DELETE_PRODUCT_ITEM');
  },

  commitResetProductItems: async ({ commit }) => {
    await commit('RESET_PRODUCT_ITEMS');
  },

  commitResetProductItem: async ({ commit }) => {
    await commit('RESET_PRODUCT_ITEM');
  },

  // get list of productItem categories by api call.
  async getProductItems ({ dispatch }, params = {})  {
    const path = `v1/product-items`;

    return this.$axios.get(path, { params: params }).then(response => {
      dispatch('commitSetProductItems', response.data);
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

  // get single productItem category by api call.
  async getProductItem ({ dispatch }, paramObj)  {
    const path = `v1/product-items/${paramObj.id}`;
    const params = paramObj.params ?? {};

    return this.$axios.get(path, { params: params }).then(response => {
      dispatch('commitSetProductItem', response.data);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch(error => {
      return responseErrorHandler(error);
    });
  },

  // create new productItem category on list by api call.
  async postProductItemOnList ({ dispatch }, data)  {
    const path = `v1/product-items`;

    return this.$axios.post(path, data).then((response) => {
      dispatch('commitCreateProductItemOnList', response.data);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch((error) => {
      return responseErrorHandler(error);
    });
  },

  // create new productItem category by api call.
  async postProductItem ({ dispatch }, data)  {
    const path = `v1/product-items`;

    return this.$axios.post(path, data).then((response) => {
      dispatch('commitCreateProductItem', response.data);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch((error) => {
      return responseErrorHandler(error);
    });
  },

  // update single existing productItem category on list by api call.
  async putProductItemOnList ({ dispatch }, dataObj)  {
    const path = `v1/product-items/${dataObj.id}`;
    const data = dataObj.data;

    return this.$axios.put(path, data).then((response) => {
      dispatch('commitUpdateProductItemOnList', response.data);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch((error) => {
      return responseErrorHandler(error);
    });
  },

  // update single existing productItem category by api call.
  async  putProductItem ({ dispatch }, dataObj)  {
    const path = `v1/product-items/${dataObj.id}`;
    const data = dataObj.data;

    return this.$axios.put(path, data).then((response) => {
      dispatch('commitUpdateProductItem', response.data);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch((error) => {
      return responseErrorHandler(error);
    });
  },

  // delete a particular productItem category on list by api call.
  async deleteProductItemOnList ({ dispatch }, id)  {
    const path = `v1/product-items/${id}`;

    return this.$axios.delete(path).then((response) => {
      dispatch('commitDeleteProductItemOnList', id);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch((error) => {
      return responseErrorHandler(error);
    });
  },

  // delete a particular productItem category by api call.
  async deleteProductItem ({ dispatch }, id)  {
    const path = `v1/product-items/${id}`;

    return this.$axios.delete(path).then((response) => {
      dispatch('commitDeleteProductItem', response.data);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch((error) => {
      return responseErrorHandler(error);
    });
  },

  // reset productItem  state.
  async  resetProductItems ({ dispatch })  {
    dispatch('commitResetProductItems');
  },

  // reset productItem  state.
  async resetProductItem ({ dispatch }) {
    dispatch('commitResetProductItem')
  },
}
