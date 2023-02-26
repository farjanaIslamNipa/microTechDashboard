<template>
    <div class="order-dashboard-content">
        <section class="mt-2">
          <div v-show="stepTwo" class="px-xxl-5 px-4 mx-xxl-5 mx-0">
                        <div class="bg-white p-4">
                          <div class="row justify-content-center">
                            <div class="col-md-7">
                              <div class="d-flex align-items-center">
                                <input v-model="searchProduct" class="form-control py-2" type="text" placeholder="Search a product by name" area-label="search">
                                <div><button type="reset" class="btn text-white px-4 ms-2 filter-btn py-2">Filter</button></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="pb-5 mt-3">
                            <div class="row">
                                <div class="col-xxl-3 col-lg-4 col-md-3 col-sm-6 mb-3 px-2" v-for="(product) in filteredProduct" :key="product.id">
                                    <div class="bg-white pb-2 h-100">
                                        <div class="px-2 mb-1" style="overflow: hidden">
                                            <div class="product-image ">
                                                <img :src="product?.images?.[0]" class="img-fluid" :alt="product.name">
                                                <!-- <img src="/dashboard/sample.jpeg" class="img-fluid" :alt="product.name"> -->
                                            </div>
                                        </div>
                                        <div class="text-center mt-2">
                                            <h6 class="mb-0">{{ product.name.toUpperCase() }}</h6>
                                            <p class="small text-secondary mb-0">
                                                <span class="font-weight-bold"> Code :</span> {{ product.code }}
                                            </p>
                                            <p class="small text-secondary mb-0">
                                                <span class="font-weight-bold"> Category :</span> {{ product.productCategory.name }}
                                            </p>
                                            <p class="small text-secondary mb-0">
                                                <span class="font-weight-bold">Type :</span> {{ product.type }}
                                            </p>
                                            <div class="my-2">
                                                <button type="button" class="btn view-item-btn" data-bs-toggle="modal" data-bs-target="#productConditionsModal" @click="getProductPrices(product.id)">
                                                  View Item
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div @click="productCartIsOpen=true" class="floatable-cart">
                            <div class="bg-danger d-flex justify-content-center align-items-center" style="height: 40px; width: 60px;border-radius: 5px 0 0 5px;box-shadow: rgb(255 91 92) 0 1px 0, rgb(255 91 92) 0 8px 16px, rgb(17 17 26 / 10%) 0 16px 48px;">

                                <i class="fa-solid fa-cart-shopping text-white"></i>
                            </div>

                        </div>
                        <!-- shopping cart side bar -->
                        <div :class="[productCartIsOpen ? 'product-cart-side-bar-open' :'product-cart-side-bar-close']" :style="{height:'100vh'}">
                            <div class="h-100">
                                <div class="position-relative" style="height: 100%;">
                                    <div class="d-flex justify-content-between align-items-center ps-3" style="height: 66px;background: #f0f8ff;color:#3F3679">
                                        <p class="mb-0 text-500 text-18">{{ cartList !== undefined ? cartList.length : 0 }}
                                          <span v-if="cartList.length <= 1">Item</span>
                                          <span v-else>Items</span>
                                        </p>
                                        <div>
                                          <button class="btn text-blue text-500 me-1" @click="productCartIsOpen=false">
                                              Close
                                          </button>
                                        </div>
                                    </div>

                                    <div class="c-content pt-3" v-if="cartList!== undefined && cartList.length > 0">
                                        <div v-for="(cartItem,index) in cartList" :key="index">
                                            <div class="w-100 d-flex align-items-center">
                                                <div :style="{width:'10%'}">
                                                    <div class="text-center">
                                                        <div style="cursor:pointer;" @click="increaseQuantity(index)">
                                                            <i class='fa-solid fa-plus text-bold-700 cursor-pointer' :style="{fontWeight:'bold !important',color:'gray'}"></i>
                                                        </div>
                                                        <div class="text-center">
                                                            {{ cartItem.product_price.quantity }}
                                                        </div>
                                                        <div style="cursor:pointer;" class="text-center" @click="decreaseQuantity(index)">
                                                            <i class='fa-solid fa-minus text-bold-700 cursor-pointer' :style="{fontWeight:'bold !important',color:'gray'}"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div :style="{width:'80%'}" class="d-flex align-items-center">
                                                    <div class="cart-product-image">
                                                        <img class="img-fluid" :src="cartItem.image" alt="" srcset="">
                                                    </div>
                                                    <div>
                                                        <p class="text-dark mb-0 text-500" style="text-transform: uppercase">
                                                            {{ cartItem.name }}</p>
                                                        <p class="mb-0" v-if="cartItem.product_price.condition">Tag: {{ cartItem.product_price.condition }}</p>
                                                        <p class="mb-0">Unit Price: &nbsp;&nbsp;${{ parseFloat(cartItem.product_price.amount / 100).toFixed(2) }}</p>
                                                        <p class="mb-0">SubTotal: &nbsp;&nbsp;${{ parseFloat(cartItem.product_price.sub_total / 100).toFixed(2)}}</p>
                                                    </div>
                                                </div>
                                                <div :style="{width:'10%'}">
                                                    <div class="d-flex align-items-center justify-content-center" @click="removeItem(index)">
                                                      <span style="color: #c1c1c1; cursor: pointer;"><i class="fa-solid fa-trash-can"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr>
                                        </div>

                                    </div>
                                    <div v-else class="text-capitalize text-center pt-4"> <p class="text-500">No product added in cart</p></div>

                                    <div v-if="cartList.length >= 1" class="c-footer position-absolute">
                                        <div v-if="total> 0" class="py-2 d-flex justify-content-between px-3" style="background-color: #f0f8ff;">
                                            <p class="mb-0 text-18 text-500">Total Price :</p>
                                            <p class="mb-0 text-18 text-500"><span class="text-bold-700"> ${{ parseFloat(total / 100).toFixed(2) }}</span></p>
                                        </div>
                                        <div class="text-center bg-blue text-white py-1">
                                            <button @click="goOrderCheckout" class="btn text-white text-18"><span><i class="fa-solid fa-right-long"></i></span> Place Order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            <!--            <ProductItemAddModal @addProductItemOnCreateOrder="addProductItemInfo($event,data)"/>-->
            <ProductConditionsModal @getSelectedProductCondition="addProductPriceInCart($event)" :single-product="{...singleProductPricesCondition}" />
            <!--            <AddressUpdateModal :user-id="selectedCustomerInfo.user_id" :model-id="selectedCustomerInfo.customer_id"
                                            address-update-for-model-name="customer" modal-name="addressUpdateModal"
                                            :business-status="selectedCustomerInfo.type==='Business'"
                                            :selected-address-data="{value:selectedCustomerInfo.address_id,name: selectedCustomerInfo.full_address}"
                                            @updateModalAddressData="updateModalAddressData"/>-->
        </section>
    </div>

</template>

<script>
import Loader from '~/mixins/Loader';
import ShowToastMessage from '~/mixins/ShowToastMessage';
import Authorization from '~/mixins/Authorization';
// import sidebarData from "./sidebarData.js";
import {
    mapActions,
    mapGetters,
    mapState
} from "vuex";
import ProductConditionsModal from "./includes/ProductConditionsModal";

export default {
    components: {

        ProductConditionsModal,

    },
    mixins: [ShowToastMessage, Loader, Authorization],
    props: ['customerId'],
    layout: 'dashboard-layout',
    name: "OrderCreate",
    data() {
        return {
            stepOne: true,
            stepTwo: false,
            productCartIsOpen: false,
            customerSearchIsOpen: false,
            showProductInfo: true,
            showCustomerInfo: false,
            selectedCustomer: '',
            isLoading: false,
            customerID: null,

            getCustomersParams: {
                with_relation: ['user', 'address', 'address.business', 'referredBy'],
                where_has_user_query: '',
                status: 1,
            },
            frontEndErrors: {

                customerType: []
            },
            customerType: null,
            step: 1,
            selectedCustomerInfo: {
                user_id: '',
                customer_id: '',
                type: '',
                full_name: '',
                email: '',
                phone_number: '',
                date_of_birth: '',
                address: '',
                address_id: '',
                full_address: '',
            },
            getProductsParams: {
                with_relation: ['addedBy', 'productCategory', 'productItems', 'media'],
                status: 1,
                customer_portal_status: 1,
                where_has_product_price_state_and_status: []

            },
            getProductItemsParams: {
                with_relation: ['product'],
            },
            cartList: [],
            itemsList: [],
            productItemsWithKey: {},
            selectedProductId: null,
            initialProductItemData: {
                serial_number: '',
                model_number: '',
                sku: '',
                barcode: '',
                qr_code: '',
                manufacturing_code: '',
                purchase_cost: '',
                condition: '',
            },
            singleProductPricesCondition: [],
            total: 0,
            mountedCustomer: {},
            searchProduct: '',
            userID: '',
            getSettingsParams: {
                type: ['product_item'],
                key: ['product_item_condition'],
            },
        }
    },
    watch: {
        selectedCustomer() {
            this.userID = this.selectedCustomer.value;
            this.selectedCustomerInfo = {
                //  customer: this.selectedCustomer.customer,
                customer_id: this.selectedCustomer.customer.id,
                user_id: this.selectedCustomer.customer.user.id,
                full_name: this.userFullName(this.selectedCustomer.customer),
                email: this.selectedCustomer.customer.user.email,
                phone_number: this.selectedCustomer.customer.user.phone_number,
                date_of_birth: this.selectedCustomer.customer.user.date_of_birth,
                address_id: this.selectedCustomer.customer.address.id,
                address: this.selectedCustomer.customer.address,
                full_address: this.userFullAddress(this.selectedCustomer.customer),
                type: this.selectedCustomer.customer.type,
            }
            this.showCustomerInfo = true;
            this.customerSearchIsOpen = false;
            this.customerType = null;
            this.stepTwo = true;
            this.stepOne = false;
            // set product state by productPrices
            this.getProductsParams.with_product_prices_state = this.selectedCustomer.customer.address.state.toLowerCase() ? this.selectedCustomer.customer.address.state.toLowerCase() : '';
            this.getProductsParams.where_has_product_price_state_and_status[0] = this.selectedCustomer.customer.address.state.toLowerCase() ? this.selectedCustomer.customer.address.state.toLowerCase() : '';
            this.getProductsParams.where_has_product_price_state_and_status[1] = 1
            this.getProductList(this.getProductsParams);
        },
        customerType() {
            this.customerSearchIsOpen = this.customerType === 'existing';
        },

    },
    computed: {
        ...mapState(['previousNamedRoute']),
        ...mapGetters({
            products: 'products/products',
            productItems: 'productItems/productItems',
            authUser: 'login/authUser',
            authCustomer: 'login/authCustomer',
        }),
        customerOptions() {
            let customers = this.$store.getters['appCustomers/customers'].map((customer) => {
                let id = customer.user.id;
                let name = customer.user.first_name + '  ' + customer.user.last_name + ' <' + customer.user.email + '> ';
                /*  let full_name = `${customer.user.first_name} ${customer.user.last_name}`;
                  let email = customer.user.email;
                  let phone_number = customer.user.phone_number;
                  let date_of_birth = customer.user.date_of_birth;
                  let address = customer.address;*/
                return {
                    value: id,
                    name: name,
                    customer: customer,
                };
            });
            return [...customers];
        },
        conditionOptions() {
            return this.$store.getters['settings/settingProductItemCondition'].value

        },
        filteredProduct() {
            if (this.searchProduct) {
                return this.products.filter(item => {
                    return this.searchProduct
                        .toLowerCase()
                        .split(" ")
                        .every(v => item.name.toLowerCase().includes(v));
                });
            } else {
                return this.products;
            }
        },
    },
    methods: {
        ...mapActions({
            getCustomers: 'customers/getCustomers',
            getCustomer: 'customers/getCustomer',
            getProducts: 'products/getProducts',
            getProductItems: 'productItems/getProductItems',
            postProductItemOnList: 'productItems/postProductItemOnList',
            getSettings: 'settings/getSettings',

        }),
        async getSettingList(settingParams) {
            await this.getSettings(settingParams);
        },

        userFullName(customerObj) {
            return `${customerObj.user.first_name} ${customerObj.user.last_name}`;
        },

        userFullAddress(customerObj) {
            let businessName = customerObj.address ?.business ?.name ?? '';
            let addressStreet = customerObj.address.street;
            let addressSuburb = customerObj.address.suburb;
            let addressState = customerObj.address.state.toUpperCase();
            let addressPostCode = customerObj.address.post_code;
            let addressCountry = customerObj.address.country;
            return customerObj.type === 'Business' ?
                `${businessName} (${addressStreet}, ${addressSuburb} ${addressState} ${addressPostCode}, ${addressCountry})` :
                `${addressStreet}, ${addressSuburb} ${addressState} ${addressPostCode}, ${addressCountry}`;
        },

        updateModalAddressData(updateModalAddressData) {
            let businessName = updateModalAddressData.addressData ?.business ?.name ?? '';
            let addressStreet = updateModalAddressData.addressData.street;
            let addressSuburb = updateModalAddressData.addressData.suburb;
            let addressState = updateModalAddressData.addressData.state.toUpperCase();
            let addressPostCode = updateModalAddressData.addressData.postCode;
            let addressCountry = updateModalAddressData.addressData.country;
            this.selectedCustomerInfo.full_address = businessName !== null ?
                `${businessName} (${addressStreet}, ${addressSuburb} ${addressState} ${addressPostCode}, ${addressCountry})` :
                `${addressStreet}, ${addressSuburb} ${addressState} ${addressPostCode}, ${addressCountry}`;
            this.selectedCustomerInfo.address_id = updateModalAddressData.addressData.id;
            this.selectedCustomerInfo.address = {
                'street': addressStreet,
                'suburb': addressSuburb,
                'state': addressState,
                'post_code': addressPostCode,
                'country': addressCountry,
                'business': {
                    'id': updateModalAddressData.addressData ?.business ?.id,
                    'name': updateModalAddressData.addressData ?.business ?.name,
                }
            };
            this.getProductsParams.where_has_product_price_state_and_status[0] = updateModalAddressData.addressData.state.toLowerCase();
            this.getProductsParams.where_has_product_price_state_and_status[1] = 1
            this.getProductList(this.getProductsParams);
        },

        async findCustomer(query) {
            this.isLoading = true;
            this.getCustomersParams.where_has_user_query = query
            await this.getCustomers(this.getCustomersParams)
                .then((response) => {
                    this.isLoading = !!(response && response.message && response.status !== 200);
                });
        },

        getProductPrices(productId) {
            //console.log(productId);
            this.singleProductPricesCondition = {};
            this.singleProductPricesCondition = this.products.find((product) => product.id === productId);
            console.log(this.singleProductPricesCondition, 'single product');
        },
        async getProductList(paramObj) {
            await this.getProducts(paramObj)
                .then((response) => {
                    this.isLoading = !!(response && response.message && response.status !== 200);
                });
        },

        async getProductItemList(id) {
            this.Loader = true;
            /* let product_item = this.products.find((product) => product.id ===id).productItems;
             this.productItemsWithKey={
               product_id: id,
               product_items:product_item,
             }*/
            this.selectedProductId = id;
            const paramObj = {
                product_id: id,
                with_relation: ['product'],

            }
            await this.getProductItems(paramObj)
                .then((response) => {
                    this.Loader = !!(response && response.message && response.status !== 200);
                });
        },

        addProductItemInCart(prodId, prodItemId) {


            this.productCartIsOpen = true;
            let itemIndex = this.productItems.findIndex((item) => item.id === prodItemId);
            let singleProductItemObj = this.productItems[itemIndex];
            let prodIndex = this.cartList.findIndex((singleItem) => singleItem.prodId === prodId)

            if (prodIndex === -1) {
                let cartItem = {
                    prodId: prodId,
                    items: []
                }
                cartItem.items.push(singleProductItemObj)
                this.cartList.push(cartItem);
                this.showToastMessage({
                    type: 'success',
                    message: 'successfully added in cart'
                });
            } else {
                let prevItem = this.cartList.find((prevItem) => prevItem.prodId === prodId)

                let alreadyExistProdItem = prevItem.items.findIndex((singleItem) => singleItem.id === prodItemId)

                if (alreadyExistProdItem === -1) {
                    this.cartList[prodIndex].items.push(singleProductItemObj);
                    this.showToastMessage({
                        type: 'success',
                        message: 'successfully added in cart'
                    });
                } else {
                    this.showToastMessage({
                        type: 'warning',
                        message: 'Already added in cart'
                    });
                }
            }
        },

        async addProductPriceInCart(obj) {
            //console.log(obj)
            this.productCartIsOpen = true;
            const {
                productId,
                productPriceId,
                amount
            } = obj
            let selectedProductWithPrices = this.products.find((product) => product.id === productId);
            let selectedPrice = selectedProductWithPrices.productPrices.find((productPrice) => productPrice.id === productPriceId);
            //find product price ID exist on cart list
            let productPriceIndex = this.cartList.findIndex((singleItem) => singleItem.product_price.id === productPriceId);
            if (productPriceIndex === -1) {
                let cartObj = {
                    product_id: selectedProductWithPrices.id,
                    name: selectedProductWithPrices.name,
                    code: selectedProductWithPrices.code,
                    image: selectedProductWithPrices ?.images ?. [0],
                    product_price: {
                        id: selectedPrice.id,
                        condition_name: selectedPrice.condition,
                        condition_value: this.conditionOptions.find((option) => option.name.toLowerCase() === selectedPrice.condition.toLowerCase()).value,
                        amount: amount * 100, // convert amount in cent
                        sub_total: amount * 100, // convert amount in cent
                        quantity: 1,
                    },
                    productCategory: {
                        name: selectedProductWithPrices ?.productCategory ?.name ?? ''
                    }
                }
                this.cartList.push(cartObj);
                this.showToastMessage({
                    type: 'success',
                    message: `successfully ${cartObj.name} with ${cartObj.product_price.condition_name} type added in cart`
                });
            } else {
                let existProductInfoOnList = this.cartList[productPriceIndex];
                this.showToastMessage({
                    type: 'warning',
                    message: `Already ${existProductInfoOnList.name} with ${existProductInfoOnList.product_price.condition_name} type added in cart`
                });
            }
            await this.getTotal()


        },

        increaseQuantity(cartListIndex) {
            this.cartList[cartListIndex].product_price.quantity++;
            this.cartList[cartListIndex].product_price.sub_total = this.cartList[cartListIndex].product_price.amount * this.cartList[cartListIndex].product_price.quantity;
            this.getTotal();
        },

        decreaseQuantity(cartListIndex) {

            if (this.cartList[cartListIndex].product_price.quantity > 1) {
                this.cartList[cartListIndex].product_price.quantity--
                this.cartList[cartListIndex].product_price.sub_total = this.cartList[cartListIndex].product_price.sub_total - this.cartList[cartListIndex].product_price.amount;
            } else {
                this.cartList[cartListIndex].product_price.quantity = 1
            }
            this.getTotal()
            //console.log(this.cartList[cartListIndex].productPrice.quantity)
            //console.log(this.cartList[cartListIndex].productPrice.amount)

        },

        async addProductItemInfo(data) {
            data.updatedData.product_id = this.selectedProductId;
            await this.postProductItemOnList(data.updatedData).then(async (response) => {
                if (response.status === 201) {
                    this.productItems = this.$store.getters['appProductItems/productItems'];
                    document.querySelector('[data-dismiss="modal"]').click();
                    let toastObj = {
                        message: 'product item added successfully',
                        type: 'success'
                    };
                    this.showToastMessage(toastObj);
                    const condition = data.conditionOptions;
                    const conditionValue = data.updatedData.condition;
                    this.initialProductItemData = {
                        serial_number: data.updatedData.serial_number,
                        model_number: data.updatedData.model_number,
                        sku: data.updatedData.sku,
                        barcode: data.updatedData.barcode,
                        qr_code: data.updatedData.qr_code,
                        manufacturing_code: data.updatedData.manufacturing_code,
                        purchase_cost: data.updatedData.purchase_cost,
                        condition: this.selectedOptionFunction(condition, conditionValue).name,
                    };

                }
                if (response.message) {
                    this.showToastMessage(response);
                }
            });

        },

        removeItem(cartListIndex) {
            this.cartList.splice(cartListIndex, 1);
            this.getTotal()
        },

        removeProductItem(parentIndex, itemIndex) {
            this.cartList[parentIndex].items.splice(itemIndex, 1);
            let itemLength = this.cartList[parentIndex].items.length;

            //console.log(parentIndex, itemIndex, itemLength);
            if (itemLength === 0) {
                this.cartList.splice(parentIndex, 1);
            }
        },

        selectedOptionFunction(haystack, needle) {
            if (Array.isArray(haystack)) {
                let conditionIndex = haystack.findIndex(item => item.value === needle);
                if (conditionIndex !== -1) {
                    let status = haystack[conditionIndex];
                    return {
                        value: status.value,
                        name: status.name
                    };
                }
            }filteredProduct
            return {};
        },

        async getTotal() {
            this.total = this.cartList.reduce((acc, cur) => acc + Number(cur.product_price.sub_total), 0);
        },

        goOrderCheckout() {
            this.$router.push({
                name: 'dashboard-orders-OrderCheckout',
                params: {
                    cartList: JSON.stringify(this.cartList),
                    selectedCustomer: JSON.stringify(this.selectedCustomerInfo)
                },
            });
        },

        async getCustomerInfo(id) {
            this.loader(true);
            const params = {
                id: id,
                params: {
                    with_relation: ['user', 'address', 'address.business', 'referredBy']
                }
            };
            const response = await this.getCustomer(params);
            if (response && response.status !== 200) {
                this.loader(false);
                this.showToastMessage(response);
            } else {
                this.loader(false);
            }

        },

        async mountedSelectedCustomer(customerId) {
            if (customerId !== undefined) {
                await this.getCustomerInfo(customerId);
                this.mountedCustomer = this.$store.getters['customers/customer'];
                this.selectedCustomerInfo = {
                    customer_id: customerId,
                    user_id: this.mountedCustomer.user.id,
                    full_name: this.userFullName(this.mountedCustomer),
                    email: this.mountedCustomer.user.email ?? '',
                    phone_number: this.mountedCustomer.user.phone_number ?? '',
                    date_of_birth: this.mountedCustomer.user.date_of_birth,
                    address: this.mountedCustomer.address,
                    address_id: this.mountedCustomer.address.id,
                    full_address: this.userFullAddress(this.mountedCustomer),
                    type: this.mountedCustomer.type,
                }
                this.showCustomerInfo = true;
                this.customerSearchIsOpen = false;
                this.customerType = null;
                this.stepTwo = true;
                this.stepOne = false;
                // set product state by productPrices
                this.getProductsParams.with_product_prices_state = this.selectedCustomerInfo.address.state.toLowerCase() ? this.selectedCustomerInfo.address.state.toLowerCase() : '';
                this.getProductsParams.where_has_product_price_state_and_status[0] = this.selectedCustomerInfo.address.state.toLowerCase() ? this.selectedCustomerInfo.address.state.toLowerCase() : '';
                this.getProductsParams.where_has_product_price_state_and_status[1] = 1
                await this.getProductList(this.getProductsParams);
            }
        },

        createNewCustomer() {
            //console.log(this.$route.name);
            this.$router.push({
                name: 'appCustomerCreate',
                params: {
                    routeName: this.$route.name,
                    // serviceType: this.serviceType == "remote" ? 1 : 0
                }
            });
        },
    },
    async mounted() {
        this.loader(true);
        await this.getSettingList(this.getSettingsParams);
        let {
            cartList,
            selectedCustomer
        } = this.$route.params;
        if (cartList !== undefined && selectedCustomer !== undefined) {
            let cartsData = JSON.parse(cartList);
            let customer = JSON.parse(selectedCustomer);
            await this.mountedSelectedCustomer(customer.customer_id);
            this.cartList = cartsData;
            this.productCartIsOpen = true;
        } else {
            await this.mountedSelectedCustomer(this.authCustomer.id);
        }
        this.loader(false)
    }
}
</script>

<style scoped>
@import './order.css';
</style>
