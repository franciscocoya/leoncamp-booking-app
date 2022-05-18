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
  },
  booking_task_view: {
    title: 'Reserva para el alojamiento {name}',
    pricing_details: 'Detalles del precio',
    service_fee: 'Comisión servicio',
    total: 'Total ({name})',
    button_clear_dates: 'Borrar fechas',
    payment_mehtod: 'Método de pago',
    payment_info:
      'Los datos no serán tratados hasta el día de checkIn de la reserva. En caso de cancelarse, los datos de pago (Número de tarjeta o correo electrónico de PayPal) se borrarán del sistema.',
    credit_Card: 'Tarjeta de crédito',
    paypal: 'PayPal',
    button_confirm_booking: 'Confirmar reserva',
  },
  booking_details_view: {
    title: 'Reserva alojamiento {name}',
    host: 'Anfitrión',
    dates: 'Fechas reserva',
    price_summary: {
      title: 'Resumen pago',
      price_per_night: 'Precio / noche',
      cost: 'Coste ({name} x {nights} noches)',
      service_fee: 'Comisión servicio',
      total: 'Total',
      location: 'Ubicación',
    },
  },
  accomodation_detail_view: {
    title: 'Detalles del alojamiento',
    imageGallery: {
      button: 'Ver todas',
    },
    show_more: 'Mostrar más',
    button_book: 'Reservar',
    night: 'noche | noches',
    services: {
      title: 'Servicios que ofrece',
      button_show_more: 'Mostrar los {n} servicios',
    },
    location: {
      title: 'Dónde se encuentra',
    },
    host: {
      title: 'Detalles del anfitrión',
      button_show_profile: 'Ver perfil',
    },
    rules: {
      title: 'Normas del alojamiento',
    },
    reviews: {
      title: 'Valoraciones',
      average: 'Valoración media: ({n})',
    },
  },
  upload_accomodation_view: {
    title: 'Publicar un alojamiento',
    step1: {
      title: 'Datos básicos',
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
    },
    step4: {
      title: 'Normas',
      subtitle: 'Marca la casilla de las normas del alojamiento.',
    },
    step5: {
      title: 'Imágenes',
      subtitle: 'Sube imágenes del alojamiento, hasta un máximo de 8 imágenes.',
      dragArea: {
        title: 'Selecciona un o varios archivo/s o arrástralo/s aquí',
        image_format: 'jpg, jpeg, png, gif',
        image_max_size: 'Tamaño máximo: 500Kb',
      },
    },
  },
  account_view: {
    user_profile_view: {
      title: 'Información personal',
      legal_name: 'Nombre legal',
    },
    user_bookings_view: {
      status: 'PENDIENTE | CONFIRMADA | COMPLETADA | CANCELADA',
    },

    privacy_view: {
      title: 'Seguridad y privacidad',
      reset_pass: {
        title: 'Inicio de sesión y seguridad',
        subtitle: 'Restablecer contraseñas',
        button: 'Restablecer',
      },
    },

    preferences: {
      title: 'Configuración y preferencias',
      currency: 'Moneda',
      lang: {
        title: 'Idioma',
        spanish: 'Español (España)',
        english: 'Inglés (Reino Unido)',
      },
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
      help: 'Ayuda',
    },
  },
  search: {
    default_placeholder: 'León',
    search_results: {
      not_results: 'No se han encontrado resultados',
    },
  },
  header: {
    logo_alt: 'Leon Camp',
    search_placeholder: 'León',
    menu: {
      saved: 'Guardados',
      bookings: 'Reservas',
      profile_icon: 'Perfil de {name}',
    },
  },
  footer: {
    copyright: '© 2022 Francisco Coya. Todos los Derechos Reservados.',
  },
  components: {
    buttons: {
      view: 'Ver',
      edit: 'Editar',
      update: 'Actualizar',
      delete: 'Eliminar',
      info: 'Más información',
      login: 'Iniciar sesión',
      close_session: 'Cerrar sesión',
      back: 'Volver | Anteriors',
      next: 'Siguiente',
      finish: 'Finalizar',
      view_ad: 'Ver anuncio',
      download_invoice: 'Descargar factura',
    },
    forms: {
      name: 'Nombre',
      surname: 'Apellidos',
      email: 'Correo electrónico',
      password: 'Contraseña',
      password_confirmation: 'Confirmar contraseña',
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
      price: 'precio',
      lat: 'latitud',
      lng: 'longitud',
      address: 'dirección',
      city: 'ciudad',
      zip: 'código postal',
    },
  },
  currency: {
    symbol: '€',
  },
};
