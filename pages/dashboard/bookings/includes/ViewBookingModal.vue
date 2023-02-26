<template>
  <div class="order-details-modal">
    <div class="modal fade " id="viewBookingModal" tabindex="-1" role="dialog" aria-labelledby="viewBookingModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered">
            <div class="modal-content mb-5 pb-sm-0 pb-5">
              <div class="modal-header py-2 bg-blue text-white">
                <div class="d-flex justify-content-between align-items-center w-100  pt-sm-0 pt-2">
                  <h4 class="mb-0">Booking Details </h4>
                  <div>
                    <button type="button" class="btn" data-bs-dismiss="modal">
                        <span class="text-20 text-white"><i class="fa-solid fa-xmark"></i></span>
                    </button>
                  </div>
                </div>
              </div>
                <div class="modal-body pb-5 mb-5">
                  <div v-if=" appointmentDetails.date" class="text-center">
                    <p class="mb-0 text-18">Booking Date</p>
                    <p class="text-500 text-18">
                      <span>{{ new Date(`${appointmentDetails.date}`).toLocaleDateString("en-AU", {day: "numeric",month: "short",year: "numeric",})  }}</span>,
                      <span class="text-uppercase">&nbsp;{{ new Date(`${appointmentDetails.date}`).toLocaleTimeString("en-AU") }}</span></p>
                  </div>
                  <div class="bg-light mt-4 p-4">
                    <div class="row">
                      <div class="col-md-4 mb-md-0 mb-3">
                        <div class="text-md-center text-start">
                          <p class="mb-1 text-600">${{appointmentDetails.appointmentTotalCharge}} <small class="text-400">AUD</small></p>
                          <p class="mb-0 text-secondary text-500">Payable</p>
                        </div>
                      </div>
                      <div class="col-md-4 mb-md-0 mb-3">
                        <div class="text-md-center text-start paid-section-border">
                          <p class="mb-1 text-600">${{appointmentDetails.appointmentTotalPaid}} <small class="text-400">AUD</small></p>
                          <p class="mb-0 text-secondary text-500">Paid</p>
                        </div>
                      </div>
                      <div class="col-md-4 mb-md-0 mb-3">
                        <div class="text-md-center text-start">
                          <p class="mb-1 text-600 text-success">{{appointmentPaymentStatus}}</p>
                          <p class="mb-0 text-secondary text-500">Status</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Booking Details -->
                  <div class="bg-light mt-4 p-4">
                    <p class="text-18 text-600">Booking Details</p>
                  <div class="d-flex justify-content-between">
                    <p class="mb-2">Ref no</p>
                    <p class="text-600 mb-2">{{ appointmentDetails.reference }}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="mb-2">Status</p>
                    <p class="mb-2">
                      <span class="text-600" :class="appointmentDetails.status === 'Pending'?'brand-color':'text-blue'"> {{ appointmentDetails.status }} </span>
                    </p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="mb-2">Type</p>
                    <p class="mb-2">{{ appointmentDetails.type  }}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="mb-2">Platform</p>
                    <p class="mb-2">{{ appointmentDetails?.platform }}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="mb-2">Parking</p>
                    <p class="mb-2">{{ appointmentDetails.parking ? appointmentDetails.parking : 'No'}}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="mb-0">Service</p>
                    <p class="mb-0 text-600 text-18 ms-sm-0 ms-5">{{appointmentDetails.service.name}}</p>
                  </div>
                </div>

                <!-- Booking Note -->
                <div class="bg-light mt-4 p-4">
                  <p class="text-18 text-600 mb-2">Booking Note</p>
                  <p v-for="(note,index) in appointmentDetails.appointmentNotes" :key="note.id" class="mb-0">
                    <span v-if="index == 0"></span>{{note.description}}
                  </p>
                </div>

                <!-- Contact Details -->
                <div class="bg-light mt-4 p-4">
                    <p class="text-18 text-600">Booking Details</p>
                  <div v-if="appointmentDetails.customer.user.first_name  && appointmentDetails.customer.user.last_name" class="d-sm-flex d-block mb-sm-0 mb-4 justify-content-between">
                    <p class="mb-sm-2 mb-1 text-500">Name</p>
                    <p class="text-600 mb-2">{{`${appointmentDetails.customer.user.first_name}&nbsp;${appointmentDetails.customer.user.last_name}`}}</p>
                  </div>
                  <div v-if="appointmentDetails.business" class="d-sm-flex d-block mb-sm-0 mb-4 justify-content-between">
                    <p class="mb-sm-2 mb-1 text-500">Business Name</p>
                    <p class="text-500 mb-2">{{appointmentDetails.business}}</p>
                  </div>
                  <div v-if="appointmentDetails.customer.user.phone_number" class="d-sm-flex d-block mb-sm-0 mb-4 justify-content-between">
                    <p class="mb-sm-2 mb-1 text-500">Phone</p>
                    <p class="mb-2">
                      {{ appointmentDetails.customer.user.phone_number }}
                    </p>
                  </div>
                  <div v-if="appointmentDetails.customer.user.email" class="d-sm-flex d-block mb-sm-0 mb-4 justify-content-between">
                    <p class="mb-sm-2 mb-1 text-500">Email</p>
                    <p class="mb-2">{{ appointmentDetails.customer.user.email  }}</p>
                  </div>
                  <div v-if="appointmentDetails.customer.address.id" class="d-sm-flex d-block mb-sm-0 mb-4 justify-content-between">
                    <p class="mb-sm-2 mb-1 text-500">Address</p>
                    <p class="mb-2">
                      <span v-if="appointmentDetails.customer.address.street">{{ appointmentDetails.customer.address.street}}</span>,
                      <span v-if="appointmentDetails.customer.address.suburb">&nbsp;{{appointmentDetails.customer.address.suburb}},</span>
                      <span v-if="appointmentDetails.customer.address.state">&nbsp;{{appointmentDetails.customer.address.state}},</span>
                      <span v-if="appointmentDetails.customer.address.country">&nbsp;{{appointmentDetails.customer.address.country}}</span>
                    </p>
                  </div>
                  <div v-if="appointmentDetails.serviceAddress.id" class="d-sm-flex d-block mb-sm-0 mb-4 justify-content-between">
                    <p class="mb-sm-2 mb-1 text-500">Service Address</p>
                    <p class="mb-2">
                      <span v-if="appointmentDetails.serviceAddress.street">{{ appointmentDetails.serviceAddress.street}},</span>
                      <span v-if="appointmentDetails.serviceAddress.suburb">&nbsp;{{appointmentDetails.serviceAddress.suburb}},</span>
                      <span v-if="appointmentDetails.serviceAddress.state">&nbsp;{{appointmentDetails.serviceAddress.state}},</span>
                      <span v-if="appointmentDetails.serviceAddress.country">&nbsp;{{appointmentDetails.serviceAddress.country}}</span>
                    </p>
                  </div>
                  <div v-if="appointmentDetails.billingAddress.id" class="d-sm-flex d-block mb-sm-0 mb-4 justify-content-between">
                    <p class="mb-sm-2 mb-1 text-500">Billing Address</p>
                    <p class="mb-2">
                      <span v-if="appointmentDetails.billingAddress.street">{{ appointmentDetails.billingAddress.street}},</span>
                      <span v-if="appointmentDetails.billingAddress.suburb">&nbsp;{{appointmentDetails.billingAddress.suburb}},</span>
                      <span v-if="appointmentDetails.billingAddress.state">&nbsp;{{appointmentDetails.billingAddress.state}},</span>
                      <span v-if="appointmentDetails.billingAddress.country">&nbsp;{{appointmentDetails.billingAddress.country}}</span>
                    </p>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table">
                      <thead class="thead-light">
                          <tr>
                              <th>SERVICE</th>
                              <th class="text-center">QTY/HOURS</th>
                              <th class="text-end">UNIT PRICE</th>
                              <th class="text-end">PRICE</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td class="text-bold-500">{{appointmentDetails.service.name}} </td>
                              <td class="text-center">{{appointmentDetails.quantity}}</td>
                              <td class="text-500 text-end">${{parseFloat(appointmentDetails.unitPrice * 0.01).toFixed(2)}}</td>
                              <td class="text-500 text-end">${{parseFloat(appointmentDetails.appointmentTotalServicePrice).toFixed(2)}}</td>
                          </tr>
                      </tbody>
                  </table>
                </div>

                <!-- charges list start -->
                <div class="row justify-content-end mt-3">
                  <div class="col-md-6">
                    <table class="table table-borderless">
                      <tr>
                        <td class="text-500">GST(+):</td>
                        <td class="text-end"><span>${{appointmentDetails.appointmentTotalGst}} <small class="" style="font-size: 0.8rem;">AUD</small></span></td>
                      </tr>
                      <tr>
                        <td class="text-500">Service Price(+):</td>
                        <td class="text-end"><span>${{appointmentDetails.appointmentTotalServicePrice}} <small class="" style="font-size: 0.8rem;">AUD</small></span></td>
                      </tr>
                      <tr>
                        <td class="text-500">Surcharge(+):</td>
                        <td class="text-end"><span>${{appointmentDetails.appointmentTotalSurCharge}} <small class="" style="font-size: 0.8rem;">AUD</small></span></td>
                      </tr>
                      <tr>
                        <td class="text-500">Discount(-):</td>
                        <td class="text-end"><span>${{appointmentDetails.appointmentTotalDiscount}} <small class="" style="font-size: 0.8rem;">AUD</small></span></td>
                      </tr>
                      <tr>
                        <td class="text-500">Total:</td>
                        <td class="text-end"><span>${{appointmentDetails.appointmentTotalCharge}} <small class="" style="font-size: 0.8rem;">AUD</small></span></td>
                      </tr>
                      <tr>
                        <td class="text-500">Paid:</td>
                        <td class="text-end"><span>${{appointmentDetails.appointmentTotalCharge}} <small class="" style="font-size: 0.8rem;">AUD</small></span></td>
                      </tr>
                      <tr v-if="parseFloat(appointmentDetails.appointmentTotalCharge) > parseFloat(appointmentDetails.appointmentTotalPaid)">
                        <td class="text-500">Due:</td>
                        <td class="text-end"><span>{{ (parseFloat(parseFloat(appointmentDetails.appointmentTotalCharge) - parseFloat(appointmentDetails.appointmentTotalPaid)).toFixed(2))}} <small class="" style="font-size: 0.8rem;">AUD</small></span></td>
                      </tr>
                    </table>
                  </div>
                </div>

                <!-- Consent -->
                <div v-if=" appointmentDetails.appointmentConsents.length > 0" class="bg-light mt-4 p-4">
                  <p class="text-18 text-600">Closing Consent</p>
                    <div v-for="(appointmentConsent,index) in appointmentDetails.appointmentConsents" :key="index">
                        <p class="mb-0">{{appointmentConsent.remark}}</p>
                        <div><strong>Signature: </strong>
                            <img :src="appointmentConsent.signature" alt="customer-signature" style="width:100px;">
                        </div>
                        <hr>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  </div>
  </template>

  <script>
  export default {
      name: "BookingViewModal",
      props: ['appointment'],
      data() {
          return {
              appointmentDetails: {
                  id: '',
                  reference: "",
                  quantity: '',
                  type: "",
                  status: "",
                  platform: "",
                  parking: "",
                  preference: "",
                  date: "",
                  time: "",
                  length: null,
                  service: {
                      id: '',
                      name: "",
                      code: "",
                      description: "",
                      home_price: '',
                      business_price: '',
                      commission: "",
                      status: "",
                      // image:"http:\/\/localhost:8000\/default\/images\/services\/no-image.png",
                      // thumbnail:"http:\/\/localhost:8000\/default\/images\/services\/no-image.png"
                  },
                  business: null,
                  order: null,
                  customer: {
                      id: 201,
                      type: "",
                      status: "",
                      referral_code: "",
                      newsletter_subscription: "",
                      user: {
                          id: '',
                          first_name: "",
                          last_name: "",
                          email: null,
                          phone_number: "",

                          // avatar:"http:\/\/localhost:8000\/default\/images\/users\/avatar.png"
                      },
                      address: {
                          id: '',
                          street: "",
                          suburb: "",
                          state: "",
                          post_code: "",
                          country: ""
                      }
                  },
                  technician: {
                      id: "",
                      firstName: '',
                      lastName: '',
                      email: '',
                      phoneNumber: '',
                  },

                  billingAddress: {
                      id: '',
                      street: "",
                      suburb: "",
                      state: "",
                      post_code: "",
                      country: ""
                  },

                  serviceAddress: {
                      id: '',
                      street: "",
                      suburb: "",
                      state: "",
                      post_code: "",
                      country: ""
                  },

                  appointmentCharges: [],
                  appointmentPayments: [],

                  appointmentTotalCharge: 0,
                  appointmentTotalPaid: 0,
                  appointmentTotalSurCharge: 0,
                  appointmentTotalServicePrice: 0,
                  appointmentTotalDiscount: 0,
                  appointmentTotalGst: 0,

                  appointmentPaymentStatus: null,
                  appointmentNotes: [],
                  appointmentCreator: {
                      id: '',
                      panel: ""
                  },
                  appointmentConsents: [],
                  unitPrice: '',

              }
          }
      },
      watch: {
          appointment(currentAppointment) {

              this.appointmentDetails.id = currentAppointment.id ? currentAppointment.id : '';
              this.appointmentDetails.quantity = currentAppointment.quantity ? currentAppointment.quantity : '';
              this.appointmentDetails.unitPrice = currentAppointment.unit_price ? currentAppointment.unit_price : '';
              this.appointmentDetails.service.name = currentAppointment.service && currentAppointment.service.name ? currentAppointment.service.name : '';
              this.appointmentDetails.service.home_price = currentAppointment.service && currentAppointment.service.home_price ? currentAppointment.service.home_price : '';
              this.appointmentDetails.service.business_price = currentAppointment.service && currentAppointment.service.business_price ? currentAppointment.service.business_price : '';
              this.appointmentDetails.type = currentAppointment.type ? currentAppointment.type : '';
              this.appointmentDetails.reference = currentAppointment.reference ? currentAppointment.reference : '';
              this.appointmentDetails.date = currentAppointment.date ? currentAppointment.date : '';
              this.appointmentDetails.parking = currentAppointment.parking ? currentAppointment.parking : '';
              this.appointmentDetails.appointmentNotes = currentAppointment.appointmentNotes ? currentAppointment.appointmentNotes : '';
              this.appointmentDetails.status = currentAppointment.status ? currentAppointment.status : '';
              this.appointmentDetails.platform = currentAppointment.platform ? currentAppointment.platform : '';

              this.appointmentDetails.customer.user.first_name = currentAppointment.customer && currentAppointment.customer.user && currentAppointment.customer.user.first_name ? currentAppointment.customer.user.first_name : '';
              this.appointmentDetails.customer.user.last_name = currentAppointment.customer && currentAppointment.customer.user && currentAppointment.customer.user.last_name ? currentAppointment.customer.user.last_name : '';
              this.appointmentDetails.customer.user.email = currentAppointment.customer && currentAppointment.customer.user && currentAppointment.customer.user.email ? currentAppointment.customer.user.email : '';
              this.appointmentDetails.customer.user.phone_number = currentAppointment.customer && currentAppointment.customer.user && currentAppointment.customer.user.phone_number ? currentAppointment.customer.user.phone_number : '';
              this.appointmentDetails.business = currentAppointment?.address?.business?.name ?? '';


              this.appointmentDetails.customer.address.id = (currentAppointment.address && currentAppointment.address.id) ? currentAppointment.address.id : '';
              this.appointmentDetails.customer.address.street = (currentAppointment.address && currentAppointment.address.street) ? currentAppointment.address.street : '';
              this.appointmentDetails.customer.address.suburb = currentAppointment.address && currentAppointment.address.suburb ? currentAppointment.address.suburb : '';
              this.appointmentDetails.customer.address.state = currentAppointment.address && currentAppointment.address.state ? currentAppointment.address.state : '';
              this.appointmentDetails.customer.address.country = currentAppointment.address && currentAppointment.address.country ? currentAppointment.address.country : '';

              this.appointmentDetails.billingAddress.id = currentAppointment.billingAddress && currentAppointment.billingAddress.id ? currentAppointment.billingAddress.id : '';
              this.appointmentDetails.billingAddress.street = currentAppointment.billingAddress && currentAppointment.billingAddress.street ? currentAppointment.billingAddress.street : '';
              this.appointmentDetails.billingAddress.suburb = currentAppointment.billingAddress && currentAppointment.billingAddress.suburb ? currentAppointment.billingAddress.suburb : '';
              this.appointmentDetails.billingAddress.state = currentAppointment.billingAddress && currentAppointment.billingAddress.state ? currentAppointment.billingAddress.state : '';
              this.appointmentDetails.billingAddress.post_code = currentAppointment.billingAddress && currentAppointment.billingAddress.post_code ? currentAppointment.billingAddress.post_code : '';
              this.appointmentDetails.billingAddress.country = currentAppointment.billingAddress && currentAppointment.billingAddress.country ? currentAppointment.billingAddress.country : '';

              this.appointmentDetails.serviceAddress.id = currentAppointment.address && currentAppointment.address.id ? currentAppointment.address.id : '';
              this.appointmentDetails.serviceAddress.street = currentAppointment.address && currentAppointment.address.street ? currentAppointment.address.street : '';
              this.appointmentDetails.serviceAddress.suburb = currentAppointment.address && currentAppointment.address.suburb ? currentAppointment.address.suburb : '';
              this.appointmentDetails.serviceAddress.state = currentAppointment.address && currentAppointment.address.state ? currentAppointment.address.state : '';
              this.appointmentDetails.serviceAddress.post_code = currentAppointment.address && currentAppointment.address.post_code ? currentAppointment.address.post_code : '';
              this.appointmentDetails.serviceAddress.country = currentAppointment.address && currentAppointment.address.country ? currentAppointment.address.country : '';

              this.appointmentDetails.technician.id = currentAppointment.technicianAppointment && currentAppointment.technicianAppointment.technician && currentAppointment.technicianAppointment.technician.id ? currentAppointment.technicianAppointment.technician.id : '';
              this.appointmentDetails.technician.firstName = currentAppointment.technicianAppointment && currentAppointment.technicianAppointment.technician && currentAppointment.technicianAppointment.technician.user && currentAppointment.technicianAppointment.technician.user.first_name ? currentAppointment.technicianAppointment.technician.user.first_name : '';
              this.appointmentDetails.technician.lastName = currentAppointment.technicianAppointment && currentAppointment.technicianAppointment.technician && currentAppointment.technicianAppointment.technician.user && currentAppointment.technicianAppointment.technician.user.last_name ? currentAppointment.technicianAppointment.technician.user.last_name : '';
              this.appointmentDetails.technician.email = currentAppointment.technicianAppointment && currentAppointment.technicianAppointment.technician && currentAppointment.technicianAppointment.technician.user && currentAppointment.technicianAppointment.technician.user.email ? currentAppointment.technicianAppointment.technician.user.email : '';
              this.appointmentDetails.technician.phoneNumber = currentAppointment.technicianAppointment && currentAppointment.technicianAppointment.technician && currentAppointment.technicianAppointment.technician.user && currentAppointment.technicianAppointment.technician.user.phone_number ? currentAppointment.technicianAppointment.technician.user.phone_number : '';

              this.appointmentDetails.appointmentCharges = (currentAppointment.appointmentCharges) ? currentAppointment.appointmentCharges : [];
              this.appointmentDetails.appointmentPayments = (currentAppointment.appointmentPayments) ? currentAppointment.appointmentPayments : [];
              this.appointmentDetails.appointmentConsents = (currentAppointment.appointmentConsents) ? currentAppointment.appointmentConsents : [];

              let charge = 0;

              let appointmentTotalServicePrice = 0;
              let appointmentTotalSurCharge = 0;
              let appointmentTotalGst = 0;
              let appointmentTotalDiscount = 0;

              this.appointmentDetails.appointmentCharges.map((item) => {

                  if (item.type == "GST") {
                      charge = charge + item.amount;
                      appointmentTotalGst = appointmentTotalGst + item.amount;

                  } else if (item.type == "Service Price") {

                      charge = charge + item.amount;
                      appointmentTotalServicePrice = appointmentTotalServicePrice + item.amount;

                  } else if (item.type == "Surcharge") {
                      charge = charge + item.amount;
                      appointmentTotalSurCharge = appointmentTotalSurCharge + item.amount;

                  } else if (item.type == "Discount") {
                      charge = charge - item.amount;
                      appointmentTotalDiscount = appointmentTotalDiscount + item.amount;
                  }

              });

              charge = parseFloat(charge / 100).toFixed(2);

              appointmentTotalServicePrice = parseFloat(appointmentTotalServicePrice / 100).toFixed(2);
              appointmentTotalSurCharge = parseFloat(appointmentTotalSurCharge / 100).toFixed(2);
              appointmentTotalGst = parseFloat(appointmentTotalGst / 100).toFixed(2);
              appointmentTotalDiscount = parseFloat(appointmentTotalDiscount / 100).toFixed(2);

              this.appointmentDetails.appointmentTotalCharge = charge;

              this.appointmentDetails.appointmentTotalSurCharge = appointmentTotalSurCharge;
              this.appointmentDetails.appointmentTotalGst = appointmentTotalGst;
              this.appointmentDetails.appointmentTotalDiscount = appointmentTotalDiscount;
              this.appointmentDetails.appointmentTotalServicePrice = appointmentTotalServicePrice;

              let paidAmount = 0;

              this.appointmentDetails.appointmentPayments.map((item) => {

                  paidAmount = paidAmount + item.payment.total_transaction;

              });

              paidAmount = parseFloat(paidAmount / 100).toFixed(2);
              this.appointmentDetails.appointmentTotalPaid = paidAmount;
              if (charge >= paidAmount) {
                  this.appointmentPaymentStatus = "Paid";
              } else if (paidAmount == 0) {
                  this.appointmentPaymentStatus = "Unpaid";
              } else {
                  this.appointmentPaymentStatus = "Partially paid";
              }

          },

          // appointmentCharges(currentCharges) {

          // }

      },
      computed: {

      },

  }
  </script>

  <style>
.paid-section-border{
  border-left: 1px solid #bdbdbd;
  border-right: 1px solid #bdbdbd;
}
@media(max-width:767px){
  .paid-section-border{
    border: none;
}
}
  </style>
