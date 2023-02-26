<template>
<div class="mt-4 mb-4">
    <main class="dashboard-content">
        <h3 class="brand-color mb-4">My Coupon</h3>
        <div class="bg-white py-5">
            <div class="container">
                <div class="">
                    <div class="row">
                        <div v-for="(coupon,index) in coupons" :key="index" class="col-xl-6 col-lg-6 col-12 pb-3">
                            <div class="coupon-item-wrapper">
                                <div class="coupon-title py-4 d-flex justify-content-center align-items-center">
                                    <div class="coupon-amount-wrapper text-center ">
                                        <div class="d-flex flex-column justify-content-center h-100">
                                            <h6 class="mb-0">Enjoy</h6>
                                            <h2 class="brand-color mb-0">
                                                <span v-if="coupon.discount_type === 'Fixed Amount'">{{ ((coupon.discount)/100).toFixed(0) }}$</span>
                                                <span v-else>{{coupon.discount}} $</span>
                                            </h2>
                                            <h6 class="mb-0">off</h6>
                                        </div>
                                    </div>
                                </div>

                                <div class="coupon-description-wrapper ">
                                    <div class="mx-2 coupon-description h-100 py-4">
                                        <div class="ms-2 h-100" style=" word-wrap: break-word;">
                                            <p class="mb-0">Code</p>
                                            <h4 class="mb-3 brand-color coupon-code" style=" word-wrap: break-word;">{{ coupon.code }}</h4>
                                            <p class="">Expired on
                                                <span v-if="coupon?.end_at_string">{{ coupon?.end_at_string  }}</span>
                                                <span v-else>Unlimited</span>
                                            </p>
                                            <p v-if="coupon?.usage_condition" class="mt-3" style="color: #9E9E9E;">{{ coupon.usage_condition  }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 text-center" v-if="coupons?.length === 0">
                            <div>
                                <img src="~/assets/images/coupon/noCoupon.jpg" class="img-fluid" alt="">
                            </div>
                            <div class="pt-4">
                                <h4 style="color: #414141;">No coupons available</h4>
                                <p style="color: #9E9E9E;">Your coupon will be appeared here.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
import Loader from '~/mixins/Loader';
import ShowToastMessage from '~/mixins/ShowToastMessage';

export default {
    name: "Bookings",
    layout: "dashboard-layout",
    mixins: [Loader, ShowToastMessage],
    components: {

    },
    data() {
        return {
            addressInformation: {
                zipCode: null,
            },
        }

    },
    computed: {
        ...mapGetters({
            authUser: 'login/authUser',
            coupons: 'coupons/coupons',
            authCustomer: 'login/authCustomer',
            customer: 'customers/customer',

        })
    },
    methods: {
        ...mapActions({
            getAvailableValidCoupons: 'coupons/getAvailableValidCoupons',
            getCustomer: 'customers/getCustomer',



        }),

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
            if (response?.status  === 200) {
                this.addressInformation.zipCode = this.customer?.address?.post_code ?? null;
            }
            if (response ?.message) {
                this.showToastMessage(response);
            }

        },

        async getAvailableValidCouponsHandler() {
            this.loader(true);
            const data = {
                user_id: this.authUser.id,
                apply_on: null,
                internal_coupon: 0,
                website_visibility: null,
                post_code: this.addressInformation.zipCode,
            }
            const response = await this.getAvailableValidCoupons(data);
            if (response.message) {
                this.showToastMessage(response);
            }
            this.loader(false);

        },

    },
    async mounted() {
        await this.getCustomerInformation(this.authCustomer.id);
        await this.getAvailableValidCouponsHandler();
    },

}
</script>

<style scoped>
.coupon-item-wrapper {
    background: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;

}

.coupon-title {
    background-color: #FAF2EF;
    width: 45%;
    border-right: 2px dotted white;
}

.coupon-description-wrapper {
    width: 65%;

}

.coupon-description {
    border-left: 2px dashed #FAF2EF;
}

.coupon-amount-wrapper {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 4px solid white;
}

.coupon-code {
    font-size: 22px;
}

@media only screen and (max-width: 1200px) {
    /*Tablets [601px -> 1200px]*/
}

@media only screen and (max-width: 600px) {
    .coupon-title {
        background-color: #FAF2EF;
        width: 100%;
        border-right: 2px dotted white;
    }

    .coupon-description-wrapper {
        width: 100%;

    }

    .coupon-item-wrapper {
        background: white;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;

    }

}

@media only screen and (max-width: 425px) {}
</style>
