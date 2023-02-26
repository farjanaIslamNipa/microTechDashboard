<template>
<div class="dashboard-content">
    <section class="py-5">
        <div class="row">
            <!--            customer information-->
            <div class="col-lg-4 mt-1 mt-lg-0">
                <div class="card h-100">
                    <div class="card-body">
                        <div>
                            <div class="d-flex justify-content-between" data-bs-toggle="collapse" href="#billingInformation" role="button">
                                <p class="text-uppercase brand-color"> BILLING ADDRESS</p>
                                <i class="fa-solid fa-angle-down text-muted"></i>
                            </div>
                            <div class="collapse collapse show" id="billingInformation">
                                <div class="form-group">
                                    <div class="">
                                        <span class="text-bold-500"> Name : </span>
                                        <span class="text-capitalize">{{ customer.full_name }}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="">
                                        <span class="text-bold-500"> Email : </span>
                                        <span class="">{{ customer.email }}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="">
                                        <span class="text-bold-500"> Phone : </span>
                                        <span class="">{{ customer.phone_number }}</span>
                                    </div>
                                </div>
                                <!--                      <div class="form-group">
                            <div class="">
                              <span class="text-bold-500"> Business Name : </span>
                              <span class="">15 Railway street st</span>
                            </div>
                          </div>-->
                                <div class="form-group">
                                    <div class="">
                                        <span class="text-bold-500"> Address : </span>
                                        <span v-if="customer.address !==undefined">{{ billingAddress }}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div>

                            <div class="d-flex justify-content-between pt-2" data-bs-toggle="collapse" href="#shippingAddress" role="button">
                                <p class="text-uppercase brand-color"> SHIPPING ADDRESS</p>
                                <i class="fa-solid fa-angle-down text-muted"></i>
                            </div>

                            <div class="collapse" id="shippingAddress">
                                <div class="custom-control custom-checkbox d-flex align-items-center mb-1">
                                    <input v-model="sameBillingShippingAddressStatus" class="custom-control-input" type="checkbox" id="billingAddress">
                                    <label class="custom-control-label" for="billingAddress">Same as billing address</label>
                                </div>
                                <div class="form-group">
                                    <div class=""><label class="text-bold-400">Name</label>
                                        <input :disabled="sameBillingShippingAddressStatus" type="text" class="text-capitalize payment-input-field" v-model="shippingDetails.name"></div>
                                </div>

                                <div class="form-group">
                                    <div class=""><label class="text-bold-400">Email</label>
                                        <input :disabled="sameBillingShippingAddressStatus" type="text" class="payment-input-field" v-model="shippingDetails.email"></div>
                                </div>
                                <div class="form-group">
                                    <div class=""><label class="text-bold-400">Phone</label>
                                        <input :disabled="sameBillingShippingAddressStatus" type="text" class="payment-input-field" v-model="shippingDetails.phone"></div>
                                </div>
                                <div class="form-group">
                                    <div class=""><label class="text-bold-400">Address</label>
                                        <span v-if="sameBillingShippingAddressStatus !== true" style="cursor: pointer;" title="Edit" class="ml-1 single-edit-btn text-primary" data-bs-toggle="modal" data-bs-target="#userAddressCreate"><i class="fa-solid fa-pen-to-square brand-color"></i></span>
                                        <input readonly type="text" class="payment-input-field" v-model="shippingAddress"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row d-flex justify-content-center">
                            <!--                    <div class="col-md-12">
                                          <div class="form-group">
                                            <label class="text-uppercase brand-color">Delivery Date</label>
                                            <div class="d-flex align-items-center date-picker-wrapper">
                                              <div class="w-100 ">
                                                <DatePicker v-model="delivery_date" :update-on-input="true"
                                                            :masks="{input: ['DD MMMM YYYY']}" :min-date='new Date()'
                                                            :model-config="{ type: 'string', mask: 'YYYY-MM-DD'}">
                                                  <template v-slot="{ inputValue ,togglePopover  }">
                                                    <div class="d-flex align-items-center" @click="togglePopover()"
                                                         style="cursor: pointer;">
                                                      <i class='bx bx-calendar mr-1'></i>
                                                      <input class="form-control" :value="inputValue" style="cursor: pointer;"/>
                                                    </div>
                                                  </template>
                                                </DatePicker>
                                              </div>
                                            </div>
                                          </div>
                                        </div>-->
                            <div class="py-2">
                                <button class="btn text-uppercase blue-fill-btn" @click="backToOrderCreate"><i class="fa-solid fa-left-long"></i> back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--            discount information-->
            <div class="col-lg-4 mt-1 mt-lg-0">
                <div class="card h-100">
                    <div class="card-body">
                        <p class="text-uppercase brand-color">DISCOUNT & OTHERS</p>

                        <div class="">
                            <div class="">
                                <div class="order-checkout-checkbox">
                                    <div class="custom-control custom-checkbox d-flex align-items-center">
                                        <input class="custom-control-input" type="checkbox" id="applyCoupon" v-model="applyCoupon">
                                        <label class="custom-control-label ms-2" for="applyCoupon">Apply
                                            Coupon</label><small data-bs-toggle="modal" data-bs-target="#availableCouponsModal" class="brand-color" v-if="coupons.length > 0">(Click to see all
                                            available coupon)</small>
                                    </div>

                                </div>
                                <div v-if="applyCoupon">
                                    <div class="row py-1">
                                        <div class="col-9 align-self-center"><input v-model="coupon_code" placeholder="Enter a Coupon" type="text" class="w-100 payment-input-field">
                                        </div>
                                        <div class="col-3 align-self-center pl-0 d-flex align-items-center">
                                            <button class="btn btn-sm blue-fill-btn" @click="applyDiscountHandler">Apply</button>
                                        </div>
                                    </div>
                                    <div class="" v-if="preOrderResponse.coupon_discount.validation_status === false">
                                        <p class="text-danger">{{ preOrderResponse.coupon_discount.message }}</p>
                                    </div>
                                    <div class="" v-if="preOrderResponse.coupon_discount.validation_status === true">
                                        <p class="text-success">{{ preOrderResponse.coupon_discount.message }}</p>
                                    </div>
                                </div>
                            </div>
                            <!--              start credited section-->
                            <div class="">
                                <div class="order-checkout-checkbox">
                                    <div class="custom-control custom-checkbox d-flex align-items-center">
                                        <input class="custom-control-input" type="checkbox" id="applyCredit" v-model="applyCredit">
                                        <label class="custom-control-label ms-2" for="applyCredit">Apply Credit (<span class="display-inline-block text-danger">{{
                              `Remaining credit: ${parseFloat(preOrderResponse.remaining_credited_payment / 100).toFixed(2)}`
                            }}</span>)</label>
                                    </div>
                                </div>
                                <div v-if="applyCredit">
                                    <div class="row py-1">
                                        <div class="col-9 align-self-center"><input v-model="credit_code" placeholder="Enter a Credit" type="text" class="w-100 payment-input-field">
                                        </div>
                                        <div class="col-3 align-self-center pl-0 d-flex align-items-center">
                                            <button class="btn btn-sm blue-fill-btn" @click="applyDiscountHandler">Apply</button>

                                        </div>
                                    </div>
                                    <div v-if="preOrderResponse.credited_payment_discount.validation_status === false">
                                        <small class="text-danger">{{ preOrderResponse.credited_payment_discount.message }}</small>
                                    </div>
                                    <div v-if="preOrderResponse.credited_payment_discount.validation_status === true">
                                        <small class="text-success">{{ preOrderResponse.credited_payment_discount.message }}</small>
                                    </div>
                                </div>

                            </div>
                            <!--              end credited section-->

                        </div>
                        <!--                  start order note section-->
                        <p class="mt-1 text-uppercase brand-color">ORDER NOTE (OPTIONAL)</p>
                        <textarea v-model="order_note" placeholder="Order note (Max 128 characters)" rows="2" maxlength="128" class="form-control mb-2"></textarea>
                        <!--                  end order note section-->

                    </div>
                </div>
            </div>
            <!--            payment information-->
            <div class="col-lg-4 mt-1 mt-lg-0">
                <div class="card h-100">
                    <div class="card-body">
                        <p class="text-uppercase brand-color">ORDER SUMMARY</p>
                        <!-- <div class="">
        <div class="row ">
            <div class="col-3 px-0"><img src="https://geekscrs.com.au/frontend-new/images/color-mac.png" class="img-fluid" alt=""></div>
            <div class="col-3 pr-0  align-self-center truncate "><span class="checkout-details-text-font ">Woven Art Silk Saree in Pink</span></div>

            <div class="col-6 align-self-center text-right "><span class="checkout-details-text-font"><span class="mr-1 text-primary">x3</span> Tk.143,970</span></div>
        </div>
        <hr>
    </div> -->
                        <div class="row">
                            <div class="col-7 text-left"><span class="text-bold-400">Subtotal:</span></div>
                            <div class="col-5 text-right"><span class="">$<span>{{
                        parseFloat(getTotalPrice / 100).toFixed(2)
                      }}</span></span></div>
                        </div>
                        <div class="row">
                            <div class="col-7 text-left"><span class="text-bold-400">Cart Discount:</span> <small v-if="(preOrderResponse.total_discount_amount / 100).toFixed(2) > 0 " class="text-danger cursor-pointer" data-bs-toggle="modal" data-bs-target="#discountDetailsModal">(view
                                    details)</small> :
                            </div>
                            <div class="col-5 text-right"><span class="">${{ parseFloat(preOrderResponse.total_discount_amount / 100).toFixed(2) }}</span></div>
                        </div>
                        <div class="row">
                            <div class="col-7 text-left"><span class="text-bold-400">Delivery Fee:</span></div>
                            <div class="col-5 text-right"><span class=""><span>${{
                        parseFloat(preOrderResponse.order_delivery_charge.amount / 100).toFixed(2)
                      }}</span></span></div>
                        </div>
                        <!--                  <div class="row">
                        <div class="col-7 text-left"><span class="text-bold-400">Cupon (#1kc5gf) <button
                            class="text-danger font-weight-bolder border-0 bg-transparent text-uppercase"
                            title="remove cupon">x</button>:</span></div>
                        <div class="col-5 text-right"><span class="">Tk. <span>15,000</span></span></div>
                      </div>-->
                        <div class="row" v-if="preOrderResponse.gst_charge.applied_status">
                            <div class="col-7 text-left"><span class="text-bold-400">GST:</span></div>
                            <div class="col-5 text-right"><span class=""> ${{ parseFloat(preOrderResponse.gst_charge.amount / 100).toFixed(2) }} </span></div>
                        </div>
                        <hr>
                        <div class="row" v-if="preOrderResponse.gst_charge.applied_status">
                            <div class="col-7 text-left"><span class="text-bold-600">Total Payable:</span></div>
                            <div class="col-5 text-right text-bold-600"><span class=""> ${{ parseFloat(preOrderResponse.grand_total / 100).toFixed(2) }} </span></div>
                        </div>
                        <!--                  <div v-if="payment_type!== ''">
                                      <hr>
                                      <div class="row">
                                        <div class="col-7 text-left"><span class="text-bold-600">Payable Amount:</span></div>
                                        <div class="col-5 text-right text-bold-600"><span
                                            class=""> ${{ parseFloat(paidInfo.paidAmount / 100).toFixed(2) }} </span></div>
                                      </div>
                                      <div class="row">
                                        <div class="col-7 text-left"><span class="text-bold-600">Remaining Amount:</span></div>
                                        <div class="col-5 text-right text-bold-600"><span
                                            class=""> ${{ parseFloat(paidInfo.restAmount / 100).toFixed(2) }} </span></div>
                                      </div>
                                    </div>-->

                        <!--           start payment amount-->
                        <!-- <div class="row">
                      <div class="col-12">
                          <p class="mt-1 text-bold-500">Payment Amount</p>
                      </div>
                      <div class="col-12 ">

                          <div class="custom-control-inline custom-control custom-radio">
                              <input v-model="payment_type" type="radio" class="custom-control-input" id="paymentAmount25" name="paymentAmount" value="25">
                              <label class="custom-control-label font-weight-bold" for="paymentAmount25">Quarter
                              </label>
                          </div>

                          <div class="custom-control-inline custom-control custom-radio">
                              <input v-model="payment_type" type="radio" class="custom-control-input" id="paymentAmount50" name="paymentAmount" value="50">
                              <label class="custom-control-label font-weight-bold" for="paymentAmount50">Half</label>
                          </div>

                          <div class="custom-control-inline custom-control custom-radio">
                              <input v-model="payment_type" type="radio" class="custom-control-input" id="paymentAmount100" name="paymentAmount" value="100">
                              <label class="custom-control-label font-weight-bold" for="paymentAmount100">Full
                              </label>
                          </div>

                          <div class="custom-control-inline custom-control custom-radio">
                              <input v-model="payment_type" type="radio" class="custom-control-input" id="paymentAmountOther" name="paymentAmount" value="other">
                              <label class="custom-control-label font-weight-bold" for="paymentAmountOther">Other
                              </label>
                          </div>

                          <div class="row py-1" v-if="payment_type === 'other'">
                              <div class="col-9 align-self-center"><input v-on:blur="blurEvent" v-model.number="paid_amount" placeholder="Enter a amount" type="number" class="w-100 payment-input-field">
                              </div>
                              <div v-if="errorBag.paymentAmount.length > 0" class="text-left">
                                  <p class="brand-color mb-0 font-medium-1" v-for="(error, index) in errorBag.paymentAmount" :key="index">
                                      {{ error }}</p>
                              </div>
                          </div>

                      </div>
                  </div> -->
                        <!--           end payment amount-->
                        <!--                      start payment method type-->
                        <div>
                            <p class="mt-1 text-uppercase brand-color">Payment Method</p>
                            <div v-if="parseInt(settingPaymentCardPaymentStatus.value)" class="d-flex align-items-center order-checkout-checkbox">
                                <div class="custom-control custom-radio d-flex align-items-center" :style="{marginBottom:'3px'}">
                                    <input type="radio" class="custom-control-input" v-model="payment_method_type" name="customRadio" value="cardPayment" id="CardPayment">
                                    <label class="custom-control-label text-bold-400 ms-2" for="CardPayment">Card Payment</label>
                                </div>
                                <div class="ml-1" style="cursor: pointer;" v-if="surcharge.status === 1">
                                    <span data-bs-toggle="modal" data-bs-target="#surchargeInfoModal" title="View Surcharge" class="single-edit-btn text-primary"><i class='bx bxs-info-circle'></i></span>
                                </div>
                            </div>

                            <div v-if="parseInt(settingPaymentAfterPayPaymentStatus.value)" class="d-flex align-items-center order-checkout-checkbox">
                                <div class="custom-control custom-radio d-flex align-items-center" :style="{marginBottom:'3px'}">
                                    <input type="radio" class="custom-control-input" v-model="payment_method_type" name="customRadio" value="afterpayPayment" id="afterpayPayment">
                                    <label class="custom-control-label text-bold-400" for="afterpayPayment">
                                        <label class="custom-control-label text-bold-400 ms-2" for="CardPayment">After pay</label>
                                        <!-- <afterpay-placement style="display: inline;" size='xs' data-locale="en_AU" data-currency="AUD"
                                              :data-amount="parseFloat(preOrderResponse.grand_total/100).toFixed(2)"></afterpay-placement> -->
                                    </label>
                                </div>
                            </div>
                            <div v-if="!isUserValidForAfterPay" class="py-2">
                                <span v-if="payment_method_type === 'afterpayPayment'" class="text-warning">For afterpay payment you must provide your phone and email <small class="text-primary " style="cursor: pointer" data-bs-toggle="modal" data-bs-target="#userUpdateModal"> (click to add ) </small> </span>
                            </div>

                            <!--                    <div>
                                          <div class="d-inline-block">
                                            <label class="payment-option-label">
                                              <input class="payment-option-input" type="radio" value="afterPayPayment" v-model="paymentType" name="payment-option">
                                              <span class="package-radio-design"></span>
                                              <span class="payment-option-label">
                                                                        <afterpay-placement data-locale="en_US" data-currency="AUD" data-amount="44.00"></afterpay-placement>
                                                                    </span>
                                            </label>
                                          </div>
                                        </div>-->
                            <div v-if="payment_method_type === 'cardPayment'" class="row mt-1">
                                <div class="col-12 ">
                                    <div class="form-group mb-2">
                                        <label for="first-name-icon">Cardholder name</label>
                                        <div class="position-relative has-icon-left">
                                            <input v-model="cardName" type="text" id="first-name-icon" class="text-capitalize form-control" name="fname-icon" placeholder="Full name as displayed on card">
                                            <div class="form-control-position">
                                                <i class='bx bx-user'></i>
                                            </div>
                                        </div>
                                        <div v-if="cardTokenBackendErrors.card_name !== undefined && cardTokenBackendErrors.card_name.length > 0 " class="text-danger">
                                            <p class="mb-0" v-for="(error,index) in cardTokenBackendErrors.card_name" :key="index">
                                                {{ error }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 ">
                                    <div class="form-group mb-2">
                                        <label for="email-id-icon">Card number</label>
                                        <div class="position-relative has-icon-left">
                                            <input v-model="cardNumber" type="text" id="email-id-icon" class="form-control" name="email-id-icon" placeholder="Enter your card number">
                                            <div class="form-control-position">
                                                <i class='bx bx-credit-card-alt'></i>
                                            </div>
                                        </div>
                                        <!-- backend error msg -->
                                        <div v-if="cardTokenBackendErrors.card_number !== undefined && cardTokenBackendErrors.card_number.length > 0 " class="text-danger">
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
                                        <div v-if="cardTokenBackendErrors.card_expire_month !== undefined && cardTokenBackendErrors.card_expire_month.length > 0 " class="text-danger">
                                            <p class="mb-0" v-for="(error,index) in cardTokenBackendErrors.card_expire_month" :key="index"> {{ error }}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="password-icon">CVV</label>
                                        <div class="position-relative has-icon-left">
                                            <input maxlength="4" ref="cvvInput" v-model="cardCvc" type="text" id="password-icon" class="form-control" name="contact-icon" placeholder="CVV">
                                            <div class="form-control-position">
                                                <i class='bx bx-lock-alt'></i>
                                            </div>
                                        </div>
                                        <!-- backend error msg -->
                                        <div v-if="cardTokenBackendErrors.card_cvc !== undefined && cardTokenBackendErrors.card_cvc.length > 0 " class="text-danger">
                                            <p class="mb-0" v-for="(error,index) in cardTokenBackendErrors.card_cvc" :key="index">
                                                {{ error }}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <!-- <div class="custom-control custom-radio d-flex align-items-center">
                        <input v-model="payment_method_type" value="cashPayment" type="radio" class="custom-control-input" name="customRadio" id="CashOnDelivery">
                        <label class="custom-control-label text-bold-400" for="CashOnDelivery">Cash Payment</label>
                    </div>
                    <div class="custom-control custom-radio d-flex align-items-center">
                        <input v-model="payment_method_type" value="eftPayment" type="radio" class="custom-control-input" name="customRadio" id="eftPayment">
                        <label class="custom-control-label text-bold-400" for="eftPayment">EFT Payment</label>
                    </div>
                    <div v-if="payment_method_type === 'eftPayment'">
                        <div class="row py-1">
                            <div class="col-12 col-md-12 align-self-center"><input placeholder="Enter reference" v-model="eft_reference" type="text" class="w-100 appointment-input-field"></div>
                        </div>

                        <div v-if="errorBag.eftReference.length > 0" class="text-left">
                            <p class="text-danger mb-0 font-medium-1" v-for="(error, index) in errorBag.eftReference" :key="index">
                                {{ error }}</p>
                        </div>
                    </div> -->
                        </div>
                        <!--                      end payment method type-->
                        <!--                  <div class="row mt-1">
                        <div class="col-md-12 form-check text-left">
                          <div class="custom-control custom-checkbox">
                            <input v-model="term_condition" type="checkbox" class="custom-control-input"
                                   name="customCheck"
                                   id="customCheck1">
                            <label class="custom-control-label" for="customCheck1">I have read and agreed to our
                              <a class="text-danger style-none" href="/">terms &amp; condition</a></label>
                          </div>

                        </div>
                      </div>-->
                        <div class="py-2 mt-3 text-end">
                            <button class="btn btn-block text-uppercase blue-fill-btn" :disabled="payment_method_type ===''" @click="createOrderHandler">Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <DiscountDetailsModal :preOrderResponse="{...preOrderResponse}" />
        <SurchargeInfoModal :surcharges="surcharge" />
        <AvailableCouponsModal modal-name="availableCouponsModal" @emitApplyCoupon="applyCouponEmitHandler" />
        <UserAddressCreateOnlyModal :model-primary-address-id="customer.address_id" :user-id="customer.user_id" :business-status="customer.type==='Business'" modal-name="userAddressCreate" @emitUserAddress="userAddedAddressData" />
        <!-- <announcement-modal modal-name="showOrderNo" v-on:confirmActionModel="onConfirmActionModal"
                              model-name="order">
            <template v-slot:announcement-text>Order has been placed successfully</template>
            <template v-slot:announcement-reference>{{ order.order_no }}</template>
          </announcement-modal> -->
        <div class="" data-bs-toggle="modal" data-bs-target="#showOrderNo"></div>
        <UserUpdateModal :user-id="customer.user_id" modal-usages-for="user" modal-name="userUpdateModal" :user-data="userData" @updatedUserData="onUpdatedUserData" />
    </section>
</div>
</template>

<script>
import Loader from '~/mixins/Loader';
import ShowToastMessage from '~/mixins/ShowToastMessage';

import DiscountDetailsModal from "./includes/DiscountDetailsModal";
import SurchargeInfoModal from "./includes/SurchargeInfoModal";
import {
    mapActions,
    mapGetters
} from 'vuex'
// import AnnouncementModal from "./includes/AnnouncementModal";
import AvailableCouponsModal from "./includes/AvailableCouponsModal";
import UserAddressCreateOnlyModal from "./includes/UserAddressCreateOnlyModal";
import UserUpdateModal from "./includes/UserUpdateModal"

export default {
    components: {

        DiscountDetailsModal,
        SurchargeInfoModal,
        // AnnouncementModal,
        AvailableCouponsModal,
        UserAddressCreateOnlyModal,
        UserUpdateModal,
    },
    mixins: [ShowToastMessage, Loader],
    name: "OrderCheckout",
    layout: 'dashboard-layout',
    data() {
        return {
            sameBillingShippingAddressStatus: true,
            shippingDetails: {
                name: '',
                email: '',
                phone: '',
                address: {
                    userId: '',
                    street: '',
                    suburb: '',
                    state: '',
                    postCode: '',
                    country: '',
                    business: {
                        id: '',
                        name: '',
                    }
                },

            },
            term_condition: false,
            eft_reference: '',
            order_note: '',
            delivery_date: '',
            applyCoupon: false,
            applyCredit: false,
            paymentType: '',
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
            /* preStoreOrderData: {
               street: '',
               suburb: '',
               state: '',
               post_code: '',
               country: '',
               date: '',
               time: '',
               user_id: '',
               coupon_code: '',
               credited_payment_discount_amount: '',
               applied_discount_amount: '',
               applied_discount_type: '',
               item_price: 0,
             },*/
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
                    coupon_code: '',
                    coupon_id: ''
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
                address: {},
                address_id: '',
                user_id: '',
                type: ''
            },
            paidAmount: {},
            cardTokenBackendErrors: {},
            // cardInformation
            cardName: '',
            cardNumber: '',
            cardExpiryDate: '',
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
            paymentId: '',
            eftReference: '',
            getSettingsParams: {
                type: ['payment'],
                key: ['payment_card_surcharge', 'payment_afterpay_payment_status', 'payment_card_payment_status'],
            },
            paidInfo: {},
            billingAddressId: '',
            shippingAddressId: '',
            orderSuccessDebounce: '',
            order_date: '',
            userData: {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
            },
        }
    },
    head() {
        return {

            script: [{
                    hid: 'afterPayGeneralLibrary',
                    src: 'https://js.afterpay.com/afterpay-1.x.js',
                    defer: true
                },
                {
                    hid: 'afterPayProductionLibrary',
                    src: `${process.env.after_pay_js_production_library}`,
                    defer: true
                },
            ]
        }
    },

    computed: {
        ...mapGetters({
            // previousRoute: 'previousRoute',
            authUser: 'login/authUser',
            order: 'orders/order',
            payment: 'payments/payment',
            coupons: 'coupons/coupons',
            checkout: 'afterpayPaymentGateways/checkout',
            minimumAmount: 'afterpayPaymentGateways/minimumAmount',
            maximumAmount: 'afterpayPaymentGateways/maximumAmount',
            afterpayPaymentGateway: 'afterpayPaymentGateways/afterpayPaymentGateway',

            // settings payment
            settingPaymentAfterPayPaymentStatus: 'settings/settingPaymentAfterPayPaymentStatus',
            settingPaymentCardPaymentStatus: 'settings/settingPaymentCardPaymentStatus',

            // customer
            authCustomer: 'login/authCustomer',
            customer: 'customers/customer',
        }),

        billingAddress() {
            let businessName = this.customer.address && this.customer.address.business && this.customer.address.business.name ? this.customer.address.business.name : '';
            let addressStreet = this.customer.address.street;
            let addressSuburb = this.customer.address.suburb;
            let addressState = this.customer.address.state ? this.customer.address.state.toUpperCase() : ''
            let addressPostCode = this.customer.address.post_code;
            let addressCountry = this.customer.address.country;

            return this.customer.type === 'Business' ? `${businessName} (${addressStreet}, ${addressSuburb} ${addressState} ${addressPostCode}, ${addressCountry})` : `${addressStreet}, ${addressSuburb} ${addressState} ${addressPostCode}, ${addressCountry}`
        },

        shippingAddress() {
            let businessName = this.shippingDetails.address ?.business ?.name ?? ''
            let addressStreet = this.shippingDetails.address.street;
            let addressSuburb = this.shippingDetails.address.suburb;
            let addressState = this.shippingDetails.address.state.toUpperCase();
            let addressPostCode = this.shippingDetails.address.postCode;
            let addressCountry = this.shippingDetails.address.country;

            if (this.sameBillingShippingAddressStatus !== true) {
                return addressStreet ? this.customer.type === 'Business' ? `${businessName} (${addressStreet}, ${addressSuburb} ${addressState} ${addressPostCode}, ${addressCountry})` : `${addressStreet}, ${addressSuburb} ${addressState} ${addressPostCode}, ${addressCountry}` : '';
            }

            return this.billingAddress;
        },
        getTotalPrice() {
            return this.cartsData.reduce((acc, cur) => acc + Number((cur.product_price.sub_total) ?? 0), 0)
        },
        surcharge() {
            return {
                "status": 1,
                "details": [{
                        "name": "Visa",
                        "rate": 0.05
                    },
                    {
                        "name": "MasterCard",
                        "rate": 0.05
                    },
                    {
                        "name": "American Express",
                        "rate": 0.05
                    }
                ]
            }
        },

        isUserValidForAfterPay() {
            return Boolean(this.customer.email) && Boolean(this.customer.phone_number)
        }
    },

    watch: {
        customer(customer) {
            this.shippingDetails = {
                name: customer.full_name,
                email: customer.email,
                phone: customer.phone_number,
                address: {
                    userId: customer.user_id,
                    street: customer.address.street,
                    suburb: customer.address.suburb,
                    state: customer.address.state,
                    postCode: customer.address.post_code,
                    country: customer.address.country,
                    business: {
                        id: customer.address ?.business ?.id,
                        name: customer.address ?.business ?.name,
                    }
                }
            }
            // set billing, shipping address id
            this.billingAddressId = customer.address_id;
            this.shippingAddressId = customer.address_id;
            let fullName = this.getFirstAndLastNameFromFullName(customer.full_name);
            this.userData = {
                firstName: fullName[0],
                lastName: fullName[1],
                email: customer.email,
                phoneNumber: customer.phone_number
            }
        },

        sameBillingShippingAddressStatus(value) {
            this.shippingDetails.name = (value === true) ? this.customer.full_name : '';
            this.shippingDetails.email = (value === true) ? this.customer.email : '';
            this.shippingDetails.phone = (value === true) ? this.customer.phone_number : '';
        },
        applied_discount_type(discountValue, jku) {

            this.getDiscount(discountValue)
        },
        applied_discount_amount() {
            this.getDiscount()
        },
        payment_type(paymentType) {
            this.getPaidAmount(paymentType)
        },
        paid_amount() {
            this.getPaidAmount()
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
            getAvailableValidCoupons: 'coupons/getAvailableValidCoupons',

            preStoreOrderData: 'orders/preStoreOrderData',
            cardTokenCreate: 'paymentGateways/cardTokenCreate',
            authorizationCreateByToken: 'paymentGateways/authorizationCreateByToken',
            paymentCreateByToken: 'paymentGateways/paymentCreateByToken',
            paymentCreate: 'paymentGateways/paymentCreate',

            postPayment: 'payments/postPayment',
            postOrder: 'orders/postOrder',
            postOrderNote: 'orderNotes/postOrderNote',
            postCardPayment: 'cardPayments/postCardPayment',

            // after pay payment gateway
            tryPing: 'afterpayPaymentGateways/tryPing',
            getConfiguration: 'afterpayPaymentGateways/getConfiguration',
            createCheckout: 'afterpayPaymentGateways/createCheckout',
            captureDeferredPayment: 'afterpayPaymentGateways/captureDeferredPayment',
            authDeferredPayment: 'afterpayPaymentGateways/authDeferredPayment',

            updatePaymentByOrderId: 'afterpayPaymentGateways/updatePaymentByOrderId',

            // afterpay payment
            postAfterpayPayment: 'afterpayPayments/postAfterpayPayment',

            // coupon usuage
            postCouponUsage: 'couponUsages/postCouponUsage',

            // order creation notify email
            postOrderCreationNotifyEmail: 'orders/postOrderCreationNotifyEmail',

            // customer
            getCustomer: 'customers/getCustomer',


            // payment creation notify email
            postPaymentCreationNotifyEmail: 'payments/postPaymentCreationNotifyEmail',

        }),

        orderPaymentEmailNotify(data) {

            this.postPaymentCreationNotifyEmail(data);
        },

        createCouponUsage() {
            const data = {
                coupon_id: this.preOrderResponse.coupon_discount.coupon_id,
                user_id: this.customer.user_id,
                reference: this.order.order_no,
                discount_amount: this.preOrderResponse.coupon_discount.amount,
            }
            const response = this.postCouponUsage(data);
            if (response.message) {
                this.showToastMessage(response);
            }
        },
        async getSettingList(settingParams) {
            this.loader(true);
            await this.getSettings(settingParams);
            this.loader(false);
        },

        onUpdatedUserData(updateData) {
            this.customer.email = updateData.userData.email;
            this.customer.phone_number = updateData.userData.phoneNumber;
        },

        getFirstAndLastNameFromFullName(fullName) {
            let [first, ...last] = fullName.split(' ');
            let lastName = last.join(' ');
            return [first, lastName];
        },

        generateItemsForAfterapayFromCartData() {
            return this.cartsData.map((singleItem) => {
                return ({
                    name: singleItem.name + '(' + singleItem.product_price.condition_name + ')',
                    sku: singleItem.code,
                    quantity: singleItem.product_price.quantity.toString(),
                    imageUrl: singleItem.image,
                    price: {
                        amount: parseFloat(singleItem.product_price.amount / 100).toFixed(2),
                        currency: "AUD"
                    },
                    categories: [
                        [singleItem.productCategory.name]
                    ]
                });
            });
        },

        applyCouponEmitHandler(response) {
            document.querySelector('[data-bs-target="#availableCouponsModal"]').click();
            this.applyCoupon = true;
            this.coupon_code = response.couponCode;

            this.preStoreOrder();
        },

        async getAvailableValidCouponsHandler() {

            this.loader(true);
            const data = {
                activation_amount: Number(this.preOrderResponse.grand_total),
                user_id: this.customer.user_id,
                apply_on: [0, 1],
                internal_coupon: 0,
                website_visibility: null,
                post_code: this.customer?.address?.post_code ?? null,
            }
            const response = await this.getAvailableValidCoupons(data);
            if (response.message) {
                this.showToastMessage(response);
            }
            this.loader(false);

        },

        // async onConfirmActionModal(modalAction) {
        //   if (modalAction.status === true) {
        //     clearTimeout(this.orderSuccessDebounce);
        //     document.querySelector('[data-bs-target="#showOrderNo"]').click();
        //     await this.$router.push({
        //       name: 'customerDashboard'
        //     });
        //     return;
        //   }
        // },

        userAddedAddressData(addressData) {
            this.shippingDetails.address.business.id = addressData.addressData.business && addressData.addressData.business.id ? addressData.addressData.business.id : null;
            this.shippingDetails.address.business.name = addressData.addressData.business && addressData.addressData.business.name ? addressData.addressData.business.name : '';
            this.shippingDetails.address.street = addressData.addressData.street ?? '';
            this.shippingDetails.address.suburb = addressData.addressData.suburb ?? '';
            this.shippingDetails.address.state = addressData.addressData.state ?? '';
            this.shippingDetails.address.postCode = addressData.addressData.postCode ?? '';
            this.shippingDetails.address.country = addressData.addressData.country ?? '';
            // set billing address id
            this.shippingAddressId = addressData.addressData.id;
            this.preStoreOrder();
        },
        // calculate surcharge
        getSurcharge(surchargeObj, cardType, amount) {
            if (surchargeObj.status === 1) {
                let cardRate = surchargeObj.details.find((cardItem) => {
                        return cardItem.name.toLowerCase() === cardType.toLowerCase()
                    }).rate,
                    surchargeAmount = amount * cardRate,
                    totalAmount = amount + surchargeAmount;
                return {
                    surcharge_amount: surchargeAmount,
                    total_amount: totalAmount
                }
            }
        },
        applyCustomDiscount() {
            this.getDiscount()
        },
        getDiscount(discountValue = 0) {
            let discounted_amount, total_price, amount
            total_price = this.getTotalPrice;
            if (Number(discountValue) === 0) {
                discounted_amount = Number(this.discount_amount) ?? 0
            } else {
                discounted_amount = (total_price * (Number(discountValue) / 100)).toFixed(2)
            }
            amount = total_price - discounted_amount;
            this.discountObj = {
                total_price: total_price,
                percentage: discountValue,
                discounted_amount: discounted_amount,
                amount: amount
            }
        },
        // calculate amount by payment type like: half,full,quarter & other
        async getPaidAmount(paymentType = 'other') {

            let paidAmount, restAmount, totalAmount;

            totalAmount = this.preOrderResponse.grand_total;
            if (paymentType === 'other') {
                paidAmount = Number(this.paid_amount) * 100 ?? 0
                if (paidAmount > totalAmount) {
                    paidAmount = totalAmount;
                    this.paid_amount = parseFloat(totalAmount / 100).toFixed(2)
                    //this.errorBag.paymentAmount = [];
                    this.errorBag.paymentAmount.push('Exceed total payable amount')
                }
            } else {
                paidAmount = parseInt(totalAmount * (Number(paymentType) / 100))
            }
            restAmount = totalAmount - paidAmount;
            this.paidInfo = {
                paymentType: paymentType,
                paidAmount: paidAmount,
                totalAmount: totalAmount,
                restAmount: restAmount
            }

        },
        // check pre-store order data
        async preStoreOrder() {

            let street = this.sameBillingShippingAddressStatus ? this.customer.address.street : this.shippingDetails.address.street;
            let suburb = this.sameBillingShippingAddressStatus ? this.customer.address.suburb : this.shippingDetails.address.suburb;
            let post_code = this.sameBillingShippingAddressStatus ? this.customer.address.post_code : this.shippingDetails.address.postCode;
            let state = this.sameBillingShippingAddressStatus ? this.customer.address.state : this.shippingDetails.address.state;
            let country = this.sameBillingShippingAddressStatus ? this.customer.address.country : this.shippingDetails.address.country;
            let user_id = this.sameBillingShippingAddressStatus ? this.customer.user_id : this.customer.user_id;

            this.loader(true);
            const currentDate = new Date();
            this.order_date = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);

            const dataObj = {
                street: street,
                suburb: suburb,
                post_code: post_code,
                country: country,
                state: state,
                date: currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2), //new Date().toLocaleDateString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}),

                time: ('0' + currentDate.getHours()).slice(-2) + ":" + ('0' + currentDate.getMinutes()).slice(-2), //new Date().toLocaleTimeString('en-GB', {hour12: false, hour: '2-digit', minute: '2-digit'}),
                // time: '19:00',
                user_id: user_id,
                coupon_code: this.applyCoupon ? this.coupon_code : '',
                credited_payment_discount_amount: this.applyCredit ? this.credit_code * 100 : '',
                applied_discount_amount: this.discount_type !== 'any' ? this.discount_type : ((this.discount_amount) * 100),
                applied_discount_type: this.discount_type !== 'any' ? 0 : 1,
                item_price: this.getTotalPrice,
            };

            await this.preStoreOrderData(dataObj).then((response) => {

                if (response && response.status === 200) {
                    this.loader(false);
                    if (response.data.status === true) {

                        this.preOrderResponse.status = response.data.status;
                        this.preOrderResponse.message = response.data.message;
                        // this.preOrderResponse.service_price = response.data.service_price;
                        this.preOrderResponse.remaining_credited_payment = response.data.remaining_credited_payment;

                        /*   this.preOrderResponse.same_day_surcharge.applied_status = response.data.same_day_surcharge.applied_status;
                           this.preOrderResponse.same_day_surcharge.amount = response.data.same_day_surcharge.amount;

                           this.preOrderResponse.timebase_surcharge.applied_status = response.data.timebase_surcharge.applied_status;
                           this.preOrderResponse.timebase_surcharge.amount = response.data.timebase_surcharge.amount;*/

                        this.preOrderResponse.order_delivery_charge.applied_status = response.data.order_delivery_charge.applied_status;
                        this.preOrderResponse.order_delivery_charge.distance_value = response.data.order_delivery_charge.distance_value;
                        this.preOrderResponse.order_delivery_charge.distance_value_in_km = response.data.order_delivery_charge.distance_value_in_km;
                        this.preOrderResponse.order_delivery_charge.amount = response.data.order_delivery_charge.amount;

                        /*  this.preOrderResponse.holiday_surcharge.applied_status = response.data.holiday_surcharge.applied_status;
                          this.preOrderResponse.holiday_surcharge.amount = response.data.holiday_surcharge.amount;

                          this.preOrderResponse.weekend_surcharge.amount = response.data.weekend_surcharge.amount;
                          this.preOrderResponse.weekend_surcharge.applied_status = response.data.weekend_surcharge.applied_status;

                          this.preOrderResponse.total_surcharge_amount = response.data.total_surcharge_amount;*/
                        this.preOrderResponse.subtotal_amount = response.data.subtotal_amount;

                        this.preOrderResponse.applied_discount.applied_status = response.data.applied_discount.applied_status;
                        this.preOrderResponse.applied_discount.amount = response.data.applied_discount.amount;

                        this.preOrderResponse.coupon_discount.amount = response.data.coupon_discount.amount;
                        this.preOrderResponse.coupon_discount.applied_status = response.data.coupon_discount.applied_status;
                        this.preOrderResponse.coupon_discount.validation_status = response.data.coupon_discount.validation_status;
                        this.preOrderResponse.coupon_discount.message = response.data.coupon_discount.message;
                        this.preOrderResponse.coupon_discount.apply_on = response.data.coupon_discount.apply_on;
                        this.preOrderResponse.coupon_discount.coupon_code = response.data.coupon_discount.coupon_code;
                        this.preOrderResponse.coupon_discount.coupon_id = response.data.coupon_discount.coupon_id;

                        this.preOrderResponse.credited_payment_discount.applied_status = response.data.credited_payment_discount.applied_status;
                        this.preOrderResponse.credited_payment_discount.validation_status = response.data.credited_payment_discount.validation_status;
                        this.preOrderResponse.credited_payment_discount.amount = response.data.credited_payment_discount.amount;
                        this.preOrderResponse.credited_payment_discount.message = response.data.credited_payment_discount.message;

                        this.preOrderResponse.total_discount_amount = response.data.total_discount_amount;

                        this.preOrderResponse.gst_charge.amount = response.data.gst_charge.amount;
                        this.preOrderResponse.gst_charge.applied_status = response.data.gst_charge.applied_status;

                        this.preOrderResponse.grand_total = response.data.grand_total ?? 0;
                        this.preOrderResponse.shipping_address_status = this.sameBillingShippingAddressStatus;
                        this.preOrderResponse.shipping_address = this.shippingDetails;
                        this.getAvailableValidCouponsHandler()

                    } else {
                        this.showToastMessage({
                            message: response.data.message,
                            type: "error"
                        });
                    }
                } else {
                    this.showToastMessage({
                        message: response.message,
                        type: "error"
                    });
                    this.loader(false);
                }
            });

        },
        // afterpay gateway step 1
        async afterPayServerStatusChecker() {
            this.loader(true);
            const response = await this.tryPing();
            this.loader(false);
            if (response.status === 200 && response.data === 'Success') {
                return true;
            }
            if (response.message) {
                this.showToastMessage(response.message);
            }
            return false;
        },

        // afterpay gateway step 2
        async afterPayPaymentConfiguration() {

            if (this.minimumAmount.amount && this.maximumAmount.amount && (this.preOrderResponse.grand_total / 100) >= this.minimumAmount.amount && (this.preOrderResponse.grand_total / 100) <= this.maximumAmount.amount) {
                return true;
            }
            this.loader(true);
            const response = await this.getConfiguration();
            this.loader(false);

            if (response.status === 200) {
                if ((this.preOrderResponse.grand_total / 100) >= this.minimumAmount.amount && (this.preOrderResponse.grand_total / 100) <= this.maximumAmount.amount) {
                    return true;
                }
                this.showToastMessage({
                    type: 'error',
                    message: `For afterpay payment minimum amount is ${response.data.minimumAmount.amount} and maximum amount is ${response.data.maximumAmount.amount}`
                });
                return false;
            }
            if (response.message) {
                this.showToastMessage(response.message);
            }
            return false;
        },

        // aferpay gateway step 3
        async afterPayPaymentCheckout() {
            this.loader(true);
            const data = {
                amount: {
                    amount: (this.preOrderResponse.grand_total / 100).toString(),
                    currency: "AUD"
                },
                consumer: {
                    givenNames: this.getFirstAndLastNameFromFullName(this.customer.full_name)[0].toString(),
                    surname: this.getFirstAndLastNameFromFullName(this.customer.full_name)[1].toString(),
                    email: this.customer.email,
                    phoneNumber: this.customer.phone_number
                },

                billing: {
                    name: this.customer.full_name,
                    line1: this.customer.address.street,
                    area1: this.customer.address.suburb,
                    region: this.customer.address.state,
                    postcode: this.customer.address.post_code,
                    countryCode: "AU"
                },

                shipping: {
                    name: this.shippingDetails.name,
                    line1: this.shippingDetails.address.street,
                    area1: this.shippingDetails.address.suburb,
                    region: this.shippingDetails.address.state,
                    postcode: this.shippingDetails.address.postCode,
                    countryCode: "AU"
                },

                items: this.generateItemsForAfterapayFromCartData(),

                // merchant: {
                //   redirectConfirmUrl: 'http://geekswebsite.test.wsiddiquesolutions.com/customers/dashboard',
                //   redirectCancelUrl: 'http://geekswebsite.test.wsiddiquesolutions.com'
                // },
                merchant: {
                    redirectConfirmUrl: 'https://geekscrs.com.au/customers/dashboard',
                    redirectCancelUrl: 'https://geekscrs.com.au'
                },
                // merchant: {
                //   redirectConfirmUrl: 'http://localhost:8081/customers/dashboard',
                //   redirectCancelUrl: 'http://localhost:8081'
                // },

                // merchant: {
                //   redirectConfirmUrl: `${process.env.VUE_APP_BASE_URL}${this.$route.fullPath}`,
                //   redirectCancelUrl: `${process.env.VUE_APP_BASE_URL}${this.$route.fullPath}`
                // },
                // merchantReference: '',
                taxAmount: {
                    amount: (this.preOrderResponse.gst_charge.applied_status ? this.preOrderResponse.gst_charge.amount / 100 : 0).toString(),
                    currency: "AUD"
                },
                shippingAmount: {
                    "amount": "0.00",
                    "currency": "AUD"
                }
            };
            if (this.preOrderResponse.coupon_discount.applied_status) {
                data.discounts = [];
            }
            if (this.preOrderResponse.coupon_discount.applied_status) {
                data.discounts = [...data.discounts];
                data.discounts.push({
                    displayName: `Coupon (${this.preOrderResponse.coupon_discount.coupon_code})`,
                    amount: {
                        amount: (this.preOrderResponse.coupon_discount.amount / 100).toString(),
                        currency: "AUD"
                    }
                });
            }

            const response = await this.createCheckout(data);
            this.loader(false);
            if (response.status === 201) {
                return true;
            }
            if (response.message) {
                this.showToastMessage(response.message);
            }
            return false;
        },

        // afterpay gateway step 4
        async afterPayAuthDeferred() {
            const data = {
                token: this.checkout.token,
                requestId: this.order.uuid,
                merchantReference: this.order.order_no
            }
            this.loader(true);
            const response = await this.authDeferredPayment(data);
            this.loader(false);
            if (response.message) {
                this.showToastMessage(response);
            }
            if (this.afterpayPaymentGateway.status !== "APPROVED") {
                this.showToastMessage({
                    type: 'error',
                    message: this.afterpayPaymentGateway.status + ' : Payment is declined by the Afterpay'
                });
            }
            if (this.afterpayPaymentGateway.status === "APPROVED") {
                this.showToastMessage({
                    type: 'success',
                    message: this.afterpayPaymentGateway.status + ' : Payment is approved by the Afterpay'
                });
            }
            return response.status === 201 && this.afterpayPaymentGateway.status === "APPROVED";
        },

        // afterpay gateway step 5
        afterPayUpdatePaymentByOrderId() {
            const data = {
                id: this.afterpayPaymentGateway.id,
                data: {
                    merchantReference: this.order.order_no,
                }

            }
            const response = this.updatePaymentByOrderId(data);

            if (response.message) {
                this.showToastMessage(response);
            }
        },

        // afterpay payment table api call
        async createAfterPayPayment() {
            const data = {
                payment_id: this.payment.id,
                paid_by: this.customer.user_id,
                amount: this.preOrderResponse.grand_total,
                token: this.checkout.token,
                payment_gateway_id: this.afterpayPaymentGateway.id,
                status: 0,

            }
            this.loader(true);
            const response = await this.postAfterpayPayment(data);
            if (response.message) {
                this.showToastMessage(response);
            }
            this.loader(false);
            return response.status === 201
        },
        // afterpay main api call
        async createOrderByAfterPayPayment() {
            const isAfterPayServerActive = await this.afterPayServerStatusChecker();
            if (isAfterPayServerActive) {
                const isPaymentConfigurationSuccessful = await this.afterPayPaymentConfiguration();
                if (isPaymentConfigurationSuccessful) {
                    const isCheckoutSuccess = await this.afterPayPaymentCheckout();
                    if (isCheckoutSuccess) {
                        window.AfterPay.initialize({
                            countryCode: "AU"
                        });

                        window.AfterPay.open();

                        window.AfterPay.onComplete = async (event) => {
                            if (event.data.status === "SUCCESS") {
                                const isOrderCreate = await this.createOrder();
                                if (isOrderCreate) {
                                    const isAfterPayAuthDeferred = await this.afterPayAuthDeferred();

                                    if (isAfterPayAuthDeferred) {
                                        const isPaymentCreate = await this.createPayment();
                                        if (isPaymentCreate) {
                                            const isAfterPayPaymentCreate = await this.createAfterPayPayment();
                                            if (isAfterPayPaymentCreate) {
                                                await this.afterPayUpdatePaymentByOrderId();
                                                this.orderPaymentEmailNotify({

                                                    id: this.paymentId,
                                                    params: {
                                                        notify_customer: 1,
                                                        notify_internal_user: 1
                                                    }
                                                });
                                                this.orderEmailNotify({
                                                    id: this.order.id,
                                                    params: {
                                                        notify_customer: 1,
                                                        notify_internal_user: 1
                                                    }

                                                });
                                                if (this.order_note !== '' && this.order.id !== '') {
                                                    await this.createOrderNotes();
                                                }
                                                this.showToastMessage({
                                                    message: 'Payment successful',
                                                    type: 'success'
                                                });
                                                this.preOrderResponse.coupon_discount.validation_status === true && (this.createCouponUsage());
                                                this.showToastMessage({
                                                    message: 'Order created Successfully',
                                                    type: 'success'
                                                });
                                                await this.$router.push({
                                                    name: 'dashboard-orders-Order-Success',
                                                    params: {
                                                        routeName: this.$route.name,
                                                        reference: this.order.order_no
                                                    }
                                                });

                                                // document.querySelector('[data-bs-target="#showOrderNo"]').click();
                                                // clearTimeout(this.orderSuccessDebounce);
                                                // this.orderSuccessDebounce = setTimeout(async () => {
                                                //   await this.onConfirmActionModal({
                                                //     status: true
                                                //   });
                                                // }, 10000);
                                            }
                                        }
                                    }
                                }

                            } else {
                                // The consumer cancelled the payment or closed the popup window.
                                this.showToastMessage({
                                    type: 'error',
                                    message: event.data.status
                                })
                            }
                        }

                        window.AfterPay.transfer({
                            token: this.checkout.token
                        });

                    }
                }
            }
        },

        async createOrderByCardPayment() {
            const isTokenCreated = await this.tokenCreate();
            if (isTokenCreated === true) {
                const isAuthorized = await this.createAuthorizationByToken();
                if (isAuthorized) {
                    const isOrderCreated = await this.createOrder();
                    if (isOrderCreated) {
                        const isPaymentCreated = await this.createPayment();
                        if (isPaymentCreated) {
                            const isCardPaymentDone = await this.createCardPayment();
                            if (isCardPaymentDone) {
                                if (this.order_note !== '' && this.order.id !== '') {
                                    await this.createOrderNotes();
                                }
                                this.orderPaymentEmailNotify({

                                    id: this.paymentId,
                                    params: {
                                        notify_customer: 1,
                                        notify_internal_user: 1
                                    }
                                });
                                this.orderEmailNotify({
                                    id: this.order.id,
                                    params: {
                                        notify_customer: 1,
                                        notify_internal_user: 1
                                    }

                                });
                                this.preOrderResponse.coupon_discount.validation_status === true && (this.createCouponUsage());
                                this.showToastMessage({
                                    message: 'Order created Successfully',
                                    type: 'success'
                                });

                                await this.$router.push({
                                    name: 'dashboard-orders-Order-Success',
                                    params: {
                                        routeName: this.$route.name,
                                        reference: this.order.order_no
                                    }
                                });

                                // document.querySelector('[data-bs-target="#showOrderNo"]').click();
                                // clearTimeout(this.orderSuccessDebounce);
                                // this.orderSuccessDebounce = setTimeout(async () => {
                                //   await this.onConfirmActionModal({
                                //     status: true
                                //   });
                                // }, 10000);
                            }
                        }
                    }
                }
            }
        },

        orderEmailNotify(data) {

            this.postOrderCreationNotifyEmail(data);
        },

        // Order process action
        async createOrderHandler() {
            if (this.payment_method_type === 'cardPayment') {
                await this.createOrderByCardPayment();
            }

            if (this.payment_method_type === "afterpayPayment") {
                if (!this.isUserValidForAfterPay) {
                    this.showToastMessage({
                        message: 'Please provide email & phone number',
                        type: 'warning'
                    });
                    return;
                }
                await this.createOrderByAfterPayPayment();
            }

        },

        async applyDiscountHandler() {
            await this.preStoreOrder();
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
            return await this.cardTokenCreate(data).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    this.loader(false);
                    this.cardTokenBackendErrors = {};
                    this.cardTokenResponse.id = response.data.id;
                    this.cardTokenResponse.used = response.data.used;
                    this.cardTokenResponse.card = response.data.card;
                    if (response.data.used === false) {
                        return true;
                    }

                } else {
                    this.cardTokenResponse.id = '';
                    this.cardTokenResponse.used = '';
                    this.cardTokenResponse.card = {};
                    this.loader(false);
                    this.cardTokenBackendErrors = response.errors;
                }
                if (response.message) {
                    this.showToastMessage(response);
                }
                return false;

            });

        },
        //* step 3  create & get order id,order_no
        async createOrder() {
            // add cart data in pre order response object
            this.preOrderResponse.cart_data = this.cartsData;
            // order processing form admin panel determined whether order is created form admin panel or customer panel
            this.preOrderResponse.creator = {
                user_id: this.customer.user_id,
                panel: 3
            };
            /* panel 3: for customer web app */
            const data = {
                user_id: this.customer.user_id,
                order_date: this.order_date,
                // delivery_date: this.delivery_date,
                status: 0, // 0 for pending
                shipping_address_id: this.shippingAddressId,
                billing_address_id: this.billingAddressId,
                details: JSON.stringify(this.preOrderResponse), // json pre store data
            }
            this.loader(true);
            const response = await this.postOrder(data);
            if (response.status === 200 || response.status === 201) {
                this.loader(false);
                /*this.showToastMessage({
                  message: 'Order created',
                  type: 'success'
                });*/
                return true;
            }
            if (response.message) {
                this.showToastMessage(response);
            }
            return false;

        },
        //step 3 create note -> used user Id,user_type=0, type=0, step 2: order id,
        async createOrderNotes() {

            const data = {
                user_id: this.customer.user_id,
                order_id: this.order.id,
                user_type: 0, // 0 for customer
                type: 0, // setting table
                description: this.order_note,
                customer_can_view: 1
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
            return false;

        },
        // step 2 -> used step 1: token & step 2: order_no, get gateway Id
        async createAuthorizationByToken() {
            let data = {
                currency: 'AUD',
                reference: 'order-admin-panel',
                amount: this.preOrderResponse.grand_total,
                description: `${this.customer.full_name} paid $ ${this.preOrderResponse.grand_total} from customer web panel (customer dashboard)`,
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
                    this.showToastMessage({
                        type: 'error',
                        message: 'Card  Declined'
                    })
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
                panel: 1,
            }
            this.loader(true);

            const response = await this.postPayment(data);
            if (response.status === 200 || response.status === 201) {
                this.paymentId = this.payment.id
                return true;
            } else {
                this.loader(false);
            }
            if (response.message) {
                this.showToastMessage(response);
            }

        },
        // step 6 -> used step 1:card type, step 3: gateway Id, step 4: payment Id
        async createCardPayment() {
            const data = {
                payment_id: this.paymentId,
                paid_by: this.customer.user_id,
                amount: this.preOrderResponse.grand_total,
                card_type: this.cardTokenResponse.card.type,
                card_surcharge: 0,
                payment_gateway: 'Simplyfy',
                payment_gateway_id: this.authorizationTokenResponse.id,
                status: 0 // 0 for hold, 1 for paid

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

        },
        // end card payment

        async backToOrderCreate() {

            await this.$router.push({
                name: 'dashboard-orders-create',
                params: {
                    cartList: JSON.stringify(this.cartsData),
                    selectedCustomer: JSON.stringify(this.customer)
                },
            });
        },
        async getCustomerInformation(id) {

            this.loader(true);
            const params = {
                id: id,
                params: {
                    with_relation: ['address'],
                }

            };
            const response = await this.getCustomer(params);
            this.loader(false);
            if (response ?.message) {
                this.showToastMessage(response);
            }

        },
    },
    async mounted() {
        // if order checkout page not come form order create page then redirect
        // if (this.previousRoute.name !== 'customer.order.create') {
        //   await this.$router.push(this.previousRoute);
        //   return;
        // }
        // this.loader(true)
        // let afterPayLibrary = await document.createElement('script')
        // await afterPayLibrary.setAttribute('src', 'https://js.afterpay.com/afterpay-1.x.js')
        // await document.head.appendChild(afterPayLibrary)
        // let afterPaySandbox = await document.createElement('script')
        // await afterPaySandbox.setAttribute('src', 'https://portal.sandbox.afterpay.com/afterpay-async.js')
        // await document.head.appendChild(afterPaySandbox)

        let {
            cartList,
            selectedCustomer
        } = this.$route.params;
        if ((!cartList) || (!selectedCustomer)) {
            await this.$router.push({
                name: 'dashboard-orders-create'
            });
        }
        if (cartList !== undefined && selectedCustomer !== undefined) {
            this.cartsData = await JSON.parse(cartList);
            this.customer = await JSON.parse(selectedCustomer);
        }
        await this.getCustomerInformation(this.authCustomer.id);
        await this.getSettingList(this.getSettingsParams);
        await this.preStoreOrder();
        this.loader(false)
        /*this.userData =  {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          phoneNumber: this.user.phoneNumber,
          dateOfBirth: this.user.dateOfBirth,
        };*/
    },

}
</script>

<style scoped>
.custom-control-label {
    font-size: 13px;
}

.payment-input-field {
    border: 1px solid #c5c5c5;
    border-radius: 5px;
    width: 100%;
    padding: 4px 15px
}

.payment-input-field:focus {
    outline: 0 !important;
}

.payment-input-field:focus {
    border: 1px solid #f26322 !important;
}

.form-control:focus {
    border-color: #f26322 !important;
    box-shadow: none !important;
}

span {
    font-size: 14px;
}
</style>
