<template>
<div class="book-online-bg d-flex align-items-center py-5">
    <div class="container">
        <div class="bg-white form-width mx-auto py-5 px-sm-5 px-2 rounded success-form position-relative">
            <!-- -------------- Success message ------------- -->
            <div class="">
                <div class="text-center">
                    <div class="appointmentSuccessfulWrapper">
                        <img style="height: 200px" src="~/assets/images/bookingSuccess/submitted.gif" alt="">
                        <h1 class="" style="color: #F58220"><i class=''>Congratulations !</i> </h1>
                        <h4 class="" style="color: #5C5C5C">Your order has been confirmed. Please check your email for details!</h4>
                        <h5 class="appointmentId">Your order number is : <span class="text-primary">{{this?.$route?.params?.reference ?? ''}}</span></h5>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import Loader from '~/mixins/Loader';
    import ShowToastMessage from '~/mixins/ShowToastMessage';

    export default {
        name: 'OrderSuccess',
        props: ['routeName', 'reference'],
        mixins: [ShowToastMessage, Loader],
        layout: 'dashboard-layout',

        components: {
            // AppLayout,
        },
        mounted() {
            if (!(this.$route.params.reference)) {
                this.$router.push({
                    name: 'dashboard'
                });
                this.showToastMessage({
                    type: 'error',
                    message: `Something went wrong please contact with us.`
                });
                return;
            }


        },

    }
</script>

<style scoped>
.book-online-bg {
    /* background-image: url('../../../../assets/images/book-online-bg.jpg'); */
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    min-height: 80vh;
}

:root {
    --white: #ffffff;
    --light: #f0eff3;
    --black: #000000;
    --dark-blue: #1f2029;
    --dark-light: #353746;
    --red: #da2c4d;
    --yellow: #f8ab37;
    --grey: #ecedf3;
}

::selection {
    background-color: rgb(0, 140, 255) !important;
    color: #fff;
}

::-moz-selection {
    background-color: rgb(0, 140, 255) !important;
    color: #fff;
}

.form-width {
    width: 70%;
}

/* making form responsive */
@media(min-width:320px) and (max-width:991px) {
    .form-width {
        width: 100%;
    }
}

@media(min-width:320px) and (max-width:500px) {
    .form-width {
        width: 100%;
    }
}

strong {
    color: #513950;
}

.form-btn {
    width: 130px;
    background-color: var(--brandColor);
    color: #fff;
    transition: all 0.3s ease;
}

.form-btn:hover {
    background-color: var(--brandColor);
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.4) 0 2px 4px, rgba(0, 0, 0, 0.2) 0 7px 13px -3px, rgba(0, 0, 0, 0.07) 0 -3px 0 inset;
}
</style>





