<template>
  <div>
    <div id="topbar" class="dashboard-fixed-nav">
      <div>
        <div class="brand-orange"></div>
        <div class="light-orange"></div>
      </div>
      <div class="top-nav-content">
        <div class="container-fluid">
          <div class="row pe-md-5 pe-2">
            <div class="col-sm-6 col-8">
              <div class="text-white">
                <p class="mb-0 ps-3" v-if="settingDefaultContactNumber?.value?.display">
                  <span
                    class="d-xl-inline-block d-none">Need computer help?</span>
                  <span class="ps-2">
                    Call us
                    <a href="tel:1300 894 946" class="text-white contact-number">&nbsp;&nbsp;{{ settingDefaultContactNumber?.value?.display }}</a>
                  </span>
                </p>
              </div>
            </div>
            <div class="col-sm-6 col-4 d-flex align-items-center justify-content-end">
              <div class="text-end pe-lg-2 pe-0">
                <p class="mb-0 follow-us d-flex align-items-center">
                  <span class="d-sm-inline-block d-none">Follow us:</span>
                  <a href="https://www.linkedin.com/company/geekifyau/" target="_blank" class="text-dark"><span
                      class="nav-social-icon mx-2"><i class="fa-brands fa-linkedin"></i></span></a>
                  <a href="https://www.youtube.com/channel/UCjOn3PIkxLqKvYWEeB8Rh6w" target="_blank"
                    class="text-dark"><span class="nav-social-icon"><i class="fa-brands fa-youtube"></i></span></a>
                    <button @click="submitLogout()" class="ms-1 ms-lg-3 btn btn-sm text-white" style="background-color: #1a5d88;">Logout</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="sticky-navbar" class="dashboard-fixed-nav py-2">
      <nav class="navbar-expand-lg bg-white">
        <div class="container-fluid">
          <div class="row justify-content-between align-items-center py-xl-0 py-2 pe-md-5 pe-2">
            <div class="col-lg-3 col-4">
              <div>
                <NuxtLink class="" to="/dashboard">
                  <img class="brand-logo" src="~/assets/images/global/logo.svg" alt="Geekify Logo">
                </NuxtLink>
              </div>
            </div>
            <div class="col-lg-9 col-8 pe-1">
              <!-- <div class="d-flex justify-content-end">
                <div id="sideBarMenu" :class="showNav ? 'expand' : ''" class="small-device-collapse-nav full-width">
                    <div class="d-lg-flex d-block justify-content-between align-items-center w-100 sidenav-content">
                      <div class="">
                        <ul class="m-0 p-0 list-unstyled">
                          <li class="menu-item" @click="closeSideNav">
                            <NuxtLink class="special-btn" :to="{name: 'dashboard-book-a-technician'}">Book a Technician</NuxtLink>
                          </li>
                          <li class="menu-item" @click="closeSideNav">
                            <NuxtLink class="special-btn ms-xl-0 ms-3" :to="{name: 'become-a-member'}">Place Order</NuxtLink>
                          </li>
                          <li  v-if="$store.getters['login/authCustomer'].id" class="menu-item" @click="closeSideNav">
                            <NuxtLink class="special-btn ms-xl-0 ms-3" :to="{name: 'dashboard'}">Dashboard</NuxtLink>
                          </li>
                          <li v-else class="menu-item ms-xl-3 ms-2 mt-lg-0 mt-4" @click="closeSideNav">
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
              </div> -->
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
  name: 'DashboardNavbar',
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
      isAuthenticated: 'login/isAuthenticated',
      authCustomer: "login/authCustomer",
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
      async getServiceCategoryList() {
           const response = await this.getServiceCategories(this.getServiceCategoriesParam);
             if (response?.message) {
                this.showToastMessage(response);
            }
        },
    scrollFunction() {
      const stickyNav = document.getElementById('sticky-navbar');
      const stickyTop = document.getElementById('topbar');
      if (window.scrollY > 100) {
        stickyNav.classList.add('header-scrolled');
        stickyTop.classList.add('topbar-scrolled');
      } else {
        stickyNav.classList.remove('header-scrolled');
        stickyTop.classList.remove('topbar-scrolled');
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

.dashboard-fixed-nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999999;
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
  height: 55px;
}

.brand-orange {
  background-color: var(--secondaryColor);
  height: 45px;
  max-width: 60%;
  z-index: 3;
  position: relative;
  -webkit-clip-path: polygon(0 0, 100% 0%, 95% 100%, 0% 100%);
  clip-path: polygon(0 0, 100% 0%, 95% 100%, 0% 100%);
}

.light-orange {
  background-color: #efefef;
  height: 45px;
  max-width: 60.2%;
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
.special-btn {
  cursor: pointer;
  display: inline-block;
  outline: 0;
  transition: box-shadow .2s;
  padding: 2px 10px;
  background: var(--secondaryColor);
  background: linear-gradient(to left, var(--secondaryColor) 0%, var(--brandColor) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 6px;
  font-weight: 500;
}

.special-btn:hover {
  box-shadow: var(--secondaryColor);
}

/* --------------------------- */

@media (max-width:1399px) {
  .menu-link {
    font-size: 15px;
  }
}

@media (max-width:1199px) {
  .brand-logo {
  height: 50px;
}
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
  .expand {
  width: 80% !important;
}
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

  .contact-number {
    font-size: 16px;
  }

}


@media (max-width:500px) {

  .contact-number {
    font-size: 14px;
  }
}
@media (max-width:449px) {
  .brand-orange {
    max-width: 62.2%;
  }
  .light-orange {
    max-width: 64%;
  }

}

@media (max-width:424px) {
  .brand-logo {
    height: 52px;
  }

  .sidenav-content {
    padding: 30px 10px;
  }
}


</style>
