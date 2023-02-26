<template>
<div class="modal fade " :id="modalName" tabindex="-1" role="dialog" :aria-labelledby="modalName" :aria-hidden="modalName">
    <div class="modal-dialog modal-dialog-scrollable modal-md modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header btn-brand">
                <h5 class="text-white mb-0 pb-0">coupons </h5>

              <button type="button" class="close text-white" data-bs-dismiss="modal" aria-label="Close"><i
                class="bx bx-x text-white"></i></button>
            </div>
            <div class="modal-body">
                 <div class="">
                    <ul class="nav">
                       <li title="Click to apply" v-for="(coupon,index) in coupons" class="couponApply nav-item mr-1" :key="index" @click="applyModal(coupon.code)">{{coupon.code}}</li>
                    </ul>
                </div>

            </div>
              <div class="modal-footer border-0 pt-0">
            <button  type="button" class="btn btn-brand" data-bs-dismiss="modal">
              <i class="bx bx-x d-block d-sm-none"></i>
              <span class="d-none d-sm-block ">Close</span>
            </button>

          </div>

        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: "AvailableCouponsModal",
    emits: ['emitApplyCoupon'],
    props: {
        modalName: {
            type: String,
            default: "AvailableCouponsModal",
            required: true,
        },

    },
    data() {
        return {

        }
    },
    computed: {

        ...mapGetters({

             coupons: 'coupons/coupons',
        }),
    },
    methods: {
        applyModal(code) {
          

            this.$emit('emitApplyCoupon', {

                couponCode: code,
                modelName: this.modalName,

            });
        },
    },
    watch: {

    },

}
</script>

<style scoped>
.couponApply {
    border: 2px dashed #FF6200;
    border-radius: 4px;
    color: #FF6200;
    display: inline-block;
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
    padding: 15px 20px;
    text-transform: uppercase;
}
.couponApply:hover {
    background: rgba(255,98,0,.1);
    text-decoration: none;
    cursor: pointer;
}
</style>
