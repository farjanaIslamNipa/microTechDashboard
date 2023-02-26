<template>
    <div class="">
        <div class="auth-bg">
            <div class="container py-5">
                <div class="row justify-content-center align-items-center">
                    <div class="col-lg-5">
                        <div class="auth-form px-4 py-4">
                            <div class="form-floating mb-4">
                                <input v-model="firstName" type="text" class="form-control auth-input text-capitalize" placeholder="Enter your first name">
                                <label for="" class="text-white">First Name</label>
                                <!-- <p class="mb-0 text-danger">This field is required</p> -->
                            </div>
                            <div class="form-floating mb-4">
                                <input v-model="lastName" type="text" class="form-control auth-input text-capitalize" placeholder="Enter your last name">
                                <label for="" class="text-white">Last Name</label>
                                <!-- <p class="mb-0 text-danger">This field is required</p> -->
                            </div>
                            <div class="form-floating mb-4">
                                <input v-model="email" type="email" class="form-control auth-input"
                                    placeholder="Enter your email address">
                                <label for="" class="text-white">Email address</label>
                            </div>
                            <div class="form-floating mb-4">
                                <input v-model="phone" type="text" class="form-control auth-input" placeholder="Enter your phone number">
                                <label for="" class="text-white">Phone Number</label>
                            </div>
                            <div class="form-floating mb-4 position-relative">
                                <input v-model="password" :type="showPassword ? 'password' : 'text'" class="form-control auth-input" placeholder="Enter your password">
                                <button @click="showPassword = !showPassword" class="btn visibility-icon">
                                    <span v-if="showPassword"><i class="fa-solid fa-eye-slash"></i></span>
                                    <span v-else><i class="fa-solid fa-eye"></i></span>
                                </button>
                                <label for="" class="text-white">Password:</label>
                            </div>
                            <div class="form-floating mb-4 position-relative">
                                <input v-model="confirmPassword" :type="showConfirmPassword ? 'password' : 'text'" class="form-control auth-input" placeholder="Enter your password">
                                <button @click="showConfirmPassword = !showConfirmPassword" class="btn visibility-icon">
                                    <span v-if="showConfirmPassword"><i class="fa-solid fa-eye-slash"></i></span>
                                    <span v-else><i class="fa-solid fa-eye"></i></span>
                                </button>
                                <label for="" class="text-white">Confirm Password:</label>
                            </div>
                            <div class="form-floating mb-4 sign-up-address-input">
                                <google-auto-complete
                                    id="map"
                                    ref="address"
                                    class="form-control"
                                    placeholder="Please type your address"
                                    country="au"
                                    @placechanged="getAddressData"
                                    >
                                </google-auto-complete>
                                <label for="" class="text-white">Type your address</label>
                                <!-- <p class="mb-0 text-danger">This field is required</p> -->
                            </div>
                            <div v-if="(street || suburb || state || zipCode)">
                      <p class="text-18 text-center mb-3 mt-4 text-blue"><span class="blink-text brand-color me-2"><i class="fa-solid fa-circle-info"></i></span> <span class="underline text-warning warning-text">Please modify the following address fields, if there anything wrong.</span></p>
                      <div class="form-floating mb-4">
                        <input v-model="street" type="text" name="street" class="form-control auth-input" placeholder="Enter street name">
                        <label class="text-white" for="booking-street">Street</label>
                      </div>
                      <div class="form-floating mb-4">
                        <input v-model="suburb" type="text" name="suburb" class="form-control auth-input" placeholder="Enter suburb">
                        <label class="text-white" for="booking-suburb">Suburb</label>
                      </div>

                      <div class="row">
                        <div class="col-md-6 col-12 mb-4">
                          <div class="form-floating">
                            <input v-model="state" type="text" class="form-control auth-input" placeholder="Enter state name">
                            <label class="text-white" for="booking-state">State</label>
                          </div>
                        </div>
                        <div class="col-md-6 col-12 mb-4">
                          <div class="form-floating">
                            <input v-model="zipCode" type="text" class="form-control auth-input" name="zipCode" placeholder="Enter zip code">
                            <label class="text-white" for="booking-zip">Zip Code</label>
                          </div>
                        </div>
                      </div>
                    </div>
                            <div class="pt-4 text-center">
                                <button class="btn text-center auth-btn" :disabled="isDisabled">Sign up</button>
                            </div>
                            <div class="mt-4 mb-4 text-center">
                                <p class="text-white mb-0 text-300">Already a member? <span class="ps-2">
                                    <nuxt-link :to="{ name: 'login' }" class="text-300 brand-color text-500 auth-link">Login</nuxt-link></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SignUp',
    layout: 'website-layout',
    data() {
        return {
            showPassword: true,
            showConfirmPassword: true,
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password:'',
            confirmPassword:'',
            street: '',
            suburb: '',
            state: '',
            zipCode: '',
            }
    },
    methods: {
      // Setting address data in state from google auto complete
      getAddressData (addressData) {
        this.street = addressData.route;
        this.suburb = addressData.locality;
        this.state = addressData.administrative_area_level_1;
        this.zipCode = addressData.postal_code;
      }
    },
    computed: {
      // Condition to disable submit button
      isDisabled(){
        return !this.firstName || !this.lastName || !this.phone || !this.email || !this.password || !this.confirmPassword || !this.street || !this.suburb || !this.state || !this.zipCode  ? true : false
      }
    }
}
</script>

<style scoped>
.warning-text{
    font-size: 14px;
}
</style>
