<template>
<div class="mt-4 mb-4">
    <main class="dashboard-content">
        <h3 class="brand-color mb-4">Address</h3>
        <div class="bg-white pb-5">
            <div class="container">
                <div class="pt-4 ">
                    <div class="row align-items-center py-3 single-information-wrapper mb-2 mb-md-3">
                        <div class="col-md-4">

                            <p class="mb-0">{{ customerCurrentAddressReadableFormat }}</p>

                        </div>
                        <div class="col-md-4">
                            <button @click="openCustomerAddressUpdateModal()" class="btn edit-text-btn p-0 ms-4">
                                <img src="/dashboard/edit.svg" alt="">
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </main>
    <div class="" data-bs-toggle="modal" data-bs-target="#AddressUpdateModal"></div>
    <AddressUpdateModal :userAddressList="userAddressList" @getUserAddresses="getUserAddresses" @setCustomerCurrentAddress="setCustomerCurrentAddress" :customerCurrentAddress="customerCurrentAddress" />
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
import Loader from '~/mixins/Loader';
import ShowToastMessage from '~/mixins/ShowToastMessage';
import AddressUpdateModal from './includes/AddressUpdateModal';

export default {
    name: "Bookings",
    layout: "dashboard-layout",
    mixins: [Loader, ShowToastMessage],
    components: {
        AddressUpdateModal
    },
    data() {
        return {
            userAddressList: [],
            customerCurrentAddress: {

            }
        }

    },
    computed: {
        ...mapGetters({
            authUser: 'login/authUser',
            authCustomer: 'login/authCustomer',
            customer: 'customers/customer',

            addresses: 'addresses/addresses',
            // appointments: "appointments/appointments",
        }),

        customerCurrentAddressReadableFormat() {
            if (this.customerCurrentAddress ?.business ?.name) {
                return `${this.customerCurrentAddress?.business?.name ?? ''} (${this.customerCurrentAddress?.street ?? ''}, ${ this.customerCurrentAddress?.suburb ?? ''} ${this.customerCurrentAddress?.state ?? ''} ${this.customerCurrentAddress?.post_code ?? ''}, ${ this.customerCurrentAddress?.country ?? ''})`;

            } else {
                return `${this.customerCurrentAddress?.street ?? ''}, ${ this.customerCurrentAddress?.suburb ?? ''} ${this.customerCurrentAddress?.state ?? ''} ${this.customerCurrentAddress?.post_code ?? ''}, ${ this.customerCurrentAddress?.country ?? ''}`;

            }
        }

    },
    methods: {
        ...mapActions({
            // getUser: 'users/getUser',
            getCustomer: 'customers/getCustomer',
            getAddresses: 'addresses/getAddresses',

            getSettings: 'settings/getSettings',

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
            if (response ?.message) {
                this.showToastMessage(response);
            }

        },
        async getCustomerInformation(id) {

            this.loader(true);
            const params = {
                id: id,
                params: {
                    with_relation: ['address', 'address.business', 'user'],
                }

            };
            const response = await this.getCustomer(params);
            this.loader(false);
            if (response ?.message) {
                this.showToastMessage(response);
            }

        },

        openCustomerAddressUpdateModal() {

            // document.querySelector('[data-bs-target="#AddressUpdateModal"]').click();
            const customerAddress = {
                ...this.customerCurrentAddress
            };
            this.customerCurrentAddress = {};
            this.customerCurrentAddress = customerAddress;
            this.$nextTick(() => {
                const addressList = [...this.userAddressList];
                this.userAddressList = [];
                this.userAddressList = addressList;
                this.$nextTick(() => {
                    document.querySelector('[data-bs-target="#AddressUpdateModal"]').click();
                });
            });

        },
        async getUserAddresses(userId) {

            let paramObj = {
                user_id: userId,
            };

            if (this.customer.type === 'Business') {
                paramObj.with_relation = ['business'];
            }
            this.loader(true);
            const response = await this.getAddresses(paramObj);
            this.loader(false);
            if (response ?.message) {
                this.showToastMessage(response);
            }
            if (this.customerCurrentAddress ?.business ?.name) {
                this.setUserAddressList(this.addresses.map((address) => {
                    let businessName = address.business && address.business.name ? address.business.name : '';
                    let addressId = address.id;
                    let addressStreet = address.street;
                    let addressSuburb = address.suburb;
                    let addressState = address.state.toUpperCase();
                    let addressPostCode = address.post_code;
                    let addressCountry = address.country;
                    if (businessName) {
                        return {
                            value: addressId,
                            name: `${businessName} (${addressStreet}, ${addressSuburb} ${addressState} ${addressPostCode}, ${addressCountry})`,
                        };
                    }
                    return {
                        value: addressId,
                        name: `${addressStreet}, ${addressSuburb} ${addressState} ${addressPostCode}, ${addressCountry}`,
                    };
                }));
            } else {
                this.setUserAddressList(this.addresses.map((address) => {
                    let addressId = address.id;
                    let addressStreet = address.street;
                    let addressSuburb = address.suburb;
                    let addressState = address.state.toUpperCase();
                    let addressPostCode = address.post_code;
                    let addressCountry = address.country;

                    return {
                        value: addressId,
                        name: `${addressStreet}, ${addressSuburb} ${addressState} ${addressPostCode}, ${addressCountry}`
                    };
                }));
            }

        },
        userAddress() {

        },
        setCustomerCurrentAddress(address) {

            // this.customerCurrentAddress.id = address ?.id ?? null;
            // this.customerCurrentAddress.state = address ?.state ?? '';
            // this.customerCurrentAddress.street = address ?.street ?? '';
            // this.customerCurrentAddress.post_code = address ?.post_code ?? '';
            // this.customerCurrentAddress.suburb = address ?.suburb ?? '';
            // this.customerCurrentAddress.country = address ?.country ?? '';
            // this.customerCurrentAddress.business.id = address ?.business ?.id ?? null;
            // this.customerCurrentAddress.business.name = address ?.business ?.name ?? "";

            if (address ?.business ?.name) {
                this.customerCurrentAddress = {
                    id: address ?.id ?? null,
                    state: address ?.state ?? '',
                    street: address ?.street ?? '',
                    post_code: address ?.post_code ?? '',
                    suburb: address ?.suburb ?? '',
                    country: address ?.country ?? '',
                    value: address ?.id ?? null,
                    name: `${address.business.name} (${address.street}, ${ address.suburb} ${address.state} ${address.post_code}, ${ address.country})`,
                    business: {
                        id: address.business.id,
                        name: address.business.name
                    }

                }
            } else {

                this.customerCurrentAddress = {
                    id: address ?.id ?? null,
                    state: address ?.state ?? '',
                    street: address ?.street ?? '',
                    post_code: address ?.post_code ?? '',
                    suburb: address ?.suburb ?? '',
                    country: address ?.country ?? '',
                    value: address ?.id ?? null,
                    name: `${address.street}, ${ address.suburb} ${address.state} ${address.post_code}, ${ address.country}`,

                }

            }
         

        },
        async getSettingsList(settingParams) {
           this.loader(true);
            const response = await this.getSettings(settingParams);
            this.loader(false);
            console.log(response, "response ");
            if (response ?.message) {
                this.showToastMessage(response);
            }
        },

        setUserAddressList(addresses) {
            this.userAddressList = addresses;
        }

    },
    async mounted() {
        await this.getCustomerInformation(this.authCustomer.id);
        await this.getSettingsList({
            type: ['default'],
            key: ['default_state'],
        });
        if (this.customer ?.id && this.customer ?.address ?.id) {
            this.setCustomerCurrentAddress(this.customer.address);
        }

        await this.getUserAddresses(this.authUser.id);

    },

}
</script>

<style scoped>
.single-information-wrapper {
    background-color: #F5F5F5;
    border-radius: 6px;
}
</style>
