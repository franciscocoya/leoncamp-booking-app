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
  reset_password: {
    title: 'Reset Password',
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
    button_show_ad: 'Show accomodation',
    host: 'Host',
    dates: 'Booking dates',
    price_summary: {
      title: 'Payment summary',
      price_per_night: 'Price / night',
      cost: 'Cost ({name} x {nights} nights)',
      service_fee: 'Service fee',
      total: 'Total',
    },
    location: 'Location',
  },
  accomodation_detail_view: {
    title: 'Accomodation details',
    imageGallery: {
      no_images: 'No images',
      button: 'Show all',
    },
    show_more: {
      title: 'Show more',
      alt: 'Show all description',
    },
    button_book: 'Book',
    night: 'night | nights',
    amenities: {
      title: 'Amenities',
      button_show_more: 'Show all {n} amenities',
    },
    location: {
      title: 'Where you’ll be',
    },
    host: {
      title: 'Host details',
      verified: 'Verified',
      detail: {
        created_at: 'Since {date}',
      },
      button_show_profile: {
        user: 'Show profile',
        current: 'Go to your profile',
      },
    },
    rules: {
      title: 'Accomodation rules',
    },
    reviews: {
      title: 'Reviews',
      average: 'Average rating: ({n})',
      not_review: 'No reviews yet',
    },
  },
  upload_accomodation_view: {
    title: 'Upload new accomodation',
    step_display: 'Step {n1} of {n2}',
    step1: {
      title: 'Basic data',
      description: {
        title: 'Make your description as detailed as possible to attract new visitors and grow your community. You can explain more features and services you offer that are not yet available on the platform.'
      },
      category: {
        title: 'Category',
      },
      area: {
        title: 'Superficie habitable del alojamiento (En metros cuadrados)'
      },
      guests: {
        title: 'Aforo máximo de huéspedes en el alojamiento.'
      }
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
      subtitle: 'Check the box of the rules of the accommodation rules.',
    },
    step5: {
      title: 'Images',
      subtitle:
        'Upload the images of the accommodation, up to a maximum of {n} images.',
      dragArea: {
        title: 'Select a file(s) or drag it/them here',
        image_format: 'jpg, jpeg, png, gif',
        image_max_size: 'Max. file size: 500Kb',
        infoIcon: 'Click on or directly select the images of the accommodation',
      },
    },
  },
  edit_accommodation_view: {
    title: 'Edit the accommodation {name}',
    images: {
      title: 'Images',
      count: '{n} images',
    },
    features: {
      title: 'Features',
    },
    category: {
      title: 'Category',
    },
    services: {
      title: 'Amenities',
      subtitle: 'This accommodation has {n} amenities.',
    },
    rules: {
      title: 'Rules',
      subtitle: 'This accommodation has {n} rules.',
    },
  },
  account_view: {
    user_profile_view: {
      title: 'Personal information',
      legal_name: 'Legal name',
      contact_data: 'Contact data',
      host_data: {
        title: 'Host data',
      },
    },
    privacy_view: {
      title: 'Security & privacy',
      reset_pass: {
        title: 'Login & privacy',
        subtitle: 'Reset password',
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
    account_ads: {
      title: 'My accomodations',
    },
    help_view: {
      title: 'Help',
      faq: {
        title: 'FAQ',
        subtitle: 'How to upload ads, steps to book accommodation and more.',
      },
    },
    sidebar: {
      profile: 'Account',
      privacy: 'Security & privacy',
      config: 'Configuration & preferences',
      bookings: 'Bookings',
      ads: 'Accomodation ads',
      upgrade_plan: 'Upgade plan',
      help: 'Help',
    },
  },
  user_public_profile: {
    title: "Hello: I'm {name}",
    about: {
      title: 'About',
      lang: {
        title: 'Speaks',
        languages: ['Spanish', 'English', '-'],
      },
    },
    verified: {
      title: 'Identity verified',
      subtitle: '{name} confirmed',
    },
    userType: {
      base: 'Base',
      host: 'Host',
    },
    ads: {
      title: 'Accomodation listings',
      no_ads: 'No ads published',
    },
    reviews: {
      title: 'Reviews',
      tabs: {
        users: 'From Guests',
        host: 'From user',
      },
    },
  },
  accomodation_thumbnail: {
    title_click: 'Click here to see the accomodation',
    edit_button: {
      title: 'Click here to edit the accomodation',
    },
    delete_click: {
      title: 'Click here to delete the accomodation',
    },
    night: 'night',
  },
  saved_icon: {
    title: ['Save accomodation', 'Accomodation saved'],
  },
  accomodation_reviews: {
    title: 'Reviews',
    average: 'Average rating:',
  },
  search: {
    search_results: {
      not_results: 'No results found',
    },
  },
  baseCarousel: {
    no_images: 'No images',
  },
  header: {
    logo_alt: 'Leon Camp',
    search_placeholder: 'León',
    menu: {
      home: 'Home',
      saved: 'Saved',
      publish: {
        title: 'Click here to publish an accomodation',
      },
      bookings: 'Bookings',
      profile_icon: "{name}'s profile",
    },
    menu_mobile: {
      title: 'Hi, {name}',
      profile: 'Account',
      security: 'Security & privacy',
      config: 'Configuration & preferences',
      bookings: 'Bookings',
      ads: 'Ads',
    },
  },
  footer: {
    copyright: '© 2022 Francisco Coya. All Rights Reserved.',
  },
  components: {
    buttons: {
      view: 'See',
      edit: 'Edit ',
      update: 'Update | Updating...',
      delete: 'Delete',
      info: 'More information',
      login: 'Sign In',
      register: 'Sign Up',
      upload: 'Publish',
      add: 'Add',
      close_session: 'Close session',
      back: 'Return | Previous',
      next: 'Next',
      finish: 'Finish',
      view_ad: 'See ad',
      reset: 'Reset',
      download_invoice: 'Download invoice',
      upload_image: 'Upload image',
    },
    forms: {
      name: 'Name',
      surname: 'Surname',
      email: 'Email address',
      dni: 'ID Card',
      bio: 'Biography',
      phone: 'Phone number',
      password: 'Password',
      current_password: 'Current password',
      new_password: 'New password',
      confirm_new_password: 'Confirm new password',
      password_confirmation: 'Confirm password',
      checkIn: 'Check-In',
      checkOut: 'Check-Out',
      cardNumber: 'Card number',
      paypalAccount: 'PayPal account email',
      registerNumber: 'Register number',
      description: 'Description',
      category: 'Category',
      area: 'Area',
      beds: 'bed | beds',
      bathroom: 'bathroom | bathrooms',
      bedroom: 'bedroom | bedrooms',
      guests: 'guest | guests',
      price: 'price | price / night',
      lat: 'Latitude',
      lng: 'Longitude',
      address: 'Address',
      city: 'City',
      zip: 'Zip code',
      select: {
        default_option: 'Select an option',
      },
      messages: {
        name: {
          required: 'Name is required',
          invalid: 'Name is invalid',
        },
        surname: {
          required: 'Surname is required',
          invalid: 'Surname is invalid',
        },
        email: {
          required: 'Email is required',
          invalid: 'Email is invalid',
        },
        dni: {
          required: 'ID Card is required',
          min: 'ID Card must be at least 8 digits and 1 letter',
          invalid: 'ID Card is not a valid Spanish ID card',
        },
        registerNumber: {
          required: 'Register number is required',
          invalid: 'Number register is invalid',
          exists: 'An accommodation with the entered registration number already exists.'
        },
        description: {
          invalid: 'Description is invalid',
        },
        area: {
          invalid: 'Area is invalid',
        },
        numOfBeds: {
          invalid: 'Number of beds is invalid',
        },
        numOfBathrooms:{
          invalid: 'Number of bathrooms is invalid',
        },
        numOfBedrooms: {
          invalid: 'Number of bedrooms is invalid',
        },
        price: {
          invalid: 'Price is invalid',
        },
        guests: {
          invalid: 'Number of guests is invalid',
        },
        category: {
          required: 'Select a category',
        },
        direction: {
          required: 'Direction is required',
          invalid: 'Direction is invalid',
        },
        location: {
          city: {
            invalid: 'City is invalid',
          },
          zip: {
            invalid: 'Zip code is invalid',
            not_spanish_zip: 'Zip code is not a valid Spanish zip code',
          },
          geolocation_not_supported: 'Geolocation is not supported by this browser.',
        },
        password: {
          required: 'Password is required',
        },
        current_password: {
          required: 'Current password is required',
          invalid: 'Current password is invalid',
        },
        new_password: {
          required: 'New password is required',
        },
        password_confirmation: {
          required: 'Password confirmation is required',
        },
        password_confirmation_not_match: 'Password confirmation does not match',
        password_updated: {
          success: 'Password reset successfully',
        },
        login: {
          invalid: 'Email or password are invalid',
        },
        default: 'Alguno de los campos no es válido',
        user_already_exists: 'User already exists',
        user: {
          update: {
            success: 'User updated successfully',
            error: 'Error updating user',
          },
        },
        images: {
          mime: 'Image must be a valid image (jpg, jpeg, png, webp or gif)',
          invalid: 'Image is invalid',
          success: 'Image uploaded successfully',
          multiple_success: 'Images uploaded successfully',
          loading: 'Uploading image...',
          size: 'Image size must be less than {size} {unit}',
          maxImages: 'You can upload a maximum of {max} images',
        }
      },
    },
  },
  modals: {
    services: {
      title: 'Accomodation amenities',
    },
    accomodation_images: {
      title: 'Accomodation images',
    },
  },
  currency: {
    symbol: '£',
  },
  bookingStatus: 'PENDING | CONFIRMED | COMPLETED | CANCELLED',
  accomodation_categories: [
    'Apartament',
    'Loft',
    'Cottage',
    'Penthouse',
    'Duplex',
    'Terraced house',
    'Studio apartment',
  ],
  accomodation_amenities: [
    'Wifi',
    'Heating',
    'TV',
    'Bed sheets',
    'Towels',
    'Smoke alarm',
    'First ait kit',
    'Breakfast',
    'Free parking',
    'Air conditioning',
    'Hot water',
    'Hair dryer',
    'Washing machine',
    'Iron',
    'Dishes',
    'Pets allowed',
    'Smokers allowed',
    'Cot',
    'Cleaning products',
    'Microwave',
    'Coffee maker',
    'Accesible for the disabled',
    'Freezer',
    'Oven',
    'Dishwasher',
    'Balcony / patio',
    'Lift',
    'Jacuzzi',
    'Private pool',
    'Shared pool',
    'Garden',
    'Work area / Office',
  ],
  accomodation_rules: [
    'No smoking',
    'Pets not allowed',
    'No parties or events',
  ],
  linkers: {
    in: 'in',
  },
};
