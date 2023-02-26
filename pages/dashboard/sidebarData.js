const sidebarData= [
  {
      id: 1,
      title: 'Booking',
      menuItems:[
          {
              id:1,
              icon: '/dashboard/book-a-technician.svg',
              name: 'Book a technician',
              link: 'dashboard-book-a-technician'
          },

          {
              id: 3,
              icon: '/dashboard/my-bookings.svg',
              name: 'My Bookings',
              link: 'dashboard-bookings'
          },


      ],
  },
  {
      id: 1,
      title: 'Orders',
      menuItems:[

          {
              id: 2,
              icon: '/dashboard/place-order.svg',
              name: 'Place order',
              link: 'dashboard-orders-create'
          },

          {
              id: 4,
              icon: '/dashboard/my-orders.svg',
              name: 'My Orders',
              link: 'dashboard-orders'
          },

      ],
  },
  {
      id: 2,
      title: 'Offers',
      menuItems:[
          {
              id: 6,
              icon: '/dashboard/my-coupon.svg',
              name: 'My Coupon',
              link: 'dashboard-my-coupons'
          },
          {
              id: 7,
              icon: '/dashboard/refer-and-get-a discount.svg',
              name: 'Refer & get discount',
              link: 'dashboard-refer-and-get-discount'
          },
          {
              id: 8,
              icon: '/dashboard/geekify-points.svg',
              name: 'Geekify Points',
              link: 'dashboard-geekify-points'
          },
          // {
          //     id: 9,
          //     icon: '/dashboard/offers.svg',
          //     name: 'Special Offers'
          // },
      ],
  },
  {
      id: 3,
      title: 'Account',
      menuItems:[
          {
              id:10,
              icon: '/dashboard/profile.svg',
              name: 'My Profile',
              link:'dashboard-profile'
            //   subMenu: [
            //       {
            //           id: 1,
            //           name: 'Edit Profile'
            //       },
            //       {
            //           id: 2,
            //           name: 'Update'
            //       },
            //       {
            //           id: 3,
            //           name: 'Delete'
            //       },
            //   ]
          },
          {
              id:11,
              icon: '/dashboard/saved-addresses.svg',
              name: 'Addresses',
              link:'dashboard-address'
          },
          // {
          //     id:11,
          //     icon: '/dashboard/reset-password.svg',
          //     name: 'Reset password'
          // }
      ],
  }
  ]
  export default sidebarData;
