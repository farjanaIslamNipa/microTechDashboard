import AOS from 'aos'

export default ({ app }, inject) => {
  // eslint-disable-next-line no-use-before-define
  /* eslint-disable eol-last */
  app.AOS = AOS.init({ disable: window.innerWidth < 1024 })
}