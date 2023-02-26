<template>
  <div>
    <div class="modal fade" id="productConditionsModal" tabindex="-1" role="dialog"
         aria-labelledby="productConditionsModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-md modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header d-flex btn-brand">
            <h5 class="text-white mb-0 pb-0"><span class="text-uppercase">{{ product.name }}</span>( {{
                product.code
              }} )</h5><small><span class=""></span></small>
            <!-- <button @click="resetData" type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><i
                class="bx bx-x"></i></button> -->
          </div>
          <div class="modal-body">
            <div v-for="(singleCondition,index) in productConditions" :key="index">
              <div class="d-flex justify-content-between align-items-center">
                <div class="">
                  <p class="mb-0 pb-0 "><span class="font-weight-bold">Type:</span> <span class="text-500">{{ singleCondition.condition }}</span></p>
                  <div>
                    <p class="mb-0 pb-0"><span class="font-weight-bold mb-0 pb-0">Price
                      <i class='bx bx-edit-alt cursor-pointer' @click="toggleInput(index)"></i>:  </span>
                      <input v-if="isActive === index" class="product-price-update-input-field"
                             v-model="singleCondition.amount"
                             type="number"
                             :id="`id-${index}`">
                      <span v-else>{{ singleCondition.amount }}
<!--                      <span v-if="singleCondition.isDiscounted===true" style='color:red;text-decoration:line-through'
                            v-tooltip="{text:'Actual Price',displayArrow:true,
                            theme:{
                              color:'#000000',
                              placement:'top',
                              'background-color':'#F2F4F4'
                            }}">
                        <span style='color:black'>{{ singleCondition.actualAmount }}</span>

                      </span>-->
                      </span>

                    </p>
                  </div>
                  <!--                                 <button class="btn btn-primary btn-sm" @click="addToCart">Add</button> -->
                </div>
                <div class="">
                  <button class="btn add-product-btn"
                          @click="addToCart(productId,singleCondition.id, singleCondition.amount)">Add
                  </button>
                </div>
              </div>
              <hr>
            </div>

          </div>
          <div class="modal-footer border-0 pt-0">
            <button @click="resetData" type="button" class="btn btn-brand" data-bs-dismiss="modal">
              <i class="bx bx-x d-block d-sm-none"></i>
              <span class="d-none d-sm-block ">Close</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShowToastMessage from '~/mixins/ShowToastMessage';


export default {
  name: 'ProductConditionsModal',
  props: {
    singleProduct: {
      type: Object,
      required: true,
    }
  },
  emits: ['getSelectedProductCondition'],
  mixins: [ShowToastMessage],
  data() {
    return {
      isActive: null,
      count: 0,
      product: {
        name: '',
        type: '',
        category: '',
        code: ''
      },
      productConditions: [],
      productId: null,
    }
  },
  watch: {
    async singleProduct(value) {
      this.productId = value.id;
      this.product = {
        name: value.name,
        type: value.type,
        code: value.code,
      };
      if (value.productPrices && Array.isArray(value.productPrices)) {
        this.productConditions = value.productPrices.filter((price) => price.status === 'Active').map((current) => {
          let {amount, actualAmount, discount, isDiscounted} = this.getAmountWithDiscount(current);
          return {
            id: current.id,
            condition: current.condition,
            quantity: 0,
            amount: amount / 100,
            actualAmount: actualAmount / 100,
            discount: discount / 100,
            isDiscounted: isDiscounted
            //...this.getAmountWithDiscount(current),
            //amount: (this.getAmountWithDiscount(current).discountedAmount / 100) ?? 0
          }
        });
      }
    }
  },
  methods: {
    // TODO: check empty object
    isEmptyObject(value) {
      return Object.keys(value).length === 0 && value.constructor === Object;
    },
    // get amount regarding with discount
    getAmountWithDiscount(priceObj) {
      let amount = priceObj.amount;
      if (!this.isEmptyObject(priceObj) && priceObj.discount_status === 'Active') {
        const currentDateTime = this.getCurrentDateTime();
        let isDiscountAccepted = (priceObj.discount_start_at !== null && priceObj.discount_end_at !== null) ?
            new Date(currentDateTime) >= new Date(priceObj.discount_start_at) && new Date(currentDateTime) <= new Date(priceObj.discount_end_at)
            : (priceObj.discount_start_at !== null) ? new Date(currentDateTime) >= new Date(priceObj.discount_start_at) :
                (priceObj.discount_end_at !== null) ? new Date(currentDateTime) <= new Date(priceObj.discount_end_at) : true;

        if (isDiscountAccepted && priceObj.discount > 0) {
          let discount = priceObj.discount_type === 'Percentage' ? (amount * priceObj.discount) / 10000 : priceObj.discount;
          let discountedAmount = (amount - discount) <= 0 ? 0 : (amount - discount);
          return {
            actualAmount: amount,
            discount: discount,
            amount: discountedAmount,
            isDiscounted: true
          }
        }
      }
      return {
        actualAmount: amount,
        discount: 0,
        amount: amount,
        isDiscounted: false
      };
    },
    // TODO: get current data & time
    getCurrentDateTime() {
      let today = new Date();
      let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      let time = ('0' + today.getHours()).slice(-2) + ":" + ('0' + today.getMinutes()).slice(-2) + ":" + ('0' + today.getSeconds()).slice(-2);
      return date + ' ' + time;
    },

    increment(index) {
      this.productConditions[index].quantity++

    },
    decrement(index) {
      this.productConditions[index].quantity > 0 ? this.productConditions[index].quantity-- : 0


    },
    addToCart(productId, productPriceId, amount) {
      if (amount <= 0 || amount === null) {
        this.showToastMessage({
          type: 'warning',
          message: `This product is not available right now`
        });
        return;
      }
      let dataObj = {
        productId: productId,
        productPriceId: productPriceId,
        amount: amount
      }
      this.$emit('getSelectedProductCondition', dataObj)

      document.querySelector('[data-bs-dismiss="modal"]').click();

    },
    toggleInput(index) {
      let isVisible = document.getElementById(`id-${index}`);
      this.isActive = isVisible === null ? index : null

    },
    resetData() {
      /* Object.assign(this.$data, this.$options.data.apply(this));*/
    }

  }
}
</script>

<style scoped>
.btn-quantity {
  width: 50px;
  text-align: center;
  font-weight: 500;
  cursor: pointer;

}

.quantity {
  width: 30px;
  text-align: center;

}

.quantity-section {
  border: 1px solid #DFE3E7;
  height: 30px;
}

.addItem {
  height: 30px;
  background-color: #5a8dee;
  justify-content: center;
  border: none;
  color: white;
  font-size: 10px !important;
  border-radius: 5px;
}

.product-price-update-input-field {
  border: 1px solid #c5c5c5;
  border-radius: 5px;
  width: 100%;
  padding: 4px 15px
}

.product-price-update-input-field:focus {
  outline: 0 !important;
}

.product-price-update-input-field:focus {
  border: 1px solid #5a8dee !important;
}

</style>
