<template>
  <div>
    <div id="topbar" class="fixed-top">
      <div data-aos="fade-down-right" data-aos-duration="1000" data-aos-delay="50">
        <div class="brand-orange"></div>
        <div class="light-orange"></div>
      </div>
      <div class="top-nav-content">
        <div class="container">
          <div class="row">
            <div class="col-sm-6 col-8">
              <div class="text-white">
                <p class="mb-0 ps-3" v-if="settingDefaultContactNumber?.value?.display">
                  <span data-aos="fade-right" data-aos-duration="1500" data-aos-delay="100"
                    class="d-xl-inline-block d-none">Need computer help?</span>
                  <span data-aos="fade-right" data-aos-duration="2000" data-aos-delay="200" class="ps-2">
                    Call us
                    <a href="tel:1300 894 946" class="text-white contact-number">&nbsp;&nbsp;{{ settingDefaultContactNumber?.value?.display }}</a>
                  </span>
                </p>
              </div>
            </div>
            <div class="col-sm-6 col-4">
              <div class="text-end pe-lg-2 pe-0">
                <p class="mb-0 follow-us">
                  <span class="d-sm-inline-block d-none">Follow us:</span>
                  <a href="https://www.linkedin.com/company/geekifyau/" target="_blank" class="text-dark"><span
                      class="nav-social-icon mx-2"><i class="fa-brands fa-linkedin"></i></span></a>
                  <a href="https://www.youtube.com/channel/UCjOn3PIkxLqKvYWEeB8Rh6w" target="_blank"
                    class="text-dark"><span class="nav-social-icon"><i class="fa-brands fa-youtube"></i></span></a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="sticky-navbar" class="fixed-top">
      <nav class="navbar-expand-lg bg-white">
        <div class="container">
          <div class="row justify-content-between align-items-center py-xl-0 py-2">
            <div class="col-lg-3 col-4">
              <div>
                <NuxtLink class="" to="/">
                  <img class="brand-logo" src="~/assets/images/global/logo.svg" alt="Geekify Logo">
                </NuxtLink>
              </div>
            </div>
            <div class="col-lg-9 col-8 pe-1">
              <div class="d-flex justify-content-end">
                <div>
                  <div class="hamburger-icon text-end">
                    <input v-model="showNav" type="checkbox" id="hamburgerIcon" class="hamburger-input">
                    <label for="hamburgerIcon">
                      <div class="hamburger">
                        <span class="bar bar1"></span>
                        <span class="bar bar2"></span>
                        <span class="bar bar3"></span>
                        <span class="bar bar4"></span>
                      </div>
                    </label>
                  </div>
                  <div id="sideBarMenu" :class="showNav ? 'expand' : ''" class="small-device-collapse-nav full-width">
                    <div class="d-lg-flex d-block justify-content-between align-items-center w-100 sidenav-content">
                      <div class="">
                        <ul class="m-0 p-0 list-unstyled">
                          <!-- <li class="menu-item" @click="closeSideNav">
                          <NuxtLink class="menu-link" to="/dashboard">Dashboard</NuxtLink>
                        </li> -->
                          <li class="menu-item" @click="closeSideNav">
                            <NuxtLink class="menu-link" to="/">Home</NuxtLink>
                          </li>
                          <li class="menu-item" @click="closeSideNav">
                            <NuxtLink class="menu-link" v-if="serviceCategories.length" :to="{ name: 'services' }">
                              Services <span class="brand-color down-caret"><i
                                  class="fa-solid fa-angle-down"></i></span></NuxtLink>
                            <div id="services-mega-menu" class="mega-menu">
                              <div class="container-fluid">
                                <div class="p-2 pb-4">
                                  <div style="background-color:#f7fbff" class="p-4">
                                    <div class="row">
                                      <div class="col-xl-4 col-lg-6 mb-5"
                                        v-for="(singleServiceCategory, index) in serviceCategories" :key="index">
                                        <div class="h-100">
                                          <div class="d-flex">
                                            <div><img class="menu-services-icon"
                                                :src="singleServiceCategory?.image ?? ''" alt="Geekify Service"></div>
                                            <div>
                                              <NuxtLink
                                                :to="{ name: 'service-category-slug', params: { slug: singleServiceCategory?.slug ?? '' } }"
                                                class="mb-0 menu-service-category text-blue"> {{ singleServiceCategory?.name ?? ''}}</NuxtLink>
                                            </div>
                                          </div>
                                          <div class="mt-4 ps-5">
                                            <ul class="p-0 service-list-container"
                                              v-if="singleServiceCategory?.services">
                                              <li class="py-2" v-for="(service, index) in singleServiceCategory.services"
                                                :key="index">
                                                <NuxtLink :to="{ name: 'services-slug', params: { slug: service?.slug ?? '' } }"
                                                  class="mega-menu-service-link"><span class="text-blue pe-1"><i
                                                      class="fa-solid fa-caret-right"></i></span> <span
                                                    class="service-name">{{ service.name }}</span></NuxtLink>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="menu-item" @click="closeSideNav">
                            <NuxtLink class="menu-link" :to="{ name: 'service-area' }">Service Areas <span
                                class="brand-color down-caret"><i class="fa-solid fa-angle-down"></i></span></NuxtLink>
                            <div id="service-area-mega-menu" class="mega-menu service-area-mega-menu-bg pb-4">
                              <div class="container">
                                <div class="pt-2 pb-2 px-4">
                                  <div class="p-5">
                                    <div class="row">
                                      <div class="col-md-4 mb-3">
                                        <div>
                                          <NuxtLink class="service-area-name" :to="{name:'service-area-new-south-wales'}">
                                            <span class="text-blue pe-1"><i class="fa-solid fa-caret-right"></i></span>
                                            <span @click="closeMegaMenu" class="area-name">New South Wales</span>
                                          </NuxtLink>
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div>
                                          <NuxtLink class="service-area-name" :to="{name: 'service-area-slug', params: {slug: 'victoria'}}">
                                            <span class="text-blue pe-1"><i class="fa-solid fa-caret-right"></i></span>
                                            <span @click="closeMegaMenu" class="area-name">Victoria</span>
                                          </NuxtLink>
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div>
                                          <NuxtLink class="service-area-name" :to="{name: 'service-area-slug', params: {slug: 'australian-capital-territory'}}">
                                            <span class="text-blue pe-1"><i class="fa-solid fa-caret-right"></i></span>
                                            <span @click="closeMegaMenu" class="area-name">Australian Capital Territory</span>
                                          </NuxtLink>
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div>
                                          <NuxtLink class="service-area-name" :to="{name: 'service-area-slug', params: {slug: 'adelaide'}}">
                                            <span class="text-blue pe-1"><i class="fa-solid fa-caret-right"></i></span>
                                            <span @click="closeMegaMenu" class="area-name">South Australia</span>
                                          </NuxtLink>
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div>
                                          <NuxtLink class="service-area-name" :to="{name: 'service-area-slug', params: {slug: 'queensland'}}">
                                            <span class="text-blue pe-1"><i class="fa-solid fa-caret-right"></i></span>
                                            <span @click="closeMegaMenu" class="area-name">Queensland</span>
                                          </NuxtLink>
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div>
                                          <NuxtLink class="service-area-name" :to="{name: 'service-area-slug', params: {slug: 'western-australia'}}">
                                            <span class="text-blue pe-1"><i class="fa-solid fa-caret-right"></i></span>
                                            <span @click="closeMegaMenu" class="area-name">Western Australia</span>
                                          </NuxtLink>
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div>
                                          <NuxtLink class="service-area-name" :to="{name: 'service-area-slug', params: {slug: 'greater-western-sydney'}}">
                                            <span class="text-blue pe-1"><i class="fa-solid fa-caret-right"></i></span>
                                            <span @click="closeMegaMenu" class="area-name">Greater Western Sydney</span>
                                          </NuxtLink>
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div>
                                          <NuxtLink class="service-area-name" :to="{name: 'service-area-slug', params: {slug: 'inner-south'}}">
                                            <span class="text-blue pe-1"><i class="fa-solid fa-caret-right"></i></span>
                                            <span @click="closeMegaMenu" class="area-name">Inner South</span>
                                          </NuxtLink>
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div>
                                          <NuxtLink class="service-area-name" :to="{name: 'service-area-slug', params: {slug: 'northern-beaches'}}">
                                            <span class="text-blue pe-1"><i class="fa-solid fa-caret-right"></i></span>
                                            <span @click="closeMegaMenu" class="area-name">Northern Beaches</span>
                                          </NuxtLink>
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div>
                                          <NuxtLink class="service-area-name" :to="{name: 'service-area-slug', params: {slug: 'st-george'}}">
                                            <span class="text-blue pe-1"><i class="fa-solid fa-caret-right"></i></span>
                                            <span @click="closeMegaMenu" class="area-name">St. George</span>
                                          </NuxtLink>
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div>
                                          <NuxtLink class="service-area-name" :to="{name: 'service-area-slug', params: {slug: 'the-hill-district'}}">
                                            <span class="text-blue pe-1"><i class="fa-solid fa-caret-right"></i></span>
                                            <span @click="closeMegaMenu" class="area-name">The Hills District</span>
                                          </NuxtLink>
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div>
                                          <NuxtLink class="service-area-name" :to="{name: 'service-area-slug', params: {slug: 'eastern-suburbs'}}">
                                            <span class="text-blue pe-1"><i class="fa-solid fa-caret-right"></i></span>
                                            <span @click="closeMegaMenu" class="area-name">Eastern Suburbs</span>
                                          </NuxtLink>
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div>
                                          <NuxtLink class="service-area-name" :to="{name: 'service-area-slug', params: {slug: 'inner-west'}}">
                                            <span class="text-blue pe-1"><i class="fa-solid fa-caret-right"></i></span>
                                            <span @click="closeMegaMenu" class="area-name">Inner West</span>
                                          </NuxtLink>
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div>
                                          <NuxtLink class="service-area-name" :to="{name: 'service-area-slug', params: {slug: 'ryde-&-northern-suburbs'}}">
                                            <span class="text-blue pe-1"><i class="fa-solid fa-caret-right"></i></span>
                                            <span @click="closeMegaMenu" class="area-name">Ryde & Northern Suburbs</span>
                                          </NuxtLink>
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div>
                                          <NuxtLink class="service-area-name" :to="{name: 'service-area-slug', params: {slug: 'sutherland-shire'}}">
                                            <span class="text-blue pe-1"><i class="fa-solid fa-caret-right"></i></span>
                                            <span @click="closeMegaMenu" class="area-name">Sutherland Shire</span>
                                          </NuxtLink>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="menu-item" @click="closeSideNav">
                            <NuxtLink class="menu-link" :to="{name: 'become-a-member'}">Become a member</NuxtLink>
                          </li>
                          <li class="menu-item ms-xl-3 ms-2 mt-lg-0 mt-4" @click="closeSideNav">
                            <div class="main text-center">
                              <NuxtLink class="booking-btn" :to="{ name: 'book-online' }">
                                <span class="book-online text-white">Book Online</span> <br>
                                <span v-if="settingAppointmentOnlineAppointmentDiscount?.value?.status === 1"
                                  class="get-ten-off text-600">And get <span class='pop-outin d-inline-block'>{{settingAppointmentOnlineAppointmentDiscount?.value?.discount_rate}}%</span>
                                  Off</span>
                              </NuxtLink>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex';
import Loader from '~/mixins/Loader';
import ShowToastMessage from '~/mixins/ShowToastMessage';
export default {
  name: 'PrimaryNavbar',
  mixins: [Loader,ShowToastMessage],
  data() {
    return {
      showNav: false,
      megaMenu: true,
      getServiceCategoriesParam: {
                status: 1,
                show_website: 1,
                order_by_name: 'ASC',
                with_relation: ['media','services.media'],
            }
    }
  },
  computed: {
    ...mapGetters({
      // isAuthenticated: 'login/isAuthenticated',
      // menuServices: 'services/menuServices',
      serviceCategories: 'serviceCategories/serviceCategories',
      settingDefaultContactNumber: 'settings/settingDefaultContactNumber',
      settingAppointmentOnlineAppointmentDiscount: 'settings/settingAppointmentOnlineAppointmentDiscount'
    }),
    // contactNumber() {
    //   return this.settingDefaultContactNumber.value
    //       ? this.settingDefaultContactNumber.value
    //       : {value: '', display: ''};
    // },
  },

  methods: {
    ...mapActions({
        getServiceCategories: 'serviceCategories/getServiceCategories',
      }),
      async getServiceCategoryList() {
           const response = await this.getServiceCategories(this.getServiceCategoriesParam);
             if (response?.message) {
                this.showToastMessage(response);
            }
        },
    scrollFunction() {
      const stickyNav = document.getElementById('sticky-navbar');
      const stickyTop = document.getElementById('topbar');
      const servicesMegaMenu = document.getElementById('services-mega-menu');
      const serviceAreaMegaMenu = document.getElementById('service-area-mega-menu');
      if (window.scrollY > 100) {
        stickyNav.classList.add('header-scrolled');
        stickyTop.classList.add('topbar-scrolled');
        servicesMegaMenu.classList.add('mega-menu-scroll-top');
        serviceAreaMegaMenu.classList.add('mega-menu-scroll-top');
      } else {
        stickyNav.classList.remove('header-scrolled');
        stickyTop.classList.remove('topbar-scrolled');
        servicesMegaMenu.classList.remove('mega-menu-scroll-top');
        serviceAreaMegaMenu.classList.remove('mega-menu-scroll-top');
      }
    },

    closeSideNav() {
        this.showNav = false;
    },
    closeMegaMenu() {
        this.loader(true);
        setTimeout(() => {
          this.loader(false);
        }, 300);
    },
  },
  async mounted() {
    window.onscroll = () => {
      this.scrollFunction()
    };
    await this.getServiceCategoryList();
  }
}
</script>

<style scoped>
.pop-outin {
  animation: 2s anim-popoutin ease infinite;
}

@keyframes anim-popoutin {
  0% {
    color: #fff700;
    transform: scale(0);
    opacity: 0;
    text-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }

  25% {
    color: #fff;
    transform: scale(1.6);
    opacity: 1;
    text-shadow: 3px 10px 5px rgba(252, 153, 5, 0.8);
  }

  50% {
    color: #fff700;
    transform: scale(1);
    opacity: 1;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0);
  }

  100% {
    /* animate nothing to add pause at the end of animation */
    transform: scale(1);
    opacity: 1;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0);
  }
}

.main {
  width: 170px;
  height: 56px;
  font-size: 16px;
  background-color: var(--brandColor);
  cursor: pointer;
  box-shadow: 5px 5px 0 0 #fddbbe;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20px;
  text-transform: uppercase;
}

.booking-btn {
  position: absolute;
  text-decoration: none;
  z-index: 1000;
}

.main::after {
  content: "";
  left: 0;
  height: 20px;
  opacity: 0;
  transition: 0.3s;
}

.main:hover {
  box-shadow: -5px -5px 0 0 #fddbbe;
  transform: scale(0.95);
}

.main:hover::after {
  opacity: 1;
}

.get-ten-off {
  color: #fff700;
}

#sticky-navbar {
  background: #fff;
  transition: all .4s;
  z-index: 999999;
  top: 55px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
}

.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 103;
}

#sticky-navbar.header-scrolled {
  top: 0;
  /* box-shadow: 0 1px 2px rgb(0 0 0 / 20%); */
}

#topbar {
  background-color: white;
  transition: all .4s;
  padding-bottom: 1px;
}

#topbar.topbar-scrolled {
  top: -55px
}

.fixed-nav {
  /* transition: all 0.5s linear;
  position: fixed !important;
  top: 0;
  box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
  z-index: 99999; */
}

.brand-logo {
  height: 58px;
}

.brand-orange {
  background-color: var(--brandColor);
  height: 45px;
  max-width: 800px;
  z-index: 3;
  position: relative;
  -webkit-clip-path: polygon(0 0, 100% 0%, 95% 100%, 0% 100%);
  clip-path: polygon(0 0, 100% 0%, 95% 100%, 0% 100%);
}

.light-orange {
  background-color: #FEF1E6;
  height: 45px;
  max-width: 806px;
  z-index: 1;
  margin-top: -35px;
  -webkit-clip-path: polygon(0 0, 100% 0%, 95% 100%, 0% 100%);
  clip-path: polygon(0 0, 100% 0%, 95% 100%, 0% 100%);
}

.top-nav-content {
  margin-top: -46px;
  margin-bottom: 15px;
  position: relative;
  z-index: 99999;
}

.contact-number {
  font-size: 17px;
  font-weight: 500;
  letter-spacing: 1px;
}

.follow-us {
  font-size: 14px;
  font-weight: 600;
}

.nav-social-icon {
  font-size: 20px;
}

/* #sticky-navbar {
  position: fixed;
  width: 100%;
  top: 54px;
  z-index: 99999;
} */

.menu-item {
  display: inline-block;
  margin: 0 8px;
}

.menu-link {
  position: relative;
  display: block;
  padding: 30px 5px;
  text-decoration: none;
  color: rgb(65, 65, 65);
  font-weight: 500;
  text-transform: uppercase;
  margin: 0 10px;
}

.menu-link,
.menu-link::after,
.menu-link::before {
  transition: all 0.5s;
}

.menu-link:hover {
  text-decoration: none;
  /* color: #fff; */
}

.menu-link:after {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 0%;
  content: '.';
  color: transparent;
  background: var(--brandColor);
  height: 3px;
}

.menu-link:hover:after {
  width: 100%;
}

.mega-menu {
  position: fixed;
  width: 100%;
  background-color: white;
  visibility: hidden;
  top: 110px;
  left: 0;
  right: 0;
  opacity: 0;
  z-index: 999999;
}

.menu-item:hover .mega-menu {
  top: 138px;
  opacity: 1;
  transition: all 0.6s ease;
  visibility: visible;
  overflow: auto;
  /* bottom: 10px; */
}

.mega-menu::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.6);
  border-radius: 8px;

}
.mega-menu::-webkit-scrollbar{
  width: 6px;
  border-radius: 8px;
  background-color: white;
}

.mega-menu::-webkit-scrollbar-thumb{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: var(--secondaryColor);
}

.mega-menu-scroll-top{
  top: 80px !important;
}
.menu-services-icon {
  height: 35px;
}

.menu-service-category {
  color: var(--secondaryColor);
  font-size: 25px;
  font-weight: 300 !important;
  margin-left: 10px;
  border-left: 2px solid var(--brandColor);
  padding-left: 10px;
}

.mega-menu-service-link {
  color: rgb(71, 71, 71);
}

.mega-menu-service-link:hover .service-name {
  transition: all 0.3s ease;
  letter-spacing: 1px;
  color: var(--secondaryColor);
}

.service-area-name {
  color: rgb(46, 46, 46);
  font-size: 18px;
}
.service-area-name:hover .area-name {
  transition: all 0.3s ease;
  color: var(--secondaryColor);
  letter-spacing: 1px;
}

.service-area-mega-menu-bg {
  background-image: url('~/assets/images/service-areas/mega-menu-map.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

/* --------------------------- */
.hamburger-icon {
  display: none;
  cursor: pointer !important;
}

.hamburger-input {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}

.hamburger {
  margin: 0 auto;
  width: 30px;
  height: 30px;
  position: relative;
  cursor: pointer !important;
}

.hamburger .bar {
  padding: 0;
  width: 30px;
  height: 3px;
  background-color: rgb(59, 59, 59);
  display: block;
  border-radius: 4px;
  transition: all 0.4s ease-in-out;
  position: absolute;
}

.bar1 {
  top: 0;
}

.bar2,
.bar3 {
  top: 11.5px;
}

.bar3 {
  right: 0;
}

.bar4 {
  bottom: 5px;
}

.hamburger .bar1 {
  transform-origin: 5%;
}

.hamburger .bar4 {
  transform-origin: 5%;
}

.hamburger-input:checked+label>.hamburger>.bar1 {
  transform: rotate(45deg);
  height: 3px;
  width: 35px;
}

.hamburger-input:checked+label>.hamburger>.bar3 {
  transform: rotate(45deg);
  height: 3px;
  background-color: transparent;
}

.hamburger-input:checked+label>.hamburger>.bar2 {
  transform: rotate(-45deg);
  height: 3px;
  background-color: transparent;
}

.hamburger-input:checked+label>.hamburger>.bar4 {
  transform: rotate(-45deg);
  height: 3px;
  width: 35px;
}

.service-list-container {
  max-height: 200px;
  overflow-y: auto;
}

.service-list-container::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.service-list-container::-webkit-scrollbar {
  width: 8px;
  background-color: #fcece5;
}

.service-list-container::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: var(--secondaryColor);
}

/* --------------------------- */
@media (max-width:1600px) {
  .brand-orange {
    max-width: 700px;
  }

  .light-orange {
    max-width: 706px;
  }
}

@media (max-width:1440px) {
  .brand-orange {
    max-width: 600px;
  }

  .light-orange {
    max-width: 608px;
  }
}

@media (max-width:1399px) {
  .menu-link {
    font-size: 15px;
  }
}

@media (max-width:1299px) {
  .brand-orange {
    max-width: 550px;
  }

  .light-orange {
    max-width: 556px;
  }
}

@media (max-width:1199px) {
  .menu-item {
    margin: 0;
  }

  .menu-link {
    font-size: 14px;
    padding: 30px 2px;
  }
}

@media(min-width:1024px) {
  .full-width {
    width: auto !important;
  }

  .nav-close-btn {
    display: none !important;
  }

}

@media (max-width:1023px) {
  .hamburger-icon {
    display: block !important;
    cursor: pointer;
  }

  .primary-nav {
    padding: 20px 0;
  }

  .menu-link {
    border-bottom: 1px solid rgb(214, 214, 214);
  }

  .mega-menu {
    display: none !important;
  }

  .down-caret {
    display: none;
  }

  .nav-close-btn {
    display: inline-block !important;
    font-size: 30px;
    border-radius: 10%;
    line-height: 0;
    padding: 3px 7px;
  }

  .nav-close-btn:hover {
    background-color: var(--brandColor);
    transition: all 0.4s ease;
  }

  .small-device-collapse-nav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.9);
    overflow-x: hidden;
    transition: 0.5s;
    white-space: nowrap;
    padding-top: 100px;
  }

  .sidenav-content {
    padding: 30px 60px;
  }

  .menu-item {
    display: block;
    border-bottom: 1px solid var(--purpleLight);
  }

  .menu-link {
    font-size: 16px;
  }

  .menu-link:after {
    /* bottom: 0; */
    height: 2px;
  }

  .small-device-logo {
    display: block !important;
  }

}

@media (max-width:991px) {
  .sidenav-content {
    padding: 30px 30px;
  }

}

@media (max-width:767px) {
  .brand-orange {
    max-width: 400px;
  }

  .light-orange {
    max-width: 406px;
  }

  .contact-number {
    font-size: 16px;
  }
}

@media (max-width:575px) {
  .brand-orange {
    max-width: 340px;
  }

  .light-orange {
    max-width: 346px;
  }
}

@media (max-width:500px) {
  .brand-orange {
    max-width: 250px;
  }

  .light-orange {
    max-width: 256px;
  }

  .contact-number {
    font-size: 14px;
  }
}

@media (max-width:424px) {
  .brand-orange {
    max-width: 230px;
  }

  .light-orange {
    max-width: 236px;
  }

  .brand-logo {
    height: 52px;
  }

  .sidenav-content {
    padding: 30px 10px;
  }
}

.expand {
  width: 80% !important;
}
</style>
