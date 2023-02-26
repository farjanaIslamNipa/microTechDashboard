
export default async function ({ store, route, redirect }) {

  if (process.client && !store.getters['login/isAuthenticated']) {

    await store.dispatch('login/commitAuthAttemptFromLocalStorage');
  }
  if (process.client && store.getters['login/isAuthenticated'] && (route?.name === 'login' || route?.name === 'forget-password')) {

    redirect('/dashboard');
  }
  if (process.client && (!store.getters['login/isAuthenticated']) && (route?.name !== 'login') && (route?.name !== 'forget-password')) {

    return redirect('/login');
  }


}
