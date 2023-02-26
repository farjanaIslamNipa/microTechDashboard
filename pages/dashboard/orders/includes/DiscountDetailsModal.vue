<template>
  <div class="modal fade " id="discountDetailsModal" tabindex="-1" role="dialog" aria-labelledby="discountDetailsModal"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-md modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-brand">
          <h5 class="text-white mb-0 pb-0">Discount Details </h5>
         <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><i
                class="bx bx-x"></i></button>
        </div>
        <div class="modal-body">
          <div class="row" v-if="applied_discount.applied_status">
            <div class="col-7 text-left">
              <p class="text-bold-400">Applied discount:</p>
            </div>
            <div class="col-5 text-right">
              <p>${{ parseFloat(applied_discount.amount / 100).toFixed(2) }} </p>
            </div>
          </div>
          <div class="row" v-if="coupon_discount.applied_status">
            <div class="col-7 text-left">
              <p class="text-bold-400">Coupon Discount:</p>
            </div>
            <div class="col-5 text-right">
              <p class="">${{ parseFloat(coupon_discount.amount / 100).toFixed(2) }}</p>
            </div>
          </div>
          <div class="row" v-if="credited_payment_discount.applied_status">
            <div class="col-7 text-left">
              <p class="text-bold-400">Credited Discount:</p>
            </div>
            <div class="col-5 text-right">
              <p class="">${{ parseFloat(credited_payment_discount.amount / 100).toFixed(2) }}</p>
            </div>
          </div>

          <hr>
          <div class="row">
            <div class="col-7 text-left">
              <p class="text-bold-700">Total Discount:</p>
            </div>
            <div class="col-5 text-right">
              <p class="text-bold-700">${{ parseFloat(total_discount_amount / 100).toFixed(2) }} </p>
            </div>
          </div>

        </div>
          <div class="modal-footer border-0 pt-0">
            <button type="button" class="btn btn-brand" data-bs-dismiss="modal">
              <i class="bx bx-x d-block d-sm-none"></i>
              <span class="d-none d-sm-block ">Close</span>
            </button>

          </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DiscountDetailsModal",
  props: ['preOrderResponse'],
  data() {
    return {

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
    }
  },
  watch: {
    preOrderResponse(discountData) {
  

      this.applied_discount.applied_status = discountData.applied_discount.applied_status;
      this.applied_discount.amount = discountData.applied_discount.amount;

      this.coupon_discount.amount = discountData.coupon_discount.amount;
      this.coupon_discount.applied_status = discountData.coupon_discount.applied_status;
      this.coupon_discount.validation_status = discountData.coupon_discount.validation_status;
      this.coupon_discount.message = discountData.coupon_discount.message;
      this.coupon_discount.apply_on = discountData.coupon_discount.apply_on;

      this.credited_payment_discount.applied_status = discountData.credited_payment_discount.applied_status;
      this.credited_payment_discount.validation_status = discountData.credited_payment_discount.validation_status;
      this.credited_payment_discount.amount = discountData.credited_payment_discount.amount;
      this.credited_payment_discount.message = discountData.credited_payment_discount.message;

      this.total_discount_amount = discountData.total_discount_amount;

    }
  },

}
</script>

<style>

</style>
