export const es_msgs = {
  login_view: {
    title: 'Iniciar sesión',
    button_login: 'Iniciar sesión',
    button_register: 'Crear una cuenta',
  },
  register_view: {
    title: 'Crear una cuenta',
    button_register: 'Crear cuenta',
    login_redirect: '¿Ya tienes cuenta?',
  },
  reset_password: {
    title: 'Establecer contraseña',
  },
  home: {},
  administrator: {
    title: 'Panel administración',
    menu: {
      accomodations: 'Alojamientos',
      users: 'Usuarios',
    },
  },
  saved_view: {
    title: 'Alojamientos guardados',
    not_saved: 'No tienes alojamientos guardados',
    not_saved_subtitle: 'Aquí se mostrarán todos los alojamientos guardados',
  },
  bookings_view: {
    title: 'Mis reservas',
    not_bookings: 'Aún no has realizado ninguna reserva',
    tabs: {
      host: 'Realizadas por mí',
      guests: 'De mis alojamientos',
    },
  },
  booking_task_view: {
    title: 'Reserva para el alojamiento {name}',
    pricing_details: 'Detalles del precio',
    service_fee: 'Comisión servicio',
    disccount: 'Descuento',
    total: 'Total',
    guest_max: 'Hasta un máximo de {guest} personas',
    button_clear_dates: 'Borrar fechas',
    payment_method: 'Método de pago',
    payment_info:
      'Los datos no serán tratados hasta el día de checkIn de la reserva. En caso de cancelarse, los datos de pago (Número de tarjeta o correo electrónico de PayPal) se borrarán del sistema.',
    credit_Card: 'Tarjeta de crédito',
    paypal: 'PayPal',
    button_confirm_booking: 'Confirmar reserva',
  },
  booking_details_view: {
    title: 'Reserva alojamiento {name}',
    button_show_ad: 'Ver alojamiento',
    guests: 'Para {n} huéspedes',
    host: 'Anfitrión',
    dates: 'Fechas reserva',
    price_summary: {
      title: 'Resumen pago',
      price_per_night: 'Precio / noche',
      cost: 'Coste ({name} x {nights} noches)',
      service_fee: 'Comisión servicio',
      disccount: 'Descuento',
      total: 'Total',
    },
    location: 'Ubicación',
    loading_map: 'Cargando mapa...',
  },
  accomodation_detail_view: {
    title: 'Detalles del alojamiento',
    imageGallery: {
      no_images: 'No hay imágenes disponibles',
      button: 'Ver todas',
    },
    show_more: {
      title: 'Mostrar más',
      alt: 'Mostrar toda la descripción',
    },
    button_book: 'Reservar',
    night: 'noche | noches',
    amenities: {
      title: 'Servicios',
      button_show_more: 'Show the {n} amenities',
    },
    location: {
      title: 'Dónde te alojarás',
    },
    host: {
      title: 'Detalles del anfitrión',
      verified: 'Identidad verficada',
      detail: {
        created_at: 'Desde {date}',
      },
      button_show_profile: {
        user: 'Ver perfil',
        current: 'Ir a tu perfil',
      },
    },
    rules: {
      title: 'Normas del alojamiento',
    },
    reviews: {
      title: 'Valoraciones',
      average: 'Valoración media: ({n})',
      not_review: 'No hay valoraciones',
    },
  },
  upload_accomodation_view: {
    title: 'Publicar un alojamiento',
    subtitle: 'No actualices las páginas de los pasos durante el proceso, sino se borrarán los datos.',
    steps_info: 'Si el botón "Siguiente" está deshabilitado en alguno de los pasos, revisa el contenido del formulario o de los pasos previos y posteriores.',
    step_display: 'Paso {n1} de {n2}',
    step1: {
      title: 'Datos básicos',
      description: {
        title:
          'Realiza una descripción lo más detallada posible para atraer a nuevos huéspedes y crecer en la comunidad. Puedes explicar más características y servicios que ofreces, que no se encuentran disponibles en la plataforma.',
      },
      category: {
        title: 'Selecciona un categoría',
      },
      area: {
        title: 'Superficie',
      },
      guests: {
        title: 'Número máximo de huéspedes',
      },
    },
    step2: {
      title: 'Ubicación',
      help: '* Puedes arrastrar el marcador del mapa para obtener rellenar los campos automáticamente.',
    },
    step3: {
      title: 'Servicios',
      subtitle:
        'Marca la casilla de los servicios de los que dispone el alojamiento.',
      service_search_placeholder: 'Introduce el servicio a buscar',
      loading: 'Cargando servicios...',
    },
    step4: {
      title: 'Normas',
      subtitle: 'Marca la casilla de las normas del alojamiento.',
    },
    step5: {
      title: 'Imágenes',
      subtitle:
        'Sube imágenes del alojamiento, hasta un máximo de {n} imágenes.',
      dragArea: {
        title: 'Selecciona un o varios archivo/s o arrástralo/s aquí',
        image_format: 'jpg, jpeg, png, gif',
        image_max_size: 'Tamaño máximo: 100Kb',
        infoIcon:
          'Haz click o selecciona las imágenes del alojamiento directamente',
      },
    },
  },
  edit_accommodation_view: {
    title: 'Editar el alojamiento {name}',
    images: {
      title: 'Imágenes',
      count: '{n} imágenes',
    },
    features: {
      title: 'Características',
    },
    category: {
      title: 'Categoría',
    },
    services: {
      title: 'Servicios',
      subtitle: 'El alojamiento dispone de {n} servicios.',
    },
    rules: {
      title: 'Normas',
      subtitle: 'El alojamiento tiene {n} normas.',
    },
    edit_basic_data_success_message:
      'El alojamiento se ha actualizado correctamente',
    edit_category_success_message:
      'La categoría se ha actualizado correctamente',
  },
  account_view: {
    user_profile_view: {
      title: 'Información personal',
      button_become_host: 'Convertirme a anfitrión',
      legal_name: 'Nombre legal',
      contact_data: 'Datos de contacto',
      host_data: {
        title: 'Datos del host',
      },
    },
    privacy_view: {
      title: 'Seguridad y privacidad',
      reset_pass: {
        title: 'Inicio de sesión y seguridad',
        subtitle: 'Restablecer contraseña',
        button: 'Restablecer',
      },
    },
    preferences: {
      title: 'Configuración y preferencias',
      currency: 'Divisa',
      lang: {
        title: 'Idioma',
        spanish: 'Español (España)',
        english: 'Inglés (Reino Unido)',
      },
    },
    account_ads: {
      title: 'Mis alojamientos',
      loading_ads: 'Cargando alojamientos...',
      no_ads: 'No tienes alojamientos',
      first_publish: 'Publica tu primer alojamiento',
    },
    help_view: {
      title: 'Ayuda',
      faq: {
        title: 'FAQ',
        subtitle:
          'Cómo publicar anuncios, pasos a seguir para reservar un alojamiento y más.',
      },
    },
    sidebar: {
      profile: 'Perfil',
      privacy: 'Seguridad y privacidad',
      config: 'Configuración y preferencias',
      bookings: 'Reservas',
      ads: 'Anuncios',
      upgrade_plan: 'Actualizar plan',
      help: 'Ayuda',
    },
  },
  accommodation_search_results_view: {
    title: 'Alojamientos en {city}',
  },
  accommodation_results_filtered_view: {
    title: 'Resultados de búsqueda',
    filters: {
      price: {
        min: 'Desde {n} {symbol}',
        max: 'Hasta {n} {symbol}',
      },
      beds: '{n} camas',
      bedrooms: '{n} habitaciones',
      bathrooms: '{n} baños',
      guests: '{n} huéspedes',
    },
    no_results: 'No se encontraron resultados',
  },
  user_public_profile: {
    title: 'Hola: Soy {name}',
    about: {
      title: 'Acerca de',
      lang: {
        title: 'Habla',
        languages: ['Español', 'Inglés', '-'],
      },
    },
    verified: {
      title: 'Identidad verificada',
      subtitle: '{name} ha confirmado',
    },
    userType: {
      base: 'Base',
      host: 'Anfitrión',
    },
    ads: {
      title: 'Alojamientos publicados',
      no_ads: 'No hay alojamientos publicados',
    },
    reviews: {
      title: 'Valoraciones',
      tabs: {
        users: 'De los huéspedes',
        host: 'Del usuario',
      },
    },
  },
  user_upgrade_account_view: {
    title: 'Actualiza tu cuenta a anfitrión',
    subtitle:
      'Publica alojamientos, revisa tus cuentas y obtén el máximo beneficio.',
    confirm_changes: 'Para aplicar los cambios se cerrará la sesión',
    upgrade_status_button: '🔥 Actualizando... | Actualizar cuenta',
  },
  accomodation_reviews: {
    title: 'Valoraciones',
    average: 'Valoración media:',
  },
  accomodation_thumbnail: {
    title_click: 'Haz click para ver el alojamiento',
    edit_button: {
      title: 'Haz click aquí para editar el alojamient',
    },
    delete_click: {
      title: 'Haz click aquí para eliminar el alojamiento',
    },
    night: 'noche',
  },
  saved_icon: {
    title: ['Guardar alojamiento', 'Alojamiento guardado'],
  },
  search: {
    search_results: {
      not_results: 'No se han encontrado resultados',
    },
  },
  baseCarousel: {
    no_images: 'No hay imágenes',
  },
  header: {
    logo_alt: 'Leon Camp',
    search_placeholder: 'León',
    menu: {
      home: 'Inicio',
      saved: 'Guardados',
      publish: {
        title: 'Haz click para publicar un alojamiento',
      },
      bookings: 'Reservas',
      profile_icon: 'Perfil de {name}',
    },
    menu_mobile: {
      title: 'Hola, {name}',
      profile: 'Cuenta',
      security: 'Seguridad y privacidad',
      config: 'Configuración y preferencias',
      bookings: 'Reservas',
      ads: 'Anuncios',
    },
  },
  footer: {
    copyright: '© 2022 Francisco Coya. Todos los Derechos Reservados.',
  },
  components: {
    buttons: {
      view: 'Ver',
      edit: 'Editar',
      update: 'Actualizar | Actualizando...',
      delete: 'Eliminar',
      info: 'Más información',
      register: 'Crear cuenta',
      upload: 'Publicar | Publicando...',
      add: 'Añadir',
      login: 'Iniciar sesión',
      close_session: 'Cerrar sesión',
      back: 'Volver | Anterior',
      next: 'Siguiente',
      finish: 'Finalizar',
      view_ad: 'Ver anuncio',
      reset: 'Restablecer',
      download_invoice: 'Descargar factura',
      upload_image: 'Subir imagen',
      filter: 'Filtrar',
      clear: 'Borrar',
      all: 'Todos',
      booking: {
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        complete: 'Completar',
      },
      dashboard: 'Dashboard',
    },
    forms: {
      name: 'Nombre',
      surname: 'Apellidos',
      email: 'Correo electrónico',
      dni: 'DNI',
      bio: 'Biografía',
      phone: 'Número de teléfono',
      password: 'Contraseña',
      current_password: 'Contraseña actual',
      new_password: 'Nueva contraseña',
      confirm_new_password: 'Confirmar contraseña',
      password_confirmation: 'Confirmar contraseña',
      forgot_password: 'He olvidado mi contraseña',
      checkIn: 'Llegada',
      checkOut: 'Salida',
      cardNumber: 'Número de tarjeta',
      paypalAccount: 'Correo cuenta PayPal',
      registerNumber: 'Número de registro',
      description: 'descripción',
      category: 'categoría',
      area: 'superficie',
      beds: 'cama | camas',
      bathroom: 'baño | baños',
      bedroom: 'habitación | habitaciones',
      guests: 'huésped | huéspedes',
      price: 'precio | precio / noche',
      lat: 'latitud',
      lng: 'longitud',
      address: 'dirección',
      city: 'ciudad',
      zip: 'código postal',
      promo_code: 'código promocional',
      select: {
        default_option: 'Selecciona una opción',
      },
      messages: {
        name: {
          required: 'El nombre es obligatorio',
          invalid: 'El nombre no es válido',
        },
        surname: {
          required: 'Los apellidos son obligatorios',
          invalid: 'Los apellidos no son válidos',
        },
        email: {
          required: 'El email es obligatorio',
          invalid: 'El email no es válido',
        },
        dni: {
          required: 'El DNI es obligatorio',
          min: 'El DNI debe tener 8 dígitos y una letra',
          invalid: 'El DNI no se corresponde con un DNI español válido',
        },
        registerNumber: {
          required: 'El número de registro es obligatorio',
          invalid: 'El número de registro no es válido',
          exists:
            'Ya existe un alojamiento con el número de registro introducido',
        },
        description: {
          invalid: 'La descripción no es válida',
        },
        area: {
          invalid: 'La superficie no es válida',
        },
        numOfBeds: {
          invalid: 'El número de camas no es válido',
        },
        numOfBathrooms: {
          invalid: 'El número de baños no es válido',
        },
        numOfBedrooms: {
          invalid: 'El número de habitaciones no es válido',
        },
        price: {
          invalid: 'El precio no es válido',
        },
        guests: {
          invalid: 'El número de huéspedes no es válido',
          required: 'Introduce el número de huéspedes',
          max: 'El número de huéspedes no puede ser superior a {numOfGuests}',
        },
        category: {
          required: 'Selecciona una categoría',
        },
        direction: {
          required: 'La dirección es obligatoria',
          invalid: 'La dirección no es válida',
        },
        location: {
          city: {
            invalid: 'La ciudad no es válida',
          },
          zip: {
            invalid: 'El código postal no es válido',
            not_spanish_zip:
              'El código postal no se corresponde con un código postal español',
          },
          coords: {
            lat: {
              invalid: 'La latitud no es válida',
            },
            lng: {
              invalid: 'La longitud no es válida',
            },
          },
          geolocation_not_supported:
            'La geolocalización no está soportada en este navegador',
        },
        payment: {
          credit_card: {
            required: 'Introduce el número de la tarjeta de crédito',
            invalid: 'El número de tarjeta de crédito no es válido',
            min: 'El número de tarjeta de crédito debe tener {cardDigits} dígitos',
          },
          paypal: {
            required: 'Introduce el correo electrónico de PayPsal',
            invalid: 'El correo de PayPal no es válido',
          },
          default: 'El método de pago introducido no es válido',
        },
        dates: {
          checkIn: {
            required: 'Selecciona la fecha de entrada',
            invalid: 'La fecha de entrada no es válida',
          },
          checkOut: {
            required: 'Selecciona la fecha de salida',
            invalid: 'La fecha de salida no es válida',
          },
          not_equal:
            'La fecha de salida debe ser posterior a la fecha de entrada',
        },
        promoCode: {
          invalid: 'El código promocional no es válido',
        },
        password: {
          required: 'La contraseña es obligatoria',
        },
        current_password: {
          required: 'La contraseña actual es obligatoria',
          invalid: 'La contraseña actual no es correcta',
        },
        new_password: {
          required: 'La nueva contraseña es obligatoria',
        },
        password_confirmation: {
          required: 'La confirmación de la contraseña es obligatoria',
        },
        password_confirmation_not_match: 'Las contraseñas no coinciden',
        password_updated: {
          success: 'La contraseña se ha actualizado correctamente',
        },
        login: {
          invalid: 'El email o la contraseña no son válidos',
        },
        default: 'Alguno de los campos no es válido',
        user_already_exists: 'Ya existe un usuario con ese email',
        user: {
          update: {
            success: 'Usuario actualizado correctamente',
            error: 'Error al actualizar el usuario',
          },
        },
        images: {
          mime: 'La imagen no tiene un formato válido (jpg, jpeg, png, webp o gif)',
          invalid: 'La imagen no es válida',
          success: 'Imagen subida correctamente',
          multiple_success: 'Imágenes subidas correctamente',
          loading: 'Subiendo imagen...',
          size: 'La imagen no puede superar los {size} {unit}',
          maxImages: 'Puede subir hasta un máximo de {max} imágenes',
        },
      },
    },
  },
  modals: {
    services: {
      title: 'Servicios del alojamiento',
    },
    accomodation_images: {
      title: 'Imágenes del alojamiento',
    },
    accomodation_search_filters: {
      title: 'Filtros de búsqueda',
      price: {
        title: 'Rango de precios',
        min: 'Desde',
        max: 'Hasta',
      },
      beds: 'Número de camas',
      bathrooms: 'Número de baños',
      bedrooms: 'Número de habitaciones',
      guests: 'Número de huéspedes',
    },
  },
  currency: {
    symbol: '€',
  },
  bookingStatus: ['PENDIENTE', 'CONFIRMADA', 'COMPLETADA', 'CANCELADA'],
  accomodation_categories: [
    'Apartamento',
    'Loft',
    'Chalet',
    'Ático',
    'Dúplex',
    'Adosado',
    'Estudio',
  ],
  accomodation_amenities: [
    'Wifi',
    'Calefacción',
    'TV',
    'Ropa de cama',
    'Toallas',
    'Detector de humo',
    'Botiquín',
    'Desayuno',
    'Aparcamiento gratuito',
    'Aire acondicionado',
    'Agua caliente',
    'Secador de pelo',
    'Lavadora',
    'Plancha',
    'Vajilla',
    'Admite mascotas',
    'Apto para fumadores',
    'Cuna',
    'Productos de limpieza',
    'Microondas',
    'Cafetera',
    'Accesible para minusválidos',
    'Congelador',
    'Horno',
    'Lavavajillas',
    'Terraza / patio',
    'Ascensor',
    'Bañera de hidromasaje',
    'Piscina privada',
    'Piscina compartida',
    'Jardín',
    'Zona para trabajar / Oficina',
  ],
  accomodation_rules: [
    'Prohibido fumar',
    'No se admiten mascotas',
    'Están totalmente prohibidas las fiestas y eventos',
  ],
  linkers: {
    in: 'en',
  },
};
