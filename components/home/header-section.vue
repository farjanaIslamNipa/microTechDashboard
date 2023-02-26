<template>
  <header>
    <div class="header-banner">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-6 col-12">
            <div>
              <h1 class="text-white text-800 mb-0 header-title">You point it,</h1>
              <h1 class="text-white text-800 header-title">We fix it</h1>
              <h4 class="text-white text-400 subtitle-text">One-stop solution for your services. <br> Order any service, anytime.</h4>
              <div class="mt-4 pt-3">
                <div class="break-btn-wrapper">
                  <NuxtLink :to="{name: 'contact-us'}" class="break-btn">
                    <img class="call-icon" src="~/assets/images/global/animated-call-icon.gif" alt="Call Icon">Request a call back</NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-12">
            <div class="d-md-flex d-none">
              <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="50" class="m-lg-2 m-1"><img class="img-fluid" src="~/assets/images/home/partial-1.png" alt="Geekify"></div>
              <div data-aos="fade-down" data-aos-duration="800" data-aos-delay="400" class="m-lg-2 m-1"><img class="img-fluid" src="~/assets/images/home/partial-2.png" alt="Geekify"></div>
              <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="800" class="m-lg-2 m-1"><img class="img-fluid" src="~/assets/images/home/partial-3.png" alt="Geekify"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'HeaderSection'
  }
</script>

<style scoped>
.header-banner{
  background-image: url('~/assets/images/home/header-banner.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 750px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-title{
  font-size: 70px;
  /* text-shadow: 2px 7px 5px rgba(0,0,0,0.3),
    0px -4px 10px rgba(255,255,255,0.3); */
}
.subtitle-text{
  /* text-shadow: .1em .1em 0 hsl(200 50% 30%); */
}
.header-search-input{
  background: none;
  border: 1px solid white;
  border-radius: 5px 0 0 5px;
  height: 55px;
  color: white;
  clip-path: polygon(0 0, 100% 0%, 88% 100%, 0% 100%);
}

.header-search-btn{
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 0 5px 5px 0;
  height: 55px;
  color: var(--secondaryColor);
  font-weight: 600;
  font-size: 18px;
  clip-path: polygon(22% 0, 100% 0%, 100% 100%, 0% 100%);
  margin-left: -59px;
  padding: 0 35px;
}
.break-btn-wrapper{
  display: inline-block;
  padding: 12px 0 10px;
  border: 8px solid rgba(0, 184, 209, 0.4);
  border-radius: 38px;
}
.break-btn {
  position: relative;
  background: rgba(0, 184, 209, 0.4);
  color: white;
  text-transform: uppercase;
  text-decoration: none;
  border: 0.2em solid white;
  border-radius: 30px;
  padding: 14px 20px;
}
.break-btn::before{
  content: "";
    display: block;
    position: absolute;
    width: 8%;
    background: #369393;
    height: 0.2em;
    right: 20%;
    top: -3px;
    transform: skewX(-45deg);
    -webkit-transition: all 0.5s cubic-bezier(0.86, 0, 0.07, 1);
    transition: all 0.5s cubic-bezier(0.86, 0, 0.07, 1);
}
.break-btn::after{
  content: "";
    display: block;
    position: absolute;
    width: 8%;
    background: #229999;
    height: 0.2em;
    left: 20%;
    bottom: -3px;
    transform: skewX(45deg);
    -webkit-transition: all 0.5 cubic-bezier(0.86, 0, 0.07, 1);
    transition: all 0.5s cubic-bezier(0.86, 0, 0.07, 1);
}
.break-btn:hover::before{
  right: 75%;
}
.break-btn:hover::after{
  left: 75%;
}
.call-icon{
  height: 30px;
}
@media(max-width:1399px){
  .header-banner{
    height: 650px;
  }
}
@media(max-width:1199px){
  .header-banner{
    height: 550px;
  }
  .header-title{
  font-size: 60px;
}
.request-call-back-btn{
  height: 65px;
}
}
@media(max-width:992px){
  .header-banner{
    height: 450px;
  }
  .header-title{
  font-size: 52px;
}
.subtitle-text{
  font-size: 18px;
}
.request-call-back-btn{
  height: 60px;
}
}
@media(max-width:767px){
  .header-banner{
    height: 400px;
  }
.request-call-back-btn{
  height: 55px;
}
}
@media(max-width:374px){
  .header-title{
  font-size: 46px;
}
.subtitle-text{
  font-size: 17px;
}
}
</style>
