export const en_msgs = {
  login_view: {
    title: 'Login',
    button_login: 'Sign In',
    button_register: 'Create an account',
  },
  register_view: {
    title: 'Register',
    button_register: 'Sign Up',
    login_redirect: 'Have an account?',
  },
  home: {},
  administrator: {
    title: 'Administration panel',
    menu: {
      accomodations: 'Accomodations',
      users: 'Users',
    },
  },
  saved_view: {
    title: 'Saved accomodations',
    not_saved: 'You have no saved accommodation',
    not_saved_subtitle: 'All saved accommodations will be displayed here.',
  },
  bookings_view: {
    title: 'My bookings',
    not_bookings: 'You have no bookings',
  },
  booking_task_view: {
    title: 'Booking for accomodation {name}',
    pricing_details: 'Price details',
    service_fee: 'Service fee',
    total: 'Total ({name})',
    button_clear_dates: 'Clean dates',
    payment_mehtod: 'Payment method',
    payment_info:
      'Payment data will not be processed until the booking check-In. In case of cancellation, the payment data (card number or PayPal email) will be deleted from the system.',
    credit_Card: 'Credir card',
    paypal: 'PayPal',
    button_confirm_booking: 'Confirm booking',
  },
  booking_details_view: {
    title: 'Booking of accomodation {name}',
    host: 'Host',
    dates: 'Booking dates',
    price_summary: {
      title: 'Payment summary',
      price_per_night: 'Price / night',
      cost: 'Cost ({name} x {nights} night)',
      service_fee: 'Service fee',
      total: 'Total',
      location: 'Location',
    },
  },
  accomodation_detail_view: {
    title: 'Booking details',
    imageGallery: {
      button: 'Show all',
    },
    show_more: 'Show more',
    button_book: 'Reserve',
    night: 'night | nights',
    services: {
      title: 'Services',
      button_show_more: 'Show the {n} services',
    },
    location: {
      title: 'Where it is located',
    },
    host: {
      title: 'Host details',
      button_show_profile: 'Show profile',
    },
    rules: {
      title: 'Accomodation rules',
    },
    reviews: {
      title: 'Reviews',
      average: 'Average rating: ({n})',
    },
  },
  upload_accomodation_view: {
    title: 'Post new accomodation',
    step1: {
      title: 'Basic data',
    },
    step2: {
      title: 'Location',
      help: '* You can drag the marker on the map to fill the fields automatically.',
    },
    step3: {
      title: 'Services',
      subtitle: 'Check the box of the services offered by the accommodation.',
      service_search_placeholder: 'Enter the service to be search for',
    },
    step4: {
      title: 'Rules',
      subtitle: 'Check the box of the rules of the accomodation rules.',
    },
    step5: {
      title: 'Images',
      subtitle:
        'Upload the images of the accommodation, up to a maximum of 8 images.',
      dragArea: {
        title: 'Select a file(s) or drag it/them here',
        image_format: 'jpg, jpeg, png, gif',
        image_max_size: 'Max. file size: 500Kb',
      },
    },
  },
  account_view: {
    user_profile_view: {
      title: 'Personal data',
      legal_name: 'Legal name',
    },
    user_bookings_view: {
      status: 'PENDING | CONFIRMED | COMPLETED | CANCELLED',
    },

    privacy_view: {
      title: 'Security & privacy',
      reset_pass: {
        title: 'Login & privacy',
        subtitle: 'Reset passwords',
        button: 'Reset',
      },
    },

    preferences: {
      title: 'Configuration & preferences',
      currency: 'Currency',
      lang: {
        title: 'Language',
        spanish: 'Spanish (Spain)',
        english: 'English (United Kingdom)',
      },
    },

    help_view: {
      title: 'Help',
      faq: {
        title: 'FAQ',
        subtitle: 'How to place ads, steps to book accommodation and more.',
      },
    },
    sidebar: {
      profile: 'Account',
      privacy: 'Security & privacy',
      config: 'Configuration & preferences',
      bookings: 'Bookings',
      help: 'Help',
    },
  },
  search: {
    default_placeholder: 'León',
    search_results: {
      not_results: 'No results found',
    },
  },
  header: {
    logo_alt: 'Leon Camp',
    search_placeholder: 'León',
    menu: {
      saved: 'Saved',
      bookings: 'Bookings',
      profile_icon: "{name}'s profile",
    },
  },
  footer: {
    copyright: '© 2022 Francisco Coya. All Rights Reserved.',
  },
  components: {
    buttons: {
      view: 'See',
      edit: 'Edit ',
      update: 'Update',
      delete: 'Delete',
      info: 'More information',
      login: 'Sing In',
      close_session: 'Close session',
      back: 'Return | Previous',
      next: 'Next',
      finish: 'Finish',
      view_ad: 'See ad',
      download_invoice: 'Download invoice',
    },
    forms: {
      name: 'Name',
      surname: 'Surname',
      email: 'Email',
      password: 'Password',
      password_confirmation: 'Confirm password',
      checkIn: 'Check-In',
      checkOut: 'Check-Out',
      cardNumber: 'Card number',
      paypalAccount: 'PayPal account email',
      registerNumber: 'Register number',
      description: 'Description',
      category: 'Category',
      area: 'Area',
      beds: 'Bed | Beds',
      bathroom: 'Bathroom | Bathrooms',
      bedroom: 'Bedroom | Bedrooms',
      guests: 'Guest | Guests',
      price: 'Price',
      lat: 'Latitude',
      lng: 'Longitude',
      address: 'Address',
      city: 'City',
      zip: 'Zip code',
    },
  },
  currency: {
    symbol: '£',
  },
};
