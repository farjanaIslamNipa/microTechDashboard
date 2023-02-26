<template>
  <div class="mt-4 mb-4">
    <main class="order-dashboard-content px-5">
      <div class="d-flex justify-content-between mb-4">
        <h3 class="brand-color">Order history</h3>
        <div>
          <nuxt-link :to="{ name: 'dashboard-orders-create' }" class="brand-fill-btn text-capitalize">Buy Now</nuxt-link>
        </div>
      </div>
      <div class="bg-white py-4 px-4">
        <div v-if="orders.length <= 0" class="text-center py-5">
          <img class="img-fluid" src="/dashboard/empty-cart.png" alt="No Orders">
          <div class="mt-4">
            <h3>Your Cart is Empty</h3>
            <p class="text-muted">Add some products to your shopping cart</p>
            <div>
              <NuxtLink class="btn brand-outlined-btn" :to="{name: 'dashboard-orders-create'}">View All Products</NuxtLink>
            </div>
          </div>
        </div>
        <div class="dashboard-table px-4">
          <div class="table-responsive">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th class="py-4" scope="col">Order ID</th>
                  <th class="py-4" scope="col">Date </th>
                  <th class="py-4" scope="col">Status</th>
                  <th class="py-4" scope="col">Total</th>
                  <th class="py-4" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in orders" :key="order.id" class="table-row spacer">
                  <td>#{{ order.order_no }}</td>
                  <td>
                    {{ order.order_date }}
                  </td>
                  <td>
                    {{ order.status }}
                  </td>
                  <td>

                    <div v-if="payments[order.id]">
                      <span>
                        <span class="text">Total - ${{
                          parseFloat(payments[order.id].total / 100).toFixed(2)
                        }}</span><br>
                        <span class="text-success">Paid- ${{
                          parseFloat(payments[order.id].paid / 100).toFixed(2)
                        }}</span><br>
                      </span>
                    </div>
                  </td>

                  <td>
                    <div class="action-dropdown">
                      <div class="position-relative">
                        <button class="btn dropdown-toggle py-0" type="button" data-bs-toggle="dropdown"
                          aria-expanded="false">
                          <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <button class="dropdown-item py-2 px-4 text-capitalize"
                              @click="getSingleOrderFromOrders(order.id, 'orderQuickViewModal')"> View Order</button>
                          </li>
                          <NuxtLink class="dropdown-item py-2 px-4 text-capitalize"
                            :to="{ name: 'dashboard-orders-invoice-uuid', params: { uuid: order.uuid } }">Order Invoice
                          </NuxtLink>
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
    <div class="" data-bs-toggle="modal" data-bs-target="#orderQuickViewModal"></div>
    <OrderQuickViewModal :order="{ ...singleOrderObj }" :order-payment="{ ...singleOrderPayment }" />

  </div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex';
import Loader from '~/mixins/Loader';
import ShowToastMessage from '~/mixins/ShowToastMessage';
import OrderQuickViewModal from "./includes/OrderQuickViewModal.vue";
export default {
  name: "Bookings",
  layout: 'dashboard-layout',
  mixins: [Loader, ShowToastMessage],
  components: {
    OrderQuickViewModal
  },
  data() {
    return {
      activeBookingStatus: 'active',
      order: {},
      singleOrderPayment: {},
      singleOrderObj: {},
      payments: {},
      getOrdersParams: {
        order_no: '',
        customer_name: '',
        order_date: [],
        delivery_date: [],
        with_relation: [
          'user',
          'user.customer.address',
          'user.customer.address.business',
          'orderCharges',
          'orderPayments.payment',
          'orderPaymentsByReference',
          'appointment.technicianAppointment.technician.user',
          'shippingAddress.business',
          'billingAddress.business',
          'orderNotes',
          'orderProductItems.productItem.productItemTransaction',
          'orderProductItems.productItem.product',
          'orderRefundsByReference',
          'appointment.technicianAppointment.technician.franchiseeTechnician', // check order tag appointment by franchisee technician
          'orderCreator.user.franchisee' // check franchisee create an order
        ],
        order_by_id: 'DESC',
        // paginate: 1,
        // pagination: '',
        page: ''
      },

    }
  },
  computed: {
    ...mapGetters({

      orders: 'orders/orders',
      customer: 'customers/customer',
      authUser: 'login/authUser',
    })
  },
  methods: {
    ...mapActions({

      getOrders: 'orders/getOrders',
      getOrder: 'orders/getOrder',

      // getCustomer: 'appCustomers/getCustomer',
      // getSettings: "appSettings/getSettings",

      // // lotalty point
      // getLoyaltyPointStatus: 'apployaltyPoints/getLoyaltyPointStatus',

    }),
    async getSingleOrderFromOrders(orderId, modalName) {
      this.singleOrderObj = await this.orders.find(({
        id
      }) => id === orderId);
      this.singleOrderPayment = await this.payments[orderId];
      await this.toggleModal(modalName);
    },
    async toggleModal(modalName) {
      document.querySelector(`[data-bs-target="#${modalName}"]`).click(); // modal close
    },

    // get order list
    async getOrderList(paramsObj) {
      this.loader(true);
      await this.getOrders(paramsObj)
        .then(async (response) => {
          if (response && response.message && response.status !== 200) {
            this.loader(false);
            this.showToastMessage(response);
          } else {
            await this.getOrderCalculation();
            this.loader(false);
          }
        });
    },
    async getOrderCalculation() {

      this.orders.map((order) => {
        // order.details = JSON.parse(order.details);

        let orderCharge = this.calculateOrderCharges(order);
        let orderPayment = this.calculateOrderPayments(order);
        //console.log(orderPayment)
        let orderChargesDetails = this.getOrderChargesDetails(order);
        //console.log(orderChargesDetails);
        let orderRefund = this.calculateOrderRefunds(order);

        let remaining = orderCharge - orderPayment;
        this.payments = {
          ...this.payments, [order.id]: {
            total: orderCharge,
            paid: orderPayment,
            remaining: remaining,
            chargesDetails: orderChargesDetails
          }
        }



        // this.refunds[order.id] = {
        //   status: orderRefund.approved_status,
        //   amount: orderRefund.amount
        // }

        // this.orderChargesDetails[order.id] = orderChargesDetails;
      });
    },

    calculateOrderCharges(singleOrder) {
      const decreaseType = ['Discount', 'Coupon']
      if (singleOrder.status === 'Pending') {
        return singleOrder?.details?.grand_total ?? 0;
      } else {
        return singleOrder.orderCharges.reduce(function (accu, cur) {
          accu = (decreaseType.includes(cur.type)) ? accu - cur.amount : accu + cur.amount
          return accu
        }, 0);
      }

    },

    calculateOrderPayments(singleOrder) {
      if (singleOrder.status === 'Pending') {
        return singleOrder?.orderPaymentsByReference.reduce(function (acc, cur) {
          return acc + cur?.total_transaction ?? 0
        }, 0);
      } else {
        return singleOrder?.orderPayments.reduce(function (accu, cur) {
          return (!('payment' in cur) || cur.payment === null) ? 0 : accu + cur?.payment?.total_transaction ?? 0
        }, 0);
      }

    },
    calculateOrderRefunds(singleOrder) {
      if (singleOrder.orderRefundsByReference.length > 0) {
        const amount = singleOrder?.orderRefundsByReference.filter((order) => order.status === 'Refunded').reduce((acc, cur) => acc + cur.amount, 0);
        return {
          approved_status: true,
          amount: amount
        };
      }
      return {
        approved_status: false,
        amount: 0
      };
    },

    getOrderChargesDetails(singleOrder) {
      /* const chargesArray = [
         'gst_charge',
         'order_delivery_charge',
         'applied_discount',
         'coupon_discount',
         'credited_payment_discount',
       ];

       return chargesArray.filter((chargeName) =>
           chargeName in singleOrder.details && singleOrder.details[chargeName].applied_status === true).map((chargeName) => {
         return {name: chargeName, amount: singleOrder.details[chargeName].amount}
       });*/
      let orderItemsPrice = 0,
        orderGST = 0,
        orderDiscount = 0,
        orderSurCharge = 0,
        orderDeliveryCharge = 0,
        discountDetails = [];
      let appliedDiscount = 0,
        couponDiscount = 0,
        creditedPaymentDiscount = 0;

      if (singleOrder.status === 'Pending') {
        orderGST = singleOrder.details['gst_charge'].applied_status === true ? singleOrder.details['gst_charge'].amount : 0;
        orderDeliveryCharge = singleOrder.details['order_delivery_charge'].applied_status === true ? singleOrder.details['order_delivery_charge'].amount : 0;
        appliedDiscount = singleOrder.details['applied_discount'].applied_status === true ? singleOrder.details['applied_discount'].amount : 0;
        couponDiscount = singleOrder.details['coupon_discount'].applied_status === true ? singleOrder.details['coupon_discount'].amount : 0;
        creditedPaymentDiscount = singleOrder.details['credited_payment_discount'].applied_status === true ? singleOrder.details['credited_payment_discount'].amount : 0;
        orderDiscount = appliedDiscount + couponDiscount + creditedPaymentDiscount;
        orderItemsPrice = singleOrder.details['subtotal_amount'] ?? 0;
        orderSurCharge = singleOrder.details['surcharge'] ?? 0
        discountDetails = [{
          name: 'applied discount',
          amount: appliedDiscount
        },
        {
          name: 'coupon discount',
          amount: couponDiscount
        },
        {
          name: 'credited payment discount',
          amount: creditedPaymentDiscount
        },
        ]
      } else {
        singleOrder.orderCharges.forEach((charge) => {
          if (charge.type === 'GST') {
            orderGST = orderGST + charge?.amount ?? 0
          }
          if (charge.type === 'Surcharge') {
            orderSurCharge = orderSurCharge + charge?.amount ?? 0
          }
          if (charge.type === 'Items Price') {
            orderItemsPrice = orderItemsPrice + charge?.amount ?? 0
          }
          if (charge.type === 'Delivery Charge') {
            orderDeliveryCharge = orderDeliveryCharge + charge?.amount ?? 0
          }
          if (charge.type === 'Discount') {
            orderDiscount = orderDiscount + charge?.amount ?? 0
            discountDetails.unshift({
              name: charge.name,
              amount: charge.amount
            })
          }
        });
      }

      return [{
        name: 'items price',
        sign: '+',
        amount: orderItemsPrice
      },
      {
        name: 'surcharge',
        sign: '+',
        amount: orderSurCharge
      },
      {
        name: 'discount',
        sign: '-',
        amount: orderDiscount,
        details: discountDetails
      },
      {
        name: 'GST',
        sign: '+',
        amount: orderGST
      },
      {
        name: 'delivery charge',
        sign: '+',
        amount: orderDeliveryCharge
      },
      ]

    },

  },
  async mounted() {

    this.getOrdersParams.user_id = this.authUser?.id ?? null
    await this.getOrderList(this.getOrdersParams);

  },
}
</script>

<style scoped>
tr {
  background-color: #f2f5f6 !important;
}

td {
  background-color: #f2f5f6 !important;
}

.profile-img {
  height: 140px;
  width: 140px;
}

.profile-img img {
  height: 140px;
  width: 140px;
  border: 3px solid white;
  border-radius: 50%;
  object-fit: cover;
}

.additional-info-btn {
  text-decoration: underline;
  font-size: 15px;
}

.profile-edit-btn {
  background-color: var(--brandColor);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  font-size: 18px;
  position: absolute;
  bottom: 10px;
  right: 57px;
  padding: 5px 10px;
}

@media screen and (max-width:1440px) {
  .profile-edit-btn {

    bottom: 10px;
    right: 37px;
  }
}

.line {
  border-top: 1px solid var(--secondaryColor);
  margin: 15px 0;
}

.appointment-checkbox-content {
  border-radius: 20px 0 0 0;
  background-color: var(--lightBrand);
  color: var(--brandColor);
}

.order-checkbox-content {
  border-radius: 0 20px 0 0;
  background-color: var(--lightBrand);
  color: var(--brandColor);
}

.checkbox-container {
  position: relative;
  height: 50px;
  box-sizing: border-box;
  cursor: pointer;
}

.checkbox-container .dashboard-checkbox-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 25px;
  transition: .3s ease;
  font-size: 18px;
}

.checkbox-container .dashboard-checkbox-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 140px;
  height: 100px;
  opacity: 0;
  cursor: pointer;
}

.dashboard-checkbox-input[type=radio]:checked~.dashboard-checkbox-content {
  background-color: white;
  color: var(--brandColor);
}

.search-input {
  border: 1px solid #b0d3e9;
  padding: 12px 20px 12px 40px;
}

.search-input::placeholder {
  color: #bdbdbd;
  font-weight: 400;
}

.search-icon {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 20px;
  color: #bdbdbd;
}

.dashboard-table {
  border-radius: 10px;
}

.table-row td {
  background-color: white;
  margin-bottom: 10px !important;
  padding: 20px 10px;
}

table {
  border-collapse: separate;
  border-spacing: 0 1em;
}

.active-history-container {
  position: relative;
  width: 200px;
  box-sizing: border-box;
  margin-right: 20px;
}

.active-history-container .user-checkbox-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 25px;
  transition: .3s ease;
}

.active-history-container .active-history-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 50px;
  opacity: 0;
  cursor: pointer;
}

.active-history-input[type=radio]:checked~.active-history-content {
  color: var(--brandColor);
  border-bottom: 2px solid var(--brandColor);
}

.white-bottom-border {
  border-top: 2px solid white;
  margin-top: -2px;
}
</style>
