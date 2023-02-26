<template>
    <section class="mb-5 position-relative app-download-section">
      <div class="app-download-bg">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-lg-6 col-12 order-lg-1 order-2">
              <div class="mobile-image">
                <img data-aos="fade-right" data-aos-delay="300" data-aos-duration="900" class="img-fluid mobile-top" src="~/assets/images/home/mobile-0.png" alt="">
                <img data-aos="fade-left" data-aos-delay="50" data-aos-duration="900" class="img-fluid mobile-bottom" src="~/assets/images/home/mobile-1.png" alt="">
              </div>
              <div class="d-xl-none d-block text-center p-5">
                <img class="img-fluid" src="~/assets/images/home/mobile-image.png" alt="">
              </div>
            </div>
            <div class="col-lg-6 col-12 order-lg-2 order-1">
              <div class="pt-4 mt-3 ps-xl-0 ps-md-5 ps-0">
                <div class="download-app-text"><h5 class="ps-2 pt-3 text-uppercase">DOWNLOAD OUR APP</h5></div>
                <h1 class="app-download-title pe-5 me-5 mb-0 py-3">App is available for free on app store</h1>
                <p class="text-18 pe-xl-5 pe-0 me-xl-5 me-0">Find and book your appointment from anywhere with our Geekify customer app.</p>
                <div class="pt-1">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <img src="~/assets/images/home/google-play.svg" alt="">
                  </a>
                  <a class="ms-sm-2 ms-0" href="#" target="_blank" rel="noopener noreferrer">
                    <img src="~/assets/images/home/app-store.svg" alt="">
                  </a>
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
    name: 'DownloadApp'
  }
</script>

<style scoped>
.app-download-bg{
  background-image: url('~/assets/images/home/app-download-bg.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 400px;
}
.app-download-section{
  padding-top: 95px;
  padding-bottom: 90px;
}
.mobile-image{
  position: absolute;
  top: 0;
}
.download-app-text {
    width: 100%;
    position: relative;
}

.download-app-text:after {
    content: '';
    width: 100px;
    border-bottom: solid 2px var(--brandColor);
    position: absolute;
    left: 0;
    bottom: 20%;
    z-index: 1;
}

.download-app-text h5 {
    color: #9E9E9E;
    background-color:#f1f5f6;
    display: inline-block;
    z-index: 3;
    position: relative;
    margin: 0;
    margin-left: 60px;
    font-weight: 400;
}
.app-download-title{
  font-size: 38px;
}
.mobile-top{
  margin-right: -70px;
  position: relative;
  z-index: 5;
}
.mobile-bottom{
  z-index: 3;
}

@media(max-width:1199px){
  .app-download-title{
    font-size: 32px;
  }
}
@media(max-width:991px){
  .app-download-bg{
    background-image: none;
    background-color: #f1f5f6;
    height: auto;
}
  .mobile-image{
    display: none;
}
.app-download-section{
  padding-top: 0;
  padding-bottom: 0;
}
}
@media(max-width:475px){
.app-download-title{
    font-size: 28px;
  }
}
</style>