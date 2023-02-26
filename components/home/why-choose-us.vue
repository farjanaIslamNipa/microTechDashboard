<template>
  <section class="why-choose-bg mt-4">
    <div class="container">
      <div class="pt-md-5 pt-sm-4 pt-0 pb-xl-5 pb-lg-3 pb-0">
        <div data-aos="fade-down" data-aos-duration="1000" class="text-end"><img src="~/assets/images/home/why-choose-banner.png" alt="" class="img-fluid why-choose-img"></div>
        <div class="row justify-content-xl-start justify-content-center">
          <div class="col-xl-6 col-lg-8 col-md-10">
            <div data-aos="fade-up" data-aos-duration="1200" class="why-choose-box bg-white pt-sm-4 pt-0 pb-3 mb-4">
              <div class="why-choose-title"><h2 class="ps-3 pt-3">Why choose us?</h2></div>
              <div class="px-sm-5 px-2">
                <p class="text-18">Your satisfaction is our goal. If you’re not happy, we’ll work to make it right. </p>
                <div class="row mt-4">
                  <div class="col-md-6 mb-4">
                    <div class="bg-white light-box-shadow h-100 py-4 px-2">
                      <div class="d-flex align-items-center justify-content-center">
                        <div><img src="~/assets/images/home/background-check-icon.png" alt=""></div>
                        <h6 style="color: #BFABDC" class="mb-0 ms-3">Background <br>Check</h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div class="bg-white light-box-shadow h-100 py-4 px-2">
                      <div class="d-flex align-items-center justify-content-center">
                        <div><img src="~/assets/images/home/support-icon.png" alt=""></div>
                        <h6 style="color: #7FC2DF" class="mb-0 ms-3">24/7 <br>Support</h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div class="bg-white light-box-shadow h-100 py-4 px-2">
                      <div class="d-flex align-items-center justify-content-center">
                        <div><img src="~/assets/images/home/professional icon.png" alt=""></div>
                        <h6 style="color: #90AFE5" class="mb-0 ms-3">Expert  <br>Professional</h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div class="bg-white light-box-shadow h-100 py-4 px-2">
                      <div class="d-flex align-items-center justify-content-center">
                        <div><img src="~/assets/images/home/assurance-icon.png" alt=""></div>
                        <h6 style="color: #79EBCF" class="mb-0 ms-3">Rework  <br>Assurance</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'WhyChooseUs'
  }
</script>

<style scoped>
.why-choose-bg{
  background-image: url('~/assets/images/home/why-choose-bg.png');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
}
.why-choose-title {
    width: 100%;
    position: relative;
}

.why-choose-title:after {
    content: '';
    width: 100px;
    border-bottom: solid 2px var(--brandColor);
    position: absolute;
    left: 0;
    top: 50%;
    z-index: 1;
}

.why-choose-title h2 {
    background-color: white;
    display: inline-block;
    z-index: 3;
    position: relative;
    margin: 0;
    margin-left: 80px;
    font-size: 50px;
}
.why-choose-box{
  margin-top: -220px;
  position: relative;
}
@media(max-width:991px){
  .why-choose-title h2{
    font-size: 45px;
  }
}
@media(max-width:767px){
  .why-choose-title h2{
    font-size: 40px;
  }
  .why-choose-box{
    margin-top: -80px;
  }
}
@media(max-width:475px){
  .why-choose-title h2{
    font-size: 35px;
    margin-left: 0;
  }
  .why-choose-img{
    display: none;
  }
  .why-choose-box{
    margin-top: 0;
  }
}
</style>
