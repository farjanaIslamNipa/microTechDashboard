<template>
<div>
    <div class="pt-4 pb-5">
        <main class="dashboard-content">
            <div class="mb-4">
                <div class="row mb-4">
                    <div class="col-md-6 mb-md-0 mb-2">
                        <div class="credit-card px-lg-3 px-md-2 px-3 py-3 rounded h-100">
                            <div class="d-flex">
                                <div>
                                    <div class="top-card-icon bg-white rounded-full">
                                        <img src="/dashboard/credit.svg" alt="Credit Card">
                                    </div>
                                </div>
                                <div class="credit-left-margin">
                                    <h5 class="text-uppercase mb-0 top-card-title">Geekify Credit</h5>
                                    <small>Please use your points before expired </small>
                                </div>
                            </div>
                            <div class="bg-white px-lg-2 px-md-1 px-2 py-1 text-center shaped-box">
                                <small>Available Credit</small>
                                <h5 class="mb-0 top-card-count">$ {{ (creditedAmount?.amount)  ? (creditedAmount.amount / 100).toFixed(2)  : 0 }}</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div :style="{'background-color': '#' + loyaltyPointStatus?.current_group?.color_code}" class="point-card px-lg-3 px-md-2 px-3 py-3 rounded h-100">
                            <div class="d-flex align-items-center">
                                <div class="top-card-icon bg-white rounded-full">
                                    <img src="/dashboard/loyalty.svg" alt="Credit Card">
                                </div>
                                <div class="loyalty-left-margin">
                                    <div>
                                        <h5 class="text-uppercase mb-2 text-white top-card-title">GEEKIFY points</h5>
                                    </div>
                                    <div class="d-flex align-items-center py-2 px-2 rounded bg-white">
                                        <div>
                                          <img class="loyalty-icon" v-if="loyaltyPointStatus?.current_group?.name === 'Starter'" src="/dashboard/star.svg" alt="starter">
                                          <img class="loyalty-icon" v-if="loyaltyPointStatus?.current_group?.name === 'Silver'" src="/dashboard/silver.svg" alt="Silver">
                                          <img class="loyalty-icon" v-if="loyaltyPointStatus?.current_group?.name === 'Gold'" src="/dashboard/gold.svg" alt="Gold">
                                          <img class="loyalty-icon" v-if="loyaltyPointStatus?.current_group?.name === 'Platinum'" src="/dashboard/platinum.svg" alt="Platinum">
                                          <img class="loyalty-icon" v-if="loyaltyPointStatus?.current_group?.name === 'Platinum Plus'" src="/dashboard/platinum-plus.svg" alt="Platinum Plus">
                                          <img class="loyalty-icon" v-if="loyaltyPointStatus?.current_group?.name === 'The King'" src="/dashboard/the-king.svg" alt="The King">
                                        </div>
                                        <div>
                                          <h6 :style="{'color': '#' + loyaltyPointStatus?.current_group?.color_code}" class="ms-2 text-uppercase mb-0"><span v-if="loyaltyPointStatus?.current_group?.name">{{ `${loyaltyPointStatus?.current_group?.name}` }}</span></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-white px-lg-2 px-md-1 px-2 py-1 text-center shaped-box">
                                <small>Available Points</small>
                                <h5 class="mb-0 top-card-count">{{loyaltyPointStatus?.total_points ?? 0}} Pts</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="pt-4">
                <h5>My Account</h5>
                <div class="row mt-4 pb-5">
                    <div class="col-md-6">
                        <div>
                            <h6 class="mb-0">Personal Details</h6>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <p class="mb-0 text-light-gray">Name:</p>
                                        </td>
                                        <td>
                                            <p class="mb-0 ps-2">{{`${authUser?.firstName ?? ''} ${authUser?.lastName ?? ''}`}}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="mb-0 text-light-gray">Address:</p>
                                        </td>
                                        <td>
                                            <p class="mb-0 ps-2">{{`${customer?.address?.street ?? ''} ${customer?.address?.state.toUpperCase() ?? ''} , ${customer?.address?.suburb ?? ''}`}}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="mb-0 text-light-gray">Phone:</p>
                                        </td>
                                        <td>
                                            <p class="mb-0 ps-2">{{customer?.user?.phone_number ?? ''}}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="mb-0 text-light-gray">Email:</p>
                                        </td>
                                        <td>
                                            <p class="mb-0 ps-2">{{customer?.user?.email ?? ''}}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="mb-0 text-light-gray">Member since:</p>
                                        </td>
                                        <td>
                                            <p class="mb-0 ps-2">{{customer?.created_at}}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div class="col-md-6">
                        <div>
                            <h6 class="mb-0">Address Details</h6>
                            <table>
                                <tbody>

                                    <tr>
                                        <td>
                                            <p class="mb-0 text-light-gray">Address:</p>
                                        </td>
                                        <td>
                                            <p class="mb-0 ps-2">{{`${customer?.address?.street ?? ''} ${customer?.address?.state.toUpperCase() ?? ''} , ${customer?.address?.suburb ?? ''}`}}</p>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <!-- <div>
                            <h6>Membership</h6>
                            <p class="text-danger text-capitalize">Premium</p>
                            <p>Expire on 10 October 2023</p>
                        </div> -->
                    </div>
                    <!-- <div class="col-md-6">
                <div class="d-flex align-items-center mt-4">
                  <h6 class="mb-0">View additional info</h6>
                  <button class="btn edit-text-btn p-0 ms-4">Edit</button>
                </div>
              </div> -->
                    <div class="col-md-6">
                        <div class="d-flex mt-4">
                            <div>
                                <h6 class="mb-0">Newsletters</h6>
                                <p class="mb-0">{{ customer?.newsletter_subscription ?? '' }}</p>
                            </div>
                            <!-- <div><button class="btn edit-text-btn p-0 ms-4">Edit</button></div> -->
                        </div>
                    </div>

                </div>
            </div>
        </main>
    </div>
    <div class="" data-bs-toggle="modal" data-bs-target="#CustomerStatusUpdateModal"></div>



    <!-- <DashboardAppointmentRescheduleModal appointmentReschedule="appointment-reschedule" />
    <DashboardCancelAppointmentModal cancelAppointment="cancel-appointment" />
    <DashboardCancelOrderModal cancelOrder="cancel-order"/> -->
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex';
import Loader from '~/mixins/Loader';
import ShowToastMessage from '~/mixins/ShowToastMessage';
import Authorization from '~/mixins/Authorization';
import sidebarData from "./sidebarData.js";
export default {
    name: 'DashboardIndex',
    layout: 'dashboard-layout',
    mixins: [Loader, ShowToastMessage, Authorization],
    head() {
        return {
            meta: [{
                hid: 'og:title',
                property: 'og:title',
                content: `Dashboard | ${process.env.app_name}`
            }]
        }
    },
    data() {
        return {
            sidebarMenuLists: [],
            showSubMenu: true,
            collapsed: false,
            date: new Date(),
            //settings
            getSettingsParams: {
                type: ["default", "appointment", "payment"],
                key: [
                    "default_pagination",
                    "default_state",
                    "default_customer_type",
                    "appointment_note_type",
                    "appointment_status",
                    "payment_card_surcharge",

                ],
            },
            // appointments states

        }
    },
    computed: {
        ...mapGetters({
            appointments: "appointments/appointments",
            customer: 'customers/customer',
            authUser: 'login/authUser',
            authCustomer: 'login/authCustomer',

            orders: 'orders/orders',

            // lotalty point
            loyaltyPointStatus: 'loyaltyPoints/loyaltyPointStatus',

            // credited payment amount
            creditedAmount : 'payments/creditedAmount'


        }),
    },
    methods: {
        ...mapActions({
            getAppointments: "appointments/getAppointments",

            getOrders: 'orders/getOrders',
            getOrder: 'orders/getOrder',

            getCustomer: 'customers/getCustomer',
            getSettings: "settings/getSettings",

            // lotalty point
            getLoyaltyPointStatus: 'loyaltyPoints/getLoyaltyPointStatus',

            // remaining credited payment amount
            getRemainingCreditedAmount : 'payments/getRemainingCreditedAmount'

        }),
        async toggleModal(modalName) {
            document.querySelector(`[data-bs-target="#${modalName}"]`).click(); // modal close
        },


        toggleArrow() {
            let collapseArrow = document.getElementById('collapse_arrow');
            if (this.collapsed == false) {
                this.collapsed = true
                collapseArrow.innerHTML = '<i class="fas fa-chevron-up"></i>'
            } else if (this.collapsed == true) {
                this.collapsed = false
                collapseArrow.innerHTML = '<i class="fas fa-chevron-down"></i>'
            }
        },
        //settings
        async getSettingList(settingParams) {
            await this.getSettings(settingParams);
        },

        async getCustomerInformation(id) {

            this.loader(true);
            const params = {
                id: id,
                params: {
                    with_relation: ['user', 'address', 'address.business'],
                }

            };
            const response = await this.getCustomer(params);
            if (response.status === 200) {

                this.loader(false);
                this.showToastMessage(response);

            } else {
                this.loader(false);

            }

        },

        async getSingleOrderFromOrders(orderId, modalName) {
            this.singleOrderObj = await this.orders.find(({
                id
            }) => id === orderId);
            this.singleOrderPayment = await this.payments[orderId];
            await this.toggleModal(modalName);
        },

        async getSingleOrderInvoice(orderUUId) {
            const routeData = this.$router.resolve({
                name: 'appOrderInvoice',
                params: {
                    uuid: orderUUId
                }
            });
            window.open(routeData.href, '_blank');
        },
        async getSingleAppointmentInvoice(appUUID) {
            const routeData = this.$router.resolve({
                name: 'appAppointmentInvoice',
                params: {
                    uuid: appUUID
                }
            });
            window.open(routeData.href, '_blank');
        },


        getLoyaltyPointStatusHander(userId) {
            this.getLoyaltyPointStatus({
                id: userId
            });
        },

     async getRemainingCreditedAmountHandler(userId){
          await this.getRemainingCreditedAmount(userId);
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

    },

    async mounted() {
        this.sidebarMenuLists = sidebarData;

        if (this.authUser.id && this.authCustomer.id) {
          await this.getCustomerInformation(this.authCustomer.id);
            this.getLoyaltyPointStatusHander(this.authUser.id);
            await this.getSettingList(this.getSettingsParams);
            await this.getRemainingCreditedAmountHandler(this.authUser.id);
        } else {

            this.showToastMessage({
                type: 'error',
                message: 'Please login '
            });
            this.$router.push({
                name: 'login'
            });
        }
    }
}
</script>

<style scoped>
.edit-text-btn {
    font-size: 14px;
    color: #9E9E9E;
}


.text-starter {
    color: #C08F5C;
}

.top-card-icon img {
    height: 25px;
}

.top-card-icon {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.credit-card {
    background-color: #E8E8E8;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 100px;
}

.point-card {
    /* background-color: #C08F5C; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* min-height: 100px; */
}

.additional-info-btn {
    text-decoration: underline;
    font-size: 15px;
}

.profile-edit-btn {
    background-color: var(--brandColor);
    color: white;
    border-radius: 50%;
    border: none;
    outline: none;
    font-size: 18px;
    position: absolute;
    bottom: 10px;
    right: 57px;
    padding: 5px 10px;
}

@media screen and (max-width:1440px) {
    .profile-edit-btn {

        bottom: 10px;
        right: 37px;
    }
}

.line {
    border-top: 1px solid var(--secondaryColor);
    margin: 15px 0;
}

.appointment-checkbox-content {
    border-radius: 20px 0 0 0;
    background-color: var(--lightBrand);
    color: var(--brandColor);
}

.order-checkbox-content {
    border-radius: 0 20px 0 0;
    background-color: var(--lightBrand);
    color: var(--brandColor);
}

.checkbox-container {
    position: relative;
    height: 50px;
    box-sizing: border-box;
    cursor: pointer;
}

.checkbox-container .dashboard-checkbox-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 25px;
    transition: .3s ease;
    font-size: 18px;
}

.checkbox-container .dashboard-checkbox-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 140px;
    height: 100px;
    opacity: 0;
    cursor: pointer;
}

.dashboard-checkbox-input[type=radio]:checked~.dashboard-checkbox-content {
    background-color: white;
    color: var(--brandColor);
}

.search-input {
    border: 1px solid #b0d3e9;
    padding: 12px 20px 12px 40px;
}

.search-input::placeholder {
    color: #bdbdbd;
    font-weight: 400;
}

.search-icon {
    position: absolute;
    top: 12px;
    left: 12px;
    font-size: 20px;
    color: #bdbdbd;
}

.dashboard-table {
    border-radius: 10px;
}

.table-row td {
    background-color: white;
    margin-bottom: 10px !important;
    padding: 20px;
}

table {
    border-collapse: separate;
    border-spacing: 0 1em;
}

.active-history-container {
    position: relative;
    width: 200px;
    box-sizing: border-box;
    margin-right: 20px;
}

.active-history-container .user-checkbox-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 25px;
    transition: .3s ease;
}

.active-history-container .active-history-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 50px;
    opacity: 0;
    cursor: pointer;
}

.active-history-input[type=radio]:checked~.active-history-content {
    color: var(--brandColor);
    border-bottom: 2px solid var(--brandColor);
}

.white-bottom-border {
    border-top: 2px solid white;
    margin-top: -2px;
}

/* ---------------- */
.dashboard-link:hover {
    text-decoration: none;
    background-color: #f2f5f6;
    transition: all 0.3s ease-in-out;
}

.router-link-active {
    background-color: #f2f5f6 !important;
}

.text-blue {
    color: #1a5d88;
}

.header-banner {
    border-radius: 6px 6px 0 0;
}

.section-history-bg {
    background-color: white;
    border-radius: 6px;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
}

.customer-dashboard-bg {
    background-color: #ededed;
}

.top-padding {
    padding-top: 30px;
}

ul li {
    list-style: none;
}

.dashboard-content {
    margin-left: 300px;
    padding: 0 80px;
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

.sidebar-menu-item {
    color: #5a5a5a;
    font-weight: 300;
}

.right-arrow {
    height: 12px;
}

.menu-icon {
    height: 20px;
}

.dashboard-btn {
    color: #1a5d88;
    font-size: 17px;
    font-weight: 400;
}

.dashboard-footer {
    background-color: #9E9E9E;
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 10;
    color: white;
}

.shaped-box {
    position: relative;
    border-radius: 1px 4px 4px 1px;
}

.shaped-box::before {
    content: '';
    position: absolute;
    left: -38px;
    width: 0;
    height: 0;
    border-top: 29px solid transparent;
    border-right: 40px solid white;
    border-bottom: 29px solid transparent;
    top: -1px;
    border-radius: 8px;
}

.credit-left-margin {
    margin-left: 15px;
}

.loyalty-left-margin {
    margin-left: 20px;
}


.loyalty-icon{
  height: 22px;
}
@media(max-width: 1440px) {
    .dashboard-content {
        padding: 0 40px;
    }

    .credit-left-margin {
        margin-left: 10px;
    }

    .loyalty-left-margin {
        margin-left: 15px;
    }
}

@media(max-width: 1360px) {
    .dashboard-content {
        padding: 0 30px;
    }

    .shaped-box::before {
        left: -23px;
        border-top: 30px solid transparent;
        border-right: 25px solid white;
        border-bottom: 30px solid transparent;
        top: -2px;
    }
}

@media(max-width: 1299px) {
    .dashboard-content {
        padding: 0 40px;
    }

    .top-card-icon {
        display: none;
    }

    .shaped-box::before {
        left: -23px;
        border: 0;
        top: -2px;
    }

    .shaped-box {
        border-radius: 4px;
    }

    .credit-left-margin {
        margin-left: 0;
    }

    .loyalty-left-margin {
        margin-left: 0;
    }
}

@media(max-width: 1024px) {
    .dashboard-content {
        padding: 0 20px;
    }
}

@media(max-width: 1023px) {
    .dashboard-content {
        padding: 10px 30px;
        margin-left: 0;
    }

    .top-card-icon {
        display: flex;
    }

    .credit-left-margin {
        margin-left: 10px;
    }

    .loyalty-left-margin {
        margin-left: 10px;
    }

    .expand-sidebar {
        left: 0;
        transition: all 0.3s ease;
    }

    .top-card-title {
        font-size: 18px;
    }

    .small-text {
        line-height: 1;
    }
}

@media(max-width: 767px) {
    .shaped-box::before {
        left: -23px;
        border-top: 30px solid transparent;
        border-right: 25px solid white;
        border-bottom: 30px solid transparent;
        top: -2px;
    }
}

@media(max-width: 529px) {
    .shaped-box::before {
        border: 0;
    }

    .credit-left-margin {
        margin-left: 0;
    }

    .loyalty-left-margin {
        margin-left: 0;
    }
}

@media(max-width: 474px) {
    .dashboard-content {
        padding: 10px;
    }

    .top-card-icon {
        display: none;
    }
}
</style>
