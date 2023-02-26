<template>
<div class="modal fade " id="AddressUpdateModal" tabindex="-1" role="dialog" aria-labelledby="AddressUpdateModal" aria-hidden="true">
    <div class="modal-dialog  modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-brand text-white">
                <h4 class="modal-title white"></h4>
                <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div>
                    <div class="col-md-12">

                        <div class="form-group">
                            <label v-if="!newAddressCreateStatus"> <span> Select address from existing Or</span> <span @click="addressUpdateOrCreateUiToggleHandler()" class="text-primary" style="cursor: pointer;">Click to Create address</span> </label>
                            <label v-else> <span>Address</span> <span @click="addressUpdateOrCreateUiToggleHandler()" class="text-primary" style="cursor: pointer;">Click to select address from existing one</span> </label>
                            <multi-select v-if="!newAddressCreateStatus" v-model="selectedAddress" :allow-empty="false" class="select-input" :options="addressList" :close-on-select="true" placeholder="Select a address" label="name" track-by="value" :show-labels="false" />
                            <div class="pt-3" v-if="newAddressCreateStatus">
                                <label>Where do you need it done?</label>
                                <google-auto-complete id="map" ref="address" class="form-control" placeholder="Please type your address" country="au" @placechanged="getAddressData"></google-auto-complete>
                                <div v-if="(addressInformation.street || addressInformation.suburb || addressInformation.state || addressInformation.zipCode)">
                                    <p class="text-18 text-center mb-4 mt-4 text-blue">
                                        <span class="blink-text brand-color me-2"><i class="fa-solid fa-circle-info"></i></span>
                                        <span class="underline text-blue">&nbsp;Did you find errors in the address? Please enter manually</span>
                                    </p>
                                    <div class="row">
                                        <div class="col-md-6 col-12 mb-4">
                                            <label class="info-label" for="booking-street">Street</label>
                                            <input v-model="addressInformation.street" type="text" name="street" class="form-control" placeholder="Enter street name">
                                        </div>
                                        <div class="col-md-6 col-12 mb-4">
                                            <label class="info-label" for="booking-suburb">Suburb</label>
                                            <input v-model="addressInformation.suburb" type="text" name="suburb" class="form-control" placeholder="Enter suburb">
                                        </div>
                                        <div class="col-md-6 col-12 multi-select-input mb-md-4 mb-3 pb-md-1 pb-0">
                                            <label class="info-label" for="">State</label>
                                            <multi-select v-model="selectedState" label="name" track-by="value" :options="stateList.value" :show-labels="false"></multi-select>
                                        </div>
                                        <div class="col-md-6 col-12">
                                            <label class="info-label" for="booking-zip">Zip Code</label>
                                            <input v-model="addressInformation.zipCode" type="text" class="form-control" name="zipCode" placeholder="Enter zip code">
                                        </div>
                                    </div>
                                    <div class="row" v-if="authCustomer.type === 'Business'">
                                      <div class="col-12">
                                            <label class="info-label" for="business-name">Business Nmae</label>
                                            <input v-model="addressInformation.businessName" type="text" name="business-name"  class="form-control" placeholder="Enter business name">
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="modal-footer border-0 pt-0">

                <button :disabled="isAddressUpdateButtonDisabled" type="button" class="btn  bg-brand text-white" @click="updateOrCreateCustomerAddress()">Save changes</button>

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
    props: ['userAddressList', 'customerCurrentAddress'],
    components: {
        // DatePicker,
    },
    data() {
        return {
            newAddressCreateStatus: false,
            addressList: [],
            selectedAddress: {},

            addressInformation: {
                id: null,
                street: '',
                suburb: '',
                state: '',
                zipCode: '',
                country: '',
                businessName: '',
                businessId: null
            },
        }
    },
    watch: {
        customerCurrentAddress(customerCurrentAddress) {
            this.selectedAddress = customerCurrentAddress;
        },
        userAddressList(userAddressList) {
            this.addressList = userAddressList;
        },
        selectedState(selectedState){
          this.addressInformation.state = selectedState.value
        }

    },
    computed: {
        ...mapGetters({
            stateList: 'settings/settingDefaultState',
            authUser: 'login/authUser',
            authCustomer: 'login/authCustomer',
            address: 'addresses/address',

            // customer
            customer: 'customers/customer',

        }),

        isAddressUpdateButtonDisabled(){

          if (this.newAddressCreateStatus && this.authCustomer.type === 'Business') {
            return !(this.addressInformation.businessName && this.addressInformation.state && this.addressInformation.street && this.addressInformation.suburb && this.addressInformation.zipCode)
          }
          if (this.newAddressCreateStatus && this.authCustomer.type !== 'Business') {
            return !(this.addressInformation.state && this.addressInformation.street && this.addressInformation.suburb && this.addressInformation.zipCode)
          }
          return false;
        },


    },

    methods: {
        ...mapActions({

            // address
            postAddress: 'addresses/postAddress',

            // business
            postBusiness: 'businesses/postBusiness',

            // customer
            putCustomer: 'customers/putCustomer',

        }),
        getAddressData(addressData) {

            console.log(this.$refs.address.innerHTML);
            this.addressInformation.street = `${(addressData?.street_number) ? addressData?.street_number+' ' : ''}` + addressData ?.route ?? ''.trim();
            this.addressInformation.suburb = addressData ?.locality ?? '';
            this.addressInformation.state = addressData ?.administrative_area_level_1 ?? '';
            this.addressInformation.zipCode = addressData ?.postal_code ?? '';
            this.addressInformation.country = addressData ?.country ?? '';
            this.addressInformation.state = this.addressInformation.state.toLowerCase();
            if (this.addressInformation.state) {

                let addressStateIndex = this.stateList.value.findIndex(item => item.value === this.addressInformation.state);

                if (addressStateIndex !== -1) {
                    let addressState = JSON.parse(JSON.stringify(this.stateList.value[addressStateIndex]));
                    this.selectedState = {
                        name: addressState.name,
                        value: addressState.value
                    };

                }
            }
        },
        addressUpdateOrCreateUiToggleHandler() {
            this.newAddressCreateStatus = !this.newAddressCreateStatus
        },

        async updateOrCreateCustomerAddress() {
            if (this.newAddressCreateStatus && this.authCustomer.type === 'Business' && !(this.addressInformation.businessName)) {
              this.showToastMessage({type:'error',message:'Business name is required'});
              return;
            }
            // creating New Address
            if (this.newAddressCreateStatus) {
                // create single address
                await this.createSingleAddress({
                    user_id: this.authUser.id,
                    street: this.addressInformation.street,
                    suburb: this.addressInformation.suburb,
                    state: this.addressInformation.state,
                    post_code: this.addressInformation.zipCode,
                    country: this.addressInformation.country,
                });
                if (this.addressInformation.id && this.authCustomer.type === 'Business') {
                    await this.createSingleBusinessAddress({
                        user_id: this.authUser.id,
                        address_id: this.addressInformation.id,
                        name: this.addressInformation.businessName,
                    })
                }
                if (this.addressInformation.id) {
                    await this.updateSingleCustomer({
                        id: this.authCustomer.id,
                        data: {
                            address_id: this.addressInformation.id,
                        },
                    });
                }

            } else {

              // update from existing address
                await this.updateSingleCustomer({
                    id: this.authCustomer.id,
                    data: {
                        address_id: this.selectedAddress.value,
                    },
                });
            }

            //
        },
        async createSingleAddress(postAddressData) {

            this.loader(true);
            const response = await this.postAddress(postAddressData);
            if (response.status === 200 || response.status === 201) {
                this.addressInformation.id = this.address.id;
                this.loader(false);
                return true;

            }
            if (response.message) {
                this.showToastMessage(response);
            }

            return false;

        },
        async createSingleBusinessAddress(postBusinessData) {

            this.loader(true);
            const response = await this.postBusiness(postBusinessData);
            this.loader(false);

            if (response.status === 200 || response.status === 201) {

                // this.showToastMessage(toastObj);
                return true;

            }

            if (response.message) {
                this.showToastMessage(response);
            }

            return false;
        },

        async updateSingleCustomer(putCustomerData) {
            console.log('called');
            this.loader(true);
            const response = await this.putCustomer(putCustomerData);
            this.loader(false);

            if (response.status === 200) {
                this.$emit('setCustomerCurrentAddress', this.customer.address);
               this.$emit('getUserAddresses', this.authUser.id);
                this.resetData();
                document.querySelector('[data-bs-target="#AddressUpdateModal"]').click();
            }
            if (response.message) {
                this.showToastMessage(response);
            }

        },

        resetData() {
            if (this.newAddressCreateStatus) {
               this.$refs.address.clear();
            }
            this.addressInformation = {
                id: null,
                street: '',
                suburb: '',
                state: '',
                zipCode: '',
                country: '',
                businessName: '',
                businessId: null
            };
            this.newAddressCreateStatus = false;
        }
    }

}
</script>

<style>
</style>
