import responseErrorHandler from "../helper/responseErrorHandler";



export const state = () => ({
  products: [],
  paginateLinks: {},
  product: {},
});


export const getters = {
  products: (state) => {
    return state.products;
  },

  paginateLinks: (state) => {
    return state.paginateLinks;
  },

  product: (state) => {
    return state.product;
  },
};


export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },

  SET_PAGINATE_LINKS(state, paginateLinks) {
    state.paginateLinks = paginateLinks;
  },

  SET_PRODUCT(state, product) {
    state.product = product;
  },

  CREATE_PRODUCT_ON_LIST(state, product) {
    state.products.unshift(product);
  },

  CREATE_PRODUCT(state, product) {
    state.product = product;
  },

  UPDATE_PRODUCT_ON_LIST(state, product) {
    let index = state.products.findIndex(item => item.id === product.id);
    state.products.splice(index, 1, product);
  },

  UPDATE_PRODUCT(state, product) {
    state.product = product;
  },

  DELETE_PRODUCT_ON_LIST(state, productId) {
    let index = state.products.findIndex(item => item.id === productId);
    state.products.splice(index, 1);
  },

  DELETE_PRODUCT(state) {
    state.product = {};
  },

  RESET_PRODUCTS(state) {
    state.products = [];
  },

  RESET_PRODUCT(state) {
    state.product = {};
  },
};

export const actions = {
  commitSetProducts: async ({ commit }, responseData) => {
    await commit('SET_PRODUCTS', responseData.data);
  },

  commitSetPaginateLinks: async ({ commit }, responseData) => {
    await commit('SET_PAGINATE_LINKS', responseData.meta);
  },

  commitSetProduct: async ({ commit }, responseData) => {
    await commit('SET_PRODUCT', responseData.data)
  },

  commitCreateProductOnList: async ({ commit }, responseData) => {
    await commit('CREATE_PRODUCT_ON_LIST', responseData.data);
  },

  commitCreateProduct: async ({ commit }, responseData) => {
    await commit('CREATE_PRODUCT', responseData.data);
  },

  commitUpdateProductOnList: async ({ commit }, responseData) => {
    await commit('UPDATE_PRODUCT_ON_LIST', responseData.data);
  },

  commitUpdateProduct: async ({ commit }, responseData) => {
    await commit('UPDATE_PRODUCT', responseData.data);
  },

  commitDeleteProductOnList: async ({ commit }, productId) => {
    await commit('DELETE_PRODUCT_ON_LIST', productId);
  },

  commitDeleteProduct: async ({ commit }) => {
    await commit('DELETE_PRODUCT');
  },

  commitResetProducts: async ({ commit }) => {
    await commit('RESET_PRODUCTS');
  },

  commitResetProduct: async ({ commit }) => {
    await commit('RESET_PRODUCT');
  },

  // get list of product categories by api call.
  async getProducts ({ dispatch }, params = {}) {
    const path = `v1/products`;

    return this.$axios.get(path, { params: params }).then(response => {
      dispatch('commitSetProducts', response.data);
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

  // get single product category by api call.
  async getProduct ({ dispatch }, paramObj)  {
    const path = `v1/products/${paramObj.id}`;
    const params = paramObj.params ?? {};

    return this.$axios.get(path, { params: params }).then(response => {
      dispatch('commitSetProduct', response.data);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch(error => {
      return responseErrorHandler(error);
    });
  },

  // create new product category on list by api call.
  async postProductOnList ({ dispatch }, data) {
    const path = `v1/products`;

    return this.$axios.post(path, data).then((response) => {
      dispatch('commitCreateProductOnList', response.data);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch((error) => {
      return responseErrorHandler(error);
    });
  },

  // create new product category by api call.
  async postProduct ({ dispatch }, data)  {
    const path = `v1/products`;

    return this.$axios.post(path, data).then((response) => {
      dispatch('commitCreateProduct', response.data);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch((error) => {
      return responseErrorHandler(error);
    });
  },

  // update single existing product category on list by api call.
  async putProductOnList ({ dispatch }, dataObj)  {
    const path = `v1/products/${dataObj.id}`;
    const data = dataObj.data;

    return this.$axios.put(path, data).then((response) => {
      dispatch('commitUpdateProductOnList', response.data);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch((error) => {
      return responseErrorHandler(error);
    });
  },

  // update single existing product category by api call.
  async putProduct ({ dispatch }, dataObj) {
    const path = `v1/products/${dataObj.id}`;
    const data = dataObj.data;

    return this.$axios.put(path, data).then((response) => {
      dispatch('commitUpdateProduct', response.data);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch((error) => {
      return responseErrorHandler(error);
    });
  },

  // delete a particular product category on list by api call.
  async deleteProductOnList ({ dispatch }, id)  {
    const path = `v1/products/${id}`;

    return this.$axios.delete(path).then((response) => {
      dispatch('commitDeleteProductOnList', id);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch((error) => {
      return responseErrorHandler(error);
    });
  },

  // delete a particular product category by api call.
  async deleteProduct ({ dispatch }, id)  {
    const path = `v1/products/${id}`;

    return this.$axios.delete(path).then((response) => {
      dispatch('commitDeleteProduct', response.data);

      return {
        message: '',
        type: 'success',
        status: response.status,
      };
    }).catch((error) => {
      return responseErrorHandler(error);
    });
  },

  // reset product categories state.
  async resetProducts ({ dispatch })  {
    dispatch('commitResetProducts');
  },

  // reset product category state.
  async resetProduct ({ dispatch })  {
    dispatch('commitResetProduct')
  },
}
