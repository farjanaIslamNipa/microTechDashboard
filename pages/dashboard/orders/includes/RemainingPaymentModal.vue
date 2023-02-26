<template>
  <div class="modal fade " id="orderPaymentModal" tabindex="-1" role="dialog"
       aria-labelledby="orderPaymentModal" aria-hidden="true">
    <div class="modal-dialog  modal-xl modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-brand text-white">
          <h1 class="modal-title white">Add Payment</h1>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i class="fa fa-times text-white" aria-hidden="true"></i>
          </button>
        </div>
        <div class="modal-body">

          <div class="row">
            <div class="col-lg-5 mt-1 mt-lg-0">
              <div class="card h-100">
                <div class="card-body">
                  <div v-if="singleOrder.user !== undefined">
                    <div class="d-flex justify-content-between" data-bs-toggle="collapse" href="#customerDetails"
                         role="button">
                      <p class="text-bold-500 text-uppercase text-warning"> Customer Details</p>
                      <i class='bx bx-chevron-down'></i>
                    </div>
                    <div class="collapse collapse show" id="customerDetails">
                      <div class="form-group">
                        <div class="">
                          <span class="text-bold-500"> Name : </span>
                          <span class="text-capitalize">{{ customerFullName }}</span>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="">
                          <span class="text-bold-500"> Email : </span>
                          <span class="">{{ singleOrder.user.email }}</span>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="">
                          <span class="text-bold-500"> Phone : </span>
                          <span class="">{{ singleOrder.user.phone_number }}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                  <hr>

                  <div>
                    <div class="d-flex justify-content-between" data-bs-toggle="collapse" href="#billingInformation"
                         role="button">
                      <p class="text-bold-500 text-uppercase text-warning"> Order Details</p>
                      <i class='bx bx-chevron-down'></i>
                    </div>
                    <div class="collapse collapse show" id="billingInformation">
                      <div class="form-group">
                        <div class="">
                          <span class="text-bold-500"> Order No : </span>
                          <span class="">{{ singleOrder.order_no }}</span>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="">
                          <span class="text-bold-500"> Order Date : </span>
                          <span class="">{{ singleOrder.order_date }}</span>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="">
                          <span class="text-bold-500"> Delivery Date : </span>
                          <span class="">{{ singleOrder.delivery_date }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr>

                  <div v-if="paymentType === 'cardPayment'">
                    <div class="d-flex justify-content-between" data-bs-toggle="collapse" href="#cardSurchargeInformation"
                         role="button">
                      <p class="text-bold-500 text-uppercase text-warning"> Card Surcharge Details</p>
                      <i class='bx bx-chevron-down'></i>
                    </div>
                    <div class="collapse collapse show" id="cardSurchargeInformation">
                      <div v-for="surCharge in cardSurcharge" :key="surCharge" class="row">
                        <div class="col-12 text-left">
                          <p class="text-bold-400 pb-0 mb-0">{{ surCharge.name }}:
                            ${{ parseFloat(surCharge.rate).toFixed(2) }} %</p>
                        </div>

                      </div>
                      <h5>Payable Surcharge</h5>
                      <div v-for="cardCharge in cardCharges" :key="cardCharge" class="row">
                        <div class="col-12 text-left">
                          <p class="text-bold-400 pb-0 mb-0">{{ cardCharge.name }}:
                            $ {{ parseFloat(cardCharge.charge / 100).toFixed(2) }}</p>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-7 mt-lg-0">
              <div class="card h-100">
                <div class="card-body">
                  <div>
                    <h5 class="mt-1 text-bold-500">Payable amount</h5>
                    <div class="custom-control custom-radio d-flex align-items-center" :style="{marginBottom:'3px'}">
                      <input type="radio" class="custom-control-input" v-model="paymentAmountType"
                             name="customRadioForAmountTYpe" value="full" id="full">
                      <label class="custom-control-label text-bold-400" for="full"> ${{
                          parseFloat(amount / 100).toFixed(2)
                        }} </label>
                    </div>

                    <div class="custom-control custom-radio d-flex align-items-center">
                      <input v-model="paymentAmountType" value="custom" type="radio" class="custom-control-input"
                             name="customRadioForAmountTYpe" id="custom">
                      <label class="custom-control-label text-bold-400" for="custom">Custom</label>
                    </div>
                    <div v-if="paymentAmountType === 'custom'">
                      <div class="row py-1">
                        <div class="col-12 col-md-6 align-self-center">
                          <div class="form-group">
                            <input placeholder="Enter payable amount" v-model="customPaymentAmount" type="number"
                                   class=" w-100 form-control">
                          </div>
                        </div>
                      </div>
                      <!-- showing error -->
                      <div v-if="frontEndErrors.customPaymentAmount.length > 0" class="text-left">
                        <p class="text-danger mb-0 font-medium-1"
                           v-for="(error, index) in frontEndErrors.customPaymentAmount" :key="index">{{ error }}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 class="mt-1 text-bold-500">Payment Method</h5>

                    <div class="custom-control custom-radio d-flex align-items-center" :style="{marginBottom:'3px'}">
                      <input type="radio" class="custom-control-input" v-model="paymentType" name="customRadio"
                             value="cardPayment" id="CardPayment">
                      <label class="custom-control-label text-bold-400" for="CardPayment">Card Payment </label>
                    </div>

                    <div v-if="paymentType === 'cardPayment'" class="row mt-1">

                      <div class="col-12 ">
                        <div class="form-group">
                          <label for="first-name-icon">Cardholder name</label>
                          <div class="position-relative has-icon-left">
                            <input type="text" v-model="cardName" class="form-control text-capitalize" name="fname-icon"
                                   placeholder="Enter cardholder name">
                            <div class="form-control-position">
                              <i class='bx bx-user'></i>
                            </div>
                          </div>
                          <!-- backend error msg -->
                          <div
                              v-if="cardTokenBackendErrors.card_name !== undefined && cardTokenBackendErrors.card_name.length > 0 "
                              class="text-danger">
                            <p class="mb-0" v-for="(error,index) in cardTokenBackendErrors.card_name" :key="index">
                              {{ error }}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 ">
                        <div class="form-group">
                          <label for="email-id-icon">Card number</label>
                          <div class="position-relative has-icon-left">
                            <input type="email" v-model.number="cardNumber" class="form-control" name="email-id-icon"
                                   placeholder="Enter card number">
                            <div class="form-control-position">
                              <i class='bx bx-credit-card-alt'></i>
                            </div>
                          </div>
                          <!-- backend error msg -->
                          <div
                              v-if="cardTokenBackendErrors.card_number !== undefined && cardTokenBackendErrors.card_number.length > 0 "
                              class="text-danger">
                            <p class="mb-0" v-for="(error,index) in cardTokenBackendErrors.card_number" :key="index">
                              {{ error }}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <label for="contact-info-icon">Expiry Date</label>
                          <div class="position-relative has-icon-left">
                             <input v-model="cardExpiryDate" type="text" name="expiry_date" class="form-control booking-input" id="card-expiry-date" placeholder="MM/YY" maxlength="5" :keyup="this.cardExpiryDate=this.cardExpiryDate.replace(/^(\d\d)(\d)$/g,'$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g,'$1/$2')">
                            <div class="form-control-position">
                              <i class='bx bx-calendar-check'></i>
                            </div>
                          </div>
                          <!-- backend error msg -->
                          <div
                              v-if="cardTokenBackendErrors.card_expire_month !== undefined && cardTokenBackendErrors.card_expire_month.length > 0 "
                              class="text-danger">
                            <p class="mb-0" v-for="(error,index) in cardTokenBackendErrors.card_expire_month"
                               :key="index"> {{ error }}</p>
                          </div>
                        </div>
                      </div>

                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <label for="password-icon">CVV</label>
                          <div class="position-relative has-icon-left">
                            <input type="number"  ref="cvvInput" maxlength="4" v-model="cardCvc" class="form-control" name="contact-icon"
                                   placeholder="Enter CVV">
                            <div class="form-control-position">
                              <i class='bx bx-lock-alt'></i>
                            </div>
                          </div>
                          <!-- backend error msg -->
                          <div
                              v-if="cardTokenBackendErrors.card_cvc !== undefined && cardTokenBackendErrors.card_cvc.length > 0 "
                              class="text-danger">
                            <p class="mb-0" v-for="(error,index) in cardTokenBackendErrors.card_cvc" :key="index">
                              {{ error }}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <!-- showing error -->
                  <div v-if="frontEndErrors.paymentTypeSelection.length > 0" class="text-left pt-2">
                    <p class="text-danger mb-0 font-medium-1"
                       v-for="(error, index) in frontEndErrors.paymentTypeSelection"
                       :key="index">{{ error }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer border-0 pt-0">
          <button @click="payBtnHandler" type="button" class="btn btn-brand" :disabled="paymentType === ''">
            <i class="bx bx-x d-block d-sm-none"></i>
            <span class="d-none d-sm-block">Create Payment</span>
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Loader from '~/mixins/Loader';
import ShowToastMessage from '~/mixins/ShowToastMessage';

export default {
  name: "RemainingPaymentModal",
  mixins: [ShowToastMessage, Loader],
  props: ['singleOrder', 'remainingAmount'],
  emits: ['getPaidAmount'],
  data() {
    return {
      customPaymentAmount: '',
      paymentAmountType: 'full',
      totalPayable: 0,
      amount: 0,

      frontEndErrors: {
        paymentTypeSelection: [],
        eftReference: [],
        paymentAmountType: [],
        customPaymentAmount: []
      },

      customerAddress: '',
      shippingAddressStatus: false,
      shippingAddress: {
        name: '',
        email: '',
        phone: '',
        address: ''
      },
      term_condition: false,
      eft_reference: '',
      order_note: '',
      delivery_date: '',
      applyCoupon: false,
      applyCredit: false,
      paymentType: 'cardPayment',
      cartsData: [],
      discount_type: '',
      coupon_code: '',
      credit_code: '',
      discount_amount: '',
      payment_type: '',
      paid_amount: '',
      payment_method_type: '',
      discountObj: {},
      userId: '',
      errorBag: {
        eftReference: [],
        paymentAmount: [],
      },

      preOrderResponse: {
        message: '',
        status: '',
        remaining_credited_payment: '',
        /* same_day_surcharge: {
           applied_status: '',
           amount: ''
         },
         timebase_surcharge: {
           applied_status: '',
           amount: '',
         },
         weekend_surcharge: {
           applied_status: '',
           amount: ''
         },*/
        order_delivery_charge: {
          applied_status: '',
          message: '',
          distance_value: '',
          distance_value_in_km: '',
          amount: '',
        },
        subtotal_amount: '',
        applied_discount: {
          applied_status: '',
          amount: ''
        },
        coupon_discount: {
          applied_status: '',
          validation_status: '',
          message: '',
          apply_on: '',
          amount: '',
        },
        credited_payment_discount: {
          applied_status: '',
          validation_status: '',
          amount: '',
          message: ''
        },
        total_discount_amount: '',
        gst_charge: {
          applied_status: '',
          amount: ''
        },
        grand_total: '',
        shipping_address_status: false,
        shipping_address: {},
      },
      customer: {
        address: {}
      },
      paidAmount: {},
      cardTokenBackendErrors: {},
      // cardInformation
      cardName: '',
      cardNumber: '',
      cardExpiryDate:'',
      cardExpireMonth: '',
      cardExpireYear: '',
      cardCvc: '',

      cardTokenResponse: {
        id: '',
        used: '',
        card: {}
      },
      authorizationTokenResponse: {
        id: '',
        decline_reason: '',
        payment_status: ''
      },
      paymentID: '',
      eftReference: '',
      getSettingsParams: {
        type: ['payment'],
        key: ['payment_card_surcharge'],
      },
      paidInfo: {},
      order: {
        id: '',
        order_no: '',
        created_at: '',
        status: '',
      },
      customerID: null,
      cardCharges: {},
      postCardSurcharge: 0,
      paymentCreatedAt: ''
    }
  },
  computed: {
    ...mapGetters({
      authUser: 'login/authUser',
      payment: 'payments/payment',
      cardSurcharge: 'settings/settingPaymentCardSurcharge',
    }),
    customerFullName() {
      return `${this.singleOrder?.user?.first_name ?? ''} ${this.singleOrder?.user?.last_name ?? ''}`;
    },
  },

  watch: {
    paymentAmountType(current) {
      this.totalPayable = current === 'full' ? this.amount : '';
      this.customPaymentAmount = '';
    },
    remainingAmount(value) {
      this.amount = parseInt(value);
      this.totalPayable = parseInt(value);
    },
    singleOrder(value) {
      this.order.id = value.id ?? '';
      this.order.order_no = value.order_no ?? '';
      this.customerID = value.user?.id;
      this.order.created_at = value.order_date;
      this.order.status = value.status;
    },
    customPaymentAmount(currentAmount) {
      if (this.paymentAmountType === 'custom') {
        if (parseFloat(currentAmount * 100).toFixed(2) > this.amount) {
          this.frontEndErrors.customPaymentAmount = [];
          this.frontEndErrors.customPaymentAmount.push(`Amount can't greater than $ ${parseFloat(this.amount / 100).toFixed(2)}`);
          this.totalPayable = parseInt(currentAmount * 100);
        } else {
          this.totalPayable = parseInt(currentAmount * 100);
          this.frontEndErrors.customPaymentAmount = [];
        }
      }

    },
    totalPayable() {
      this.cardCharges = this.cardSurcharge.map((item) => {
        return {
          name: item.name,
          charge: parseInt(this.totalPayable * parseInt(item.rate) / 100),
        }
      })
    },
      cardExpiryDate(currentExpiryDate) {
            this.cardExpireMonth = currentExpiryDate.slice(0, 2);
            this.cardExpireYear = currentExpiryDate.slice(-2);
            if (currentExpiryDate.length === 5) {
                this.$refs.cvvInput.focus();
            }
        },
  },

  methods: {
    ...mapActions({
      getSettings: 'settings/getSettings',
      preStoreOrderData: 'orders/preStoreOrderData',
      cardTokenCreate: 'paymentGateways/cardTokenCreate',
      paymentCreate: 'paymentGateways/paymentCreate',
      paymentCreateByToken: 'paymentGateways/paymentCreateByToken',
      authorizationCreateByToken: 'paymentGateways/authorizationCreateByToken',
      postPayment: 'payments/postPayment',
      postOrder: 'orders/postOrder',
      postOrderNote: 'orderNotes/postOrderNote',
      postCardPayment: 'cardPayments/postCardPayment',
      postOrderPayment: 'orderPayments/postOrderPayment',
    }),
    async createOrderHandler() {
      if (this.paymentType === 'cardPayment' && this.totalPayable > 0) {

        const isTokenCreated = await this.tokenCreate();
        if (isTokenCreated) {
          const isAuthorized = this.order.status === 'Pending' ? await this.createAuthorizationByToken() : await this.createPaymentByToken();
          if (isAuthorized) {
            const isPaymentCreated = await this.createPayment();
            if (isPaymentCreated) {
              const isCardPaymentDone = await this.createCardPayment();
              if (isCardPaymentDone) {
                const isOrderPaymentCreated = await this.createOrderPayment();
                if (isOrderPaymentCreated) {
                  this.loader(false);
                  this.$emit('getPaidAmount', this.totalPayable);
                  this.resetData();
                  document.querySelector('[data-bs-target="#orderPaymentModal"]').click();
                  this.showToastMessage({
                    message: 'Payment created Successfully',
                    type: 'success'
                  });
                }
              }
            }
          }
        }
      }
    },
    //sequence of  card payment
    //* step 1 create token, get card type
    async tokenCreate() {

      const data = {
        card_name: this.cardName,
        card_number: this.cardNumber,
        card_expire_month: this.cardExpireMonth,
        card_expire_year: this.cardExpireYear,
        card_cvc: this.cardCvc,
      }
      this.loader(true);
      const response = await this.cardTokenCreate(data);

      if (response.status === 200 || response.status === 201) {

        this.loader(false);
        this.cardTokenBackendErrors = {};
        this.cardTokenResponse.id = response.data.id;
        this.cardTokenResponse.used = response.data.used;
        this.cardTokenResponse.card = response.data.card;
        if (response.data.used === false) {
          let cardType = this.cardTokenResponse.card.type;
          this.cardCharges.map((item) => {
            if (cardType.toLowerCase() == item.name.toLowerCase()) {
              this.postCardSurcharge = parseInt(item.charge);
            }
          })
          return true;
        }

      } else {
        this.cardTokenResponse.id = '';
        this.cardTokenResponse.used = '';
        this.cardTokenResponse.card = {};
        this.loader(false);
      }

      this.cardTokenBackendErrors = response.errors;
      if (response.message) {
        this.showToastMessage(response);
      }
      return false;

    },
    //* step 2  create & get order id,order_no
    async createOrder() {
      // add cart data in pre order response object
      this.preOrderResponse.cart_data = this.cartsData
      const data = {
        customer_id: this.customerID,
        order_date: '2022-04-06',
        delivery_date: this.delivery_date,
        service_date: '',
        details: JSON.stringify(this.preOrderResponse), // json pre store data
      }

      const response = await this.postOrder(data);
      if (response.status === 200 || response.status === 201) {

        this.showToastMessage({
          message: 'Order created',
          type: 'success'
        });
        return true;
      }
      if (response.message) {
        this.showToastMessage(response);
      }
      return false

    },
    //step 3 create note -> used user Id,user_type=0, type=0, step 2: order id,
    async createOrderNotes() {

      const data = {
        user_id: this.customerID,
        order_id: this.order.id,
        user_type: 0,// 0 for customer
        type: 0, // setting table
        description: this.order_note
      }

      const response = await this.postOrderNote(data);

      if (response.status === 200 || response.status === 201) {

        this.showToastMessage({
          message: 'Order Note created',
          type: 'success'
        });
        return true;
      }
      if (response.message) {
        this.showToastMessage(response);
      }
      return false

    },
    // step 4 -> used step 1: token & step 2: order_no, get gateway Id
    async createAuthorizationByToken() {
      let data = {
        currency: 'AUD',
        reference: 'order-admin-panel',
        amount: this.totalPayable + this.postCardSurcharge,
        description: `${this.customerFullName} paid $ ${this.totalPayable} from Admin Panel`,
        card_token: this.cardTokenResponse.id,
      }

      this.loader(true);
      const response = await this.authorizationCreateByToken(data);
      if (response.status === 200 || response.status === 201) {

        this.loader(false);
        if (response.data.payment_status === 'APPROVED') {

          this.authorizationTokenResponse.id = response.data.id;
          this.authorizationTokenResponse.payment_status = response.data.payment_status;
          this.authorizationTokenResponse.decline_reason = response.data.decline_reason;
          return true;
        }
        if (response.data.payment_status === 'DECLINED') {

          this.authorizationTokenResponse.id = response.data.id;
          this.authorizationTokenResponse.payment_status = response.data.payment_status;
          this.authorizationTokenResponse.decline_reason = response.data.decline_reason;
          this.showToastMessage({type: 'error', message: 'Card  Declined'})
          return false;
        }
      } else {
        this.loader(false);
      }
      if (response.message) {
        this.showToastMessage(response);
      }
    },
    // step 5 ->used step 2: order_no , get payment Id
    async createPayment() {
      const data = {
        reference: this.order.order_no,
        type: this.payment_method_type === 'cardPayment' ? 1 : (this.payment_method_type === 'cashPayment' ? 0 : 2),// 0= cash, 1=card, 2= eftpos
        panel: 1,
      }
      this.loader(true);

      const response = await this.postPayment(data);
      if (response.status === 200 || response.status === 201) {

        this.paymentID = this.payment.id
        this.paymentCreatedAt = this.payment.created_at


        return true;

      } else {
        this.loader(false);

      }
      if (response.message) {
        this.showToastMessage(response);
      }
      return false
    },
    // step 6 -> used step 1:card type, step 3: gateway Id, step 4: payment Id
    async createCardPayment() {
      const data = {
        payment_id: this.paymentID,
        paid_by: this.customerID,
        amount: this.totalPayable,
        card_type: this.cardTokenResponse.card.type,
        card_surcharge: this.postCardSurcharge,
        payment_gateway: 'Simplify',
        payment_gateway_id: this.authorizationTokenResponse.id,
        status: this.order.status === 'Pending' ? 0 : 1 // 0 for hold, 1 for paid

      }
      this.loader(true);

      const response = await this.postCardPayment(data);
      if (response.status === 200 || response.status === 201) {

        this.loader(false);
        return true;

      } else {

        this.loader(false);

      }
      if (response.message) {
        this.showToastMessage(response);
      }
      return false;

    },
    // end card payment

    //sequence of cash payment
    // step 1:-> step 5-> next cash payment api call
    // cash payment api call
    async createCashPayment() {
      const data = {
        payment_id: this.paymentID,
        paid_by: this.customerID,
        paid_to: this.authUser.id,
        handover_date: '',
        amount: this.totalPayable,

      }
      this.loader(true);
      const response = await this.postCashPayment(data);
      if (response.status === 200 || response.status === 201) {

        this.loader(false);
        return true;

      } else {

        this.loader(false);

      }
      if (response.message) {
        this.showToastMessage(response);
      }
      return false;
    },
    // end cash payment

    //sequence of eft payment
    // step 1:-> step 5-> next cash payment api call
    // eft payment api call
    async createEftPayment() {
      const data = {
        payment_id: this.paymentID,
        paid_by: this.customerID,
        payment_reference: this.eftReference,
        amount: this.totalPayable,

      }
      this.loader(true);
      const response = await this.postEftPayment(data);
      if (response.status === 200 || response.status === 201) {
        this.loader(false);
        return true;
      } else {
        this.loader(false);
      }
      if (response.message) {
        this.showToastMessage(response);
      }
      return false;
    },

    async createOrderPayment() {
      // if order status is pending then no data insert on order payment table
      if (this.order.status === 'Pending') {
        return true;
      }
      const data = {
        payment_id: this.paymentID,
        order_id: this.order.id,
        transaction_date_time: this.paymentCreatedAt ?? this.order.created_at,
      };
      this.loader(true);
      const response = await this.postOrderPayment(data);
      if (response.status === 200 || response.status === 201) {
        return true;
      } else {
        this.loader(false);
      }
      return false
    },
    async createPaymentByToken() {
      this.loader(true);
      let data = {
        currency: 'AUD',
        reference: 'order-admin-panel',
        amount: this.totalPayable + (this.postCardSurcharge),
        description: 'this is payment test description',
        card_token: this.cardTokenResponse.id,
      }
      const response = await this.paymentCreateByToken(data);
      if (response.status === 200 || response.status === 201) {
        this.simplifyPaymentGatewayId = response.data.id;

        this.loader(false);
        if (response.data.payment_status === 'APPROVED') {

          this.authorizationTokenResponse.id = response.data.id;
          this.authorizationTokenResponse.payment_status = response.data.payment_status;
          this.authorizationTokenResponse.decline_reason = response.data.decline_reason;
          return true;
        }
        if (response.data.payment_status === 'DECLINED') {
       
          this.authorizationTokenResponse.id = response.data.id;
          this.authorizationTokenResponse.payment_status = response.data.payment_status;
          this.authorizationTokenResponse.decline_reason = response.data.decline_reason;
          this.showToastMessage({type: 'error', message: 'Card  Declined'})
          return false;
        }

      } else {
        this.loader(false);
      }
      if (response.message) {
        this.showToastMessage(response);
      }
      return false;
    },

    async payBtnHandler() {

      if (this.paymentAmountType === 'custom') {
        if (this.customPaymentAmount >= 1) {

          if (parseFloat(this.customPaymentAmount * 100).toFixed(2) > this.amount) {
            this.frontEndErrors.customPaymentAmount = [];
            this.frontEndErrors.customPaymentAmount.push(`Amount can't greater than $ ${parseFloat(this.amount / 100).toFixed(2)}`);
          } else {

            this.frontEndErrors.customPaymentAmount = [];
            await this.createOrderHandler();
          }
        } else {
          this.frontEndErrors.customPaymentAmount = [];
          this.frontEndErrors.customPaymentAmount.push(`Please enter amount and amount can't greater than $ ${parseFloat(this.amount / 100).toFixed(2)}`);
        }

      } else {

        await this.createOrderHandler();
      }

    },

    resetData() {
      Object.assign(this.$data, this.$options.data.apply(this));
    }
  }
}
</script>

<style scoped>

</style>
