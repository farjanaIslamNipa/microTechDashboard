<template>
<div class="modal fade " id="appointmentStatusUpdateModal" tabindex="-1" role="dialog" aria-labelledby="appointmentStatusUpdateModal" aria-hidden="true">
    <div class="modal-dialog  modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-brand text-white">
                <h4 class="modal-title white">{{ selectedStatus?.name ?? '' }}</h4>
                <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div>
                    <div class="row">
                        <div class="col-12">
                            <h6 class="bx-flashing text-danger"><i>{{statusPreUpdateChargeResponse.message ? statusPreUpdateChargeResponse.message : '' }}</i></h6>
                            <ul class="pl-3">
                                <li class="" v-for="(value, name,index) in statusPreUpdateChargeResponse.details" :key="index">
                                    <span class="text-capitalize"> {{name.replaceAll("_", " ")}} </span> : $ {{ value}}
                                </li>
                            </ul>

                        </div>
                    </div>

                    <div class="row" v-if="selectedStatus.value == 1">
                        <div class="col-12">
                            <div class="form-group">
                                <div class="">
                                    <label>Cancellation Penalty Type</label>
                                    <multi-select v-model="selectedPenaltyType" :allow-empty="false" class="select-input" :options="penaltyTypes" :close-on-select="true" placeholder="Select a type" label="name" track-by="value" :show-labels="false" />
                                </div>
                                <div v-if="frontendErrors.selectedPenaltyType.length > 0 " class="">
                                    <p class="text-danger mb-0 font-medium-1" v-for="(error, index) in frontendErrors.selectedPenaltyType" :key="index">{{error}}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row " v-if="selectedStatus.value == 9">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Select Date</label>
                                <div class="d-flex align-items-center date-picker-wrapper">
                                    <div class="w-100 ">
                                        <no-ssr>
                                            <v-date-picker v-model="selectedRescheduleDate" :update-on-input="true" :masks="{input: ['DD MMMM YYYY']}" :min-date='new Date()' :model-config="{ type: 'string', mask: 'YYYY-MM-DD'}">
                                                <template v-slot="{ inputValue ,togglePopover  }">
                                                    <div class="d-flex align-items-center" @click="togglePopover()" style="cursor: pointer;">
                                                        <i class='bx bx-calendar mr-1'></i>
                                                        <input class="form-control" :value="inputValue" style="cursor: pointer;" />
                                                    </div>
                                                </template>
                                            </v-date-picker>
                                        </no-ssr>

                                    </div>
                                </div>
                                <div v-if="frontendErrors.selectedRescheduleDate.length > 0 " class="">
                                    <p class="text-danger mb-0 font-medium-1" v-for="(error, index) in frontendErrors.selectedRescheduleDate" :key="index">{{error}}</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6" v-if="(selectedStatus.value == 9) && (selectedRescheduleDate) && (technicianAvailableTimeSlots.slots !== undefined &&  technicianAvailableTimeSlots.slots.length > 0)">
                            <div class="form-group">
                                <label>Available Time </label>
                                <multi-select v-model="selectedRescheduleTime" :allow-empty="false" class="select-input" :options="technicianAvailableTimeSlots.slots" :close-on-select="true" placeholder="Select a status" label="name" track-by="value" :show-labels="false" />
                                <div v-if="frontendErrors.selectedRescheduleTime.length > 0 " class="">
                                    <p class="text-danger mb-0 font-medium-1" v-for="(error, index) in frontendErrors.selectedRescheduleTime" :key="index">{{error}}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="row">

                        <div class="col-12">
                            <div class="form-group">
                                <label>Note</label>
                                <textarea v-model="noteDescription" class="form-control" name="" id="" rows="10"></textarea>
                                <div v-if="backendErrors.description !== undefined && backendErrors.description.length > 0">
                                    <p v-for="(error,index) in  backendErrors.description" :key="index" class="text-danger mb-1">
                                        {{ error }}
                                    </p>

                                </div>
                                <div v-if="frontendErrors.noteDescription.length > 0 " class="">
                                    <p class="text-danger mb-0 font-medium-1" v-for="(error, index) in frontendErrors.noteDescription" :key="index">{{error}}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal-footer border-0 pt-0">

                <button type="button" class="btn  bg-brand text-white" @click="updateAppointmentStatusHandler">Save changes</button>

            </div>
        </div>
    </div>
</div>
</template>

<script>
import Loader from '~/mixins/Loader';
import ShowToastMessage from '~/mixins/ShowToastMessage';

import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    name: "AppointmentStatusUpdateModal",
    mixins: [ShowToastMessage, Loader],
    props: ['appointment', 'appointmentParams', 'currentSelectedStatus'],
    components: {
        // DatePicker,
    },
    data() {
        return {
            updateBtnIsActive: false,
            appointmentId: "",
            appointmentDate: '',
            appointmentTime: '',
            appointmentState: '',
            appointmentPreference: '',
            appointmentTechnicianId: "",

            rescheduleRequestedByCustomer: 1,
            cancellationRequestedByCustomer: 1,
            noteDescription: '',

            selectedRescheduleDate: '',
            selectedRescheduleTime: '',

            selectedStatus: '',

            selectedPenaltyType: '',

            frontendErrors: {
                selectedStatus: [],
                selectedRescheduleDate: [],
                selectedRescheduleTime: [],

                noteDescription: [],
                selectedPenaltyType: [],
            },
            backendErrors: {},
            statusPreUpdateChargeResponse: {}

        }
    },
    watch: {
        appointment(currentAppointment) {

            this.statusPreUpdateChargeResponse = {},
                this.selectedRescheduleDate = '';
            this.selectedRescheduleTime = '';

            this.selectedPenaltyType = '',

                this.rescheduleRequestedByCustomer = 1;
            this.cancellationRequestedByCustomer = 1;
            this.noteDescription = "";

            this.frontendErrors.selectedRescheduleDate = [];
            this.frontendErrors.selectedRescheduleTime = [];

            this.frontendErrors.noteDescription = [];
            this.frontendErrors.selectedPenaltyType = [];

            this.appointmentId = currentAppointment.id ? currentAppointment.id : '';
            this.appointmentDate = currentAppointment.date ? currentAppointment.date : '';
            this.appointmentTime = currentAppointment.time ? currentAppointment.time : '';
            this.appointmentPreference = currentAppointment.preference ? (currentAppointment.preference === "Remote" ? 1 : 0) : '';
            this.appointmentState = currentAppointment.address && currentAppointment.address.state ? currentAppointment.address.state : '';
            this.appointmentTechnicianId = currentAppointment.technicianAppointment && currentAppointment.technicianAppointment.technician && currentAppointment.technicianAppointment.technician.id ? currentAppointment.technicianAppointment.technician.id : '';

        },

        currentSelectedStatus(currentStatus) {
            this.selectedStatus = currentStatus;
        },

        async selectedRescheduleDate(currentDate) {

            if (currentDate) {
                this.frontendErrors.selectedRescheduleTime = [];
                this.selectedRescheduleTime = "";

                this.frontendErrors.selectedRescheduleDate = [];

                await this.getTechnicianTimeSlots(currentDate);

            }
        },
        selectedRescheduleTime(currentTime) {
            if (currentTime) {
                this.frontendErrors.selectedRescheduleTime = [];

            }

        },

        noteDescription(currentDescription) {
            if (currentDescription) {
                this.frontendErrors.noteDescription = [];
            }
        },

        selectedPenaltyType(currentPenaltyType) {
            if (currentPenaltyType) {
                this.frontendErrors.selectedPenaltyType = [];
            }
        },

        appointmentStatusCancelled: {
            handler: async function (val) {
                const {
                    selectedPenaltyType,
                    selectedStatus
                } = val;

                if (selectedStatus.value == 1 && selectedPenaltyType.value !== undefined) {

                    const payLoad = {
                        id: this.appointmentId,
                        data: {
                            client_panel: 1,
                            status: this.selectedStatus.value,
                            cancellation_requested_by_customer: 1,
                            cancellation_penalty_type: selectedPenaltyType.value
                        }
                    }
                    await this.appointmentStatusUpdateChargeCalculation(payLoad);

                }
            },
            deep: true
        },

        appointmentStatusReschedule: {
            handler: async function (val) {
                const {
                    selectedStatus,
                    selectedRescheduleDate,
                    selectedRescheduleTime,
                    rescheduleRequestedByCustomer
                } = val;

                if (selectedStatus.value == 9) {

                    if (selectedRescheduleTime.value !== undefined && selectedRescheduleDate) {

                        const payLoad = {
                            id: this.appointmentId,
                            data: {
                                client_panel: 1,
                                status: selectedStatus.value,
                                reschedule_date: selectedRescheduleDate,
                                reschedule_time: selectedRescheduleTime.value,
                                reschedule_requested_by_customer: rescheduleRequestedByCustomer,

                            }
                        }
                        await this.appointmentStatusUpdateChargeCalculation(payLoad);

                    } else {

                        this.statusPreUpdateChargeResponse = {};
                    }
                }

            },
            deep: true
        },

    },
    computed: {
        ...mapGetters({
            availableTechnicians: 'technicians/availableTechnicians',
            technicianAvailableTimeSlots: 'technicians/technicianAvailableTimeSlots',

        }),

        allAppointmentStatus() {
            let allStatus = this.$store.getters["settings/settingAppointmentStatus"].value;
            if (this.$store.getters["settings/settingAppointmentStatus"].value.length > 0) {
                return allStatus.filter((status) => {
                    return status.value != null && (status.value == 1 || status.value == 9);
                });

            } else {
                return [];
            }

        },
        penaltyTypes() {
            return [{
                    name: 'Refund',
                    value: 0
                },
                {
                    name: 'Credited',
                    value: 1
                },
            ]
        },

        // appointment status update charge calculation api call computed properties
        appointmentStatusCancelled() {
            const {
                cancellationRequestedByCustomer,
                selectedStatus,
                selectedPenaltyType
            } = this;
            return {
                cancellationRequestedByCustomer,
                selectedStatus,
                selectedPenaltyType
            }

        },

        appointmentStatusReschedule() {
            const {
                selectedStatus,
                selectedRescheduleDate,
                selectedRescheduleTime,
                rescheduleRequestedByCustomer

            } = this;
            return {
                selectedStatus,
                selectedRescheduleDate,
                selectedRescheduleTime,
                rescheduleRequestedByCustomer

            }

        },

    },

    methods: {
        ...mapActions({
            getAvailableTechnicians: 'technicians/getAvailableTechnicians',
            putAppointmentStatus: 'appointments/putAppointmentStatus',
            postTechnicianAvailableTimeSlots: 'technicians/postTechnicianAvailableTimeSlots',
            postAppointmentHistory: 'appointments/postAppointmentHistory',
            putAppointmentStatusCharge: 'appointments/putAppointmentStatusCharge',

        }),

        async getTechnicianTimeSlots(date) {

            this.loader(true);
            const data = {
                requested_date: date,
                state: this.appointmentState,
                preference: this.appointmentPreference,
                panel: 3

            }
            if (this.appointmentTechnicianId && this.selectedStatus.value == 9) {
                data.technician_id = this.appointmentTechnicianId;
            }
            const response = await this.postTechnicianAvailableTimeSlots(data);

            if (response.message) {
                this.showToastMessage(response);
            }

            if (response.status === 200) {

                this.loader(false);
                if (this.technicianAvailableTimeSlots.status === false) {
                    this.showToastMessage({
                        message: this.technicianAvailableTimeSlots.message,
                        type: "error"
                    });
                }

            } else {
                this.loader(false);

            }

        },

        async updateAppointmentStatusHandler() {

            if (this.selectedStatus.value == 9) {

                // for reschedule status

                this.frontendErrors.selectedRescheduleTime = [];
                this.frontendErrors.selectedRescheduleDate = [];

                if (this.selectedRescheduleDate) {
                    if (this.technicianAvailableTimeSlots.status === false) {
                        this.showToastMessage({
                            message: this.technicianAvailableTimeSlots.message,
                            type: "error"
                        });
                    }
                    if (this.selectedRescheduleDate && this.selectedRescheduleTime) {

                        let isTrue = this.updateStatusWithNoteValidation();

                        if (isTrue) {
                            const data = {
                                id: this.appointmentId,
                                data: {
                                    status: parseInt(this.selectedStatus.value),
                                    reschedule_date: this.selectedRescheduleDate,
                                    reschedule_time: this.selectedRescheduleTime.value,
                                    appointment_note: this.noteDescription,
                                    user_type: 1,
                                    user_id: this.$store.getters["login/authUser"].id,
                                    reschedule_requested_by_customer: 1

                                }

                            }
                            await this.updateStatusByApiCall(data);
                        }

                    }
                    if ((!this.selectedRescheduleTime) && this.selectedRescheduleDate) {
                        this.frontendErrors.selectedRescheduleTime.push('Please enter time');
                    }

                }

                if (!this.selectedRescheduleDate) {
                    this.frontendErrors.selectedRescheduleDate.push('Please enter date');
                }

            } else if (this.selectedStatus.value == 1) {

                if (this.selectedPenaltyType) {

                    let isTrue = this.updateStatusWithNoteValidation();
                    if (isTrue) {
                        const data = {
                            id: this.appointmentId,
                            data: {
                                status: parseInt(this.selectedStatus.value),
                                cancellation_penalty_type: this.selectedPenaltyType.value,
                                appointment_note: this.noteDescription,
                                user_type: 1,
                                cancellation_requested_by_customer: 1,
                                user_id: this.$store.getters["login/authUser"].id,

                            }

                        }
                        await this.updateStatusByApiCall(data);
                    }

                } else {
                    this.frontendErrors.selectedPenaltyType = [];
                    this.frontendErrors.selectedPenaltyType.push('Please select a penalty type');
                }
            }

        },

        async updateStatusByApiCall(data) {
            this.loader(true);
            const response = await this.putAppointmentStatus(data);

            if (response.status === 200) {

                if (response.message.status === true) {
                    this.createAppointmentHistory();

                    this.loader(false);

                    this.resetData();
                    this.showToastMessage({
                        message: `${response.message.message}`,
                        type: 'success'
                    });
                    document.querySelector('[data-bs-target="#appointmentStatusUpdateModal"]').click();
                    this.$emit('getAppointmentList', this.appointmentParams);
                } else {
                    this.loader(false);
                    this.showToastMessage({
                        message: `${response.message.message}`,
                        type: 'error'
                    });
                }

            } else {
                if (response.message) {
                    this.showToastMessage(response);
                }
                this.loader(false);

            }
        },
        async appointmentStatusUpdateChargeCalculation(data) {
            this.loader(true);
            const response = await this.putAppointmentStatusCharge(data);

            if (response.status === 200 || response.status === 201) {
                this.statusPreUpdateChargeResponse = response.data;
                this.loader(false);

            }
            if (response.message) {
                this.showToastMessage(response);
            }
            this.loader(false);
        },

        createAppointmentHistory() {
            const data = {
                user_id: this.$store.getters["login/authUser"].id,
                appointment_id: this.appointmentId,
                technician_id: this.appointmentTechnicianId,
                panel: 1,
                status: this.selectedStatus.value,
            };

            this.postAppointmentHistory(data);

        },
        updateStatusWithNoteValidation() {

            this.frontendErrors.noteDescription = [];

            if ((!this.noteDescription)) {
                this.frontendErrors.noteDescription = [];
                this.frontendErrors.noteDescription.push(`Please enter Note why you want to update status to ${(this.selectedStatus.name.toLowerCase())}`);
            }

            if (this.noteDescription) {
                return true;
            }

        },
        resetData() {

            this.selectedRescheduleDate = '';
            this.selectedRescheduleTime = '';
            this.selectedPenaltyType = '';

            this.selectedStatus = '';

            this.rescheduleRequestedByCustomer = 1;
            this.cancellationRequestedByCustomer = 1;
            this.noteDescription = "";

            this.frontendErrors.selectedRescheduleDate = [];
            this.frontendErrors.selectedRescheduleTime = [];

            this.frontendErrors.noteDescription = [];
            this.frontendErrors.selectedPenaltyType = [];

        }
    }

}
</script>

<style>
</style>
