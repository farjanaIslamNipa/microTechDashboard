<template>
<div>
    <div class="auth-bg">
        <div class="container py-5 mb-5">
            <div class="row justify-content-center align-items-center py-5">
                <div class="col-lg-5">
                    <div class="auth-form px-4 py-5">
                      <h3 class="text-white text-center fw-light pb-2">  Forgot Password?</h3>
                        <div v-if="step === 0">
                            <p class="text-white">How should we deliver the verification code to you? Please, Select a channel to get your verification code.</p>
                            <!-- <p class="text-white">Please enter your email address or mobile number to search for your account.</p> -->
                            <div class="d-flex justify-content-center pt-3">
                                <div class="text-white">
                                    <input v-model="postForgotPasswordData.preferred_channel" class="forget-pass-radio-input" id="email-for-forget-pass" value="email" type="radio" name="preferred_channel" checked="checked" />
                                    <label for="email-for-forget-pass" class="forget-pass-radio-label font-weight-bold">Email</label>
                                </div>
                                <div class="ms-4 text-white">
                                    <input v-model="postForgotPasswordData.preferred_channel" class="forget-pass-radio-input" id="sms-for-forget-pass" value="sms" type="radio" name="preferred_channel" />
                                    <label for="sms-for-forget-pass" class="forget-pass-radio-label font-weight-bold">SMS</label>
                                </div>
                            </div>
                            <div class="mt-5 text-center">
                                <button :disabled="!postForgotPasswordData.preferred_channel" @click="nextStepToSendCode()" class="btn text-center auth-btn">Next</button>
                            </div>
                        </div>
                        <div class="" v-if="step === 1">

                            <div class="mb-5">
                                <div class="pt-3 country-select row" v-if="postForgotPasswordData.preferred_channel === 'sms'">
                                    <div class="col-12">
                                        <multi-select v-model="selectedCountryCode" class="col-12 col-sm-12 p-0 m-0 country-code-select" :class="postForgotPasswordData.preferred_channel === 'sms' ? ' col-md-4' : 'col-md-12'" :options="countryCode" :close-on-select="true" placeholder="Country Code" label="name" track-by="name" :show-labels="false" :allow-empty="false" />
                                    </div>
                                    <div class="col-12 mt-4">
                                        <input v-model="postForgotPasswordData.username" type="text" class="form-control col-12 col-sm-12" :class="postForgotPasswordData.preferred_channel === 'sms' ? ' col-md-8 phone-input' : 'col-md-12'" :placeholder="postForgotPasswordData.preferred_channel === 'email' ? 'Email Address' : 'Phone Number' ">
                                    </div>
                                </div>
                                <div v-else class="form-floating">
                                    <input v-model="postForgotPasswordData.username" type="email" class="form-control auth-input" placeholder="Enter your email address">
                                    <label for="" class="text-white">Email address</label>
                                </div>
                            </div>
                            <div class="mt-4 text-center">
                                <button :disabled="!postForgotPasswordData.username" @click="submitForgotPassword" class="btn text-center auth-btn">Send</button>
                            </div>
                        </div>
                        <div class="" v-if="step === 2">
                            <p class="text-white">{{verificationCodeStepMessage}}</p>
                            <div class="mb-5">
                                <div class="form-floating">
                                    <input v-model="postForgotPasswordVerifyCodeData.code" type="text" class="form-control auth-input" placeholder="Enter verification code">
                                    <label for="" class="text-white">Verification Code</label>
                                </div>
                            </div>
                            <div class="mt-5 text-center">
                                <button @click="submitForgotPasswordVerifyCode" class="btn text-center auth-btn">VERIFY CODE</button>
                            </div>
                            <div class="text-left"><small class="text-warning text-left">Resend code in {{countDown}}s. <a @click="resendCode" v-if="countDown===0" style="color: tomato;" href="#">(Resend Code)</a></small></div>
                        </div>
                        <div class="" v-if="step === 3">
                            <h5 class="text-white">Reset your Password.</h5>
                            <div class="mb-5">
                                <div class="form-floating">
                                    <input v-model="postResetPasswordData.password" type="passowrd" class="form-control auth-input" placeholder="Enter your passowrd address">
                                    <label for="" class="text-white">Password</label>
                                </div>
                                <div class="form-floating">
                                    <input v-model="postResetPasswordData.password_confirmation" type="password" class="form-control auth-input" placeholder="Enter your email address">
                                    <label for="" class="text-white">Confirm Password</label>
                                </div>
                            </div>
                            <div class="mt-5 text-center">
                                <button @click="submitResetPassword" class="btn text-center auth-btn">RESET PASSWORD</button>
                            </div>
                        </div>
                        <div class="mt-4 text-center">
                            <p class="text-white mb-0 text-300">Remember Password? <span class="ps-2">
                                    <nuxt-link :to="{name: 'login'}" class="text-300 brand-color text-500 auth-link">Login</nuxt-link>
                                </span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Loader from '~/mixins/Loader';
import ShowToastMessage from '~/mixins/ShowToastMessage';
import {
    mapActions
} from 'vuex';
export default {
    name: "ForgetPassword",
    layout: 'website-layout',
    mixins: [Loader, ShowToastMessage],
    data() {
        return {
            interval: '',
            step: 0,
            countDown: 60,
            email: '',
            verificationCodeStepMessage: '',
            postForgotPasswordData: {
                preferred_channel: '',
                country_code: '',
                username: '',
            },

            postForgotPasswordVerifyCodeData: {
                username: '',
                code: '',
            },

            countryCode: [{
                name: 'AU (61)',
                value: '+61',
            }, ],

            selectedCountryCode: {
                name: 'AU (61)',
                value: '+61',
            },

            postResetPasswordData: {
                username: "",
                password: '',
                password_confirmation: '',
            },
        }
    },
    methods: {
        ...mapActions({
            postForgotPassword: 'forgotPassword/postForgotPassword',
            postForgotPasswordVerifyCode: 'forgotPasswordVerifyCode/postForgotPasswordVerifyCode',
            putResetPassword: 'resetPassword/putResetPassword',
            // logIn: 'login/logIn',
        }),

        nextStepToSendCode() {

            this.step = 1;
        },

        async submitForgotPassword() {
            if (this.postForgotPasswordData.preferred_channel === "sms") {
               this.postForgotPasswordData.country_code = this.selectedCountryCode.value
            }
            this.loader(true);
            await this.postForgotPassword(this.postForgotPasswordData).then(async (response) => {
                this.loader(false)
                if (response.message) {
                    this.showToastMessage(response);
                }
                if (response.status === 200 && response ?.type === "success") {
                    this.verificationCodeStepMessage = response.message;
                    this.step = 2;
                    this.postForgotPasswordVerifyCodeData.username = this.postForgotPasswordData.username;
                    this.interval = setInterval(() => {
                        if (this.countDown === 0) {
                            clearInterval(this.interval)
                        } else {
                            this.countDown--
                        }
                    }, 1000)
                    // this.nextStepToCodeValidation();
                }

                // this.errors.preferredChannel = response.errors && response.errors.preferred_channel ? response.errors.preferred_channel[0] : '';
                // this.errors.username = response.errors && response.errors.username ? response.errors.username[0] : '';
                // this.errors.countryCode = response.errors && response.errors.country_code ? response.errors.country_code : '';

                // if (this.errors.preferredChannel) {
                //     this.step = 1;
                // }
            });
        },
        async resendCode() {
            this.postForgotPasswordVerifyCodeData.code = "";
            this.postForgotPasswordVerifyCodeData.username = "";
            this.countDown = 60;
            await this.submitForgotPassword();
        },
        async submitForgotPasswordVerifyCode() {
            this.loader(true);
            await this.postForgotPasswordVerifyCode(this.postForgotPasswordVerifyCodeData).then(async (response) => {
                this.loader(false);

                if (response.status === 200) {
                    this.step = 3;
                    this.postResetPasswordData.username = this.postForgotPasswordVerifyCodeData.username;
                    // await this.$router.push({
                    //     name: 'customerResetPassword',
                    //     params: {
                    //         username: this.username,
                    //     }
                    // });
                }

                // this.errors.username = response.errors && response.errors.username ? response.errors.username[0] : '';
                // this.errors.code = response.errors && response.errors.code ? response.errors.code[0] : '';

                // if (this.errors.username) {
                //     this.step = 2;
                // }

                if (response.message) {
                    this.showToastMessage(response);
                }

            })
        },
        async submitResetPassword() {
            this.loader(true);
            await this.putResetPassword(this.postResetPasswordData).then(async (response) => {
                this.loader(false);

                if (response.message) {
                    this.showToastMessage(response);
                }
                if (response.status === 200) {
                    await this.$router.push({
                        name: 'login',
                    });
                }

                // this.errors.username = response.errors && response.errors.username ? response.errors.username[0] : '';
                // this.errors.password = response.errors && response.errors.password ? response.errors.password[0] : '';
                // this.errors.passwordConfirmation = response.errors && response.errors.passwordConfirmation ? response.errors.passwordConfirmation[0] : '';

                // if (this.errors.username) {
                //     await this.$router.replace({
                //         name: 'customerForgotPassword',
                //         params: {
                //             initToastDataMessage: 'Invalid Username.',
                //             initToastDataType: 'error',
                //         },
                //     });
                // }

            })
        },
    },

}
</script>

<style scoped>
.forget-pass-layout {
    background-color: #fdefe7;
}

.forget-pass-form {
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 10px 50px;
}

.forget-pass-radio-input {
    position: absolute;
    opacity: 0;
}

.forget-pass-radio-input+.forget-pass-radio-label:before {
    content: '';
    background: #f4f4f4;
    border-radius: 24%;
    border: 1px solid gray;
    display: inline-block;
    width: 1.3em;
    height: 1.3em;
    position: relative;
    margin-right: 8px;
    vertical-align: top;
    cursor: pointer;
    text-align: center;
    transition: all 250ms ease;
}

.forget-pass-radio-input:checked+.forget-pass-radio-label:before {
    background-color: var(--brandColor);
    box-shadow: inset 0 0 0 4px #f4f4f4;
}

.forget-pass-radio-input:focus+.forget-pass-radio-label:before {
    outline: none;
    border-color: var(--brandColor);
}
</style>
