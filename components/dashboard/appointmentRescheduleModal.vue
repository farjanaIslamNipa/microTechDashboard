<template>
  <div class="dashboard-modal">
    <modal :name="appointmentReschedule">
      <div class="">
        <div class="brand-header bg-brand d-flex justify-content-between text-white py-2 px-3">
          <h5 class="mb-0">Appointment reschedule</h5>
          <div>
            <button @click="closeModal('appointment-reschedule')" class="btn text-white p-0"><i
                class="fa-solid fa-xmark"></i></button>
          </div>
        </div>
        <div class="p-4 mt-3">
          <div class="d-md-flex d-block w-100">
            <div class="date-picker-input book-online-datepicker mb-md-0 mb-4 pb-md-1 pb-0 w-100 px-md-1 px-0">
              <label class="mb-2" for="">When do you need this done?</label>
              <no-ssr>
                <v-date-picker v-model="selectedRescheduleDate" :update-on-input="true" :masks="{ input: ['DD MMMM YYYY'] }"
                  :min-date='new Date()' :model-config="{ type: 'string', mask: 'YYYY-MM-DD' }">
                  <template v-slot="{ inputValue, togglePopover }">
                    <div class="d-flex align-items-center" @click="togglePopover()" style="cursor: pointer;">
                      <i class='bx bx-calendar mr-1'></i>
                      <input class="form-control" placeholder="Select Date" :value="inputValue"
                        style="cursor: pointer;" />
                    </div>
                  </template>
                </v-date-picker>
              </no-ssr>
            </div>
            <div class="form-group w-100 mb-3 px-md-1 px-0">
              <label class="mb-2">Available booking slot</label>
              <multi-select class="select-input" v-model="selectedTime" :options="technicianAvailableTimeSlots?.slots ?? []"
                :close-on-select="true" :allow-empty="false" placeholder="Select time" label="name" track-by="value"
                :show-labels="false" />
            </div>
          </div>
          <div>
            <label for="" class="mb-2">Describe your Issues</label>
            <textarea class="form-control rounded-0" rows="6"></textarea>
          </div>
          <p class="text-600 mt-2">By proceeding, I agree to Geekify <NuxtLink :to="{name: 'terms-and-conditions'}" class="text-danger">Terms & Conditions.</NuxtLink></p>
          <button class="btn brand-fill-btn mb-3">Save Changes</button>
        </div>
      </div>
      <!-- <div class="pb-5">
        <div class="text-end">
          <button @click="closeModal('appointment-reschedule')" class="btn brand-color"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="text-center">
          <div class="p-md-5 p-4"><img class="img-fluid" src="~/assets/images/global/alert.png" alt="Alert"></div>
          <h5>Are you sure you want to reschedule your appointment?</h5>
          <h6 class="py-md-2 py-0">Your request will be sent to our team.</h6>
          <div><small class="text-muted">Charges will be apply for the interval time. </small></div>
          <button class="btn brand-outlined-btn px-4 mt-4">Confirm</button>
        </div>
      </div> -->
      <!-- <div class="pb-5">
        <div class="text-end">
          <button @click="closeModal('appointment-reschedule')" class="btn brand-color"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="text-center">
          <div class="pb-md-5 pb-4"><img class="img-fluid" src="~/assets/images/global/success.png" alt="Alert"></div>
          <h5>Request sent successfully!</h5>
          <h6 class="py-md-2 py-0">Our team will contact you in 24 hours.</h6>
          <div><small class="text-muted">For further queries</small></div>
          <div class="d-flex justify-content-center mt-3">
            <p class="mx-3"><span><i class="fa-solid fa-phone"></i></span>1300 894 946</p>
            <p class="mx-3"><span><i class="fa-solid fa-envelope"></i></span>cs@geekify.au</p>
          </div>
          <button class="btn brand-fill-btn px-4 mt-4">Done</button>
        </div>
      </div> -->
    </modal>
  </div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
import Loader from '~/mixins/Loader';
import ShowToastMessage from '~/mixins/ShowToastMessage';
export default {
  name: "AppointmentRescheduleModal",
  props: ['appointment-reschedule', 'closeModal'],
  mixins:[Loader, ShowToastMessage],
  data() {
    return {
      selectedRescheduleDate: '',
      selectedRescheduleTime: '',
      selectedTime:''
    }
  },
  computed: {
    ...mapGetters({
      technicianAvailableTimeSlots: 'technicians/technicianAvailableTimeSlots'
    })
  },
  methods: {
    ...mapActions({
      postTechnicianAvailableTimeSlots: 'technicians/postTechnicianAvailableTimeSlots',
    }),
    async getTechnicianTimeSlots(date) {
            this.loader(true);
            const data = {
                panel: 3,
                requested_date: date,
                // state: this.selectedState.value.toLowerCase(),
                // preference: this.serviceType === 'remote' ? 1 : 0
            }
            const response = await this.postTechnicianAvailableTimeSlots(data);
            this.loader(false);
            if (response.status === 200) {

                if (this.technicianAvailableTimeSlots.status === true) {
                    return true;
                }
                if (this.technicianAvailableTimeSlots.status === false) {
                    this.showToastMessage({
                        type: 'error',
                        message: this.technicianAvailableTimeSlots.message
                    });
                    return;
                }
            }
        },
  },
  watch:{
    async selectedRescheduleDate(currentDate) {
        if (currentDate) {
            this.selectedRescheduleTime = "";
            await this.getTechnicianTimeSlots(currentDate);

        }

    },
  }
}
</script>

<style scoped>

</style>
