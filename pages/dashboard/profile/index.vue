<template>
<div class="mt-4 mb-4">
    <main class="dashboard-content">
        <h3 class="brand-color mb-4">My Profile</h3>
        <div class="bg-white pb-5">
            <div class="container">
                <div class="pt-4 ">
                    <h5 class="text-500 text-capitalize pb-2">Basic info</h5>
                    <div class="row align-items-center py-3 single-information-wrapper mb-2 mb-md-3">
                        <div class="col-md-4 text-light-gray ">
                            <p class="mb-0">First Name</p>
                        </div>
                        <div class="col-md-4">
                            <p v-if="user?.first_name" class="mb-0">{{ user?.first_name }}</p>
                            <p v-else class="mb-0 text-danger">Not Provided</p>
                        </div>
                        <div class="col-md-4">
                            <button @click="openCustomerInformationUpdateModal('first_name')" class="btn edit-text-btn p-0 ms-4">
                                <img src="/dashboard/edit.svg" alt="">
                            </button>
                        </div>
                    </div>

                    <div class="row align-items-center py-3 single-information-wrapper mb-2 mb-md-3">
                        <div class="col-md-4 text-light-gray ">
                            <p class="mb-0">Last Name</p>
                        </div>
                        <div class="col-md-4">
                            <p v-if="user?.last_name" class="mb-0">{{ user?.last_name }}</p>
                            <p v-else class="mb-0 text-danger">Not Provided</p>
                        </div>
                        <div class="col-md-4">
                            <button @click="openCustomerInformationUpdateModal('last_name')" class="btn edit-text-btn p-0 ms-4">
                                <img src="/dashboard/edit.svg" alt="">
                            </button>
                        </div>
                    </div>
                    <div class="row align-items-center py-3 single-information-wrapper mb-2 mb-md-3">
                        <div class="col-md-4 text-light-gray ">
                            <p class="mb-0">Birth day</p>
                        </div>
                        <div class="col-md-4">
                            <p v-if="user?.date_of_birth" class="mb-0">{{ user?.date_of_birth }}</p>
                            <p v-else class="mb-0 text-danger">Not Provided</p>

                        </div>
                        <div class="col-md-4">
                            <button @click="openCustomerInformationUpdateModal('date_of_birth')" class="btn edit-text-btn p-0 ms-4">
                                <img src="/dashboard/edit.svg" alt="">
                            </button>
                        </div>
                    </div>
                </div>
                <div class="pt-4">
                    <h5 class="text-500 text-capitalize pb-2">Contact info</h5>
                    <div class="row align-items-center py-3 single-information-wrapper mb-2 mb-md-3">
                        <div class="col-md-4 text-light-gray ">
                            <p class="mb-0">Email</p>
                        </div>
                        <div class="col-md-4">
                            <p v-if="user?.email" class="mb-0">{{ user?.email }}</p>
                            <p v-else class="mb-0 text-danger">Not Provided</p>
                        </div>
                        <div class="col-md-4">
                            <button @click="openCustomerInformationUpdateModal('email')" class="btn edit-text-btn p-0 ms-4">
                                <img src="/dashboard/edit.svg" alt="">
                            </button>
                        </div>
                    </div>
                    <div class="row align-items-center py-3 single-information-wrapper mb-2 mb-md-3">
                        <div class="col-md-4 text-light-gray ">
                            <p class="mb-0">Phone Number</p>
                        </div>
                        <div class="col-md-4">
                            <p v-if="user?.phone_number" class="mb-0">{{ user?.phone_number }}</p>
                            <p v-else class="mb-0 text-danger">Not Provided</p>

                        </div>
                        <div class="col-md-4">
                            <button @click="openCustomerInformationUpdateModal('phone_number')" class="btn edit-text-btn p-0 ms-4">
                                <img src="/dashboard/edit.svg" alt="">
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="pt-4">
                                <button @click="openCustomerDeactiveModal()" class="btn p-0 text-danger text-600" style="font-size: 14px;">
                                    Delete account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </main>
    <div class="" data-bs-toggle="modal" data-bs-target="#customerInfromationUpdateModal"></div>
    <div class="" data-bs-toggle="modal" data-bs-target="#customerDeactiveModal"></div>
    <CustomerInformationUpdateModal :selectedPropertyNameForUpdate="selectedPropertyNameForUpdate" modalName="customerInfromationUpdateModal" :userId="authUser.id" />
    <CustomerDeactiveModal/>


</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
import Loader from '~/mixins/Loader';
import ShowToastMessage from '~/mixins/ShowToastMessage';
import CustomerInformationUpdateModal from './includes/CustomerInformationUpdateModal.vue';
import CustomerDeactiveModal from './includes/CustomerDeactiveModal.vue';
export default {
    name: "Bookings",
    layout: "dashboard-layout",
    mixins: [Loader, ShowToastMessage],
    components: {
        CustomerInformationUpdateModal,
        CustomerDeactiveModal
    },
    data() {
        return {
            selectedPropertyNameForUpdate: '',
        }

    },
    computed: {
        ...mapGetters({
            authUser: 'login/authUser',
            authCustomer: 'login/authCustomer',
            user: 'users/user',
            customer: 'customers/customer',
            // appointments: "appointments/appointments",
        })
    },
    methods: {
        ...mapActions({
            getUser: 'users/getUser',
            getCustomer: 'customers/getCustomer',

        }),
        async getUserInformation(id) {

            this.loader(true);
            const params = {
                id: id,
                params: {
                    // with_relation: ['address', 'address.business'],
                }

            };
            const response = await this.getUser(params);
            this.loader(false);
            if (response?.message) {
                this.showToastMessage(response);
            }

        },
        async getCustomerInformation(id) {

            this.loader(true);
            const params = {
                id: id,
                params: {
                    // with_relation: ['address', 'address.business'],
                }

            };
            const response = await this.getCustomer(params);
            this.loader(false);
            if (response?.message) {
                this.showToastMessage(response);
            }

        },

        openCustomerDeactiveModal(){

          document.querySelector('[data-bs-target="#customerDeactiveModal"]').click();


        },

        openCustomerInformationUpdateModal(property) {
            this.selectedPropertyNameForUpdate = "";

            this.$nextTick(() => {
                this.selectedPropertyNameForUpdate = property;
                this.$nextTick(() => {
                    this.selectedPropertyNameForUpdate = property;
                    document.querySelector('[data-bs-target="#customerInfromationUpdateModal"]').click();
                });
            });

        }

    },
    async mounted() {
        if (!this.user ?.id) {
            await this.getUserInformation(this.authUser.id);
        }
        if (!this.customer ?.id) {
            await this.getCustomerInformation(this.authCustomer.id);
        }

    },

}
</script>

<style scoped>
.single-information-wrapper {
    background-color: #F5F5F5;
    border-radius: 6px;
}


</style>
