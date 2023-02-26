<template>
<div class="modal fade " :id="modalName" tabindex="-1" role="dialog" :aria-labelledby="modalName" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog  modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-brand">
                <h5 class="modal-title text-white">
                    Update Information
                </h5>
                <button type="button" class="btn close text-white" @click="closeModal()" aria-label="Close">
                    <i class="fa-solid fa-x text-white"></i>
                </button>
            </div>
            <div class="modal-body">
                <div>
                    <div class="row ">
                        <div class="col-12" v-if="putUserData.first_name !== undefined ">
                            <div class="form-group">
                                <div class="">
                                    <label>First name *</label>
                                    <input v-model="putUserData.first_name" type="text" class="form-control " placeholder="Enter first name" />
                                    <div class="text-danger" v-if="errors.firstName">{{ errors.firstName }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12" v-if="putUserData.last_name !== undefined">
                            <div class="form-group">
                                <div class="">
                                    <label>Last name *</label>
                                    <input v-model="putUserData.last_name" type="text" class="form-control " placeholder="Enter last name" />
                                    <div class="text-danger" v-if="errors.lastName">{{ errors.lastName }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12" v-if="putUserData.phone_number !== undefined">
                            <div class="form-group">
                                <div class="">
                                    <label>Phone number</label>
                                    <input v-model="putUserData.phone_number" type="tel" class="form-control " placeholder="ie. 0412345678" :="(userData.phoneNumber === '' || userData.phoneNumber === null ) ? false : true" />
                                    <div class="text-danger" v-if="errors.phoneNumber">{{ errors.phoneNumber }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12" v-if="putUserData.email !== undefined">
                            <div class="form-group">
                                <div class="">
                                    <label>Email address *</label>
                                    <input v-model="putUserData.email" type="email" :="(userData.email === '' || userData.email === null ) ? false : true" class="form-control " placeholder="ie. example@gmail.com" />
                                    <div class="text-danger" v-if="errors.email">{{ errors.email }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12" v-if="putUserData.date_of_birth !== undefined">
                            <div class="form-group">
                              <no-ssr>
                                <v-date-picker v-model="putUserData.date_of_birth" :update-on-input="true" :masks="{input: ['DD MMMM YYYY']}" :max-date='new Date()' :model-config="{ type: 'string', mask: 'YYYY-MM-DD'}">
                                    <template v-slot="{ inputValue, togglePopover }">
                                        <div class="d-flex align-items-center" @click="togglePopover()" style="cursor: pointer;">
                                            <i class='bx bx-calendar mr-1'></i>
                                            <input class="form-control" placeholder="Select Date" :value="inputValue" style="cursor: pointer;" />
                                        </div>
                                    </template>
                                </v-date-picker>
                            </no-ssr>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="modal-footer border-0 pt-0">
                <button type="submit" class="btn bg-brand text-white" @click="updateSingleUser">

                    <span class="">Save Changes</span>
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
//mixins

// core packages
import {
    mapGetters,
    mapActions
} from 'vuex';
import Loader from '~/mixins/Loader';
import ShowToastMessage from '~/mixins/ShowToastMessage';

export default {
    name: "userUpdateModal",
    mixins: [ShowToastMessage, Loader],
    emits: ['updatedUserData'],
    props: {
        modalName: {
            type: String,
            default: "userAndUserRoleUpdateModal"
        },
        userId: {
            type: [Number, String],
            required: true,
        },
        selectedPropertyNameForUpdate: {
            type: [String],
            required: true,
        },
        userData: {
            type: Object,
            required: false,
            default: () => ({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
            }),
        },

    },
    components: {},
    data() {
        return {
            selctedProperty: '',
            putUserData: {
                // role_id: '',
                // first_name: '',
                // last_name: '',
                // email: '',
                // phone_number: '',
            },
            errors: {
                roleId: '',
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',

            },
        }
    },

    computed: {
        ...mapGetters({
            user: 'users/user',
        }),

    },

    watch: {
        selectedPropertyNameForUpdate(selectedPropertyNameForUpdate) {
            console.log(selectedPropertyNameForUpdate);
            this.putUserData = {};
            this.selctedProperty = selectedPropertyNameForUpdate;
            switch (this.selctedProperty) {
                case 'first_name':
                    this.putUserData = {
                        first_name: this.user ?.first_name ?? ''
                    }
                    break;
                case 'last_name':
                    this.putUserData = {
                        last_name: this.user ?.last_name ?? ''
                    }

                    break;
                case 'email':
                    this.putUserData = {
                        email: this.user ?.email ?? ''
                    }
                    break;
                case 'phone_number':
                    this.putUserData = {
                        phone_number: this.user ?.phone_number ?? ''
                    }
                    break;
                case 'date_of_birth':
                    this.putUserData = {
                        date_of_birth: this.user ?.date_of_birth ?? ''
                    }
                    break;

                default:
                    break;
            }
        },
        // selectedPropertyNameForUpdate: {
        //     handler: function (selectedPropertyNameForUpdate) {
        //       console.log(selectedPropertyNameForUpdate);
        //     this.putUserData = {};
        //     this.selctedProperty = selectedPropertyNameForUpdate;
        //     switch (this.selctedProperty) {
        //         case 'first_name':
        //             this.putUserData = {
        //                 first_name: this.user ?.first_name ?? ''
        //             }
        //             break;
        //         case 'last_name':
        //             this.putUserData = {
        //                 last_name: this.user ?.last_name ?? ''
        //             }

        //             break;
        //         case 'email':
        //             this.putUserData = {
        //                 email: this.user ?.email ?? ''
        //             }
        //             break;
        //         case 'phone_number':
        //             this.putUserData = {
        //                 phone_number: this.user ?.phone_number ?? ''
        //             }
        //             break;
        //         case 'date_of_birth':
        //             this.putUserData = {
        //                 date_of_birth: this.user ?.date_of_birth ?? ''
        //             }
        //             break;

        //         default:
        //             break;
        //     }
        //     },
        //     immediate: true
        // },
        userData(userData) {
            // this.putUserData.first_name = userData.firstName;
            // this.putUserData.last_name = userData.lastName;
            // this.putUserData.email = userData.email;
            // this.putUserData.phone_number = userData.phoneNumber;
        },

    },
    methods: {
        ...mapActions({
            putUser: 'users/putUser',
        }),

        closeModal() {
            this.putUserData = {};
            document.querySelector(`[data-bs-target="#${this.modalName}"]`).click(); // modal close
        },
        async updateSingleUser() {
            let data = {};

            data = {
                ...this.putUserData

            };

            const dataObj = {
                id: this.userId,
                data: data,
            };
            this.loader(true);
            await this.putUser(dataObj).then(async (response) => {
                this.loader(false);
                if (response.status === 200) {
                    document.querySelector(`[data-bs-target="#${this.modalName}"]`).click(); // modal close

                    let toastObj = {
                        message: 'Info has Updated',
                        type: 'success'
                    };
                    this.showToastMessage(toastObj);

                    this.$emit('updatedUserData', {
                        userData: {
                            firstName: this.user.first_name,
                            lastName: this.user.last_name,
                            email: this.user.email,
                            phoneNumber: this.user.phone_number,
                        },
                    });
                }

                this.errors.firstName = response.errors && response.errors.first_name ? response.errors.first_name[0] : '';
                this.errors.lastName = response.errors && response.errors.last_name ? response.errors.last_name[0] : '';
                this.errors.email = response.errors && response.errors.email ? response.errors.email[0] : '';
                this.errors.phoneNumber = response.errors && response.errors.phone_number ? response.errors.phone_number[0] : '';

                this.showToastMessage(response);
            });
        },
    },
}
</script>

<style>

</style>
