<template>
  <div>
      <header class="light-gray-bg pt-5">
          <div class="container">
              <div class="row pb-5">
                  <div class="col-md-2">
                      <div class="position-relative">
                          <div class="profile-img">
                              <img src="~/assets/images/global/profile.png" alt="">
                          </div>
                          <button class="profile-edit-btn"><i class="fa-solid fa-pen"></i></button>
                      </div>
                  </div>
                  <div class="col-md-10 ps-0">
                      <div>
                          <h2 class="text-500 text-blue text-capitalize">{{`${authUser?.firstName ?? ''} ${authUser?.lastName ?? ''}`}} <button class="btn additional-info-btn">(View additional info)</button></h2>
                          <div class="row">
                              <div class="col-md-4">
                                  <p class="mb-0"><span class="brand-color me-2 text-capitalize"><i class="fa-solid fa-location-dot"></i></span>{{`${customer?.address?.street ?? ''} ${customer?.address?.state.toUpperCase() ?? ''} , ${customer?.address?.suburb ?? ''}`}}</p>
                              </div>
                              <div class="col-md-4" v-if="customer?.user?.email">
                                  <p class="mb-0"><span class="text-500">Email:</span> {{customer.user.email}}</p>
                              </div>
                              <div class="col-md-4" v-if="customer?.user?.phone_number">
                                  <p class="mb-0"><span class="text-500">Mobile:</span> {{customer.user.phone_number}}</p>
                              </div>
                              <hr class="line">
                              <div class="col-md-4">
                                  <p class="mb-0"><span class="text-500">Loyalty points:</span> 0 <span style="color:#C08F5C" class="text-500">Starter</span></p>
                              </div>
                              <div class="col-md-4">
                                  <p class="mb-0"><span class="text-500">Geekify Credit:</span> $15.80</p>
                              </div>
                              <div class="col-md-4">
                                  <p class="mb-0"><span class="text-500">Member since:</span> 30 October 2021</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="mt-4">
                  <div class="d-flex">
                      <label for="dashboard-appointment" class="checkbox-container w-100">
                          <input v-model="historyType" value="appointment history" id="dashboard-appointment" class="dashboard-checkbox-input" type="radio" checked name="profile-checkbox" />
                          <div class="dashboard-checkbox-content appointment-checkbox-content">
                              <span>Appointment History</span>
                          </div>
                      </label>

                      <label for="dashboard-order" class="checkbox-container w-100">
                          <input v-model="historyType" value="order history" id="dashboard-order" class="dashboard-checkbox-input" type="radio" name="profile-checkbox" />
                          <div class="dashboard-checkbox-content order-checkbox-content">
                              <span>Order History</span>
                          </div>
                      </label>
                  </div>
              </div>
          </div>
      </header>
      <main>
          <div v-if="historyType == 'appointment history'" class="bg-white">
              <div class="container">
                  <div class="pt-5">
                      <div class="mx-5 position-relative">
                          <input type="search" class="form-control search-input" placeholder="Find your appointment here">
                          <span class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                      </div>
                  </div>
                  <div class="light-gray-bg dashboard-table px-4 my-5 pt-4">
                      <div class="row">
                          <div class="col-sm-8">
                              <div class="d-flex w-100">
                                  <label for="active-appointment" class="active-history-container">
                                      <input v-model="activeBookingStatus" value="active" id="active-appointment" class="active-history-input" type="radio" checked name="review-checkbox" />
                                      <div class="active-history-content py-2 ps-2">
                                          <span>Active</span>
                                      </div>
                                  </label>

                                  <label for="past-appointment" class="active-history-container">
                                      <input v-model="activeBookingStatus" value="past" id="past-appointment" class="active-history-input" type="radio" name="review-checkbox" />
                                      <div class="active-history-content py-2 ps-2">
                                          <span>Past</span>
                                      </div>
                                  </label>
                              </div>

                          </div>
                          <div class="col-sm-4">
                              <div class="text-end">
                                  <nuxt-link to="#" class="brand-fill-btn text-capitalize">book a technician</nuxt-link>
                              </div>
                          </div>
                      </div>
                      <div class="white-bottom-border w-100"></div>
                      <div class="table-responsive pb-5">
                          <table class="table table-borderless">
                              <thead>
                                  <tr>
                                      <th scope="col">Appointment ID</th>
                                      <th scope="col">Date & Time</th>
                                      <th scope="col">Status</th>
                                      <th scope="col">Total</th>
                                      <th scope="col">Action</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr class="table-row spacer">
                                      <td>#GY-588YX5-A</td>
                                      <td>01 Nov 2022, 11:00 AM</td>
                                      <td>Open</td>
                                      <td>$110.80</td>
                                      <td>
                                          <div class="action-dropdown">
                                              <div class="position-relative">
                                                  <button class="btn dropdown-toggle py-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                      <i class="fa-solid fa-ellipsis-vertical"></i>
                                                  </button>
                                                  <ul class="dropdown-menu">
                                                    <li>
                                                      <button class="dropdown-item py-2 px-4 text-capitalize" @click="openModal('appointment-reschedule')">Appointment reschedule</button>
                                                    </li>
                                                    <li><a class="dropdown-item py-2 px-4 text-capitalize" href="#">Make Payment</a></li>
                                                    <li><a class="dropdown-item py-2 px-4 text-capitalize" href="#">Request Invoice</a></li>
                                                    <li><a class="dropdown-item py-2 px-4 text-capitalize" href="#">your opinion</a></li>
                                                    <li>
                                                      <button class="dropdown-item py-2 px-4 text-capitalize" @click="openModal('cancel-appointment')">Cancel</button>
                                                    </li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </td>
                                  </tr>
                                  <tr class="table-row">
                                      <td>#GY-588YX5-A</td>
                                      <td>01 Nov 2022, 11:00 AM</td>
                                      <td>Rescheduled</td>
                                      <td>$210.80</td>
                                      <td>
                                          <i class="fa-solid fa-ellipsis-vertical"></i>
                                      </td>
                                  </tr>
                                  <tr class="table-row">
                                      <td>#GY-588YX5-A</td>
                                      <td>01 Nov 2022, 11:00 AM</td>
                                      <td>Rescheduled</td>
                                      <td>$150.80</td>
                                      <td>
                                          <i class="fa-solid fa-ellipsis-vertical"></i>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
          <div v-if="historyType == 'order history'" class="bg-white">
              <div class="container">
                  <div class="pt-5">
                      <div class="mx-5 position-relative">
                          <input type="search" class="form-control search-input" placeholder="Find your appointment here">
                          <span class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                      </div>
                  </div>
                  <div class="light-gray-bg dashboard-table px-4 my-5 pt-4">
                      <div class="row">
                          <div class="col-sm-8">
                              <div class="d-flex w-100">
                                  <label for="active-appointment" class="active-history-container">
                                      <input id="active-appointment" class="active-history-input" type="radio" checked name="review-checkbox" />
                                      <div class="active-history-content py-2 ps-2">
                                          <span>Active</span>
                                      </div>
                                  </label>

                                  <label for="past-appointment" class="active-history-container">
                                      <input id="past-appointment" class="active-history-input" type="radio" name="review-checkbox" />
                                      <div class="active-history-content py-2 ps-2">
                                          <span>Past</span>
                                      </div>
                                  </label>
                              </div>
                          </div>
                          <div class="col-sm-4">
                              <div class="text-end">
                                  <nuxt-link to="#" class="brand-fill-btn text-capitalize">Buy Now</nuxt-link>
                              </div>
                          </div>
                      </div>
                      <div class="white-bottom-border w-100"></div>
                      <div class="table-responsive pb-5">
                          <table class="table table-borderless">
                              <thead>
                                  <tr>
                                      <th scope="col">Order ID</th>
                                      <th scope="col">Date & Time</th>
                                      <th scope="col">Status</th>
                                      <th scope="col">Total</th>
                                      <th scope="col">Action</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr class="table-row spacer">
                                      <td>#GY-588YX5-A</td>
                                      <td>01 Nov 2022, 11:00 AM</td>
                                      <td>Open</td>
                                      <td>$110.80</td>
                                      <td>
                                        <div class="action-dropdown">
                                              <div class="position-relative">
                                                  <button class="btn dropdown-toggle py-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                      <i class="fa-solid fa-ellipsis-vertical"></i>
                                                  </button>
                                                  <ul class="dropdown-menu">
                                                    <li>
                                                      <button class="dropdown-item py-2 px-4 text-capitalize">Appointment reschedule</button>
                                                    </li>
                                                    <li><a class="dropdown-item py-2 px-4 text-capitalize" href="#">Make Payment</a></li>
                                                    <li><a class="dropdown-item py-2 px-4 text-capitalize" href="#">Request Invoice</a></li>
                                                    <li><a class="dropdown-item py-2 px-4 text-capitalize" href="#">your opinion</a></li>
                                                    <li>
                                                      <button class="dropdown-item py-2 px-4 text-capitalize" @click="openModal('cancel-order')">Cancel Order</button>
                                                    </li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </td>
                                  </tr>
                                  <tr class="table-row">
                                      <td>#GY-588YX5-A</td>
                                      <td>01 Nov 2022, 11:00 AM</td>
                                      <td>Rescheduled</td>
                                      <td>$210.80</td>
                                      <td>
                                          <i class="fa-solid fa-ellipsis-vertical"></i>
                                      </td>
                                  </tr>
                                  <tr class="table-row">
                                      <td>#GY-588YX5-A</td>
                                      <td>01 Nov 2022, 11:00 AM</td>
                                      <td>Rescheduled</td>
                                      <td>$150.80</td>
                                      <td>
                                          <i class="fa-solid fa-ellipsis-vertical"></i>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
          <div v-if="historyType == 'order history'" class="bg-white">
              <!-- <div class="container">
            <div class="pt-5 mt-3 text-center pb-5">
              <h3>No history yet</h3>
              <h6 class="text-secondary mb-5">You have’t booked any service yet. Not to worry we have lot of services.</h6>
              <nuxt-link to="#" class="brand-outlined-btn px-4">Buy Now</nuxt-link>
            </div>
          </div> -->
          </div>
      </main>
      <DashboardAppointmentRescheduleModal appointmentReschedule="appointment-reschedule" :closeModal="closeModal"  />
      <DashboardCancelAppointmentModal cancelAppointment="cancel-appointment" :closeModal="closeModal"  />
      <DashboardCancelOrderModal cancelOrder="cancel-order" :closeModal="closeModal"  />
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
  export default {
      name: 'DashboardIndex',
      layout: 'website-layout',
      middleware: ['auth'],
      mixins: [Loader, ShowToastMessage, Authorization],
      head() {
          return {
            title: 'Dashboard',
            meta: [
            { hid: 'og:title',property: 'og:title', content: `Dashboard | ${process.env.app_name}`}
          ]
          }
      },
      data() {
          return {
              historyType: 'appointment history',
              activeBookingStatus: '',
              activeOrderStatus: '',
          }
      },
      computed: {
          ...mapGetters({
              authUser: 'login/authUser',
              authCustomer: "login/authCustomer",
              customer: 'customers/customer',
          }),
      },
      methods: {

        ...mapActions({
          getCustomer: 'customers/getCustomer',

        }),
        openModal(modalType) {
        this.$modal.show(modalType);
        },
        closeModal(modalType) {
          this.$modal.hide(modalType);
        },

        async getCustomerInformation(id) {

            this.loader(true);
            const params = {
                id: id,
                params: {
                    with_relation: ['user', 'address', 'address.business'],
                }

            };
            this.loader(true);
            const response = await this.getCustomer(params);
            if (response.message) {
                this.showToastMessage(response);
            }
            this.loader(false);

        },
        getLoyaltyPointStatusHander(userId) {
            this.getLoyaltyPointStatus({
                id: userId
            });
        },
      },
      async mounted() {

          await this.getCustomerInformation(this.authCustomer.id);
          // this.getLoyaltyPointStatusHander(this.authUser.id);

      },
  }
  </script>

  <style scoped>
  .profile-img {
      height: 140px;
      width: 140px;
  }

  .profile-img img {
      height: 140px;
      width: 140px;
      border: 3px solid white;
      border-radius: 50%;
      object-fit: cover;
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
  </style>
