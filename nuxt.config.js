export default {
  // Target: https://go.nuxtjs.dev/config-target
  ssr: false,
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: `%s ${process.env.VUE_APP_NAME} | Customer`,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'fb:app_id', name: 'fb:app_id', content: '883712276121290' },
      { hid: 'og:site_name', property: 'og:site_name', content: `${process.env.VUE_APP_NAME}`},
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:description', property: 'og:description', content: 'Our techs get regular support from us and get to work in their desired time frames. Work with a team of experienced techs, in a vast platform that keeps you on your toes with variety and intensity of tasks, every day is an adventure!'},
      { hid: 'og:image', property: 'og:image', content: '' },
      { hid: 'og:image:alt', property: 'og:image:alt', content: `${process.env.VUE_APP_NAME}`},
      { hid: 'twitter:description', property: 'twitter:description', content: 'Our techs get regular support from us and get to work in their desired time frames. Work with a team of experienced techs, in a vast platform that keeps you on your toes with variety and intensity of tasks, every day is an adventure!'}
    ],
    script: [
      // Bootstrap Js cdn
      { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js', integrity:"sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM", crossorigin:"anonymous" },
      // Google autocomplete api
      { src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCMwCSdUrceC9GydbcIo-AG26HZBXCTR7c&libraries=places' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon-512.png', sizes: '512*512' },
      // Fontawsome icon css
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css', integrity: 'sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==', crossorigin: 'anonymous', referrerpolicy: 'no-referrer' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/bootstrap.css',
    'aos/dist/aos.css',
    '~/assets/css/style.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-datepicker', ssr: false },
    { src: '~plugins/vue-js-modal.js', ssr: false },
    // { src: '~plugins/vue-tag-input.js', ssr: false },
    { src: '~plugins/vue-multi-select.js', ssr: false },
    { src: '~plugins/google-auto-complete.js', ssr: false },
    { src: '~plugins/toastMessage', ssr: false },
    '~/plugins/axios',
    {
      src: "~plugins/v-date-picker",
      ssr: false
    },

  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/recaptcha',
    ['@nuxtjs/recaptcha', {
      siteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
      version: 3,
    }],
  ],
  loading: {
    color: "#F76A2A",
    height: '20px'
  },
  recaptcha: {
    hideBadge: true, // Hide badge element (v3 & v2 via size=invisible)
    siteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,    // Site key for requests
    version: 3,

  },


  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.VUE_APP_API_URL,


  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: null,
  },
  env: {
    app_name: process.env.VUE_APP_NAME,
    secret: process.env.VUE_APP_SECRET,
    base_url: process.env.VUE_APP_BASE_URL,
    after_pay_js_production_library: process.env.VUE_APP_AFTERPAY_JS_LIBRARY,
    google_api_key: process.env.VUE_APP_GOOGLE_MAP_API_KEY
  },
  router: {
    middleware: ['authAttemptLocalStorage'],
    extendRoutes(nuxtRoutes) {
      nuxtRoutes.map((route) => {
        route.path = route.path.replace('/information', '')
        route.name = route.name.replace('information-', '')
        route.path = route.path.replace('/auth', '')
        route.name = route.name.replace('auth-', '')
        return route
      })
    }
  }
}
