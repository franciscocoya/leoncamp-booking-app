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
    button_show_ad: 'Show accomodation',
    host: 'Anfitrión',
    dates: 'Fechas reserva',
    price_summary: {
      title: 'Resumen pago',
      price_per_night: 'Precio / noche',
      cost: 'Coste ({name} x {nights} noches)',
      service_fee: 'Comisión servicio',
      total: 'Total',
    },
    location: 'Ubicación',
  },
  accomodation_detail_view: {
    title: 'Detalles del alojamiento',
    imageGallery: {
      no_images: 'No hay images',
      button: 'Ver todas',
    },
    show_more: {
      title: 'Mostrar más',
      alt: 'Mostrar toda la descripción',
    },
    button_book: 'Reservar',
    night: 'noche | noches',
    amenities: {
      title: 'Amenities',
      button_show_more: 'Show the {n} amenities',
    },
    location: {
      title: 'Dónde te alojarás',
    },
    host: {
      title: 'Detalles del anfitrión',
      verified: 'Identidad verficada',
      detail: {
        created_at: 'Desde {date}'
      },
      button_show_profile: {
        user: 'Ver perfil',
        current: 'Ir a tu perfil'
      },
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
    step_display: 'Paso {n1} de {n2}',
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
      subtitle: 'Sube imágenes del alojamiento, hasta un máximo de {n} imágenes.',
      dragArea: {
        title: 'Selecciona un o varios archivo/s o arrástralo/s aquí',
        image_format: 'jpg, jpeg, png, gif',
        image_max_size: 'Tamaño máximo: 500Kb',
        infoIcon: 'Haz click o selecciona las imágenes del alojamiento directamente'
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
      subtitle: 'El alojamiento dispone de {n} servicios.'
    },
    rules: {
      title: 'Normas',
      subtitle: 'El alojamiento tiene {n} normas.'
    }
  },
  account_view: {
    user_profile_view: {
      title: 'Información personal',
      legal_name: 'Nombre legal',
      contact_data: 'Datos de contacto',
      host_data: {
        title: 'Datos del host'
      }
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
    account_ads: {
      title: 'Mis alojamientos',
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
      subtitle: '{name} ha confirmado'
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
      }
    }
  },
  accomodation_reviews: {
    title: 'Valoraciones',
    average: 'Valoración media:',
  },
  accomodation_thumbnail: {
    title_click: 'Haz click para ver el alojamiento',
    edit_button: {
      title: 'Haz click aquí para editar el alojamient'
    },
    delete_click: {
      title: 'Haz click aquí para eliminar el alojamiento',
    },
    night: 'noche'
  },
  saved_icon: {
    title: ['Guardar alojamiento', 'Alojamiento guardado']
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
        title: 'Haz click para publicar un alojamiento'
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
      upload: 'Publicar',
      add: 'Añadir',
      login: 'Iniciar sesión',
      close_session: 'Cerrar sesión',
      back: 'Volver | Anteriors',
      next: 'Siguiente',
      finish: 'Finalizar',
      view_ad: 'Ver anuncio',
      reset: 'Restablecer',
      download_invoice: 'Descargar factura',
      upload_image: 'Subir imagen',
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
      select: {
        default_option: 'Selecciona una opción',
      },
      messages: {
        email: {
          required: 'El email es obligatorio'
        },
        password: {
          required: 'La contraseña es obligatoria'
        },
        password_confirmation: {
          required: 'La confirmación de la contraseña es obligatoria'
        },
        password_confirmation_not_match: 'Las contraseñas no coinciden',
      }
    },
  },
  modals: {
    services: {
      title: 'Servicios del alojamiento'
    },
    accomodation_images: {
      title: 'Imágenes del alojamiento',
    }
  },
  currency: {
    symbol: '€',
  },
  bookingStatus: 'PENDIENTE | CONFIRMADA | COMPLETADA | CANCELADA',
  accomodation_categories: ['Apartamento', 'Loft', 'Chalet', 'Ático' , 'Dúplex' , 'Adosado' , 'Estudio'],
  accomodation_amenities: ['Wifi', 'Calefacción', 'TV', 'Ropa de cama', 'Toallas', 'Detector de humo', 'Botiquín', 'Desayuno', 'Aparcamiento gratuito', 'Aire acondicionado', 'Agua caliente', 'Secador de pelo', 'Lavadora', 'Plancha', 'Vajilla', 'Admite mascotas', 'Apto para fumadores', 'Cuna', 'Productos de limpieza', 'Microondas', 'Cafetera', 'Accesible para minusválidos', 'Congelador', 'Horno', 'Lavavajillas', 'Terraza / patio', 'Ascensor', 'Bañera de hidromasaje', 'Piscina privada', 'Piscina compartida', 'Jardín', 'Zona para trabajar / Oficina'
  ],
  accomodation_rules: ['Prohibido fumar', 'No se admiten mascotas', 'Están totalmente prohibidas las fiestas y eventos'],
  linkers: {
    in: 'en',
  }
};
