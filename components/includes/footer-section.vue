<template>
<div id="footer" class="light-gray-bg">
    <div :class="(isLogin || isRegister || isForgetPassword) ? '' : 'py-4'" class=" bg-white"></div>
    <div class="container footer-margin">
        <div :class="(isLogin || isRegister || isForgetPassword) ? 'd-none' : ''" data-aos="flip-up" data-aos-delay="200" data-aos-duration="1500" class="footer-top-bg py-4 px-2 text-center text-white">
            <h5 class="text-400">Can't find the service you need?</h5>
            <h3>Our team will contact you in 24 hours.</h3>
            <div class="pt-3">
                <div class="break-btn-wrapper">
                    <NuxtLink :to="{name: 'contact-us'}" class="break-btn">
                        <img class="call-icon" src="~/assets/images/global/animated-call-icon.gif" alt="">
                        Request a call back
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div class="py-5">
            <div class="row">
                <div class="col-md-3 col-6">
                    <div>
                        <h3 class="text-capitalize">Company</h3>
                        <ul class="p-0">
                            <li>
                                <NuxtLink :to="{name: 'about-us'}" class="text-capitalize footer-link">About Us</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="{ name: 'contact-us' }" class="text-capitalize footer-link">Contact Us</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/careers" class="text-capitalize footer-link">Careers</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/become-a-tech" class="text-capitalize footer-link">Become A Tech</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="{name:'terms-and-conditions'}" class="text-capitalize footer-link">Terms & Conditions</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="{name:'privacy-policy'}" class="text-capitalize footer-link">Privacy Policy</NuxtLink>
                            </li>
                            <!-- <li v-if="isAuthenticated">
                                <button @click="submitLogout" class="text-capitalize footer-link btn">Logout</button>
                            </li> -->
                            <li >
                            <a class="text-capitalize footer-link footer-login-btn" href="https://geekscrs.com.au/customers/login">Login</a>
                                <!-- <NuxtLink to="https://geekscrs.com.au/customers/login" class="text-capitalize footer-link footer-login-btn">Login</NuxtLink> -->

                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div>
                        <h3 class="text-capitalize">Discover</h3>
                        <ul class="p-0">
                            <li>
                                <a target="_blank" href="https://geekscrs.com.au/franchiseon" class="text-capitalize footer-link">Franchise</a>
                            </li>
                            <!-- <li>
                                <NuxtLink to="#" class="text-capitalize footer-link">Blogs</NuxtLink>
                            </li> -->
                            <li>
                                <NuxtLink to="/reviews" class="text-capitalize footer-link">Customer Review</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/why-choose-us" class="text-capitalize footer-link">Why choose us</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/faq" class="text-capitalize footer-link">FAQs</NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div>
                        <h3 class="text-capitalize">Services</h3>
                        <p class="mb-2 pe-xl-5 pe-0">Geekify - the computer and tech service provider who says, <span class="brand-color text-500"><span><i class="fa-regular fa-hand-point-right"></i></span> you point it, we fix it</span>.</p>
                        <ul class="p-0">
                            <li>
                                <NuxtLink to="/services" class="text-capitalize footer-link">Services</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/remote-services" class="text-capitalize footer-link">Remote Service</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/tech-support" class="text-capitalize footer-link">Tech Support</NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div>
                        <h3 class="text-capitalize">Download our App</h3>
                        <p class="mb-2">App is available for free on app store</p>
                        <div class="pt-1">
                            <a class="app-icon" href="#" target="_blank" rel="noopener noreferrer">
                                <img src="~/assets/images/home/google-play.svg" alt="">
                            </a>
                            <a class="ms-xl-1 ms-0 app-icon" href="#" target="_blank" rel="noopener noreferrer">
                                <img src="~/assets/images/home/app-store.svg" alt="">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div style="background-color: #9E9E9E;" class="py-3">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-9">
                    <div class="text-white">
                        <p class="text-15 mb-0 text-md-start text-center copyright-text">Copyright © 2022 <span v-if="settingDefaultCompanyName.value">{{ settingDefaultCompanyName.value }}</span>. All rights reserved. <span v-if="settingDefaultCompanyABN?.value"> ABN: {{ settingDefaultCompanyABN?.value }}</span></p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="d-flex align-items-center justify-content-md-end justify-content-center mt-md-0 mt-2">
                        <img v-if="parseInt(settingPaymentCardPaymentStatus.value)" src="~/assets/images/global/visa.svg" alt="">
                        <img v-if="parseInt(settingPaymentCardPaymentStatus.value)" class="mx-2" src="~/assets/images/global/master-card.svg" alt="">
                        <img v-if="parseInt(settingPaymentAfterPayPaymentStatus.value)" src="~/assets/images/global/after-pay.svg" alt="">
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
    mapActions, mapGetters
} from 'vuex';
export default {
    name: 'FooterSection',
    mixins: [Loader, ShowToastMessage],
    computed: {


      ...mapGetters({
      settingPaymentAfterPayPaymentStatus: 'settings/settingPaymentAfterPayPaymentStatus',
      settingPaymentCardPaymentStatus: 'settings/settingPaymentCardPaymentStatus',
      settingDefaultCompanyABN:'settings/settingDefaultCompanyABN',
      settingDefaultCompanyName: 'settings/settingDefaultCompanyName',
    }),

        isLogin() {
            return this.$route.name === 'login'
        },
        isRegister() {

            return this.$route.name === 'sign-up'
        },
        isForgetPassword() {

            return this.$route.name === 'forget-password'
        },
        isAuthenticated(){
          return this.$store.getters['login/isAuthenticated']
        }


    },
    methods: {
        ...mapActions({
            settingDefaultContactNumber: 'settings/settingDefaultContactNumber',
            // getSettings: 'appSettings/getSettings',
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
                    // if (response.message) {
                    //     this.responseMessage.message = response.message;
                    //     this.responseMessage.type = response.type;
                    //     this.$toast.open({
                    //         message: this.responseMessage.message,
                    //         type: this.responseMessage.type,
                    //         position: 'bottom-right',
                    //         duration: 5000,
                    //         dismissible: true,
                    //     });
                    // }
                })
        },
    },
}
</script>

<style scoped>
.footer-top-bg {
    background-image: url('~/assets/images/global/footer-top-bg.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    border-radius: 20px;
    /* margin-top: -48px; */
}

.footer-margin {
    margin-top: -48px;
}

.request-call-back-btn {
    height: 60px;
}

.footer-link {
    display: block;
    color: #363636;
    padding: 8px 0;
}

.app-icon img {
    height: 40px;
}

.break-btn-wrapper {
    display: inline-block;
    padding: 12px 0 10px;
    border: 8px solid rgba(0, 184, 209, 0.4);
    border-radius: 38px;
}

.break-btn {
    position: relative;
    background: rgba(0, 184, 209, 0.4);
    color: white;
    text-transform: uppercase;
    text-decoration: none;
    border: 0.2em solid white;
    border-radius: 30px;
    padding: 14px 20px;
}

.break-btn::before {
    content: "";
    display: block;
    position: absolute;
    width: 8%;
    background: #1d8181;
    height: 0.2em;
    right: 20%;
    top: -3px;
    transform: skewX(-45deg);
    -webkit-transition: all 0.5s cubic-bezier(0.86, 0, 0.07, 1);
    transition: all 0.5s cubic-bezier(0.86, 0, 0.07, 1);
}

.break-btn::after {
    content: "";
    display: block;
    position: absolute;
    width: 8%;
    background: #178181;
    height: 0.2em;
    left: 20%;
    bottom: -3px;
    transform: skewX(45deg);
    -webkit-transition: all 0.5 cubic-bezier(0.86, 0, 0.07, 1);
    transition: all 0.5s cubic-bezier(0.86, 0, 0.07, 1);
}

.break-btn:hover::before {
    right: 75%;
}

.break-btn:hover::after {
    left: 75%;
}

.call-icon {
    height: 30px;
}
.footer-login-btn{
  color: var(--secondaryColor);
  border-bottom: 1px solid var(--secondaryColor);
  font-weight: bold;
}

@media(max-width:1399px) {
    .app-icon img {
        height: 35px;
    }
}

@media(max-width:1199px) {
    .app-icon {
        display: block;
        margin-bottom: 8px;
    }
}

@media(max-width:575px) {
    .copyright-text {
        font-size: 15px;
    }
}
</style>
