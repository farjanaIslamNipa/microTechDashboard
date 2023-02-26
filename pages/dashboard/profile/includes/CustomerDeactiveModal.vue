<template>
<div class="modal fade " id="customerDeactiveModal" tabindex="-1" role="dialog" aria-labelledby="customerDeactiveModal" aria-hidden="true">
    <div class="modal-dialog  modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header text-white" style="background-color: #1a5d88;">
                <h5 class="modal-title white">Delete Account</h5>
                <!-- <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button> -->
                <button type="button" class="btn text-white" data-bs-dismiss="modal" aria-label="Close">
                    <i class="fa-solid fa-x text-white"></i>
                </button>
            </div>
            <div class="modal-body ">

                <div class="row py-4">
                    <div class="col-12 ">
                        <h5 class="text-danger py-2 my-0 text-600 ">Do you want to delete your account ?
                        </h5>
                        <p class="text-300">
                            If you confirm you will be automatically log out and not able to access your
                            account anymore.
                         </p>
                         <h6 class="py-1">To confirm, please type <span class="text-danger">GOODBYE</span> in the box below.</h6>
                         <div class="form-group">
                                <div class="">
                                    <input v-model="validationText" type="text" class="form-control " placeholder="Type here" />
                                </div>
                            </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer border-0 pt-0">

                <button type="button" class="btn bg-secondary text-white" data-bs-dismiss="modal">Cancel </button>
                <button :disabled="validationText !== 'GOODBYE'" type="button" class="btn bg-danger text-white" @click="deactiveCustomerHandler()">Delete</button>

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
    name: "CustomerDeactiveModal",
    mixins: [ShowToastMessage, Loader],
    props: [''],
    components: {

    },
    data() {
        return {
          validationText:"",
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

    },
    computed: {
        ...mapGetters({
            customer: 'customers/customer',
            user: 'users/user',
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
        async deactiveCustomerHandler() {
            let dataObj = {
                id: this.customer.id,
                data: {
                    status: 0,
                },
            };
            this.loader(true);
            const response = await this.putCustomer(dataObj);
            this.loader(false);
            if (response.status === 200) {
                document.querySelector(`[data-bs-target="#customerDeactiveModal"]`).click(); // modal close
                await this.submitLogout();
            }
            if (response ?.message) {
                this.showToastMessage(response);
            }

        }
    },

}
</script>

<style>
  </style>
