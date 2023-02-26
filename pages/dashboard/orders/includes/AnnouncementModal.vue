<template>
  <div class="modal fade " :id="modalName" tabindex="-1" role="dialog"
       :aria-labelledby="modalName" data-bs-keyboard="false" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-scrollable modal-md modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-transparent border-0">
          <h1></h1>
          <button type="button" class="close text-primary" aria-label="Close"
                  @click="closeAnnouncementModal(status = true)">
            <i class="bx bx-x"></i>
          </button>
        </div>
        <div class="modal-body text-center">
          <div class="success-modal-wrapper">
            <img src="/images/icon/success.png" alt="success">
            <h4 class="" style="color: #5C5C5C">
              <slot name="announcement-text">Appointment created successfully !</slot>
            </h4>
            <h5 class="reference">Reference No:
              <span class="text-primary">
                <slot name="announcement-reference"></slot>
              </span>
            </h5>
          </div>
        </div>
        <div class="modal-footer border-0 py-1">
          <button type="button" class="btn btn-primary" @click="closeAnnouncementModal(status = true)">
            <i class="bx bx-x d-block d-sm-none"></i>
            <span class="d-none d-sm-block">Close</span>
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnnouncementModal",
  props: {
    modalName: {
      type: String,
      default: "actionModal",
      required: true,
    },
    modelName: {
      type: String,
      default: "",
      required: true,
    },
  },
  data() {
    return {
      status: false,
    }
  },
  methods: {
    closeAnnouncementModal() {
      this.$emit('confirmActionModel', {
        modelName: this.modelName,
        status: this.status,
      });
    }
  }

}
</script>

<style scoped>
.success-modal-wrapper img {
  width: 76px;
  height: auto;
  display: block;
  margin: 0 auto 25px;
}

.success-modal-wrapper .reference {

  margin-top: 20px;
  color: #222;
  display: inline-block;
  text-align: center;
  padding: 10px 20px;
  border: 2px dashed #222;
  clear: both;
  font-weight: normal;
}
</style>
