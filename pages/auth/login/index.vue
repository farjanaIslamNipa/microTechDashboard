<template>
<div>
    <div class="auth-bg">
        <div class="container py-5">
            <div class="row justify-content-center align-items-center py-5">
                <div class="col-lg-5">
                    <div class="auth-form px-4 py-5">
                        <div class="mb-5">
                            <input v-model="postLoginData.username" type="email" class="form-control auth-input" placeholder="Enter your email address">
                        </div>
                        <div class="mb-2 position-relative">
                            <!-- <label for="" class="text-white">Password:</label> -->
                            <input  v-model="postLoginData.password" :type="showPassword ? 'password' : 'text'" class="form-control auth-input" placeholder="Enter your password">
                            <button @click="showPassword=!showPassword" class="btn visibility-icon">
                                <span v-if="showPassword"><i class="fa-solid fa-eye-slash"></i></span>
                                <span v-else><i class="fa-solid fa-eye"></i></span>
                            </button>
                        </div>
                        <div class="d-flex justify-content-between text-white">
                            <div class="d-flex align-items-center ms-2">
                                <div class="remember-me-checkbox">
                                    <label>
                                        <input type="checkbox" />
                                        <span class="checkbox"></span>
                                    </label>
                                </div>
                                <p class="mb-0 d-inline-block text-300 ms-2">Remember me</p>
                            </div>
                            <div>
                                <nuxt-link :to="{name:'forget-password'}" class="text-white text-300">Forget Password?</nuxt-link>
                            </div>
                        </div>
                        <div class="mt-5 text-center">
                            <button class="btn text-center auth-btn"  @click="submitLogin">Login</button>
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
    name: 'LoginPage',
    layout: 'website-layout',
    mixins: [Loader, ShowToastMessage],
    data() {
        return {
            showPassword: true,
            postLoginData: {
                username: '',
                password: '',
                customer_flag: 1,
                device_name: '',
            },
        }
    },
    methods: {
        ...mapActions({
            logIn: 'login/logIn',
        }),

        deviceName() {
            let navigatorAppVersion = navigator.appVersion;
            let navigatorUserAgent = navigator.userAgent;

            let osName = 'Unknown OS';
            let browserName = navigator.appName;

            // In Opera 15+, the true version is after "OPR/"
            if (navigatorUserAgent.indexOf("OPR/") !== -1) {
                browserName = "Opera";
            }
            // In older Opera, the true version is after "Opera" or after "Version"
            else if (navigatorUserAgent.indexOf("Opera") !== -1) {
                browserName = "Opera";
            }
            // In MSIE, the true version is after "MSIE" in userAgent
            else if (navigatorUserAgent.indexOf("MSIE") !== -1) {
                browserName = "Microsoft Internet Explorer";
            }
            // In Chrome, the true version is after "Chrome"
            else if (navigatorUserAgent.indexOf("Chrome") !== -1) {
                browserName = "Chrome";
            }
            // In Safari, the true version is after "Safari" or after "Version"
            else if (navigatorUserAgent.indexOf("Safari") !== -1) {
                browserName = "Safari";
            }
            // In Firefox, the true version is after "Firefox"
            else if (navigatorUserAgent.indexOf("Firefox") !== -1) {
                browserName = "Firefox";
            }
            // In most other browsers, "name/version" is at the end of userAgent
            else if ((navigatorUserAgent.lastIndexOf(' ') + 1) < (navigatorUserAgent.lastIndexOf('/'))) {
                browserName = navigatorUserAgent.substring(navigatorUserAgent.lastIndexOf(' ') + 1, navigatorUserAgent.lastIndexOf('/'));

                if (browserName.toLowerCase() === browserName.toUpperCase()) {
                    browserName = navigator.appName;
                }
            }

            if (navigatorAppVersion.indexOf("Win") !== -1) osName = "Windows";
            if (navigatorAppVersion.indexOf("Mac") !== -1) osName = "MacOS";
            if (navigatorAppVersion.indexOf("X11") !== -1) osName = "UNIX";
            if (navigatorAppVersion.indexOf("Linux") !== -1) osName = "Linux";

            return `${browserName}-${osName}`;
        },

        async submitLogin() {
            this.loader(true);
            await this.logIn(this.postLoginData)
                .then((response) => {
                    this.loader(false);
                    if (response.status === 200) {
                        this.$router.push({
                            name: 'dashboard',
                        });
                    }

                    if (response.message) {
                        this.showToastMessage(response);
                    }

                    if (response.errors) {
                        this.errors = response.errors;
                    }
                });
        },

    },
    mounted() {
        this.postLoginData.device_name = this.deviceName();
    },
}
</script>

<style scoped>
</style>
