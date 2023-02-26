export default ({ $axios,store  }) => {
  $axios.onRequest(config => {
    config.headers.common['Client-Secret'] = process.env.secret;
    // store.dispatch("errors/commitResetErrors",error);
  });

  // $axios.onError(error => {

  //   if ( error && error.response && (error.response.status === 401 || error.response.status === 419)) {
  //     //  store.dispatch('appAuthLogout/commitLogoutAttempt', null, {root: true});

  //     // for closing all modal
  //     if (document.querySelector('[data-dismiss="modal"]')) {
  //         document.querySelector('[data-dismiss="modal"]').click();
  //     }


  //      $router.push({
  //         name: 'appLogin',
  //         params: {
  //             initToastDataMessage: error.response.data.message,
  //             initToastDataType: 'error',
  //         }
  //     });
  // }
  // if (error && error.response && error.response.status === 404) {
  //     return error.response;
  // }

  // return !error.response || !error.response.status ? {
  //     message: "Network connection error",
  //     type: 'error',
  // } : {
  //     message: error.response.data.message,
  //     type: 'error',
  //     code: error.response.data.code ?? null,
  //     exception: error.response.data.exception ?? null,
  //     status: error.response.status,
  //     errors: error.response.data.errors ?? {},
  // };
  //   store.dispatch("errors/commitSetErrors",error);
  //   // return {
  //   //   'name' :'me'
  //   // }
  //   // return Promise.resolve(false);
  //   // return 'fahim';
  //   // if(error.response.status === 500) {
  //   //   redirect('/sorry')
  //   // }
  // })
}
