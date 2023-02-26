<template>
<div class="order-details-modal">
  <div class="modal fade " id="orderQuickViewModal" tabindex="-1" role="dialog" aria-labelledby="orderQuickViewModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered">
          <div class="modal-content pb-5 mb-sm-0 mb-5">
              <div class="modal-header py-2 bg-blue text-white">
                <div class="d-flex justify-content-between align-items-center w-100 pt-sm-0 pt-2">
                  <h4 class="mb-0">Order Details </h4>
                  <div>
                    <button type="button" class="btn" data-bs-dismiss="modal">
                        <span class="text-20 text-white"><i class="fa-solid fa-xmark"></i></span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="modal-body" id="printDiv">
                <p v-if="orderDetails.delivery_date" class="text-center mb-0">Delivery Date:
                  <b>{{
                      new Date(`${orderDetails.delivery_date}`).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    }}
                  </b>
                </p>
                <div class="bg-light mt-4 p-4">
                  <div class="d-flex justify-content-between">
                    <p class="mb-2 text-500">Ref no</p>
                    <p class="text-600 mb-2">{{  orderDetails.order_no  }}</p>
                  </div>
                  <div v-if="orderDetails.order_no" class="d-flex justify-content-between">
                    <p class="mb-2 text-500">Status</p>
                    <p class="mb-2">
                      <span class="badge" :class="orderDetails.status=== 'Pending'?'bg-secondary':'bg-danger'">{{ orderDetails.status }}</span>
                    </p>
                  </div>
                  <div v-if="orderDetails?.user?.customer?.address?.id" class="d-flex justify-content-between">
                    <p class="mb-0 text-500">Delivery Address</p>
                    <p class="mb-0">{{ userFullAddress(orderDetails.user.customer) }}</p>
                  </div>
                </div>
                <div v-if="orderDetails.details!==undefined && orderDetails.status === 'Pending'" class="bg-light mt-4 p-4 text-start mb-4">
                  <div class="d-md-block d-none">
                    <div style="border-bottom:1px solid lightgray" class="row mb-3">
                      <div class="col-md-6">
                        <p class="mb-0 text-600">Product</p>
                      </div>
                      <div class="col-md-2">
                        <div class="">
                          <p class="mb-0 text-600 text-center">Quantity</p>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <p class="mb-0 text-600 text-end">Unit Price</p>
                      </div>
                      <div class="col-md-2">
                        <p class="mb-0 text-600 text-end">Price</p>
                      </div>
                    </div>
                  </div>
                  <div v-for="(cartDetails) in orderDetails.details.cart_data" :key="cartDetails.product_id" class="row mb-3">
                    <div class="col-md-6">
                      <p class="mb-0"><span class="d-md-none d-inline-block text-500">Product:&nbsp;&nbsp; </span>{{ cartDetails.name}}({{ cartDetails?.product_price?.condition_name }})</p>
                    </div>
                    <div class="col-md-2">
                      <div class="text-md-center text-start">
                        <p class="mb-0"><span class="d-md-none d-inline-block text-500">Quantity:&nbsp;&nbsp; </span>{{ cartDetails.product_price.quantity }}</p>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <p class="mb-0 text-md-end text-start"><span class="d-md-none d-inline-block text-500">Unit Price:&nbsp;&nbsp; </span> ${{ parseFloat((cartDetails?.product_price?.amount) / 100).toFixed(2) }}</p>
                    </div>
                    <div class="col-md-2">
                      <p class="mb-0 text-md-end text-start"><span class="d-md-none d-inline-block text-500">Price:&nbsp;&nbsp; </span>${{ parseFloat((cartDetails?.product_price?.amount) / 100).toFixed(2) }}</p>
                    </div>
                  </div>
                </div>
                <!-- <div class="bg-light p-4 mt-4">
                  <p class="mb-0"><b>Order Note:</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure libero, sunt impedit veniam molestias praesentium! </p>
                </div> -->
                <hr class="mb-0">
                  <div>
                      <div class="row pt-1">
                          <div class="col-12">
                              <div class="table-responsive">
                                  <table class="table">
                                      <!-- <thead class="thead-light">
                                          <tr>
                                              <th>PRODUCT</th>
                                              <th>QTY</th>
                                              <th>UNIT PRICE</th>
                                              <th>PRICE</th>
                                          </tr>
                                      </thead> -->
                                      <tbody v-if="orderDetails.status === 'Processing'">
                                          <tr v-for="(key) in orderDetails?.customProducts ?? []" :key="key">

                                              <td class="text-capitalize text-bold-500">
                                                  {{key.name}}
                                                  <div v-if="key.productItem !== undefined && key.productItem?.length !== 0">
                                                      <ul>
                                                          <div v-for="(singleItem) in key.productItem" :key="singleItem.id">
                                                              <li>
                                                                  {{ singleItem.serialNnumber }} <span v-if=" singleItem.serialNnumber">({{ singleItem.condition }})</span>
                                                              </li>

                                                          </div>
                                                      </ul>
                                                  </div>
                                              </td>
                                              <td>{{ key.productItem.length }}</td>
                                              <td class="text-bold-500">
                                                  ${{ parseFloat((key.productItem[0].unitPrice) / 100).toFixed(2) }}
                                              </td>
                                              <td class="text-bold-500">
                                                  ${{ ((key.productItem[0].unitPrice * 2) / 100).toFixed(2) }}
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                      </div>
                  </div>
                  <!-- charges list start -->
                  <div class="row">
                      <div class="col-md-12 d-flex justify-content-end align-items-end">
                        <div>
                          <table class="table table-borderless">
                            <tr>
                              <td class="text-500">Sub Total:</td>
                              <td><span>${{ parseFloat(subTotal / 100).toFixed(2) }} <small style="font-size: 0.8rem;">AUD</small></span></td>
                            </tr>
                            <tr v-for="(charge,index) in orderPayment.chargesDetails" :key="index">
                              <td class="text-500">{{ charge.name }} ({{ charge.sign }}) :</td>
                              <td><span>${{ parseFloat(charge.amount / 100).toFixed(2) }} <small style="font-size: 0.8rem;">AUD</small></span></td>
                            </tr>
                            <tr>
                              <td class="text-500">Grand Total:</td>
                              <td><span>${{ parseFloat(orderPayment.total / 100).toFixed(2) }} <small style="font-size: 0.8rem;">AUD</small></span></td>
                            </tr>
                            <tr>
                              <td class="text-500">Paid:</td>
                              <td><span>${{ parseFloat(orderPayment.paid / 100).toFixed(2) }} <small style="font-size: 0.8rem;">AUD</small></span></td>
                            </tr>
                          </table>
                        </div>
                      </div>
                  </div>

                  <div v-if="orderDetails.orderNotes?.length" class="p-2" :style="{backgroundColor:'#fff4a3'}">

                      <p v-for="(note,index) in orderDetails.orderNotes" :style="{color:'#000'}" :key="note.id" class="mb-0">
                          <span v-if="index === 0" class="font-weight-bolder">Notes: </span>{{ note.description }}
                      </p>
                  </div>
              </div>
              <div class="modal-footer border-0 py-1">
                  <!-- <button type="button" class="btn btn-warning" @click="printAction">
                <i class="bx bx-x d-block d-sm-none"></i>
                <span class="d-none d-sm-block">Print</span>
              </button> -->


              </div>
              <div class="" data-toggle="modal" data-bs-target="#chargesDetails"></div>
              <!-- <order-charges-details-modal modal-name="chargesDetails" modal-title="Discount" :appointmentCharges="currentDiscountCharges"></order-charges-details-modal> -->
          </div>
      </div>
  </div>
</div>
</template>

<script>
// import OrderChargesDetailsModal
// from "./AppointmentChargesDetailsModal";
// import PrintElement from "@/components/backEnd/mixins/PrintElement";

export default {
    name: "OrderQuickViewModal",
    props: ['order', 'orderPayment'],
    components: {
        // OrderChargesDetailsModal
    },
    // mixins: [PrintElement],
    data() {
        return {
            currentDiscountCharges: [],
            orderDetails: {},
            subTotal: 0,
        }
    },
    watch: {
        order(order) {
            this.orderDetails = order;
            let productItemsSet = {

            };
            if (this.orderDetails.status === 'Processing') {

                // product item list data making
                this.orderDetails.orderProductItems.map((item) => {
                    if (productItemsSet[item.productItem.product.id]) {
                        productItemsSet[item.productItem.product.id].productItem.push({
                            condition: item.productItem.condition,
                            serialNnumber: item.productItem.serial_number,
                            unitPrice: item.productItem.productItemTransaction ?.sell_price
                        });
                        return;
                    }

                    productItemsSet[item.productItem.product.id] = {
                        id: item.productItem.product.id,
                        name: item.productItem.product.name,
                        productItem: [{
                            condition: item.productItem.condition,
                            serialNnumber: item.productItem.serial_number,
                            unitPrice: item.productItem.productItemTransaction ?.sell_price
                        }]

                    };

                })
                this.orderDetails.customProducts = productItemsSet;

                // sub total calculation
                this.subTotal = order ?.orderCharges ?.reduce(function (acc, cur) {
                    if (cur.type === "Discount") {
                        return acc - cur.amount;
                    }
                    return acc + cur.amount;
                }, 0);

            }

            if (this.orderDetails.status === 'Pending') {
                this.subTotal = order ?.details ?.cart_data.reduce(function (acc, cur) {
                    return acc + cur.product_price.sub_total
                }, 0);
            }

        }
    },

    computed: {
        filterOrderNotes() {
            return this.orderDetails &&
                this.orderDetails.orderNotes ?
                this.orderDetails.orderNotes.find(({
                        type,
                        user_type
                    }) =>
                    (type === 'Additional' && user_type === 'Customer')) : [];
        },
        /* charges() {
           return {
             order_delivery_charge: {
               name: 'Delivery Charge',
               sign: '+'
             },
             applied_discount: {
               name: 'Applied Discount',
               sign: '-'
             },
             coupon_discount: {
               name: 'Coupon Discount',
               sign: '-'
             },
             credited_payment_discount: {
               name: 'Credited Discount',
               sign: '-'
             },
             gst_charge: {
               name: 'GST Charge',
               sign: '+'
             }
           };
         }*/

    },
    methods: {
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
        printAction() {
            let idElement = document.getElementById('printDiv');
            this.printElement(idElement);
        },
        openDiscountDetailsModal() {
            this.currentDiscountCharges = this.orderPayment.chargesDetails.find(({
                name
            }) => name === 'discount') ?.details ?? [];
            document.querySelector(`[data-bs-target='#chargesDetails']`).click()
        }
    }

}
</script>

<style>
.order-details-img{
  height: 100px;
  width: 100px;
}
.order-details-img img{
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
