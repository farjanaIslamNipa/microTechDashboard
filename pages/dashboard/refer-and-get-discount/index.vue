<template>
  <div class="my-4">
    <div class="order-dashboard-content px-5">
      <h4 class="brand-color">Refer & get discount</h4>
      <div class="mt-4 bg-white rounded p-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="px-5">
              <div class="text-center"><img src="/dashboard/refer-and-discount.jpg" alt="Refer and get discount" class="img-fluid"></div>
              <div class="d-flex w-100 justify-content-between text-blue pt-4">
                <div class="text-center">
                  <p class="mb-0 text-300 text-capitalize">Invite your</p>
                  <p class="mb-0 text-500 text-capitalize">Friends</p>
                </div>
                <div class="text-center">
                  <p class="mb-0 text-500 text-20">+</p>
                </div>
                <div class="text-center">
                  <p class="mb-0 text-300 text-capitalize">your friends</p>
                  <p class="mb-0 text-500 text-capitalize">become a member</p>
                </div>
                <div class="text-center">
                  <p class="mb-0 text-500 text-20">+</p>
                </div>
                <div class="text-center">
                  <p class="mb-0 text-300 text-capitalize">your earn</p>
                  <p class="mb-0 text-500 text-capitalize">loyalty points</p>
                </div>
              </div>
              <div class="mt-5 text-center">
                <p class="mb-2">Your refer ID <span v-if="copied" class="d-inline-block ms-2 py-1 px-3 rounded bg-blue text-white">{{ copied }}</span></p>
                <div class="d-flex align-items-center justify-content-center text-center">
                  <div>
                    <p class="mb-0 refer-id">{{ referId }}</p>
                  </div>
                  <div class="ms-2"><button class="btn copy-btn" @click="copyToClipBoard(referId)"><img src="/dashboard/copy-icon.png" alt="Copy Refer Id"></button></div>
                </div>
                <button class="btn brand-fill-btn text-uppercase mt-4 px-5">Refer a Friend</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

  export default {
    name: 'ReferAndGetDiscount',
    layout: 'dashboard-layout',
    data() {
    return {
      referId: '',
      copied: ''
    };
  },
  computed: {
        ...mapGetters({
            authCustomer: 'login/authCustomer',
        })
      },

  methods: {
    copyToClipBoard(textToCopy){
        navigator.clipboard.writeText(textToCopy);
        this.copied = 'Copied !'
    },
  },
  mounted() {
    this.referId = this.authCustomer?.referralCode ?? ''
  },

  }
</script>

<style scoped>
.refer-id{
  background-color: #f1f1f1;
  /* border: 1px dashed rgb(161, 161, 161); */
  border-radius: 5px;
  padding: 8px 80px;
}
.copy-btn{
  background-color: #f1f1f1;
  padding: 8px 15px;
  transition: all 0.3s ease;
}
.copy-btn:hover{
  background-color: #dadada;
}
</style>
