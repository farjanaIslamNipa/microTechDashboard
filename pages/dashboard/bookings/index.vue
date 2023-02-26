<template>
  <div class="mt-4 mb-4">
    <main class="dashboard-content">
      <div class="d-flex justify-content-between mb-4">
        <h3 class="brand-color mb-4">Booking history</h3>
        <div>
          <NuxtLink :to="{name: 'dashboard-book-a-technician'}" class="brand-fill-btn text-capitalize">book a technician</NuxtLink>
        </div>
      </div>

      <div class="bg-white pb-5">
        <div v-if="appointments.length <= 0" class="text-center py-5">
          <img class="img-fluid" src="/dashboard/no-booking.png" alt="No Orders">
          <div class="mt-4">
            <h3>No history yet</h3>
            <p class="text-muted">You have’t booked any service yet. Not to worry we have lot of services.</p>
            <div>
              <NuxtLink class="btn brand-outlined-btn text-capitalize" :to="{name: 'dashboard-book-a-technician'}">book Now</NuxtLink>
            </div>
          </div>
        </div>
        <div class="container">
            <div class="pt-4">
              <div class="row align-items-center">
                    <div class="col-sm-8">
                      <!-- <div class="d-flex w-100">
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
                      </div> -->
                    </div>
                </div>
            </div>
            <div class="light-gray-bg dashboard-table px-4 my-5 pt-4">
                <div class="table-responsive pb-5" style="min-height:400px;">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Booking ID</th>
                                <th scope="col">Date & Time</th>
                                <th scope="col">Status</th>
                                <th scope="col">Total</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="appointment in appointments" :key="appointment.id" class="table-row spacer">
                                <td>#{{ appointment.reference }}</td>
                                <td>
                                  {{
                                      new Date(`${appointment.date}`).toLocaleDateString("en-AU", {
                                          day: "numeric",
                                          month: "short",
                                          year: "numeric",
                                      })
                                      }}
                                        {{
                                  "at " + new Date(`${appointment.date} ${appointment.time}`).toLocaleTimeString()
                                  }}
                                </td>
                                <td>
                                  <span v-if="appointment.status === 'Open'" class="text-warning fw-bold">
                                     {{ appointment.status }}
                                  </span>
                                  <small v-else-if="appointment.status === 'Cancelled'" class="rounded px-3 text-white d-inline-block bg-danger ">
                                      {{ appointment.status }}
                                  </small>
                                  <small v-else-if="appointment.status === 'Closed'" class="rounded px-3 text-white d-inline-block bg-success ">
                                      {{ appointment.status }}
                                  </small>
                                  <small v-else-if="appointment.status === 'Credited'" class="rounded px-3 text-white d-inline-block bg-primary ">
                                      {{ appointment.status }}
                                  </small>
                                  <small v-else-if="appointment.status === 'Delivered'" class="rounded px-3 text-white d-inline-block bg-success">
                                      {{ appointment.status }}
                                  </small>
                                  <small v-else-if="appointment.status === 'Dispute'" class="rounded px-3 text-white d-inline-block bg-danger">
                                      {{ appointment.status }}
                                  </small>
                                  <small v-else-if="appointment.status === 'Hold'" class="rounded px-3 text-white d-inline-block bg-danger">
                                      {{ appointment.status }}
                                  </small>
                                  <small v-else-if="appointment.status === 'Reassigned'" class="rounded px-3 text-white d-inline-block bg-info">
                                      {{ appointment.status }}
                                  </small>
                                  <small v-else-if="appointment.status === 'Refund'" class="rounded px-3 text-white d-inline-block bg-secondary">
                                      {{ appointment.status }}
                                  </small>
                                  <small v-else-if="appointment.status === 'Rescheduled'" class="rounded px-3 text-white d-inline-block bg-info">
                                      {{ appointment.status }}
                                  </small>
                                  <small v-else-if="appointment.status === 'Rescheduled & Reassigned'" class="rounded px-3 text-white d-inline-block bg-info ">
                                      {{ appointment.status }}
                                  </small>
                                </td>
                                <td>${{ getAppointmentPrice(appointment.appointmentCharges) }}</td>
                                <td>
                                    <div class="action-dropdown">
                                        <div class="position-relative">
                                            <button class="btn dropdown-toggle py-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-ellipsis-vertical"></i>
                                            </button>
                                            <ul class="dropdown-menu">
                                              <li>
                                                <button class="dropdown-item py-2 px-4 text-capitalize" @click="openUpdateAppointmentStatusModal(appointment.id,9)">Appointment reschedule</button>
                                              </li>
                                              <!-- <li><a class="dropdown-item py-2 px-4 text-capitalize" href="#">Make Payment</a></li> -->
                                              <li><NuxtLink :to="{name:'dashboard-bookings-invoice-uuid',params:{uuid:appointment.uuid}}" class="dropdown-item py-2 px-4 text-capitalize" href="#">View Invoice</NuxtLink></li>
                                              <!-- <li><a class="dropdown-item py-2 px-4 text-capitalize" href="#">your opinion</a></li> -->
                                              <li>
                                                <button class="dropdown-item py-2 px-4 text-capitalize"  @click="openViewBookingModal(appointment.id)">View Booking</button>
                                              </li>
                                              <li>
                                                <button class="dropdown-item py-2 px-4 text-capitalize"  @click="openUpdateAppointmentStatusModal(appointment.id,1)">Cancel</button>
                                              </li>
                                            </ul>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </main>
    <div class="" data-bs-toggle="modal" data-bs-target="#appointmentStatusUpdateModal"></div>
    <div class="" data-bs-toggle="modal" data-bs-target="#viewBookingModal"></div>
    <AppointmentStatusUpdateModal @getAppointmentList="getAppointmentList" :currentSelectedStatus="{...currentSelectedStatus}" :appointment="{...appointment }" :appointmentParams="{...getAppointmentsParams}" />
    <ViewBookingModal :appointment="{ ...appointment }"  />
  </div>
</template>


<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
import Loader from '~/mixins/Loader';
import ShowToastMessage from '~/mixins/ShowToastMessage';
import AppointmentStatusUpdateModal from './includes/AppointmentStatusUpdateModal.vue';
import ViewBookingModal from './includes/ViewBookingModal.vue';

  export default {
    name: "Bookings",
    layout: "dashboard-layout",
    mixins: [Loader, ShowToastMessage],
    components:{
      AppointmentStatusUpdateModal,
      ViewBookingModal
    },
    data() {
        return {
          appointment: {},
          singleBookingObj: {},
          currentSelectedStatus:"",
            activeBookingStatus: "active",
            getAppointmentsParams: {
                parking: "",
                type: "",
                date: [],
                time: "",
                reference: "",
                preference: "",
                customer_id: "",
                status: "",
                where_has_address_state: "",
                with_relation: [
                    "customer",
                    // "business",
                    "order",
                    "service",
                    "appointmentCharges",
                    "appointmentNotes",
                    "appointmentCreator",
                    "customer.address",
                    "customer.user",
                    "address.business",
                    "appointmentConsents",
                    "appointmentPayments.payment",
                    "technicianAppointment.technician.user",
                    "billingAddress"
                ],
                order_by_date: "DESC",
                // paginate: 1,
                // pagination: "",
                // page: "",
            },
        };
    },

    computed: {
        ...mapGetters({
            appointments: "appointments/appointments",
            authCustomer: 'login/authCustomer',

        })
    },
    methods: {
        ...mapActions({
            getAppointments: "appointments/getAppointments",
            // getOrders: 'appOrders/getOrders',
            // getOrder: 'appOrders/getOrder',
            // getCustomer: 'appCustomers/getCustomer',
            // getSettings: "appSettings/getSettings",
            // // lotalty point
            // getLoyaltyPointStatus: 'apployaltyPoints/getLoyaltyPointStatus',
        }),

        findAppointment(id) {
            this.appointment = {};
            this.appointment = this.appointments.find((appointment) => appointment.id === id);

        },
        openUpdateAppointmentStatusModal(appointmentId, selectedStatus) {
            this.findAppointment(appointmentId);
            if (this.appointment.status == 'Cancelled') {
                this.showToastMessage({
                    type: 'error',
                    message: `You can't update the status for this appointment.`
                })
                return;
            }
            this.currentSelectedStatus = "";
            this.currentSelectedStatus = {
                name: selectedStatus === 9 ? 'Appointment reschedule' : 'cancel',
                value: selectedStatus
            };

            document.querySelector('[data-bs-target="#appointmentStatusUpdateModal"]').click();
        },

        async openViewBookingModal(appointmentId) {
          this.findAppointment(appointmentId);
          this.singleBookingObj = await this.appointments.find((id) => id === appointmentId);
          document.querySelector('[data-bs-target="#viewBookingModal"]').click();
          console.log(this.singleBookingObj, 'obj')
        },

        async getAppointmentList(appointmentParams) {
            this.loader(true);
            await this.getAppointments(appointmentParams).then((response) => {
                if (response.status === 200) {
                    this.loader(false);
                    return;
                }
                if (response.message) {
                    this.showToastMessage(response);
                }
                this.loader(false);
            });
        },
        getAppointmentPrice(appointmentCharges) {
            let total = 0;
            appointmentCharges.map((item) => {
                if (item.type === "GST") {
                    total = total + item.amount;
                } else if (item.type === "Service Price") {
                    total = total + item.amount;
                } else if (item.type === "Surcharge") {
                    total = total + item.amount;
                } else {
                    total = total - item.amount;
                }
            });
            total = parseFloat(total / 100).toFixed(2);
            return total;
        },
    },
    async mounted() {
        this.getAppointmentsParams.customer_id = this.authCustomer.id;
        await this.getAppointmentList(this.getAppointmentsParams);
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
    padding: 20px 10px;
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
