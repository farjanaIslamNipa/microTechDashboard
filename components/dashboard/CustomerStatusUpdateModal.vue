<template>
<div class="modal fade " id="CustomerStatusUpdateModal" tabindex="-1" role="dialog" aria-labelledby="CustomerStatusUpdateModal" aria-hidden="true">
    <div class="modal-dialog  modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-brand text-white">
                <h5 class="modal-title white">Update Status</h5>
                <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body ">

                <div class="row py-4">
                    <div class="col-12">
                        <div class="form-group">
                            <div class="">
                                <label>Status</label>
                                <multi-select v-model="selectedStatus" :allow-empty="false" class="select-input" :options="statusOptions" :close-on-select="true" placeholder="Select a status" label="name" track-by="value" :show-labels="false" />
                            </div>
                        </div>
                    </div>
                    <div class="col-12" v-if="selectedStatus?.value === 0">
                      <p class="text-danger py-2 my-0 text-600">Do you want to delete/deactive your account ? If you confirm you will be automatically log out and not able to access your account anymore.</p>
                    </div>
                </div>

            </div>
            <div class="modal-footer border-0 pt-0">

                <button type="button" class="btn  bg-brand text-white" @click="updateCustomerStatusHandler">Save changes</button>

            </div>
        </div>
    </div>
</div>
</template>

<script>
import Loader from '~/mixins/Loader';
import ShowToastMessage from '~/mixins/ShowToastMessage';

import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    name: "AppointmentStatusUpdateModal",
    mixins: [ShowToastMessage, Loader],
    props: ['customerInforamtion'],
    components: {

    },
    data() {
        return {
            selectedStatus: {},
            statusOptions: [

                {
                    value: 0,
                    name: 'Inactive'
                },
                {
                    value: 1,
                    name: 'Active'
                },
            ],

        }
    },
    watch: {
        customerInforamtion(currentCustomerInformation) {
            this.selectedStatus = {
                name: currentCustomerInformation.status,
                value: currentCustomerInformation.status === 'Active' ? 1 : 0
            }
        }
    },
    computed: {
        ...mapGetters({
            // availableTechnicians: 'technicians/availableTechnicians',

        }),

    },
    methods: {
        ...mapActions({
            putCustomer: 'customers/putCustomer',
            logout: 'logout/logout',
        }),
        async submitLogout() {
            this.loader(true);
            await this.logout()
                .then((response) => {
                    this.loader(false);
                    if (response.status === 204 || response.status === 401 || response.status === 419) {
                        this.$router.push({
                            name: 'login',
                        });
                    }
                    if (response.message) {
                        this.showToastMessage(response);
                    }

                })
        },
        async updateCustomerStatusHandler() {
            let dataObj = {
                id: this.customerInforamtion.id,
                data: {
                    status: this.selectedStatus.value,
                },
            };
            this.loader(true);
            const response = await this.putCustomer(dataObj);
            this.loader(false);
            if (response.status === 200) {
                document.querySelector(`[data-bs-target="#CustomerStatusUpdateModal"]`).click(); // modal close
                if (this.selectedStatus.value === 0) {
                    await this.submitLogout();
                }
            }
            if (response?.message) {
                this.showToastMessage(response);
            }

        }
    },

}
</script>

<style>
  </style>
