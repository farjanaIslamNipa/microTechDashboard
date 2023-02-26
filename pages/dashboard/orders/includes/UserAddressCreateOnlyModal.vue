<template>
<div class="modal fade " :id="modalName" tabindex="-1" role="dialog" :aria-labelledby="modalName" aria-hidden="true">
    <div class="modal-dialog  modal-xl modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-brand">
                <h4 class="modal-title text-white">User Address Create Information</h4>
                <button type="button" class="btn close" data-bs-dismiss="modal" aria-label="Close">
                    <i class="fa-solid fa-x text-white"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                            <label>Address</label>
                            <small v-if="!addressInformationSelectDiv && hasUserAddresses" @click="addressInformationSelectDiv = !addressInformationSelectDiv" class="text-primary">&nbsp;(Click
                                to select address from existing one)</small>
                            <small v-if="addressInformationSelectDiv" @click="addressInformationSelectDiv = !addressInformationSelectDiv" class="brand-color">&nbsp;(Click
                                to create a new address)</small>
                            <VueMultiselect class="select-input" v-if="addressInformationSelectDiv" v-model="selectedAddress" :options="userAddresses" :close-on-select="true" placeholder="Select Address" label="name" track-by="value" :show-labels="false" :allow-empty="false" />
                            <vue-google-autocomplete v-else :enable-geolocation="true" ref="address" :country="['au']" id="map" classname="form-control" placeholder="Please type full address." v-on:placechanged="googleMapApiResponseData" />
                            <div class="text-danger" v-if="errors.userId">{{ errors.userId }}</div>
                            <div class="text-danger" v-if="errors.addressId">{{ errors.addressId }}</div>
                        </div>

                    </div>
                </div>
                <div v-if="!addressInformationSelectDiv && hasAddressData" class="row">
                    <div class="col-12 d-flex flex-row bx-flashing text-warning">
                        <i class='bx bx-info-circle' style="line-height: 1.5rem !important;"></i>
                        <span>&nbsp;Please modify the following address fields, if there anything wrong!</span>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Street Address *</label>
                            <input v-model="postAddressData.street" type="text" class="form-control" placeholder="Enter street address" />
                            <div class="text-danger" v-if="errors.street">{{ errors.street }}</div>
                            <div class="text-danger" v-if="errors.addressId">{{ errors.addressId }}</div>
                        </div>
                    </div>
                    <div class="col-12 col-md-3">
                        <div class="form-group">
                            <label>Suburbs/ Territory *</label>
                            <input v-model="postAddressData.suburb" type="text" class="form-control" placeholder="Enter suburbs/ territory" />
                            <div class="text-danger" v-if="errors.suburb">{{ errors.suburb }}</div>
                        </div>
                    </div>
                    <div class="col-12 col-md-3">
                        <div class="form-group">
                            <label>State *</label>
                            <VueMultiselect class="select-input" v-model="selectedState" :allowEmpty="false" :options="states" :close-on-select="true" placeholder="Select state" label="name" track-by="value" :show-labels="false" />
                            <div class="text-danger" v-if="errors.state">{{ errors.state }}</div>
                        </div>
                    </div>
                    <div class="col-12 col-md-3">
                        <div class="form-group">
                            <label>Post Code *</label>
                            <input v-model="postAddressData.post_code" type="text" class="form-control" placeholder="Enter code" required />
                            <div class="text-danger" v-if="errors.postCode">{{ errors.postCode }}</div>
                        </div>
                    </div>
                    <div class="col-12 col-md-3">
                        <div class="form-group">
                            <label>Country *</label>
                            <input v-model="postAddressData.country" type="text" class="form-control" readonly required />
                            <div class="text-danger" v-if="errors.country">{{ errors.country }}</div>
                        </div>
                    </div>
                </div>
                <div v-if="!addressInformationSelectDiv && businessStatus" class="row">
                    <div class="col-12">
                        <div class="form-group">
                            <label>Business Name *</label>
                            <input v-model="postBusinessData.name" type="text" class="form-control" />
                            <div class="text-danger" v-if="errors.business.name">{{ errors.business.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-0 pt-0">
                <button v-if="addressInformationSelectDiv" class="btn btn-brand ml-1" :disabled="!selectedAddress.value" @click="getUserAddress(selectedAddress.value)">Save Change
                </button>
                <button v-else class="btn bg-brand text-white ml-1" :disabled="!hasAddressData || (businessStatus && postBusinessData.name ==='')" @click="createUserAddress">Create & Save
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
//mixins
import Loader from '~/mixins/Loader';
import ShowToastMessage from '~/mixins/ShowToastMessage';


// core packages
import {
    mapGetters,
    mapActions
} from 'vuex';

// packages
import VueMultiselect from 'vue-multiselect';
import VueGoogleAutocomplete from 'vue-google-autocomplete';

export default {
    name: "UserAddressCreateOnlyModal",
    mixins: [ShowToastMessage, Loader],
    emits: ['emitUserAddress'],
    components: {
        VueMultiselect,
        VueGoogleAutocomplete
    },
    props: {
        modalName: {
            type: String,
            default: "userAddressCreateOnlyModal",
            required: true,
        },
        // addressCreateForModelName: {
        //   type: String,
        //   required: true,
        // },
        // modelId: {
        //   type: [Number, String],
        //   required: true
        // },
        userId: {
            type: [Number, String],
            required: true,
        },
        // selectedAddressData: {
        //   type: Object,
        //   required: false,
        // },
        businessStatus: {
            type: Boolean,
            default: false,
            required: false,
        },
        modelPrimaryAddressId: {
            type: [Number, String],
            required: true,
        }
    },

    data() {
        return {
            addressInformationSelectDiv: false,
            hasUserAddresses: false,

            postAddressData: {
                user_id: '',
                street: '',
                suburb: '',
                state: '',
                post_code: '',
                country: '',
            },

            selectedState: {
                value: '',
                name: 'None',
            },

            selectedAddress: {
                value: '',
                name: 'None'
            },

            postBusinessData: {
                user_id: '',
                address_id: '',
                name: '',
            },

            errors: {
                userId: '',
                street: '',
                suburb: '',
                state: '',
                postCode: '',
                country: '',
                business: {
                    userId: '',
                    addressId: '',
                    name: '',
                },
            },

            getSettingsParams: {
                type: ['default'],
                key: ['default_state'],
            },
        }
    },

    computed: {
        ...mapGetters({
            addresses: 'addresses/addresses',
        }),

        states() {
            return this.$store.getters['settings/settingDefaultState'].value
        },

        userAddresses() {
            let userAddresses = this.addresses.length > 0 ? this.businessStatus ?
                this.addresses.filter((address) => address.business && address.business.id && address.id !== this.modelPrimaryAddressId).map((address) => {
                    let businessName = address.business && address.business.name ? address.business.name : '';
                    let addressId = address.id;
                    let addressStreet = address.street;
                    let addressSuburb = address.suburb;
                    let addressState = address.state.toUpperCase();
                    let addressPostCode = address.post_code;
                    let addressCountry = address.country;

                    return {
                        value: addressId,
                        name: `${businessName} (${addressStreet}, ${addressSuburb} ${addressState} ${addressPostCode}, ${addressCountry})`,
                    };
                }) :
                this.addresses.filter((address) => address.id !== this.modelPrimaryAddressId).map((address) => {
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
                }) : [];

            return [{
                    value: '',
                    name: 'None'
                },
                ...userAddresses
            ];
        },

        hasAddressData() {
            return !!(this.postAddressData.street || this.postAddressData.suburb || this.postAddressData.state || this.postAddressData.post_code);
        },
    },
    watch: {
        userId() {
            this.getUserAddresses();
            this.postAddressData.user_id = this.userId;
            this.postBusinessData.user_id = this.userId;
        },

        selectedAddressData(selectedAddressData) {
            this.selectedAddress.value = selectedAddressData.value;
            this.selectedAddress.name = selectedAddressData.name;
        },

        selectedState(selectedState) {
            this.postAddressData.state = selectedState.value;
        },
    },
    methods: {
        ...mapActions({
            getAddresses: 'addresses/getAddresses',
            getSettings: 'settings/getSettings',
            postAddress: 'addresses/postAddress',
            postBusiness: 'businesses/postBusiness',
        }),
        async closeModal() {
            document.querySelector(`[data-bs-target="#${this.modalName}"]`).click(); // modal close
        },

        async getSettingList() {
            await this.getSettings(this.getSettingsParams);
        },

        async getUserAddresses() {
            let paramObj = {
                user_id: this.userId,
            };

            if (this.businessStatus) {
                paramObj.with_relation = ['business'];
            }

            await this.getAddresses(paramObj).then(async (response) => {
                if (response.status === 200 && this.addresses.length > 0) {
                    this.addressInformationSelectDiv = true;
                    this.hasUserAddresses = true;
                }
            });
        },

        googleMapApiResponseData: function (googleMapApiResponseData) {
            this.loader(true);

            let streetNumber = googleMapApiResponseData.street_number !== undefined ? googleMapApiResponseData.street_number : '';
            let streetName = googleMapApiResponseData.route !== undefined ? googleMapApiResponseData.route : '';
            let suburbs = googleMapApiResponseData.locality !== undefined ? googleMapApiResponseData.locality : '';
            let state = googleMapApiResponseData.administrative_area_level_1 !== undefined ? googleMapApiResponseData.administrative_area_level_1 : '';
            let postCode = googleMapApiResponseData.postal_code !== undefined ? googleMapApiResponseData.postal_code : '';
            let country = googleMapApiResponseData.country !== undefined ? googleMapApiResponseData.country : '';

            this.postAddressData.street = streetNumber ? `${streetNumber} ${streetName}` : streetName;
            this.postAddressData.suburb = suburbs;
            this.postAddressData.state = state.toLowerCase();
            this.postAddressData.post_code = postCode;
            this.postAddressData.country = country;

            if (state) {
                let addressStateIndex = this.states.findIndex(item => item.value === state.toLowerCase());
                if (addressStateIndex !== -1) {
                    let addressState = this.states[addressStateIndex];

                    this.selectedState.value = addressState.value;
                    this.selectedState.name = addressState.name;
                }
            }

            this.loader(false);

        },

        async emitUserAddress(addressDataObj) {
            this.$emit('emitUserAddress', {
                addressData: addressDataObj,
            });
        },

        async getUserAddress(addressId) {
            await this.closeModal();
            const address = this.addresses.find((address) => address.id === addressId);
            let addressDataObj = {
                id: addressId ?? null,
                street: address.street,
                suburb: address.suburb,
                state: address.state,
                postCode: address.post_code,
                country: address.country,
                business: {
                    id: address.business && address.business.id ? address.business.id : '',
                    name: address.business && address.business.name ? address.business.name : '',
                }
            };
            await this.emitUserAddress(addressDataObj);
        },

        async createUserAddress() {
            this.loader(true);
            await this.postAddress(this.postAddressData).then(async (response) => {
                if (response.status === 200 || response.status === 201) {
                    let address = this.$store.getters['addresses/address'];
                    this.postBusinessData.address_id = address.id;

                    if (this.businessStatus) {
                        await this.createSingleBusinessAddress();
                        if (this.errors.business.name || this.errors.business.addressId || this.errors.business.userId) {
                            this.loader(false);
                            return;
                        }
                    }
                    let business = this.$store.getters['businesses/business'];

                    let newAddress = this.businessStatus ? {
                        value: address.id,
                        name: `${business.name} (${address.street}, ${address.suburb} ${address.state} ${address.post_code}, ${address.country})`,
                    } : {
                        value: address.id,
                        name: `${address.street}, ${address.suburb} ${address.state} ${address.post_code}, ${address.country}`
                    };

                    this.userAddresses.push(newAddress);

                    this.selectedAddress.value = newAddress.value;
                    this.selectedAddress.name = newAddress.name;
                    let addressDataObj = {
                        id: address.id,
                        street: address.street,
                        suburb: address.suburb,
                        state: address.state,
                        postCode: address.post_code,
                        country: address.country,
                        business: {
                            id: address.business && address.business.id ? address.business.id : '',
                            name: address.business && address.business.name ? address.business.name : '',
                        }
                    };
                    await this.emitUserAddress(addressDataObj);

                    this.hasUserAddresses = true;
                    this.addressInformationSelectDiv = true;
                }
                this.errors.userId = response.errors && response.errors.user_id ? response.errors.user_id[0] : '';
                this.errors.street = response.errors && response.errors.street ? response.errors.street[0] : '';
                this.errors.suburb = response.errors && response.errors.suburb ? response.errors.suburb[0] : '';
                this.errors.state = response.errors && response.errors.state ? response.errors.state[0] : '';
                this.errors.postCode = response.errors && response.errors.post_code ? response.errors.post_code[0] : '';
                this.errors.country = response.errors && response.errors.country ? response.errors.country[0] : '';

                this.showToastMessage(response);
            });
            this.loader(false);
            await this.closeModal();
        },

        async createSingleBusinessAddress() {
            await this.postBusiness(this.postBusinessData).then(async (response) => {

                this.errors.business.name = response.errors && response.errors.name ? response.errors.name[0] : '';
                this.errors.business.addressId = response.errors && response.errors.address_id ? response.errors.address_id[0] : '';
                this.errors.business.userId = response.errors && response.errors.user_id ? response.errors.user_id[0] : '';

                if (response.message) {
                    this.showToastMessage(response);
                }
            });
        },
    },

    async mounted() {
        await this.getSettingList();
    },
}
</script>
