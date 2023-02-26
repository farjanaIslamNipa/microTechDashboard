<template>
  <div class="py-4">
    <div class="dashboard-content">
      <h4 class="brand-color">Geekify Points</h4>
      <div class="bg-white mt-4">
        <div class="geekify-point-banner p-5">
          <div class="row justify-content-between">
            <div class="col-xl-8 col-md-6 text-white">
              <div>
                <p class="mb-0">Available Points</p>
                <p class="mb-0 text-white text-20"><span class="point-text">{{loyaltyPointStatus?.total_points ?? 0}}</span> Pts</p>
                <p class="mb-0">Use Geekify to earn more points and enjoy exclusive benefits.</p>
              </div>
            </div>
            <div class="col-xl-4 col-md-6">
              <div class="d-flex justify-content-md-end justify-content-start mt-md-0 mt-4 rounded">
                <div class="bg-white d-flex align-items-center py-2 px-4 rounded bg-white">
                  <div>
                    <img class="point-icon" v-if="loyaltyPointStatus?.current_group?.name === 'Starter'" src="/dashboard/star.svg" alt="starter">
                    <img class="point-icon" v-if="loyaltyPointStatus?.current_group?.name === 'Silver'" src="/dashboard/silver.svg" alt="Silver">
                    <img class="point-icon" v-if="loyaltyPointStatus?.current_group?.name === 'Gold'" src="/dashboard/gold.svg" alt="Gold">
                    <img class="point-icon" v-if="loyaltyPointStatus?.current_group?.name === 'Platinum'" src="/dashboard/platinum.svg" alt="Platinum">
                    <img class="point-icon" v-if="loyaltyPointStatus?.current_group?.name === 'Platinum Plus'" src="/dashboard/platinum-plus.svg" alt="Platinum Plus">
                    <img class="point-icon" v-if="loyaltyPointStatus?.current_group?.name === 'The King'" src="/dashboard/the-king.svg" alt="The King">
                  </div>
                  <div>
                    <p :style="{'color': '#' + loyaltyPointStatus?.current_group?.color_code}" class="ms-2 text-uppercase mb-0">
                      <span class="text-20 text-600" v-if="loyaltyPointStatus?.current_group?.name">{{ `${loyaltyPointStatus?.current_group?.name}` }}</span>
                      <span class="text-400 text-18 text-uppercase">club</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="px-xl-5 px-3 pt-5 mb-5 bg-white">
          <div class="bg-light p-3 rounded">
            <p class="text-500 text-18 mb-0">Geekify Benefits</p>
          </div>
          <p class="mt-3">Currently using your account, you will get a discount on the: </p>
          <div class="row mx-xl-4 mx-0 py-4">
            <div class="col-md-6 mb-md-0 mb-4">
              <div class="d-flex align-items-center">
                <div>
                  <div :style="{'background-color': '#' + loyaltyPointStatus?.current_group?.color_code}" class="polygon-shape">
                    <p class="mb-0">%</p>
                  </div>
                </div>
                <div class="ms-4">
                  <p class="text-500 text-18 brand-color mb-1">Book a service and get 2% off</p>
                  <p class="mb-0 text-secondary">No min. Max $100 off</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="d-flex align-items-center">
                <div>
                  <div :style="{'background-color': '#' + loyaltyPointStatus?.current_group?.color_code}" class="polygon-shape">
                    <p class="mb-0">%</p>
                  </div>
                </div>
                <div class="ms-4">
                  <p class="text-500 text-18 brand-color mb-1">Order products and get 2% off</p>
                  <p class="mb-0 text-secondary">No min. Max $100 off</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-light p-3 rounded">
            <p class="text-500 text-18 mb-0">How it works</p>
          </div>

          <div class="mt-5 pb-5">
            <div class="d-flex align-items-center mb-4">
              <div><img src="/dashboard/list-icon.svg" alt="Geekify Point"></div>
              <p class="mb-0 ms-3">Earn points on your regular transactions.</p>
            </div>
            <div class="d-flex align-items-center mb-4">
              <div><img src="/dashboard/list-icon.svg" alt="Geekify Point"></div>
              <p class="mb-0 ms-3">Tap on your loyalty club to view details.</p>
            </div>
            <div class="d-flex align-items-center mb-4">
              <div><img src="/dashboard/list-icon.svg" alt="Geekify Point"></div>
              <p class="mb-0 ms-3">Access special discounts on your booking and orders.</p>
            </div>
            <div class="d-flex align-items-center mb-4">
              <div><img src="/dashboard/list-icon.svg" alt="Geekify Point"></div>
              <p class="mb-0 ms-3">Keep earning points to reach a higher club and more benefits.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Loader from '~/mixins/Loader';
import ShowToastMessage from '~/mixins/ShowToastMessage';
  export default {
    name: 'GeekifyPoints',
    layout: 'dashboard-layout',
    mixins: [Loader, ShowToastMessage],
    computed: {
      ...mapGetters({
        authUser: 'login/authUser',
        loyaltyPointStatus: 'loyaltyPoints/loyaltyPointStatus',
      })
    },
    methods: {
      ...mapActions({
        getLoyaltyPointStatus: 'loyaltyPoints/getLoyaltyPointStatus',
      }),
      getLoyaltyPointStatusHandler(userId) {
            this.getLoyaltyPointStatus({
                id: userId
            });
        },

    },
    async mounted() {
      this.getLoyaltyPointStatusHandler(this.authUser.id);
    }
  }
</script>

<style scoped>
.geekify-point-banner{
  background-image: url('/dashboard/point-banner.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  border-radius: 12px;
  width: 100%;
}
.point-text{
  font-size: 62px;
  font-weight: 600;
  line-height: 1;
}
.point-icon{
  height: 30px;
}
.polygon-shape {
  height: 75px;
  width: 75px;
  color: white;
  clip-path: polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.polygon-shape p{
  font-size: 38px;
  font-weight: 700;
}
@media(max-width: 1024px){
  .polygon-shape {
  height: 65px;
  width: 65px;
  }
  .polygon-shape p{
  font-size: 30px;
}
}
</style>
