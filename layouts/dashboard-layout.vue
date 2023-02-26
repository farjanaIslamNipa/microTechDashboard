<template>
<div>
    <div class="full-screen-loader d-none" id="fullScreenLoader">
        <div class="loader">
            <div class="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
    <IncludesDashboardNavbar />
    <div class="top-padding"></div>
    <div>
        <div class="hamburger-icon">
            <span @click="toggleSideNav"><i class="fa-solid fa-bars"></i></span>
        </div>
        <aside id="sidebar-wrapper" class="sidebar-wrapper">
            <div class="sidebar-content">
                <NuxtLink to="/dashboard" class="d-flex dashboard-link px-4 py-3">
                    <div class="pe-3"><img class="menu-icon" src="/dashboard/dashboard.svg" alt="Dashboard Home"></div>
                    <h5 class="mb-0 text-blue font-weight-bold pt-1">Dashboard</h5>
                </NuxtLink>
                <div>
                    <ul class="p-0">
                        <li v-for="(list, index) in sidebarMenuLists" :key="index">
                            <h6 class="font-weight-bold ps-4 text-blue mt-4">{{ list.title }}</h6>
                            <ul class="p-0">
                                <li v-for="(menu, index) in list.menuItems" :key="index">
                                    <button @click="openSubMenu(menu.id)" class="btn w-100 my-1">
                                        <div class="ps-3 pe-2 d-flex align-items-center justify-content-between">
                                            <div>
                                                <img class="menu-icon" :src=menu.icon alt="Book a technician">
                                                <div class="d-inline-block" v-if="menu.link">
                                                    <NuxtLink :to="{name: menu.link}" class="ms-3 sidebar-menu-item">{{ menu.name }}</NuxtLink>
                                                </div>
                                                <div class="d-inline-block" v-else><span class="ms-3 sidebar-menu-item">{{ menu.name }}</span></div>
                                            </div>
                                            <div v-if="menu.subMenu">
                                                <img class="right-arrow" src="/dashboard/right_arrow.svg" alt="">
                                            </div>
                                        </div>
                                    </button>
                                    <div :id="'submenu-wrapper' + menu.id" class="submenu-wrapper">
                                        <ul :id="'submenu-content' + menu.id" class="p-0 submenu">
                                            <li v-for="(subMenu, index) in menu.subMenu" :key="index">
                                                <button class="btn text-muted">{{ subMenu.name }}</button>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    </div>
    <nuxt />
    <div :class="!isOrderCreate ? 'fixed-footer' : ''" class="dashboard-footer py-3">
        <div class="container text-center text-white">
            <p class="mb-0">Copyright © 2023 Geekify. All rights reserved. ABN: 59616635664</p>
        </div>
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
import sidebarData from "../pages/dashboard/sidebarData";

export default {

    mixins: [Loader, ShowToastMessage],
    head() {
        return {
            link: [{
                rel: 'canonical',
                href: `${process.env.base_url + this.$route.path}`
            }],
            meta: [
                // Open Graph
                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: `${process.env.base_url + this.$route.path}`
                },
                {
                    property: 'twitter:domain',
                    content: `${process.env.base_url + this.$route.path}`
                },
            ]
        }
    },
    data() {
        return {
            sidebarMenuLists: []
        }
    },
    computed:{
      isOrderCreate(){
        return this.$route.name === 'dashboard-orders-create'
      }
    },
    methods: {
        ...mapActions({
            getSettings: 'settings/getSettings',
            getDiscounts: 'settings/getSettings',
            getServiceCategories: 'serviceCategories/getServiceCategories',
        }),

        async getSettingList() {
            const getSettingsParams = {
                type: ['default', 'payment', 'appointment'],
                key: ['default_contact_number', 'default_company_name', 'default_company_abn', 'payment_afterpay_payment_status', 'payment_card_payment_status', 'appointment_online_appointment_discount'],
            }
            await this.getSettings(getSettingsParams);

        },
        getServiceCategoryList() {
            this.getServiceCategories({
                status: 1,
                show_website: 1,
                order_by_name: 'ASC',
                with_relation: ['media', 'services.media'],
            });
        },
        openSubMenu(id) {
            let submenuWrapper = document.getElementById('submenu-wrapper' + id);
            let submenuContent = document.getElementById('submenu-content' + id);

            if (this.showSubMenu) {
                const height = submenuContent.getBoundingClientRect().height;
                submenuWrapper.style.height = `${height}px`;
                this.showSubMenu = false
            } else {
                this.showSubMenu = true;
                submenuWrapper.style.height = 0;
            }

        },
        toggleSideNav() {
            const sidebarWrapper = document.getElementById('sidebar-wrapper')
            if (!sidebarWrapper.classList.contains('expand-sidebar')) {
                sidebarWrapper.classList.add('expand-sidebar')
            } else {
                sidebarWrapper.classList.remove('expand-sidebar')
            }
        }

    },
    async created() {
        await this.getSettingList();
        this.getServiceCategoryList();
    },
    async mounted() {
        this.sidebarMenuLists = sidebarData;
    }

}
</script>


<style>
/* sidebar css */
.hamburger-icon {
    position: absolute;
    top: 70px;
    z-index: 9999999 !important;
    right: 65px;
    display: none;
}

.hamburger-icon span {
    font-size: 32px;
    color: #1a5d88;
    cursor: pointer;
}

.sidebar-wrapper {
    background-color: white;
    width: 300px;
    height: 100vh;
    top: 0;
    position: fixed;
    overflow-y: auto;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    z-index: 99999;
}

.sidebar-content {
    padding-top: 122px;
}

.dashboard-link {
    text-decoration: none;
    background-color: #f2f5f6;
    transition: all 0.3s ease-in-out;
}

.menu-icon {
    height: 20px;
}

#wrapper {
    overflow: hidden;
    transition: height 0.3s ease;
}

.submenu-wrapper {
    height: 0;
    overflow: hidden;
    transition: height 0.3s ease;
}

ul li {
    list-style: none;
}

.sidebar-menu-item {
    color: #5a5a5a;
    font-weight: 300;
    transition: all 0.3s ease;
}

.sidebar-menu-item:hover {
    color: #5a5a5a;
    letter-spacing: 0.5px;
}

.right-arrow {
    height: 12px;
}

@media(max-width: 1199px) {
    .sidebar-content {
        padding-top: 135px;
    }
}

@media(max-width: 1023px) {
    .hamburger-icon {
        display: block;
    }

    .sidebar-wrapper {
        left: -999px;
        transition: all 0.3s ease;
    }
}

/* sidebar css end */
.fixed-footer{
  bottom: 0;
  position: fixed;
}
.dashboard-footer {
    width: 100%;
    background-color: #9E9E9E;
}

.top-padding {
    padding-top: 138px;
}

/* a.nuxt-link-exact-active {
      color: var(--brandColor) !important;
      font-weight: bold !important;
  } */

@media(max-width:1023px) {
    .expand-sidebar {
        left: 0;
        transition: all 0.3s ease;
    }

    .dashboard-content {

        margin-left: 0;
    }

    .top-padding {
        padding-top: 120px;
    }
}

.loader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000000;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
}

/* Add the blur effect */

.lds-spinner {
    color: official;
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}

.lds-spinner div {
    transform-origin: 40px 40px;
    animation: lds-spinner 1.2s linear infinite;
}

.lds-spinner div:after {
    content: " ";
    display: block;
    position: absolute;
    top: 3px;
    left: 37px;
    width: 6px;
    height: 18px;
    border-radius: 20%;
    background: #fff;
}

.lds-spinner div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
}

.lds-spinner div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
}

.lds-spinner div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
}

.lds-spinner div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
}

.lds-spinner div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
}

.lds-spinner div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
}

.lds-spinner div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
}

.lds-spinner div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
}

.lds-spinner div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
}

.lds-spinner div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
}

.lds-spinner div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
}

.lds-spinner div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
}

@keyframes lds-spinner {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@media(max-width: 767px) {
    .hamburger-icon {
        right: 20px;
    }

    .dashboard-footer {
        position: static;
    }
}
</style>
