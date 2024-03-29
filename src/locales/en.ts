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
      accomodations: 'Accommodations',
      users: 'Users',
    },
  },
  saved_view: {
    title: 'Saved accommodations',
    not_saved: 'You have no saved accommodation',
    not_saved_subtitle: 'All saved accommodations will be displayed here.',
  },
  bookings_view: {
    title: 'My bookings',
    not_bookings: 'You have no bookings',
    tabs: {
      host: 'From my accommodations',
      guests: 'Made by guests',
    },
  },
  booking_task_view: {
    title: 'Booking for accommodation {name}',
    pricing_details: 'Price details',
    service_fee: 'Service fee',
    disccount: 'Disccount',
    total: 'Total',
    guest_max: 'Maximun of {guest} guests',
    button_clear_dates: 'Clear dates',
    payment_method: 'Payment method',
    payment_info:
      'Payment data will not be processed until the booking check-In. In case of cancellation, the payment data (card number or PayPal email) will be deleted from the system.',
    credit_Card: 'Credir card',
    paypal: 'PayPal',
    button_confirm_booking: 'Confirm booking',
  },
  booking_details_view: {
    title: 'Booking of accommodation {name}',
    button_show_ad: 'Show accommodation',
    guests: 'For {n} guests',
    host: 'Host',
    dates: 'Booking dates',
    price_summary: {
      title: 'Payment summary',
      price_per_night: 'Price / night',
      cost: 'Cost ({name} x {nights} nights)',
      service_fee: 'Service fee',
      disccount: 'Disccount',
      total: 'Total',
    },
    location: 'Location',
    loading_map: 'Loading map...',
  },
  accomodation_detail_view: {
    title: 'Accommodation details',
    imageGallery: {
      no_images: 'No images available',
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
      title: 'Accommodation rules',
    },
    reviews: {
      title: 'Reviews',
      average: 'Average rating: ({n})',
      not_review: 'No reviews yet',
    },
  },
  upload_accomodation_view: {
    title: 'Upload new accommodation',
    subtitle: 'Do not update the step pages during the process, otherwise the data will be deleted.',
    steps_info: 'If the "Next" button is disabled in any of the steps, check the content of the form or the previous and subsequent steps.',
    step_display: 'Step {n1} of {n2}',
    step1: {
      title: 'Basic data',
      description: {
        title:
          'Make your description as detailed as possible to attract new visitors and grow your community. You can explain more features and services you offer that are not yet available on the platform.',
      },
      category: {
        title: 'Category',
      },
      area: {
        title: 'Superficie habitable del alojamiento (En metros cuadrados)',
      },
      guests: {
        title: 'Aforo máximo de huéspedes en el alojamiento.',
      },
    },
    step2: {
      title: 'Location',
      help: '* You can drag the marker on the map to fill the fields automatically.',
    },
    step3: {
      title: 'Services',
      subtitle: 'Check the box of the services offered by the accommodation.',
      service_search_placeholder: 'Enter the service to be search for',
      loading: 'Loading services...',
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
        image_max_size: 'Max. file size: 100Kb',
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
    edit_basic_data_success_message:
      'The accommodation has been updated successfully.',
    edit_category_success_message:
      'Accommodation category has been updated successfully.',
  },
  account_view: {
    user_profile_view: {
      title: 'Personal information',
      button_become_host: 'Become a host',
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
      title: 'My accommodations',
      loading_ads: 'Loading accommodations...',
      no_ads: 'No accommodations available',
      first_publish: 'Publish your first accommodation',
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
      ads: 'Accommodation ads',
      upgrade_plan: 'Upgade plan',
      help: 'Help',
    },
  },
  accommodation_search_results_view: {
    title: 'Accommodations in {city}',
  },
  accommodation_results_filtered_view: {
    title: 'Search results',
    filters: {
      price: {
        min: 'From {n} {symbol}',
        max: 'To {n} {symbol}',
      },
      beds: '{n} beds',
      bedrooms: '{n} bedrooms',
      bathrooms: '{n} bathrooms',
      guests: '{n} guests',
    },
    no_results: 'No accommodations found',
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
      title: 'Accommodation listings',
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
  user_upgrade_account_view: {
    title: 'Upgrade your account to host',
    confirm_changes:
      'In order to confirm your changes, you will be logged out.',
    subtitle:
      'Publish accommodations, view your finances and get the maximum benefit.',
    upgrade_status_button: '🔥 Upgrading... | Upgrade account',
  },
  accomodation_thumbnail: {
    title_click: 'Click here to see the accommodation',
    edit_button: {
      title: 'Click here to edit the accommodation',
    },
    delete_click: {
      title: 'Click here to delete the accommodation',
    },
    night: 'night',
  },
  saved_icon: {
    title: ['Save accommodation', 'Accommodation saved'],
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
        title: 'Click here to publish an accommodation',
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
      upload: 'Publish | Publishing...',
      add: 'Add',
      close_session: 'Close session',
      back: 'Return | Previous',
      next: 'Next',
      finish: 'Finish',
      view_ad: 'See ad',
      reset: 'Reset',
      download_invoice: 'Download invoice',
      upload_image: 'Upload image',
      filter: 'Filter',
      clear: 'Clear',
      all: 'All',
      booking: {
        cancel: 'Cancel',
        confirm: 'Confirm',
        complete: 'Complete',
      },
      dashboard: 'Dashboard',
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
      forgot_password: "I'm lost my password",
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
      promo_code: 'Promo code',
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
          exists:
            'An accommodation with the entered registration number already exists.',
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
        numOfBathrooms: {
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
          required: 'Number of guests is required',
          max: 'Number of guests must be less than or equal to {numOfGuests}',
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
          geolocation_not_supported:
            'Geolocation is not supported by this browser.',
          coords: {
            lat: {
              invalid: 'Latitude is invalid',
            },
            lng: {
              invalid: 'Longitude is invalid',
            },
          },
        },
        payment: {
          credit_card: {
            required: 'Credit card number is required',
            invalid: 'Credit card number is invalid',
            min: 'Credit card number must be at least {cardDigits} digits',
          },
          paypal: {
            required: 'PayPal account is required',
            invalid: 'PayPal account is invalid',
          },
          default: 'Payment method is invalid',
        },
        dates: {
          checkIn: {
            required: 'Check-In is required',
            invalid: 'Check-In is invalid',
          },
          checkOut: {
            required: 'Check-Out is required',
            invalid: 'Check-Out is invalid',
          },
          not_equal:
            'Check-In and Check-Out must be different and not be in the past',
        },
        promoCode: {
          invalid: 'Promo code is invalid',
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
        },
      },
    },
  },
  modals: {
    services: {
      title: 'Accommodation amenities',
    },
    accomodation_images: {
      title: 'Accommodation images',
    },
    accomodation_search_filters: {
      title: 'Search filters',
      price: {
        title: 'Price range',
        min: 'From',
        max: 'To',
      },
      beds: 'Beds number',
      bathrooms: 'Bathrooms number',
      bedrooms: 'Bedrooms number',
      guests: 'Guests number',
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
