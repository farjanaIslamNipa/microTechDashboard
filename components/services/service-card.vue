<template>
  <!-- <div class="col-lg-4 col-md-6 mb-4"> -->
    <NuxtLink :to="{name:'services-slug',params:{slug:service.slug}}" class="d-block bg-white service-card text-center px-4 pt-md-5 pt-4 h-100">
      <div class="service-title-height">
        <h4 class="pb-1 text-dark">{{ service.name }}</h4>
      </div>
      <div class="service-card-img mx-auto">
          <img :src="service.image" :alt="service.name" class="service-img">
        <!-- <img src="~/assets/images/services/email-account-setup-image.png" alt="" class="service-img"> -->
      </div>
    </NuxtLink>
  <!-- </div> -->
</template>

<script>
  export default {
    name: 'ServiceCard',
    props:['service']
  }
</script>

<style scoped>
.service-title-height{
  min-height: 80px;
}
.service-card-img{
  height: 180px;
  max-width: 290px;
}
.service-img{
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 12px 10px 0 0;
  background-color: black;
}
.service-card{
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px 0px;
  transition: all 0.5s ease-in-out;
}

.service-card:hover .service-img{
  filter: brightness(0.8);
  transition: all 0.5s ease;
}
.service-card:hover .service-title-height h4{
  color: var(--brandColor) !important;
  transition: all 0.5s ease;
}

@media(max-width:1199px){
  .service-title-height{
    min-height: 92px;
  }
}
@media(max-width:767px){
  .service-title-height{
    min-height: 60px;
  }
}

</style>
