// ================================
// QUERIES DE INSERCIÓN PARA MONGODB
// Base de datos: cien_soledad
// Capítulos: 13-16
// ================================

// Primero, crear los índices para optimizar las búsquedas
// Ejecutar estos comandos antes de las inserciones

// Índices para búsqueda de texto completo
db.eventos.createIndex({ 
  "nombre": "text", 
  "descripcion": "text", 
  "palabras_clave": "text",
  "texto_completo": "text" 
});

db.personajes.createIndex({ 
  "nombre": "text", 
  "descripcion_fisica": "text", 
  "personalidad": "text",
  "palabras_clave": "text" 
});

db.localizaciones.createIndex({ 
  "nombre": "text", 
  "descripcion": "text", 
  "palabras_clave": "text" 
});

db.objetos.createIndex({ 
  "nombre": "text", 
  "descripcion": "text", 
  "palabras_clave": "text" 
});

// Índices para consultas específicas
db.eventos.createIndex({ "capitulo": 1, "importancia": -1 });
db.personajes.createIndex({ "capitulos_aparicion": 1 });
db.localizaciones.createIndex({ "capitulos_aparicion": 1 });

// ================================
// 1. INSERCIÓN DE CAPÍTULOS
// ================================

db.capitulos.insertMany([
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef1"),
    numero: 13,
    titulo: "La llegada de la compañía bananera",
    resumen: "La United Fruit Company transforma Macondo con la llegada del progreso industrial, el ferrocarril y una nueva economía que cambia para siempre la dinámica del pueblo y de la familia Buendía.",
    temas_principales: ["progreso destructivo", "explotación económica", "transformación cultural", "colonialismo"],
    importancia: 9,
    palabras_clave: ["compañía bananera", "modernización", "tren", "extranjeros", "progreso", "transformación"],
    fecha_creacion: new Date(),
    eventos_relacionados: [
      ObjectId("64a1b2c3d4e5f6789abcdef1a"), // ← corregido
      ObjectId("64a1b2c3d4e5f6789abcdef1b")  // ← corregido
    ]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef2"),
    numero: 14,
    titulo: "La masacre de los trabajadores",
    resumen: "Los trabajadores bananeros se declaran en huelga y son masacrados por el ejército. José Arcadio Segundo es el único testigo consciente, pero el pueblo desarrolla una amnesia colectiva que niega la existencia de la tragedia.",
    temas_principales: ["memoria histórica", "violencia estatal", "olvido colectivo", "testimonio"],
    importancia: 10,
    palabras_clave: ["masacre", "huelga", "trabajadores", "memoria", "olvido", "testimonio", "tres mil muertos"],
    fecha_creacion: new Date(),
    eventos_relacionados: [
      ObjectId("64a1b2c3d4e5f6789abcdef2a"), // ← corregido
      ObjectId("64a1b2c3d4e5f6789abcdef2b")  // ← corregido
    ]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef3"),
    numero: 15,
    titulo: "El diluvio purificador",
    resumen: "Un diluvio de casi cinco años sumerge a Macondo en la decadencia. La casa se llena de hongos, mueren los gemelos José Arcadio Segundo y Aureliano Segundo, y termina una era de la familia Buendía.",
    temas_principales: ["purificación", "decadencia", "tiempo cíclico", "muerte generacional"],
    importancia: 8,
    palabras_clave: ["diluvio", "lluvia", "decadencia", "hongos", "muerte", "purificación"],
    fecha_creacion: new Date(),
    eventos_relacionados: [
      ObjectId("64a1b2c3d4e5f6789abcdef3a"), // ← corregido
      ObjectId("64a1b2c3d4e5f6789abcdef3b")  // ← corregido
    ]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef4"),
    numero: 16,
    titulo: "El renacimiento y el amor prohibido",
    resumen: "Amaranta Úrsula regresa de Europa e intenta renovar la casa familiar. Su encuentro amoroso con Aureliano Babilonia marca el inicio del fin de los Buendía, cumpliendo los patrones ancestrales de amor prohibido.",
    temas_principales: ["renovación", "amor prohibido", "incesto", "destino familiar"],
    importancia: 9,
    palabras_clave: ["amaranta úrsula", "aureliano babilonia", "amor", "renovación", "pergaminos"],
    fecha_creacion: new Date(),
    eventos_relacionados: [
      ObjectId("64a1b2c3d4e5f6789abcdef4a"), // ← corregido
      ObjectId("64a1b2c3d4e5f6789abcdef4b")  // ← corregido
    ]
  }
]);


// ================================
// 2. INSERCIÓN DE EVENTOS PRINCIPALES
// ================================

db.eventos.insertMany([
  // EVENTOS DEL CAPÍTULO 13
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef11"),
    nombre: "Llegada de la compañía bananera",
    descripcion: "La United Fruit Company establece operaciones en Macondo, construye la estación del tren y transforma radicalmente la economía y estructura social del pueblo. Llegan ingenieros extranjeros, se modernizan las calles y cambia la arquitectura tradicional.",
    capitulo: 13,
    importancia: 10,
    tipo: "historico",
    fecha_narrativa: "aproximadamente 1915-1920",
    personajes_involucrados: [
      ObjectId("64a1b2c3d4e5f6789abcde001"), // José Arcadio Segundo
      ObjectId("64a1b2c3d4e5f6789abcde002")  // Aureliano Segundo
    ],
    localizaciones: [
      ObjectId("64a1b2c3d4e5f6789abcde101"), // Estación del tren
      ObjectId("64a1b2c3d4e5f6789abcde102")  // Macondo
    ],
    objetos_relacionados: [
      ObjectId("64a1b2c3d4e5f6789abcde201"), // El tren
      ObjectId("64a1b2c3d4e5f6789abcde202")  // Los bananos
    ],
    simbolismo: ["progreso destructivo", "colonialismo económico", "pérdida de identidad"],
    consecuencias: [
      "transformación arquitectónica del pueblo",
      "llegada de población extranjera",
      "cambio en las dinámicas económicas",
      "inicio de tensiones laborales"
    ],
    palabras_clave: ["compañía", "bananera", "united fruit", "modernización", "tren", "extranjeros", "progreso", "transformación"],
    texto_completo: "La llegada de la compañía bananera marca un punto de inflexión en la historia de Macondo. Los ingenieros extranjeros traen consigo no solo tecnología y capital, sino una nueva forma de entender el mundo que choca frontalmente con las tradiciones ancestrales del pueblo. La construcción del ferrocarril simboliza la conexión forzada con el mundo exterior, rompiendo el aislamiento mítico que había caracterizado a Macondo desde su fundación."
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef12"),
    nombre: "Transformación de José Arcadio Segundo",
    descripcion: "José Arcadio Segundo acepta trabajar como capataz para la compañía bananera, lo que marca el inicio de su transformación de hombre despreocupado a defensor de los derechos de los trabajadores.",
    capitulo: 13,
    importancia: 7,
    tipo: "personal",
    fecha_narrativa: "1915-1920",
    personajes_involucrados: [ObjectId("64a1b2c3d4e5f6789abcde001")],
    localizaciones: [ObjectId("64a1b2c3d4e5f6789abcde103")], // Plantaciones bananeras
    simbolismo: ["despertar de conciencia", "compromiso social"],
    consecuencias: ["liderazgo en conflictos laborales", "distanciamiento de su hermano gemelo"],
    palabras_clave: ["josé arcadio segundo", "capataz", "trabajadores", "conciencia", "liderazgo"],
    texto_completo: "La decisión de José Arcadio Segundo de trabajar para la compañía marca su primera transformación importante. Inicialmente atraído por las oportunidades económicas, gradualmente desarrolla una conciencia social que lo llevará a liderar la resistencia obrera."
  },

  // EVENTOS DEL CAPÍTULO 14
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef21"),
    nombre: "La gran huelga de los trabajadores bananeros",
    descripcion: "Los trabajadores de la compañía bananera se organizan en una huelga masiva para exigir mejores condiciones laborales, salarios dignos, atención médica y el fin de los abusos. José Arcadio Segundo emerge como uno de los líderes del movimiento.",
    capitulo: 14,
    importancia: 9,
    tipo: "social",
    fecha_narrativa: "1928 aproximadamente",
    personajes_involucrados: [
      ObjectId("64a1b2c3d4e5f6789abcde001"), // José Arcadio Segundo
      ObjectId("64a1b2c3d4e5f6789abcde005")  // Los trabajadores bananeros
    ],
    localizaciones: [ObjectId("64a1b2c3d4e5f6789abcde101")], // Estación del tren
    simbolismo: ["lucha de clases", "dignidad obrera", "resistencia popular"],
    consecuencias: ["represión gubernamental", "intervención militar"],
    palabras_clave: ["huelga", "trabajadores", "bananeros", "protesta", "derechos", "laborales"],
    texto_completo: "La huelga representa el clímax de las tensiones sociales generadas por la presencia de la compañía extranjera. Los trabajadores, liderados por José Arcadio Segundo, demandan no solo mejores condiciones materiales sino reconocimiento de su dignidad humana frente a un sistema económico que los ve como recursos desechables."
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef22"),
    nombre: "La masacre de los tres mil",
    descripcion: "El ejército nacional, siguiendo órdenes del gobierno y en complicidad con la compañía bananera, abre fuego contra los trabajadores huelguistas reunidos en la estación del tren. José Arcadio Segundo es el único sobreviviente consciente que puede testimoniar la masacre de aproximadamente tres mil personas. Los cuerpos son cargados en trenes y arrojados al mar.",
    capitulo: 14,
    importancia: 10,
    tipo: "historico",
    fecha_narrativa: "1928",
    personajes_involucrados: [
      ObjectId("64a1b2c3d4e5f6789abcde001"), // José Arcadio Segundo
      ObjectId("64a1b2c3d4e5f6789abcde005"), // Trabajadores
      ObjectId("64a1b2c3d4e5f6789abcde006")  // Los soldados
    ],
    localizaciones: [ObjectId("64a1b2c3d4e5f6789abcde101")], // Estación del tren
    objetos_relacionados: [ObjectId("64a1b2c3d4e5f6789abcde203")], // Los vagones con cadáveres
    simbolismo: ["violencia del Estado", "genocidio", "borrado de la memoria"],
    consecuencias: [
      "olvido colectivo impuesto",
      "aislamiento de José Arcadio Segundo",
      "fin de la resistencia obrera"
    ],
    palabras_clave: ["masacre", "tres mil", "muertos", "soldados", "represión", "genocidio", "memoria"],
    texto_completo: "La masacre de los trabajadores bananeros representa uno de los episodios más brutales y simbólicos de la novela. No solo es un acto de violencia física, sino un intento sistemático de borrar la memoria histórica. El hecho de que José Arcadio Segundo sea el único testigo consciente lo convierte en el guardián solitario de una verdad que el poder quiere enterrar."
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef23"),
    nombre: "El olvido colectivo",
    descripcion: "Después de la masacre, el pueblo de Macondo desarrolla una amnesia colectiva. Todos niegan que haya ocurrido la masacre, insisten en que nunca hubo trabajadores ni compañía bananera. José Arcadio Segundo queda como único testigo de la verdad, completamente aislado en su memoria.",
    capitulo: 14,
    importancia: 9,
    tipo: "psicológico",
    fecha_narrativa: "post-1928",
    personajes_involucrados: [
      ObjectId("64a1b2c3d4e5f6789abcde001"), // José Arcadio Segundo
      ObjectId("64a1b2c3d4e5f6789abcde102")  // El pueblo de Macondo
    ],
    localizaciones: [ObjectId("64a1b2c3d4e5f6789abcde102")], // Macondo
    simbolismo: ["manipulación de la verdad", "poder de la amnesia", "soledad del testigo"],
    consecuencias: ["aislamiento total de José Arcadio Segundo", "reescritura de la historia oficial"],
    palabras_clave: ["olvido", "amnesia", "colectiva", "negación", "verdad", "testigo", "aislamiento"],
    texto_completo: "El olvido colectivo que se apodera de Macondo después de la masacre es quizás más aterrador que la masacre misma. Representa la capacidad del poder para no solo eliminar físicamente a sus opositores, sino para borrar su existencia de la memoria colectiva, convirtiendo la verdad en locura y al testigo en un loco solitario."
  },

  // EVENTOS DEL CAPÍTULO 15
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef31"),
    nombre: "El gran diluvio de cuatro años",
    descripcion: "Comienza una lluvia torrencial que durará cuatro años, once meses y dos días. El agua inunda Macondo, la casa de los Buendía se llena de hongos y vegetación acuática, y la decadencia se acelera dramáticamente.",
    capitulo: 15,
    importancia: 9,
    tipo: "sobrenatural",
    fecha_narrativa: "post-masacre, años 1930s",
    personajes_involucrados: [
      ObjectId("64a1b2c3d4e5f6789abcde003"), // Úrsula Iguarán
      ObjectId("64a1b2c3d4e5f6789abcde004")  // Fernanda del Carpio
    ],
    localizaciones: [
      ObjectId("64a1b2c3d4e5f6789abcde102"), // Macondo
      ObjectId("64a1b2c3d4e5f6789abcde104")  // Casa de los Buendía
    ],
    objetos_relacionados: [ObjectId("64a1b2c3d4e5f6789abcde204")], // Los hongos
    simbolismo: ["purificación bíblica", "castigo divino", "renovación cíclica"],
    consecuencias: [
      "deterioro acelerado de la casa",
      "aislamiento total de la familia",
      "muerte de la generación de los gemelos"
    ],
    palabras_clave: ["diluvio", "lluvia", "cuatro años", "inundación", "hongos", "decadencia", "purificación"],
    texto_completo: "El diluvio funciona como un mecanismo purificador que acelera la decadencia de Macondo y de los Buendía. Durante cuatro años interminables, la lluvia no solo transforma físicamente el espacio sino que marca el fin de una era, preparando el terreno para la última generación de la familia."
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef32"),
    nombre: "Muerte simultánea de los gemelos",
    descripcion: "José Arcadio Segundo y Aureliano Segundo mueren el mismo día durante el diluvio. José Arcadio Segundo fallece en el cuarto de Melquíades, obsesionado hasta el final con descifrar los pergaminos, mientras Aureliano Segundo muere empobrecido y olvidado.",
    capitulo: 15,
    importancia: 8,
    tipo: "personal",
    fecha_narrativa: "durante el diluvio",
    personajes_involucrados: [
      ObjectId("64a1b2c3d4e5f6789abcde001"), // José Arcadio Segundo
      ObjectId("64a1b2c3d4e5f6789abcde002")  // Aureliano Segundo
    ],
    localizaciones: [ObjectId("64a1b2c3d4e5f6789abcde105")], // Cuarto de Melquíades
    objetos_relacionados: [ObjectId("64a1b2c3d4e5f6789abcde205")], // Pergaminos de Melquíades
    simbolismo: ["fin de una era", "destino gemelar", "círculo que se cierra"],
    consecuencias: ["fin de la generación productiva", "aceleración del declive familiar"],
    palabras_clave: ["muerte", "gemelos", "simultánea", "josé arcadio", "aureliano", "pergaminos"],
    texto_completo: "La muerte simultánea de los gemelos marca simbólicamente el fin de la generación más productiva y vital de los Buendía. Sus personalidades opuestas pero complementarias habían mantenido un equilibrio que, con su partida, se rompe definitivamente."
  },

  // EVENTOS DEL CAPÍTULO 16
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef41"),
    nombre: "Regreso de Amaranta Úrsula",
    descripcion: "Amaranta Úrsula regresa de Europa casada con Gastón, un piloto aviador. Trae consigo energía renovadora y modernidad europea, e intenta restaurar la casa familiar y revitalizar Macondo con proyectos ambiciosos.",
    capitulo: 16,
    importancia: 8,
    tipo: "personal",
    fecha_narrativa: "post-diluvio, años 1940s",
    personajes_involucrados: [
      ObjectId("64a1b2c3d4e5f6789abcde007"), // Amaranta Úrsula
      ObjectId("64a1b2c3d4e5f6789abcde008")  // Gastón
    ],
    localizaciones: [ObjectId("64a1b2c3d4e5f6789abcde104")], // Casa de los Buendía
    simbolismo: ["esperanza de renovación", "energía vital", "conexión con el mundo moderno"],
    consecuencias: ["último intento de salvación familiar", "encuentro con Aureliano Babilonia"],
    palabras_clave: ["amaranta úrsula", "regreso", "europa", "gastón", "renovación", "modernidad"],
    texto_completo: "El regreso de Amaranta Úrsula representa la última oportunidad de renovación para los Buendía. Su energía, educación europea y matrimonio moderno contrastan dramáticamente con la decadencia que encuentra, pero también la preparan para su encuentro fatal con el destino familiar."
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef42"),
    nombre: "El amor prohibido final",
    descripcion: "Amaranta Úrsula y Aureliano Babilonia se enamoran apasionadamente, sin conocer inicialmente su parentesco. Su relación amorosa marca el cumplimiento final de los patrones incestuosos que han marcado a la familia Buendía a lo largo de generaciones.",
    capitulo: 16,
    importancia: 10,
    tipo: "personal",
    fecha_narrativa: "final de la saga",
    personajes_involucrados: [
      ObjectId("64a1b2c3d4e5f6789abcde007"), // Amaranta Úrsula
      ObjectId("64a1b2c3d4e5f6789abcde009")  // Aureliano Babilonia
    ],
    localizaciones: [ObjectId("64a1b2c3d4e5f6789abcde104")], // Casa de los Buendía
    objetos_relacionados: [ObjectId("64a1b2c3d4e5f6789abcde205")], // Pergaminos (casi descifrados)
    simbolismo: ["incesto ancestral", "destino inevitable", "amor trágico"],
    consecuencias: ["concepción del último Buendía", "cumplimiento de la profecía"],
    palabras_clave: ["amor", "prohibido", "incesto", "amaranta úrsula", "aureliano babilonia", "destino"],
    texto_completo: "El amor entre Amaranta Úrsula y Aureliano Babilonia representa el cumplimiento inevitable del destino familiar. Su pasión, pura e intensa, está marcada por la tragedia del incesto que ha perseguido a los Buendía desde sus orígenes, cerrando el círculo profético de la estirpe."
  }
]);

// ================================
// 3. INSERCIÓN DE PERSONAJES
// ================================

db.personajes.insertMany([
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde001"),
    nombre: "José Arcadio Segundo",
    apellido: "Buendía",
    generacion: 4,
    descripcion_fisica: "Alto, corpulento, con bigotes prominentes y manos grandes. Físicamente muy similar a su hermano gemelo pero con expresión más seria y determinada.",
    personalidad: ["determinado", "trabajador", "líder natural", "obsesivo", "guardián de la memoria", "solitario"],
    capitulos_aparicion: [13, 14, 15],
    eventos_principales: [
      ObjectId("64a1b2c3d4e5f6789abcdef12"), // Transformación personal
      ObjectId("64a1b2c3d4e5f6789abcdef21"), // Huelga bananera
      ObjectId("64a1b2c3d4e5f6789abcdef22"), // Masacre
      ObjectId("64a1b2c3d4e5f6789abcdef32")  // Su muerte
    ],
    relaciones: [
      {
        tipo: "hermano_gemelo",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde002"),
        descripcion: "Hermano gemelo de Aureliano Segundo, personalidades completamente opuestas"
      },
      {
        tipo: "bisnieto",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde003"),
        descripcion: "Bisnieto de Úrsula Iguarán, quien le transmitió valores de memoria familiar"
      }
    ],
    transformacion: "Evoluciona de capataz colaboracionista a líder obrero y finalmente a guardián solitario de la memoria histórica. Su arco narrativo representa el despertar de la conciencia social y el precio de mantener viva la verdad.",
    muerte: {
      capitulo: 15,
      circunstancias: "Muere en el cuarto de Melquíades durante el diluvio, obsesionado con descifrar los pergaminos hasta sus últimos momentos",
      simbolismo: "Muerte del testigo, fin de la memoria activa de la masacre"
    },
    simbolismo: ["memoria histórica", "testimonio", "resistencia", "soledad del testigo", "conciencia social"],
    palabras_clave: ["josé arcadio segundo", "gemelo", "huelga", "masacre", "testigo", "memoria", "trabajadores", "pergaminos"]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde002"),
    nombre: "Aureliano Segundo",
    apellido: "Buendía",
    generacion: 4,
    descripcion_fisica: "Idéntico físicamente a José Arcadio Segundo, pero con expresión más jovial y relajada. Tendencia al sobrepeso por sus excesos.",
    personalidad: ["hedonista", "generoso", "derrochador", "sociable", "amante de las fiestas", "irresponsable"],
    capitulos_aparicion: [13, 14, 15],
    eventos_principales: [
      ObjectId("64a1b2c3d4e5f6789abcdef11"), // Época de la compañía bananera
      ObjectId("64a1b2c3d4e5f6789abcdef32")  // Su muerte
    ],
    relaciones: [
      {
        tipo: "hermano_gemelo",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde001"),
        descripcion: "Hermano gemelo de José Arcadio Segundo, personalidades opuestas"
      },
      {
        tipo: "esposo",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde004"),
        descripcion: "Casado con Fernanda del Carpio, matrimonio deteriorado"
      },
      {
        tipo: "amante",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde010"),
        descripcion: "Relación prolongada con Petra Cotes"
      }
    ],
    transformacion: "Pasa de ser un hombre próspero y hedonista durante la época dorada a morir en la pobreza y el olvido, simbolizando el fin de la abundancia.",
    muerte: {
      capitulo: 15,
      circunstancias: "Muere el mismo día que su gemelo, empobrecido y sin recursos para su propio funeral",
      simbolismo: "Fin de la época de abundancia y excesos"
    },
    simbolismo: ["hedonismo", "abundancia perdida", "destino gemelar", "irresponsabilidad"],
    palabras_clave: ["aureliano segundo", "gemelo", "fiestas", "derroche", "petra cotes", "abundancia"]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde003"),
    nombre: "Úrsula",
    apellido: "Iguarán",
    generacion: 1,
    descripcion_fisica: "Mujer centenaria, casi completamente ciega, pero mantiene una energía y determinación notables a pesar de su edad avanzada.",
    personalidad: ["matriarcal", "sabia", "determinada", "protectora", "tradicionalista", "intuitiva"],
    capitulos_aparicion: [13, 14, 15],
    eventos_principales: [
      ObjectId("64a1b2c3d4e5f6789abcdef31") // El diluvio
    ],
    relaciones: [
      {
        tipo: "fundadora",
        personaje: "familia_buendia",
        descripcion: "Matriarca y fundadora de la dinastía Buendía"
      }
    ],
    transformacion: "En su vejez extrema, se convierte en la guardiana de las tradiciones familiares y la memoria ancestral, luchando contra la decadencia.",
    simbolismo: ["memoria ancestral", "tradición", "resistencia al cambio", "sabiduría matriarcal"],
    palabras_clave: ["úrsula", "matriarca", "centenaria", "tradición", "memoria", "familia"]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde004"),
    nombre: "Fernanda",
    apellido: "del Carpio",
    generacion: 4,
    descripcion_fisica: "Mujer de porte aristocrático, siempre impecablemente vestida según las modas de la capital, con gestos refinados pero rígidos.",
    personalidad: ["aristocrática", "rígida", "orgullosa", "conservadora", "amarga", "autoritaria"],
    capitulos_aparicion: [13, 14, 15, 16],
    eventos_principales: [
      ObjectId("64a1b2c3d4e5f6789abcdef43") // Su muerte (nuevo evento a crear)
    ],
    relaciones: [
      {
        tipo: "esposa",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde002"),
        descripcion: "Casada con Aureliano Segundo, matrimonio deteriorado por diferencias de clase y personalidad"
      },
      {
        tipo: "madre",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde007"),
        descripcion: "Madre de Amaranta Úrsula, relación tensa por diferencias generacionales"
      }
    ],
    transformacion: "Evoluciona de una aristocrática orgullosa a una mujer amargada y solitaria, aferrada a un pasado que ya no existe. Su rigidez la aísla completamente de la realidad de Macondo.",
    muerte: {
      capitulo: 16,
      circunstancias: "Muere sola y amargada, manteniendo su orgullo aristocrático hasta el final, sin haber logrado imponer su visión del mundo",
      simbolismo: "Muerte del orden aristocrático tradicional"
    },
    simbolismo: ["aristocracia decadente", "rigidez social", "aislamiento cultural", "resistencia al cambio"],
    palabras_clave: ["fernanda", "del carpio", "aristocrática", "rígida", "orgullosa", "conservadora", "capital"]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde005"),
    nombre: "Los Trabajadores Bananeros",
    apellido: "Colectivo",
    generacion: 4,
    descripcion_fisica: "Hombres curtidos por el trabajo bajo el sol, con manos callosas y rostros marcados por la fatiga. Visten ropas sencillas de trabajo, sombreros de palma.",
    personalidad: ["trabajadores", "dignos", "organizados", "valientes", "solidarios", "explotados"],
    capitulos_aparicion: [13, 14],
    eventos_principales: [
      ObjectId("64a1b2c3d4e5f6789abcdef11"), // Llegada de la compañía
      ObjectId("64a1b2c3d4e5f6789abcdef21"), // La huelga
      ObjectId("64a1b2c3d4e5f6789abcdef22")  // La masacre
    ],
    relaciones: [
      {
        tipo: "liderazgo",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde001"),
        descripcion: "José Arcadio Segundo emerge como uno de sus líderes naturales"
      }
    ],
    transformacion: "Pasan de ser trabajadores individuales a organizarse como clase obrera consciente, culminando en la huelga y siendo eliminados física y simbólicamente.",
    muerte: {
      capitulo: 14,
      circunstancias: "Masacrados por el ejército en la estación del tren, sus cuerpos arrojados al mar",
      simbolismo: "Genocidio de la clase trabajadora, borrado de la historia"
    },
    simbolismo: ["clase obrera", "dignidad laboral", "resistencia popular", "víctimas del poder"],
    palabras_clave: ["trabajadores", "bananeros", "huelga", "masacre", "obreros", "explotación", "resistencia"]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde006"),
    nombre: "Los Soldados",
    apellido: "Ejército Nacional",
    generacion: 4,
    descripcion_fisica: "Hombres uniformados, armados, con expresiones duras y disciplinadas. Representan la fuerza bruta del Estado.",
    personalidad: ["obedientes", "disciplinados", "violentos", "represivos", "despiadados", "instrumentos del poder"],
    capitulos_aparicion: [14],
    eventos_principales: [
      ObjectId("64a1b2c3d4e5f6789abcdef22") // La masacre
    ],
    relaciones: [
      {
        tipo: "antagonistas",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde005"),
        descripcion: "Ejecutores de la represión contra los trabajadores"
      }
    ],
    transformacion: "Funcionan como brazo armado del Estado y los intereses extranjeros, sin cuestionamiento moral.",
    simbolismo: ["violencia estatal", "represión", "obediencia ciega", "poder militar"],
    palabras_clave: ["soldados", "ejército", "represión", "masacre", "violencia", "estado", "militar"]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde007"),
    nombre: "Amaranta Úrsula",
    apellido: "Buendía",
    generacion: 5,
    descripcion_fisica: "Joven hermosa, con energía vital y modernidad europea. Cabello rubio, ojos expresivos, porte elegante pero natural.",
    personalidad: ["enérgica", "moderna", "renovadora", "apasionada", "determinada", "vital"],
    capitulos_aparicion: [13, 16],
    eventos_principales: [
      ObjectId("64a1b2c3d4e5f6789abcdef41"), // Su regreso
      ObjectId("64a1b2c3d4e5f6789abcdef42")  // Amor con Aureliano Babilonia
    ],
    relaciones: [
      {
        tipo: "hija",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde004"),
        descripcion: "Hija de Fernanda del Carpio, personalidades completamente opuestas"
      },
      {
        tipo: "esposa",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde008"),
        descripcion: "Casada con Gastón, matrimonio moderno y libre"
      },
      {
        tipo: "amante",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde009"),
        descripcion: "Relación incestuosa con Aureliano Babilonia"
      }
    ],
    transformacion: "Evoluciona de esposa moderna europea a mujer que redescubre sus raíces familiares y cumple el destino trágico de los Buendía.",
    simbolismo: ["renovación", "energía vital", "modernidad", "amor trágico", "destino inevitable"],
    palabras_clave: ["amaranta úrsula", "europea", "moderna", "renovación", "amor", "incesto", "destino"]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde008"),
    nombre: "Gastón",
    apellido: "Aviador",
    generacion: 5,
    descripcion_fisica: "Hombre joven, atlético, con aspecto de aviador moderno. Rasgos europeos, vestimenta elegante y práctica.",
    personalidad: ["moderno", "práctico", "aventurero", "liberal", "comprensivo", "ajeno a Macondo"],
    capitulos_aparicion: [16],
    eventos_principales: [
      ObjectId("64a1b2c3d4e5f6789abcdef41") // Regreso con Amaranta Úrsula
    ],
    relaciones: [
      {
        tipo: "esposo",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde007"),
        descripcion: "Casado con Amaranta Úrsula, matrimonio moderno"
      }
    ],
    transformacion: "Representa la modernidad europea que intenta adaptarse a Macondo pero finalmente es rechazada por el destino familiar.",
    simbolismo: ["modernidad", "mundo exterior", "racionalidad", "progreso técnico"],
    palabras_clave: ["gastón", "aviador", "europeo", "moderno", "avión", "progreso", "extranjero"]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde009"),
    nombre: "Aureliano Babilonia",
    apellido: "Buendía",
    generacion: 6,
    descripcion_fisica: "Joven delgado, con rasgos delicados típicos de los Aurelianos. Mirada intensa y concentrada, manos manchadas de tinta.",
    personalidad: ["intelectual", "solitario", "obsesivo", "determinado", "apasionado", "destinado"],
    capitulos_aparicion: [16],
    eventos_principales: [
      ObjectId("64a1b2c3d4e5f6789abcdef42") // Amor con Amaranta Úrsula
    ],
    relaciones: [
      {
        tipo: "amante",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde007"),
        descripcion: "Relación incestuosa con Amaranta Úrsula, su tía"
      },
      {
        tipo: "heredero",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde001"),
        descripcion: "Heredero intelectual de José Arcadio Segundo en el descifrado de pergaminos"
      }
    ],
    transformacion: "Evoluciona de estudioso solitario a amante apasionado y finalmente a descifrador del destino familiar.",
    simbolismo: ["último Aureliano", "sabiduría final", "amor trágico", "cumplimiento profético"],
    palabras_clave: ["aureliano babilonia", "último", "pergaminos", "amor", "incesto", "destino", "profecía"]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde010"),
    nombre: "Petra Cotes",
    apellido: "",
    generacion: 4,
    descripcion_fisica: "Mujer voluptuosa, sensual, con risa contagiosa y presencia magnética. Representa la feminidad terrena y abundante.",
    personalidad: ["sensual", "generosa", "alegre", "maternal", "comprensiva", "vital"],
    capitulos_aparicion: [13, 15],
    eventos_principales: [],
    relaciones: [
      {
        tipo: "amante",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde002"),
        descripcion: "Amante de larga duración de Aureliano Segundo"
      }
    ],
    transformacion: "Permanece como figura constante de vitalidad y generosidad, contrastando con la rigidez de Fernanda.",
    simbolismo: ["feminidad natural", "abundancia", "amor libre", "vitalidad"],
    palabras_clave: ["petra cotes", "amante", "abundancia", "vitalidad", "generosidad", "sensualidad"]
  }
]);

// ================================
// 4. INSERCIÓN DE LOCALIZACIONES
// ================================

db.localizaciones.insertMany([
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde101"),
    nombre: "Estación del Tren",
    tipo: "infraestructura",
    descripcion: "Moderna estación ferroviaria construida por la compañía bananera. Centro neurálgico de la actividad económica y social de Macondo. Lugar donde convergen el progreso y la tragedia, simbolizando tanto la modernización como la represión.",
    capitulos_aparicion: [13, 14],
    eventos_importantes: [
      ObjectId("64a1b2c3d4e5f6789abcdef11"), // Llegada de la compañía
      ObjectId("64a1b2c3d4e5f6789abcdef21"), // La huelga
      ObjectId("64a1b2c3d4e5f6789abcdef22")  // La masacre
    ],
    simbolismo: ["progreso", "modernización", "conexión con el mundo", "escenario de tragedia"],
    transformaciones: [
      {
        capitulo: 13,
        descripcion: "Construcción como símbolo de progreso y modernidad"
      },
      {
        capitulo: 14,
        descripcion: "Se convierte en escenario de la masacre, marcada para siempre por la sangre"
      }
    ],
    personajes_asociados: [
      ObjectId("64a1b2c3d4e5f6789abcde001"), // José Arcadio Segundo
      ObjectId("64a1b2c3d4e5f6789abcde005")  // Trabajadores bananeros
    ],
    palabras_clave: ["estación", "tren", "ferrocarril", "progreso", "masacre", "trabajadores", "huelga"]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde102"),
    nombre: "Macondo",
    tipo: "pueblo",
    descripcion: "El pueblo mítico que sirve de escenario a toda la saga. Durante estos capítulos experimenta una transformación radical: de pueblo aislado y tradicional a centro de explotación bananera, luego a lugar de tragedia y olvido, y finalmente a espacio de decadencia y renacimiento.",
    capitulos_aparicion: [13, 14, 15, 16],
    eventos_importantes: [
      ObjectId("64a1b2c3d4e5f6789abcdef11"), // Transformación por la compañía
      ObjectId("64a1b2c3d4e5f6789abcdef23"), // Olvido colectivo
      ObjectId("64a1b2c3d4e5f6789abcdef31")  // El diluvio
    ],
    simbolismo: ["microcosmos", "América Latina", "ciclos históricos", "memoria colectiva"],
    transformaciones: [
      {
        capitulo: 13,
        descripcion: "Modernización acelerada con calles pavimentadas, hoteles, población extranjera"
      },
      {
        capitulo: 14,
        descripcion: "Desarrollo de amnesia colectiva que niega la masacre"
      },
      {
        capitulo: 15,
        descripcion: "Inundación y decadencia durante el diluvio de cuatro años"
      },
      {
        capitulo: 16,
        descripcion: "Intento de renovación con el regreso de Amaranta Úrsula"
      }
    ],
    personajes_asociados: [
      ObjectId("64a1b2c3d4e5f6789abcde003"), // Úrsula (fundadora)
      ObjectId("64a1b2c3d4e5f6789abcde007")  // Amaranta Úrsula (renovadora)
    ],
    palabras_clave: ["macondo", "pueblo", "transformación", "modernización", "decadencia", "memoria", "olvido"]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde103"),
    nombre: "Plantaciones Bananeras",
    tipo: "espacio_productivo",
    descripcion: "Extensas plantaciones de banano que rodean Macondo, organizadas según métodos industriales modernos. Representan la explotación económica sistemática y la transformación del paisaje natural en espacio de producción capitalista.",
    capitulos_aparicion: [13, 14],
    eventos_importantes: [
      ObjectId("64a1b2c3d4e5f6789abcdef11"), // Establecimiento de la compañía
      ObjectId("64a1b2c3d4e5f6789abcdef21")  // Origen de los conflictos laborales
    ],
    simbolismo: ["explotación", "colonialismo económico", "transformación del paisaje", "trabajo alienado"],
    transformaciones: [
      {
        capitulo: 13,
        descripcion: "Conversión de tierras tradicionales en monocultivo industrial"
      },
      {
        capitulo: 14,
        descripcion: "Escenario de conflictos laborales y explotación"
      }
    ],
    personajes_asociados: [
      ObjectId("64a1b2c3d4e5f6789abcde001"), // José Arcadio Segundo (capataz)
      ObjectId("64a1b2c3d4e5f6789abcde005")  // Trabajadores
    ],
    palabras_clave: ["plantaciones", "banano", "monocultivo", "explotación", "trabajo", "industrial"]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde104"),
    nombre: "Casa de los Buendía",
    tipo: "hogar_familiar",
    descripcion: "La mansión familiar que funciona como microcosmos de la saga. Durante estos capítulos experimenta un deterioro acelerado, se llena de hongos durante el diluvio, y finalmente es objeto de intentos de renovación por parte de Amaranta Úrsula.",
    capitulos_aparicion: [13, 14, 15, 16],
    eventos_importantes: [
      ObjectId("64a1b2c3d4e5f6789abcdef31"), // El diluvio
      ObjectId("64a1b2c3d4e5f6789abcdef32"), // Muerte de los gemelos
      ObjectId("64a1b2c3d4e5f6789abcdef41"), // Renovación por Amaranta Úrsula
      ObjectId("64a1b2c3d4e5f6789abcdef42")  // Amor prohibido
    ],
    simbolismo: ["decadencia familiar", "memoria ancestral", "espacio de destino", "renovación imposible"],
    transformaciones: [
      {
        capitulo: 13,
        descripcion: "Inicio del deterioro y abandono progresivo"
      },
      {
        capitulo: 15,
        descripcion: "Invasión de hongos y vegetación acuática durante el diluvio"
      },
      {
        capitulo: 16,
        descripcion: "Intento de restauración y renovación arquitectónica"
      }
    ],
    personajes_asociados: [
      ObjectId("64a1b2c3d4e5f6789abcde003"), // Úrsula (guardiana)
      ObjectId("64a1b2c3d4e5f6789abcde007"), // Amaranta Úrsula (renovadora)
      ObjectId("64a1b2c3d4e5f6789abcde009")  // Aureliano Babilonia
    ],
    palabras_clave: ["casa", "mansión", "familia", "deterioro", "hongos", "renovación", "hogar"]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde105"),
    nombre: "Cuarto de Melquíades",
    tipo: "espacio_sagrado",
    descripcion: "Habitación especial donde se conservan los pergaminos proféticos. Durante el diluvio es el único lugar que permanece seco, simbolizando la preservación del conocimiento ancestral. Lugar de refugio para José Arcadio Segundo y finalmente para Aureliano Babilonia.",
    capitulos_aparicion: [14, 15, 16],
    eventos_importantes: [
      ObjectId("64a1b2c3d4e5f6789abcdef23"), // Refugio de José Arcadio Segundo
      ObjectId("64a1b2c3d4e5f6789abcdef32"), // Muerte de José Arcadio Segundo
      ObjectId("64a1b2c3d4e5f6789abcdef42")  // Descifrado final
    ],
    simbolismo: ["conocimiento ancestral", "refugio de la memoria", "espacio atemporal", "revelación final"],
    transformaciones: [
      {
        capitulo: 14,
        descripcion: "Se convierte en refugio de la memoria y la verdad negada"
      },
      {
        capitulo: 15,
        descripcion: "Único espacio que resiste la invasión del diluvio"
      },
      {
        capitulo: 16,
        descripcion: "Lugar del descifrado final de los pergaminos"
      }
    ],
    personajes_asociados: [
      ObjectId("64a1b2c3d4e5f6789abcde001"), // José Arcadio Segundo
      ObjectId("64a1b2c3d4e5f6789abcde009")  // Aureliano Babilonia
    ],
    palabras_clave: ["cuarto", "melquíades", "pergaminos", "refugio", "memoria", "conocimiento", "profecía"]
  }
]);

// ================================
// 5. INSERCIÓN DE OBJETOS
// ================================

db.objetos.insertMany([
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde201"),
    nombre: "El Tren",
    tipo: "transporte",
    descripcion: "Locomotora y vagones del ferrocarril que conecta Macondo con el mundo exterior. Símbolo ambivalente del progreso que trae modernización pero también explotación y tragedia. Transporta mercancías, personas y finalmente cadáveres.",
    capitulos_aparicion: [13, 14],
    propietarios: [ObjectId("64a1b2c3d4e5f6789abcde011")], // Compañía bananera (a crear)
    ubicacion_fisica: "Estación del tren y vías férreas",
    simbolismo: ["progreso", "conexión mundial", "modernización", "vehículo de la tragedia"],
    transformaciones: [
      {
        capitulo: 13,
        descripcion: "Símbolo de progreso y modernización"
      },
      {
        capitulo: 14,
        descripcion: "Se convierte en heramienta para transportar cadáveres y ocultar la masacre"
      }
    ],
    importancia_narrativa: 9,
    palabras_clave: ["tren", "ferrocarril", "progreso", "modernización", "cadáveres", "transporte"]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde202"),
    nombre: "Los Bananos",
    tipo: "producto",
    descripcion: "Fruta tropical que se convierte en el centro de la economía de Macondo. Representa la transformación de un recurso natural en mercancía de exportación y símbolo de la explotación económica internacional.",
    capitulos_aparicion: [13, 14],
    propietarios: [ObjectId("64a1b2c3d4e5f6789abcde011")], // Compañía bananera
    ubicacion_fisica: "Plantaciones y centros de procesamiento",
    simbolismo: ["explotación económica", "colonialismo", "monocultivo", "mercancía"],
    transformaciones: [
      {
        capitulo: 13,
        descripcion: "De fruta local a producto de exportación masiva"
      },
      {
        capitulo: 14,
        descripcion: "Símbolo de la explotación que genera conflictos sociales"
      }
    ],
    importancia_narrativa: 8,
    palabras_clave: ["bananos", "fruta", "exportación", "monocultivo", "explotación", "economía"]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde203"),
    nombre: "Los Vagones con Cadáveres",
    tipo: "transporte_macabro",
    descripcion: "Vagones del tren utilizados para transportar los cuerpos de los trabajadores masacrados hacia el mar. Representan la eliminación física de la evidencia y el intento de borrar la memoria histórica.",
    capitulos_aparicion: [14],
    propietarios: [ObjectId("64a1b2c3d4e5f6789abcde006")], // Los soldados/Estado
    ubicacion_fisica: "Tren hacia el mar",
    simbolismo: ["eliminación de evidencia", "borrado de memoria", "genocidio", "encubrimiento"],
    transformaciones: [
      {
        capitulo: 14,
        descripcion: "Conversión de transporte comercial en instrumento de encubrimiento"
      }
    ],
    importancia_narrativa: 10,
    palabras_clave: ["vagones", "cadáveres", "masacre", "encubrimiento", "mar", "evidencia"]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde204"),
    nombre: "Los Hongos",
    tipo: "elemento_natural",
    descripcion: "Hongos que invaden la casa de los Buendía durante el diluvio. Crecen en paredes, muebles y rincones, simbolizando la decadencia, la humedad destructiva y la muerte que se apodera de la familia.",
    capitulos_aparicion: [15],
    propietarios: [], // Pertenecen a la naturaleza
    ubicacion_fisica: "Casa de los Buendía",
    simbolismo: ["decadencia", "muerte", "descomposición", "naturaleza que reclama"],
    transformaciones: [
      {
        capitulo: 15,
        descripcion: "Invasión gradual de todos los espacios domésticos"
      }
    ],
    importancia_narrativa: 7,
    palabras_clave: ["hongos", "decadencia", "humedad", "invasión", "descomposición", "naturaleza"]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde205"),
    nombre: "Pergaminos de Melquíades",
    tipo: "manuscrito_profético",
    descripcion: "Manuscritos antiguos que contienen la historia completa de la familia Buendía escrita con anticipación. Representan el destino prefijado, la circularidad del tiempo y la sabiduría ancestral que finalmente será descifrada.",
    capitulos_aparicion: [14, 15, 16],
    propietarios: [
      ObjectId("64a1b2c3d4e5f6789abcde001"), // José Arcadio Segundo (guardián)
      ObjectId("64a1b2c3d4e5f6789abcde009")  // Aureliano Babilonia (descifrador)
    ],
    ubicacion_fisica: "Cuarto de Melquíades",
    simbolismo: ["destino", "profecía", "circularidad temporal", "sabiduría ancestral"],
    transformaciones: [
      {
        capitulo: 14,
        descripcion: "Objeto de obsesión para José Arcadio Segundo"
      },
      {
        capitulo: 15,
        descripcion: "Resisten milagrosamente la humedad del diluvio"
      },
      {
        capitulo: 16,
        descripcion: "Cerca de ser completamente descifrados por Aureliano Babilonia"
      }
    ],
    importancia_narrativa: 10,
    palabras_clave: ["pergaminos", "melquíades", "profecía", "destino", "descifrado", "tiempo", "circular"]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde206"),
    nombre: "El Avión de Gastón",
    tipo: "aeronave",
    descripcion: "Avión privado que representa la modernidad técnica europea y la conexión con el mundo exterior. Símbolo de progreso racional y científico que contrasta con el mundo mágico de Macondo.",
    capitulos_aparicion: [16],
    propietarios: [ObjectId("64a1b2c3d4e5f6789abcde008")], // Gastón
    ubicacion_fisica: "Hangar construido en Macondo",
    simbolismo: ["modernidad", "progreso técnico", "racionalidad", "mundo exterior"],
    transformaciones: [
      {
        capitulo: 16,
        descripcion: "De símbolo de modernidad a objeto abandonado"
      }
    ],
    importancia_narrativa: 6,
    palabras_clave: ["avión", "gastón", "modernidad", "técnica", "progreso", "hangar", "aviación"]
  }
]);

// ================================
// 6. INSERCIÓN DE SUEÑOS Y VISIONES
// ================================

db.suenos_visiones.insertMany([
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde301"),
    sonador: ObjectId("64a1b2c3d4e5f6789abcde003"), // Úrsula
    tipo: "premonición",
    capitulo: 13,
    descripcion: "Úrsula tiene visiones recurrentes sobre la decadencia inevitable de la familia, ve la casa llenándose de extraños y perdiendo su esencia tradicional.",
    interpretacion: "Premonición de la transformación de Macondo por influencias externas y el inicio del declive familiar",
    elementos_simbolicos: ["casa vacía", "extraños", "pérdida de tradiciones", "decadencia"],
    cumplimiento: "Se cumple con la llegada de la compañía bananera y los cambios culturales",
    palabras_clave: ["úrsula", "premonición", "decadencia", "familia", "tradiciones", "extraños"]
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde302"),
    sonador: ObjectId("64a1b2c3d4e5f6789abcde001"), // José Arcadio Segundo
    tipo: "visión_traumática",
    capitulo: 14,
    descripcion: "José Arcadio Segundo experimenta visiones recurrentes de la masacre, ve constantemente los cuerpos de los trabajadores y el tren cargado de cadáveres dirigiéndose al mar.",
    interpretacion: "Trauma psicológico que se convierte