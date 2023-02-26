<template>
  <div class="modal fade " id="surchargeInfoModal" tabindex="-1" role="dialog" aria-labelledby="surchargeInfoModal"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-md modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="text-white mb-0 pb-0">Surcharge Details </h5>
         <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><i
                class="bx bx-x"></i></button>
        </div>
        <div class="modal-body">
          <div class="row" v-for="(surcharge,index) in surcharges.details" :key="index">
            <div class="col-7 text-left">
              <p class="text-bold-400 text-uppercase">{{ surcharge.name }}</p>
            </div>
            <div class="col-5 text-right">
              <p>${{ surcharge.rate }} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SurchargeInfoModal",
  props: ["surcharges"],
}
</script>

<style scoped>

</style>
