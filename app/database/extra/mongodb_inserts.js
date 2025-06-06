// ================================
// QUERIES DE INSERCIÓN PARA MONGODB
// Base de datos: cien_soledad
// Capítulos: 13-16
// ================================

// Primero, crear los índices para optimizar las búsquedas
// Ejecutar estos comandos antes de las inserciones

// Índices para búsqueda de texto completo
db.eventos.createIndex({
  nombre: "text",
  descripcion: "text",
  palabras_clave: "text",
  texto_completo: "text",
});

db.personajes.createIndex({
  nombre: "text",
  descripcion_fisica: "text",
  personalidad: "text",
  palabras_clave: "text",
});

db.localizaciones.createIndex({
  nombre: "text",
  descripcion: "text",
  palabras_clave: "text",
});

db.objetos.createIndex({
  nombre: "text",
  descripcion: "text",
  palabras_clave: "text",
});

// Índices para consultas específicas
db.eventos.createIndex({ capitulo: 1, importancia: -1 });
db.personajes.createIndex({ capitulos_aparicion: 1 });
db.localizaciones.createIndex({ capitulos_aparicion: 1 });

// ================================
// 1. INSERCIÓN DE CAPÍTULOS
// ================================

db.capitulos.insertMany([
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde01"),
    numero: 13,
    titulo: "La llegada de la compañía bananera",
    resumen:
      "La United Fruit Company transforma Macondo con la llegada del progreso industrial, el ferrocarril y una nueva economía que cambia para siempre la dinámica del pueblo y de la familia Buendía.",
    temas_principales: ["progreso destructivo", "explotación económica", "transformación cultural", "colonialismo"],
    importancia: 9,
    palabras_clave: ["compañía bananera", "modernización", "tren", "extranjeros", "progreso", "transformación"],
    fecha_creacion: new Date(),
    eventos_relacionados: [ObjectId("64a1b2c3d4e5f6789abcde11"), ObjectId("64a1b2c3d4e5f6789abcde12")],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde02"),
    numero: 14,
    titulo: "La masacre de los trabajadores",
    resumen:
      "Los trabajadores bananeros se declaran en huelga y son masacrados por el ejército. José Arcadio Segundo es el único testigo consciente, pero el pueblo desarrolla una amnesia colectiva que niega la existencia de la tragedia.",
    temas_principales: ["memoria histórica", "violencia estatal", "olvido colectivo", "testimonio"],
    importancia: 10,
    palabras_clave: ["masacre", "huelga", "trabajadores", "memoria", "olvido", "testimonio", "tres mil muertos"],
    fecha_creacion: new Date(),
    eventos_relacionados: [ObjectId("64a1b2c3d4e5f6789abcde21"), ObjectId("64a1b2c3d4e5f6789abcde22")],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde03"),
    numero: 15,
    titulo: "El diluvio purificador",
    resumen:
      "Un diluvio de casi cinco años sumerge a Macondo en la decadencia. La casa se llena de hongos, mueren los gemelos José Arcadio Segundo y Aureliano Segundo, y termina una era de la familia Buendía.",
    temas_principales: ["purificación", "decadencia", "tiempo cíclico", "muerte generacional"],
    importancia: 8,
    palabras_clave: ["diluvio", "lluvia", "decadencia", "hongos", "muerte", "purificación"],
    fecha_creacion: new Date(),
    eventos_relacionados: [ObjectId("64a1b2c3d4e5f6789abcde31"), ObjectId("64a1b2c3d4e5f6789abcde32")],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde04"),
    numero: 16,
    titulo: "El renacimiento y el amor prohibido",
    resumen:
      "Amaranta Úrsula regresa de Europa e intenta renovar la casa familiar. Su encuentro amoroso con Aureliano Babilonia marca el inicio del fin de los Buendía, cumpliendo los patrones ancestrales de amor prohibido.",
    temas_principales: ["renovación", "amor prohibido", "incesto", "destino familiar"],
    importancia: 9,
    palabras_clave: ["amaranta úrsula", "aureliano babilonia", "amor", "renovación", "pergaminos"],
    fecha_creacion: new Date(),
    eventos_relacionados: [ObjectId("64a1b2c3d4e5f6789abcde41"), ObjectId("64a1b2c3d4e5f6789abcde42")],
  },
]);

// ================================
// 2. INSERCIÓN DE EVENTOS PRINCIPALES
// ================================

db.eventos.insertMany([
  // EVENTOS DEL CAPÍTULO 13
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde11"),
    nombre: "Llegada de la compañía bananera",
    descripcion:
      "La United Fruit Company establece operaciones en Macondo, construye la estación del tren y transforma radicalmente la economía y estructura social del pueblo. Llegan ingenieros extranjeros, se modernizan las calles y cambia la arquitectura tradicional.",
    capitulo: 13,
    importancia: 10,
    tipo: "historico",
    fecha_narrativa: "aproximadamente 1915-1920",
    personajes_involucrados: [
      ObjectId("64a1b2c3d4e5f6789abcde51"), // José Arcadio Segundo
      ObjectId("64a1b2c3d4e5f6789abcde52"), // Aureliano Segundo
    ],
    localizaciones: [
      ObjectId("64a1b2c3d4e5f6789abcd101"), // Estación del tren
      ObjectId("64a1b2c3d4e5f6789abcd102"), // Macondo
    ],
    objetos_relacionados: [
      ObjectId("64a1b2c3d4e5f6789abcd201"), // El tren
      ObjectId("64a1b2c3d4e5f6789abcd202"), // Los bananos
    ],
    simbolismo: ["progreso destructivo", "colonialismo económico", "pérdida de identidad"],
    consecuencias: ["transformación arquitectónica del pueblo", "llegada de población extranjera", "cambio en las dinámicas económicas", "inicio de tensiones laborales"],
    palabras_clave: ["compañía", "bananera", "united fruit", "modernización", "tren", "extranjeros", "progreso", "transformación"],
    texto_completo:
      "La llegada de la compañía bananera marca un punto de inflexión en la historia de Macondo. Los ingenieros extranjeros traen consigo no solo tecnología y capital, sino una nueva forma de entender el mundo que choca frontalmente con las tradiciones ancestrales del pueblo. La construcción del ferrocarril simboliza la conexión forzada con el mundo exterior, rompiendo el aislamiento mítico que había caracterizado a Macondo desde su fundación.",
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde12"),
    nombre: "Transformación de José Arcadio Segundo",
    descripcion:
      "José Arcadio Segundo acepta trabajar como capataz para la compañía bananera, lo que marca el inicio de su transformación de hombre despreocupado a defensor de los derechos de los trabajadores.",
    capitulo: 13,
    importancia: 7,
    tipo: "personal",
    fecha_narrativa: "1915-1920",
    personajes_involucrados: [ObjectId("64a1b2c3d4e5f6789abcde51")],
    localizaciones: [ObjectId("64a1b2c3d4e5f6789abcd103")], // Plantaciones bananeras
    simbolismo: ["despertar de conciencia", "compromiso social"],
    consecuencias: ["liderazgo en conflictos laborales", "distanciamiento de su hermano gemelo"],
    palabras_clave: ["josé arcadio segundo", "capataz", "trabajadores", "conciencia", "liderazgo"],
    texto_completo:
      "La decisión de José Arcadio Segundo de trabajar para la compañía marca su primera transformación importante. Inicialmente atraído por las oportunidades económicas, gradualmente desarrolla una conciencia social que lo llevará a liderar la resistencia obrera.",
  },

  // EVENTOS DEL CAPÍTULO 14
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde21"),
    nombre: "La gran huelga de los trabajadores bananeros",
    descripcion:
      "Los trabajadores de la compañía bananera se organizan en una huelga masiva para exigir mejores condiciones laborales, salarios dignos, atención médica y el fin de los abusos. José Arcadio Segundo emerge como uno de los líderes del movimiento.",
    capitulo: 14,
    importancia: 9,
    tipo: "social",
    fecha_narrativa: "1928 aproximadamente",
    personajes_involucrados: [
      ObjectId("64a1b2c3d4e5f6789abcde51"), // José Arcadio Segundo
      ObjectId("64a1b2c3d4e5f6789abcde55"), // Los trabajadores bananeros
    ],
    localizaciones: [ObjectId("64a1b2c3d4e5f6789abcd101")], // Estación del tren
    simbolismo: ["lucha de clases", "dignidad obrera", "resistencia popular"],
    consecuencias: ["represión gubernamental", "intervención militar"],
    palabras_clave: ["huelga", "trabajadores", "bananeros", "protesta", "derechos", "laborales"],
    texto_completo:
      "La huelga representa el clímax de las tensiones sociales generadas por la presencia de la compañía extranjera. Los trabajadores, liderados por José Arcadio Segundo, demandan no solo mejores condiciones materiales sino reconocimiento de su dignidad humana frente a un sistema económico que los ve como recursos desechables.",
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde22"),
    nombre: "La masacre de los tres mil",
    descripcion:
      "El ejército nacional, siguiendo órdenes del gobierno y en complicidad con la compañía bananera, abre fuego contra los trabajadores huelguistas reunidos en la estación del tren. José Arcadio Segundo es el único sobreviviente consciente que puede testimoniar la masacre de aproximadamente tres mil personas. Los cuerpos son cargados en trenes y arrojados al mar.",
    capitulo: 14,
    importancia: 10,
    tipo: "historico",
    fecha_narrativa: "1928",
    personajes_involucrados: [
      ObjectId("64a1b2c3d4e5f6789abcde51"), // José Arcadio Segundo
      ObjectId("64a1b2c3d4e5f6789abcde55"), // Trabajadores
      ObjectId("64a1b2c3d4e5f6789abcde56"), // Los soldados
    ],
    localizaciones: [ObjectId("64a1b2c3d4e5f6789abcd101")], // Estación del tren
    objetos_relacionados: [ObjectId("64a1b2c3d4e5f6789abcd203")], // Los vagones con cadáveres
    simbolismo: ["violencia del Estado", "genocidio", "borrado de la memoria"],
    consecuencias: ["olvido colectivo impuesto", "aislamiento de José Arcadio Segundo", "fin de la resistencia obrera"],
    palabras_clave: ["masacre", "tres mil", "muertos", "soldados", "represión", "genocidio", "memoria"],
    texto_completo:
      "La masacre de los trabajadores bananeros representa uno de los episodios más brutales y simbólicos de la novela. No solo es un acto de violencia física, sino un intento sistemático de borrar la memoria histórica. El hecho de que José Arcadio Segundo sea el único testigo consciente lo convierte en el guardián solitario de una verdad que el poder quiere enterrar.",
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde23"),
    nombre: "El olvido colectivo",
    descripcion:
      "Después de la masacre, el pueblo de Macondo desarrolla una amnesia colectiva. Todos niegan que haya ocurrido la masacre, insisten en que nunca hubo trabajadores ni compañía bananera. José Arcadio Segundo queda como único testigo de la verdad, completamente aislado en su memoria.",
    capitulo: 14,
    importancia: 9,
    tipo: "psicológico",
    fecha_narrativa: "post-1928",
    personajes_involucrados: [
      ObjectId("64a1b2c3d4e5f6789abcde51"), // José Arcadio Segundo
      ObjectId("64a1b2c3d4e5f6789abcde57"), // El pueblo de Macondo
    ],
    localizaciones: [ObjectId("64a1b2c3d4e5f6789abcd102")], // Macondo
    simbolismo: ["manipulación de la verdad", "poder de la amnesia", "soledad del testigo"],
    consecuencias: ["aislamiento total de José Arcadio Segundo", "reescritura de la historia oficial"],
    palabras_clave: ["olvido", "amnesia", "colectiva", "negación", "verdad", "testigo", "aislamiento"],
    texto_completo:
      "El olvido colectivo que se apodera de Macondo después de la masacre es quizás más aterrador que la masacre misma. Representa la capacidad del poder para no solo eliminar físicamente a sus opositores, sino para borrar su existencia de la memoria colectiva, convirtiendo la verdad en locura y al testigo en un loco solitario.",
  },

  // EVENTOS DEL CAPÍTULO 15
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde31"),
    nombre: "El gran diluvio de cuatro años",
    descripcion:
      "Comienza una lluvia torrencial que durará cuatro años, once meses y dos días. El agua inunda Macondo, la casa de los Buendía se llena de hongos y vegetación acuática, y la decadencia se acelera dramáticamente.",
    capitulo: 15,
    importancia: 9,
    tipo: "sobrenatural",
    fecha_narrativa: "post-masacre, años 1930s",
    personajes_involucrados: [
      ObjectId("64a1b2c3d4e5f6789abcde53"), // Úrsula Iguarán
      ObjectId("64a1b2c3d4e5f6789abcde54"), // Fernanda del Carpio
    ],
    localizaciones: [
      ObjectId("64a1b2c3d4e5f6789abcd102"), // Macondo
      ObjectId("64a1b2c3d4e5f6789abcd104"), // Casa de los Buendía
    ],
    objetos_relacionados: [ObjectId("64a1b2c3d4e5f6789abcd204")], // Los hongos
    simbolismo: ["purificación bíblica", "castigo divino", "renovación cíclica"],
    consecuencias: ["deterioro acelerado de la casa", "aislamiento total de la familia", "muerte de la generación de los gemelos"],
    palabras_clave: ["diluvio", "lluvia", "cuatro años", "inundación", "hongos", "decadencia", "purificación"],
    texto_completo:
      "El diluvio funciona como un mecanismo purificador que acelera la decadencia de Macondo y de los Buendía. Durante cuatro años interminables, la lluvia no solo transforma físicamente el espacio sino que marca el fin de una era, preparando el terreno para la última generación de la familia.",
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde32"),
    nombre: "Muerte simultánea de los gemelos",
    descripcion:
      "José Arcadio Segundo y Aureliano Segundo mueren el mismo día durante el diluvio. José Arcadio Segundo fallece en el cuarto de Melquíades, obsesionado hasta el final con descifrar los pergaminos, mientras Aureliano Segundo muere empobrecido y olvidado.",
    capitulo: 15,
    importancia: 8,
    tipo: "personal",
    fecha_narrativa: "durante el diluvio",
    personajes_involucrados: [
      ObjectId("64a1b2c3d4e5f6789abcde51"), // José Arcadio Segundo
      ObjectId("64a1b2c3d4e5f6789abcde52"), // Aureliano Segundo
    ],
    localizaciones: [ObjectId("64a1b2c3d4e5f6789abcd105")], // Cuarto de Melquíades
    objetos_relacionados: [ObjectId("64a1b2c3d4e5f6789abcd205")], // Pergaminos de Melquíades
    simbolismo: ["fin de una era", "destino gemelar", "círculo que se cierra"],
    consecuencias: ["fin de la generación productiva", "aceleración del declive familiar"],
    palabras_clave: ["muerte", "gemelos", "simultánea", "josé arcadio", "aureliano", "pergaminos"],
    texto_completo:
      "La muerte simultánea de los gemelos marca simbólicamente el fin de la generación más productiva y vital de los Buendía. Sus personalidades opuestas pero complementarias habían mantenido un equilibrio que, con su partida, se rompe definitivamente.",
  },

  // EVENTOS DEL CAPÍTULO 16
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde41"),
    nombre: "Regreso de Amaranta Úrsula",
    descripcion:
      "Amaranta Úrsula regresa de Europa casada con Gastón, un piloto aviador. Trae consigo energía renovadora y modernidad europea, e intenta restaurar la casa familiar y revitalizar Macondo con proyectos ambiciosos.",
    capitulo: 16,
    importancia: 8,
    tipo: "personal",
    fecha_narrativa: "post-diluvio, años 1940s",
    personajes_involucrados: [
      ObjectId("64a1b2c3d4e5f6789abcde57"), // Amaranta Úrsula
      ObjectId("64a1b2c3d4e5f6789abcde58"), // Gastón
    ],
    localizaciones: [ObjectId("64a1b2c3d4e5f6789abcd104")], // Casa de los Buendía
    simbolismo: ["esperanza de renovación", "energía vital", "conexión con el mundo moderno"],
    consecuencias: ["último intento de salvación familiar", "encuentro con Aureliano Babilonia"],
    palabras_clave: ["amaranta úrsula", "regreso", "europa", "gastón", "renovación", "modernidad"],
    texto_completo:
      "El regreso de Amaranta Úrsula representa la última oportunidad de renovación para los Buendía. Su energía, educación europea y matrimonio moderno contrastan dramáticamente con la decadencia que encuentra, pero también la preparan para su encuentro fatal con el destino familiar.",
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde42"),
    nombre: "El amor prohibido final",
    descripcion:
      "Amaranta Úrsula y Aureliano Babilonia se enamoran apasionadamente, sin conocer inicialmente su parentesco. Su relación amorosa marca el cumplimiento final de los patrones incestuosos que han marcado a la familia Buendía a lo largo de generaciones.",
    capitulo: 16,
    importancia: 10,
    tipo: "personal",
    fecha_narrativa: "final de la saga",
    personajes_involucrados: [
      ObjectId("64a1b2c3d4e5f6789abcde57"), // Amaranta Úrsula
      ObjectId("64a1b2c3d4e5f6789abcde59"), // Aureliano Babilonia
    ],
    localizaciones: [ObjectId("64a1b2c3d4e5f6789abcd104")], // Casa de los Buendía
    objetos_relacionados: [ObjectId("64a1b2c3d4e5f6789abcd205")], // Pergaminos (casi descifrados)
    simbolismo: ["incesto ancestral", "destino inevitable", "amor trágico"],
    consecuencias: ["concepción del último Buendía", "cumplimiento de la profecía"],
    palabras_clave: ["amor", "prohibido", "incesto", "amaranta úrsula", "aureliano babilonia", "destino"],
    texto_completo:
      "El amor entre Amaranta Úrsula y Aureliano Babilonia representa el cumplimiento inevitable del destino familiar. Su pasión, pura e intensa, está marcada por la tragedia del incesto que ha perseguido a los Buendía desde sus orígenes, cerrando el círculo profético de la estirpe.",
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde43"),
    nombre: "Muerte de Fernanda del Carpio",
    descripcion:
      "Fernanda del Carpio fallece sola y amargada, manteniendo su orgullo aristocrático hasta el final, marcando el fin de una era de rigidez y pretensiones nobiliarias en la casa de los Buendía",
    capitulo: 16,
    importancia: 7, // Escala 1-10
    tipo: "personal", // historico, personal, sobrenatural, social
    fecha_narrativa: "después del diluvio, aproximadamente 1920-1925", // Fecha dentro de la narrativa
    personajes_involucrados: [ObjectId("64a1b2c3d4e5f6789abcde54")], // Fernanda del Carpio
    localizaciones: [ObjectId("64a1b2c3d4e5f6789abcd104")],
    objetos_relacionados: [ObjectId("64a1b2c3d4e5f6789abcd205"), ObjectId("espejos_empañados")],
    simbolismo: ["fin de una era", "orgullo aristocrático", "soledad extrema", "muerte del pasado"],
    consecuencias: ["liberación de la casa de la rigidez aristocrática", "preparación para el regreso de Amaranta Úrsula", "eliminación del último obstáculo para la renovación"],
    contexto_previo: "Después del diluvio de cuatro años que purificó Macondo",
    contexto_posterior: "Su muerte prepara el escenario para el regreso de Amaranta Úrsula",
    palabras_clave: ["fernanda", "del carpio", "muerte", "soledad", "amargura", "orgullo", "aristocracia", "fin de era", "aislamiento"],
    texto_completo:
      "La muerte de Fernanda del Carpio representa el fin definitivo de las pretensiones aristocráticas en la casa de los Buendía. Muere sola y amargada, habiendo mantenido hasta el último momento su rigidez social y su desdén por las costumbres locales. Su fallecimiento, que ocurre después del gran diluvio purificador, simboliza la eliminación de los últimos vestigios del pasado que impedían la renovación de la familia. Fernanda, quien siempre se sintió superior a Macondo y a los Buendía, termina sus días en la misma soledad que caracteriza a todos los miembros de la familia, pero con la particularidad de que su soledad era autoimpuesta por su orgullo y prejuicios de clase.",
  }
]);

// ================================
// 3. INSERCIÓN DE PERSONAJES
// ================================

db.personajes.insertMany([
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde51"),
    nombre: "José Arcadio Segundo",
    apellido: "Buendía",
    generacion: 4,
    descripcion_fisica: "Alto, corpulento, con bigotes prominentes y manos grandes. Físicamente muy similar a su hermano gemelo pero con expresión más seria y determinada.",
    personalidad: ["determinado", "trabajador", "líder natural", "obsesivo", "guardián de la memoria", "solitario"],
    capitulos_aparicion: [13, 14, 15],
    eventos_principales: [
      ObjectId("64a1b2c3d4e5f6789abcde12"), // Transformación personal
      ObjectId("64a1b2c3d4e5f6789abcde21"), // Huelga bananera
      ObjectId("64a1b2c3d4e5f6789abcde22"), // Masacre
      ObjectId("64a1b2c3d4e5f6789abcde32"), // Su muerte
    ],
    relaciones: [
      {
        tipo: "hermano_gemelo",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde52"),
        descripcion: "Hermano gemelo de Aureliano Segundo, personalidades completamente opuestas",
      },
      {
        tipo: "bisnieto",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde53"),
        descripcion: "Bisnieto de Úrsula Iguarán, quien le transmitió valores de memoria familiar",
      },
    ],
    transformacion:
      "Evoluciona de capataz colaboracionista a líder obrero y finalmente a guardián solitario de la memoria histórica. Su arco narrativo representa el despertar de la conciencia social y el precio de mantener viva la verdad.",
    muerte: {
      capitulo: 15,
      circunstancias: "Muere en el cuarto de Melquíades durante el diluvio, obsesionado con descifrar los pergaminos hasta sus últimos momentos",
      simbolismo: "Muerte del testigo, fin de la memoria activa de la masacre",
    },
    simbolismo: ["memoria histórica", "testimonio", "resistencia", "soledad del testigo", "conciencia social"],
    palabras_clave: ["josé arcadio segundo", "gemelo", "huelga", "masacre", "testigo", "memoria", "trabajadores", "pergaminos"],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde52"),
    nombre: "Aureliano Segundo",
    apellido: "Buendía",
    generacion: 4,
    descripcion_fisica: "Idéntico físicamente a José Arcadio Segundo, pero con expresión más jovial y relajada. Tendencia al sobrepeso por sus excesos.",
    personalidad: ["hedonista", "generoso", "derrochador", "sociable", "amante de las fiestas", "irresponsable"],
    capitulos_aparicion: [13, 14, 15],
    eventos_principales: [
      ObjectId("64a1b2c3d4e5f6789abcde11"), // Época de la compañía bananera
      ObjectId("64a1b2c3d4e5f6789abcde32"), // Su muerte
    ],
    relaciones: [
      {
        tipo: "hermano_gemelo",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde51"),
        descripcion: "Hermano gemelo de José Arcadio Segundo, personalidades opuestas",
      },
      {
        tipo: "esposo",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde54"),
        descripcion: "Casado con Fernanda del Carpio, matrimonio deteriorado",
      },
      {
        tipo: "amante",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde60"),
        descripcion: "Relación prolongada con Petra Cotes",
      },
    ],
    transformacion: "Pasa de ser un hombre próspero y hedonista durante la época dorada a morir en la pobreza y el olvido, simbolizando el fin de la abundancia.",
    muerte: {
      capitulo: 15,
      circunstancias: "Muere el mismo día que su gemelo, empobrecido y sin recursos para su propio funeral",
      simbolismo: "Fin de la época de abundancia y excesos",
    },
    simbolismo: ["hedonismo", "abundancia perdida", "destino gemelar", "irresponsabilidad"],
    palabras_clave: ["aureliano segundo", "gemelo", "fiestas", "derroche", "petra cotes", "abundancia"],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde53"),
    nombre: "Úrsula",
    apellido: "Iguarán",
    generacion: 1,
    descripcion_fisica: "Mujer centenaria, casi completamente ciega, pero mantiene una energía y determinación notables a pesar de su edad avanzada.",
    personalidad: ["matriarcal", "sabia", "determinada", "protectora", "tradicionalista", "intuitiva"],
    capitulos_aparicion: [13, 14, 15],
    eventos_principales: [
      ObjectId("64a1b2c3d4e5f6789abcde31"), // El diluvio
    ],
    relaciones: [
      {
        tipo: "fundadora",
        personaje: "familia_buendia",
        descripcion: "Matriarca y fundadora de la dinastía Buendía",
      },
    ],
    transformacion: "En su vejez extrema, se convierte en la guardiana de las tradiciones familiares y la memoria ancestral, luchando contra la decadencia.",
    simbolismo: ["memoria ancestral", "tradición", "resistencia al cambio", "sabiduría matriarcal"],
    palabras_clave: ["úrsula", "matriarca", "centenaria", "tradición", "memoria", "familia"],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde54"),
    nombre: "Fernanda",
    apellido: "del Carpio",
    generacion: 4,
    descripcion_fisica: "Mujer de porte aristocrático, siempre impecablemente vestida según las modas de la capital, con gestos refinados pero rígidos.",
    personalidad: ["aristocrática", "rígida", "orgullosa", "conservadora", "amarga", "autoritaria"],
    capitulos_aparicion: [13, 14, 15, 16],
    eventos_principales: [
      ObjectId("64a1b2c3d4e5f6789abcde43"), // Su muerte (nuevo evento a crear)
    ],
    relaciones: [
      {
        tipo: "esposa",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde52"),
        descripcion: "Casada con Aureliano Segundo, matrimonio deteriorado por diferencias de clase y personalidad",
      },
      {
        tipo: "madre",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde57"),
        descripcion: "Madre de Amaranta Úrsula, relación tensa por diferencias generacionales",
      },
    ],
    transformacion: "Evoluciona de una aristocrática orgullosa a una mujer amargada y solitaria, aferrada a un pasado que ya no existe. Su rigidez la aísla completamente de la realidad de Macondo.",
    muerte: {
      capitulo: 16,
      circunstancias: "Muere sola y amargada, manteniendo su orgullo aristocrático hasta el final, sin haber logrado imponer su visión del mundo",
      simbolismo: "Muerte del orden aristocrático tradicional",
    },
    simbolismo: ["aristocracia decadente", "rigidez social", "aislamiento cultural", "resistencia al cambio"],
    palabras_clave: ["fernanda", "del carpio", "aristocrática", "rígida", "orgullosa", "conservadora", "capital"],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde55"),
    nombre: "Los Trabajadores Bananeros",
    apellido: "Colectivo",
    generacion: 4,
    descripcion_fisica: "Hombres curtidos por el trabajo bajo el sol, con manos callosas y rostros marcados por la fatiga. Visten ropas sencillas de trabajo, sombreros de palma.",
    personalidad: ["trabajadores", "dignos", "organizados", "valientes", "solidarios", "explotados"],
    capitulos_aparicion: [13, 14],
    eventos_principales: [
      ObjectId("64a1b2c3d4e5f6789abcde11"), // Llegada de la compañía
      ObjectId("64a1b2c3d4e5f6789abcde21"), // La huelga
      ObjectId("64a1b2c3d4e5f6789abcde22"), // La masacre
    ],
    relaciones: [
      {
        tipo: "liderazgo",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde51"),
        descripcion: "José Arcadio Segundo emerge como uno de sus líderes naturales",
      },
    ],
    transformacion: "Pasan de ser trabajadores individuales a organizarse como clase obrera consciente, culminando en la huelga y siendo eliminados física y simbólicamente.",
    muerte: {
      capitulo: 14,
      circunstancias: "Masacrados por el ejército en la estación del tren, sus cuerpos arrojados al mar",
      simbolismo: "Genocidio de la clase trabajadora, borrado de la historia",
    },
    simbolismo: ["clase obrera", "dignidad laboral", "resistencia popular", "víctimas del poder"],
    palabras_clave: ["trabajadores", "bananeros", "huelga", "masacre", "obreros", "explotación", "resistencia"],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde56"),
    nombre: "Los Soldados",
    apellido: "Ejército Nacional",
    generacion: 4,
    descripcion_fisica: "Hombres uniformados, armados, con expresiones duras y disciplinadas. Representan la fuerza bruta del Estado.",
    personalidad: ["obedientes", "disciplinados", "violentos", "represivos", "despiadados", "instrumentos del poder"],
    capitulos_aparicion: [14],
    eventos_principales: [
      ObjectId("64a1b2c3d4e5f6789abcde22"), // La masacre
    ],
    relaciones: [
      {
        tipo: "antagonistas",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde55"),
        descripcion: "Ejecutores de la represión contra los trabajadores",
      },
    ],
    transformacion: "Funcionan como brazo armado del Estado y los intereses extranjeros, sin cuestionamiento moral.",
    simbolismo: ["violencia estatal", "represión", "obediencia ciega", "poder militar"],
    palabras_clave: ["soldados", "ejército", "represión", "masacre", "violencia", "estado", "militar"],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde57"),
    nombre: "Amaranta Úrsula",
    apellido: "Buendía",
    generacion: 5,
    descripcion_fisica: "Joven hermosa, con energía vital y modernidad europea. Cabello rubio, ojos expresivos, porte elegante pero natural.",
    personalidad: ["enérgica", "moderna", "renovadora", "apasionada", "determinada", "vital"],
    capitulos_aparicion: [13, 16],
    eventos_principales: [
      ObjectId("64a1b2c3d4e5f6789abcde41"), // Su regreso
      ObjectId("64a1b2c3d4e5f6789abcde42"), // Amor con Aureliano Babilonia
    ],
    relaciones: [
      {
        tipo: "hija",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde54"),
        descripcion: "Hija de Fernanda del Carpio, personalidades completamente opuestas",
      },
      {
        tipo: "esposa",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde58"),
        descripcion: "Casada con Gastón, matrimonio moderno y libre",
      },
      {
        tipo: "amante",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde59"),
        descripcion: "Relación incestuosa con Aureliano Babilonia",
      },
    ],
    transformacion: "Evoluciona de esposa moderna europea a mujer que redescubre sus raíces familiares y cumple el destino trágico de los Buendía.",
    simbolismo: ["renovación", "energía vital", "modernidad", "amor trágico", "destino inevitable"],
    palabras_clave: ["amaranta úrsula", "europea", "moderna", "renovación", "amor", "incesto", "destino"],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde58"),
    nombre: "Gastón",
    apellido: "Aviador",
    generacion: 5,
    descripcion_fisica: "Hombre joven, atlético, con aspecto de aviador moderno. Rasgos europeos, vestimenta elegante y práctica.",
    personalidad: ["moderno", "práctico", "aventurero", "liberal", "comprensivo", "ajeno a Macondo"],
    capitulos_aparicion: [16],
    eventos_principales: [
      ObjectId("64a1b2c3d4e5f6789abcde41"), // Regreso con Amaranta Úrsula
    ],
    relaciones: [
      {
        tipo: "esposo",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde57"),
        descripcion: "Casado con Amaranta Úrsula, matrimonio moderno",
      },
    ],
    transformacion: "Representa la modernidad europea que intenta adaptarse a Macondo pero finalmente es rechazada por el destino familiar.",
    simbolismo: ["modernidad", "mundo exterior", "racionalidad", "progreso técnico"],
    palabras_clave: ["gastón", "aviador", "europeo", "moderno", "avión", "progreso", "extranjero"],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde59"),
    nombre: "Aureliano Babilonia",
    apellido: "Buendía",
    generacion: 6,
    descripcion_fisica: "Joven delgado, con rasgos delicados típicos de los Aurelianos. Mirada intensa y concentrada, manos manchadas de tinta.",
    personalidad: ["intelectual", "solitario", "obsesivo", "determinado", "apasionado", "destinado"],
    capitulos_aparicion: [16],
    eventos_principales: [
      ObjectId("64a1b2c3d4e5f6789abcde42"), // Amor con Amaranta Úrsula
    ],
    relaciones: [
      {
        tipo: "amante",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde57"),
        descripcion: "Relación incestuosa con Amaranta Úrsula, su tía",
      },
      {
        tipo: "heredero",
        personaje: ObjectId("64a1b2c3d4e5f6789abcde51"),
        descripcion: "Heredero intelectual de José Arcadio Segundo en el descifrado de pergaminos",
      },
    ],
    transformacion: "Evoluciona de estudioso solitario a amante apasionado y finalmente a descifrador del destino familiar.",
    simbolismo: ["último Aureliano", "sabiduría final", "amor trágico", "cumplimiento profético"],
    palabras_clave: ["aureliano babilonia", "último", "pergaminos", "amor", "incesto", "destino", "profecía"],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcde60"),
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
        personaje: ObjectId("64a1b2c3d4e5f6789abcde52"),
        descripcion: "Amante de larga duración de Aureliano Segundo",
      },
    ],
    transformacion: "Permanece como figura constante de vitalidad y generosidad, contrastando con la rigidez de Fernanda.",
    simbolismo: ["feminidad natural", "abundancia", "amor libre", "vitalidad"],
    palabras_clave: ["petra cotes", "amante", "abundancia", "vitalidad", "generosidad", "sensualidad"],
  },
]);

// ================================
// 4. INSERCIÓN DE LOCALIZACIONES
// ================================

db.localizaciones.insertMany([
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcd101"),
    nombre: "Estación del Tren",
    tipo: "infraestructura",
    descripcion:
      "Moderna estación ferroviaria construida por la compañía bananera. Centro neurálgico de la actividad económica y social de Macondo. Lugar donde convergen el progreso y la tragedia, simbolizando tanto la modernización como la represión.",
    capitulos_aparicion: [13, 14],
    eventos_importantes: [
      ObjectId("64a1b2c3d4e5f6789abcde11"), // Llegada de la compañía
      ObjectId("64a1b2c3d4e5f6789abcde21"), // La huelga
      ObjectId("64a1b2c3d4e5f6789abcde22"), // La masacre
    ],
    simbolismo: ["progreso", "modernización", "conexión con el mundo", "escenario de tragedia"],
    transformaciones: [
      {
        capitulo: 13,
        descripcion: "Construcción como símbolo de progreso y modernidad",
      },
      {
        capitulo: 14,
        descripcion: "Se convierte en escenario de la masacre, marcada para siempre por la sangre",
      },
    ],
    personajes_asociados: [
      ObjectId("64a1b2c3d4e5f6789abcde51"), // José Arcadio Segundo
      ObjectId("64a1b2c3d4e5f6789abcde55"), // Trabajadores bananeros
    ],
    palabras_clave: ["estación", "tren", "ferrocarril", "progreso", "masacre", "trabajadores", "huelga"],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcd102"),
    nombre: "Macondo",
    tipo: "pueblo",
    descripcion:
      "El pueblo mítico que sirve de escenario a toda la saga. Durante estos capítulos experimenta una transformación radical: de pueblo aislado y tradicional a centro de explotación bananera, luego a lugar de tragedia y olvido, y finalmente a espacio de decadencia y renacimiento.",
    capitulos_aparicion: [13, 14, 15, 16],
    eventos_importantes: [
      ObjectId("64a1b2c3d4e5f6789abcde11"), // Transformación por la compañía
      ObjectId("64a1b2c3d4e5f6789abcde23"), // Olvido colectivo
      ObjectId("64a1b2c3d4e5f6789abcde31"), // El diluvio
    ],
    simbolismo: ["microcosmos", "América Latina", "ciclos históricos", "memoria colectiva"],
    transformaciones: [
      {
        capitulo: 13,
        descripcion: "Modernización acelerada con calles pavimentadas, hoteles, población extranjera",
      },
      {
        capitulo: 14,
        descripcion: "Desarrollo de amnesia colectiva que niega la masacre",
      },
      {
        capitulo: 15,
        descripcion: "Inundación y decadencia durante el diluvio de cuatro años",
      },
      {
        capitulo: 16,
        descripcion: "Intento de renovación con el regreso de Amaranta Úrsula",
      },
    ],
    personajes_asociados: [
      ObjectId("64a1b2c3d4e5f6789abcde53"), // Úrsula (fundadora)
      ObjectId("64a1b2c3d4e5f6789abcde57"), // Amaranta Úrsula (renovadora)
    ],
    palabras_clave: ["macondo", "pueblo", "transformación", "modernización", "decadencia", "memoria", "olvido"],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcd103"),
    nombre: "Plantaciones Bananeras",
    tipo: "espacio_productivo",
    descripcion:
      "Extensas plantaciones de banano que rodean Macondo, organizadas según métodos industriales modernos. Representan la explotación económica sistemática y la transformación del paisaje natural en espacio de producción capitalista.",
    capitulos_aparicion: [13, 14],
    eventos_importantes: [
      ObjectId("64a1b2c3d4e5f6789abcde11"), // Establecimiento de la compañía
      ObjectId("64a1b2c3d4e5f6789abcde21"), // Origen de los conflictos laborales
    ],
    simbolismo: ["explotación", "colonialismo económico", "transformación del paisaje", "trabajo alienado"],
    transformaciones: [
      {
        capitulo: 13,
        descripcion: "Conversión de tierras tradicionales en monocultivo industrial",
      },
      {
        capitulo: 14,
        descripcion: "Escenario de conflictos laborales y explotación",
      },
    ],
    personajes_asociados: [
      ObjectId("64a1b2c3d4e5f6789abcde51"), // José Arcadio Segundo (capataz)
      ObjectId("64a1b2c3d4e5f6789abcde55"), // Trabajadores
    ],
    palabras_clave: ["plantaciones", "banano", "monocultivo", "explotación", "trabajo", "industrial"],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcd104"),
    nombre: "Casa de los Buendía",
    tipo: "hogar_familiar",
    descripcion:
      "La mansión familiar que funciona como microcosmos de la saga. Durante estos capítulos experimenta un deterioro acelerado, se llena de hongos durante el diluvio, y finalmente es objeto de intentos de renovación por parte de Amaranta Úrsula.",
    capitulos_aparicion: [13, 14, 15, 16],
    eventos_importantes: [
      ObjectId("64a1b2c3d4e5f6789abcde31"), // El diluvio
      ObjectId("64a1b2c3d4e5f6789abcde32"), // Muerte de los gemelos
      ObjectId("64a1b2c3d4e5f6789abcde41"), // Renovación por Amaranta Úrsula
      ObjectId("64a1b2c3d4e5f6789abcde42"), // Amor prohibido
    ],
    simbolismo: ["decadencia familiar", "memoria ancestral", "espacio de destino", "renovación imposible"],
    transformaciones: [
      {
        capitulo: 13,
        descripcion: "Inicio del deterioro y abandono progresivo",
      },
      {
        capitulo: 15,
        descripcion: "Invasión de hongos y vegetación acuática durante el diluvio",
      },
      {
        capitulo: 16,
        descripcion: "Intento de restauración y renovación arquitectónica",
      },
    ],
    personajes_asociados: [
      ObjectId("64a1b2c3d4e5f6789abcde53"), // Úrsula (guardiana)
      ObjectId("64a1b2c3d4e5f6789abcde57"), // Amaranta Úrsula (renovadora)
      ObjectId("64a1b2c3d4e5f6789abcde59"), // Aureliano Babilonia
    ],
    palabras_clave: ["casa", "mansión", "familia", "deterioro", "hongos", "renovación", "hogar"],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcd105"),
    nombre: "Cuarto de Melquíades",
    tipo: "espacio_sagrado",
    descripcion:
      "Habitación especial donde se conservan los pergaminos proféticos. Durante el diluvio es el único lugar que permanece seco, simbolizando la preservación del conocimiento ancestral. Lugar de refugio para José Arcadio Segundo y finalmente para Aureliano Babilonia.",
    capitulos_aparicion: [14, 15, 16],
    eventos_importantes: [
      ObjectId("64a1b2c3d4e5f6789abcde23"), // Refugio de José Arcadio Segundo
      ObjectId("64a1b2c3d4e5f6789abcde32"), // Muerte de José Arcadio Segundo
      ObjectId("64a1b2c3d4e5f6789abcde42"), // Descifrado final
    ],
    simbolismo: ["conocimiento ancestral", "refugio de la memoria", "espacio atemporal", "revelación final"],
    transformaciones: [
      {
        capitulo: 14,
        descripcion: "Se convierte en refugio de la memoria y la verdad negada",
      },
      {
        capitulo: 15,
        descripcion: "Único espacio que resiste la invasión del diluvio",
      },
      {
        capitulo: 16,
        descripcion: "Lugar del descifrado final de los pergaminos",
      },
    ],
    personajes_asociados: [
      ObjectId("64a1b2c3d4e5f6789abcde51"), // José Arcadio Segundo
      ObjectId("64a1b2c3d4e5f6789abcde59"), // Aureliano Babilonia
    ],
    palabras_clave: ["cuarto", "melquíades", "pergaminos", "refugio", "memoria", "conocimiento", "profecía"],
  },
]);

// ================================
// 5. INSERCIÓN DE OBJETOS
// ================================

db.objetos.insertMany([
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcd201"),
    nombre: "El Tren",
    tipo: "transporte",
    descripcion:
      "Locomotora y vagones del ferrocarril que conecta Macondo con el mundo exterior. Símbolo ambivalente del progreso que trae modernización pero también explotación y tragedia. Transporta mercancías, personas y finalmente cadáveres.",
    capitulos_aparicion: [13, 14],
    propietarios: [ObjectId("64a1b2c3d4e5f6789abcde011")], // Compañía bananera (a crear)
    ubicacion_fisica: "Estación del tren y vías férreas",
    simbolismo: ["progreso", "conexión mundial", "modernización", "vehículo de la tragedia"],
    transformaciones: [
      {
        capitulo: 13,
        descripcion: "Símbolo de progreso y modernización",
      },
      {
        capitulo: 14,
        descripcion: "Se convierte en heramienta para transportar cadáveres y ocultar la masacre",
      },
    ],
    importancia_narrativa: 9,
    palabras_clave: ["tren", "ferrocarril", "progreso", "modernización", "cadáveres", "transporte"],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcd202"),
    nombre: "Los Bananos",
    tipo: "producto",
    descripcion:
      "Fruta tropical que se convierte en el centro de la economía de Macondo. Representa la transformación de un recurso natural en mercancía de exportación y símbolo de la explotación económica internacional.",
    capitulos_aparicion: [13, 14],
    propietarios: [ObjectId("64a1b2c3d4e5f6789abcde011")], // Compañía bananera
    ubicacion_fisica: "Plantaciones y centros de procesamiento",
    simbolismo: ["explotación económica", "colonialismo", "monocultivo", "mercancía"],
    transformaciones: [
      {
        capitulo: 13,
        descripcion: "De fruta local a producto de exportación masiva",
      },
      {
        capitulo: 14,
        descripcion: "Símbolo de la explotación que genera conflictos sociales",
      },
    ],
    importancia_narrativa: 8,
    palabras_clave: ["bananos", "fruta", "exportación", "monocultivo", "explotación", "economía"],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcd203"),
    nombre: "Los Vagones con Cadáveres",
    tipo: "transporte_macabro",
    descripcion:
      "Vagones del tren utilizados para transportar los cuerpos de los trabajadores masacrados hacia el mar. Representan la eliminación física de la evidencia y el intento de borrar la memoria histórica.",
    capitulos_aparicion: [14],
    propietarios: [ObjectId("64a1b2c3d4e5f6789abcde56")], // Los soldados/Estado
    ubicacion_fisica: "Tren hacia el mar",
    simbolismo: ["eliminación de evidencia", "borrado de memoria", "genocidio", "encubrimiento"],
    transformaciones: [
      {
        capitulo: 14,
        descripcion: "Conversión de transporte comercial en instrumento de encubrimiento",
      },
    ],
    importancia_narrativa: 10,
    palabras_clave: ["vagones", "cadáveres", "masacre", "encubrimiento", "mar", "evidencia"],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcd204"),
    nombre: "Los Hongos",
    tipo: "elemento_natural",
    descripcion:
      "Hongos que invaden la casa de los Buendía durante el diluvio. Crecen en paredes, muebles y rincones, simbolizando la decadencia, la humedad destructiva y la muerte que se apodera de la familia.",
    capitulos_aparicion: [15],
    propietarios: [], // Pertenecen a la naturaleza
    ubicacion_fisica: "Casa de los Buendía",
    simbolismo: ["decadencia", "muerte", "descomposición", "naturaleza que reclama"],
    transformaciones: [
      {
        capitulo: 15,
        descripcion: "Invasión gradual de todos los espacios domésticos",
      },
    ],
    importancia_narrativa: 7,
    palabras_clave: ["hongos", "decadencia", "humedad", "invasión", "descomposición", "naturaleza"],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcd205"),
    nombre: "Pergaminos de Melquíades",
    tipo: "manuscrito_profético",
    descripcion:
      "Manuscritos antiguos que contienen la historia completa de la familia Buendía escrita con anticipación. Representan el destino prefijado, la circularidad del tiempo y la sabiduría ancestral que finalmente será descifrada.",
    capitulos_aparicion: [14, 15, 16],
    propietarios: [
      ObjectId("64a1b2c3d4e5f6789abcde51"), // José Arcadio Segundo (guardián)
      ObjectId("64a1b2c3d4e5f6789abcde59"), // Aureliano Babilonia (descifrador)
    ],
    ubicacion_fisica: "Cuarto de Melquíades",
    simbolismo: ["destino", "profecía", "circularidad temporal", "sabiduría ancestral"],
    transformaciones: [
      {
        capitulo: 14,
        descripcion: "Objeto de obsesión para José Arcadio Segundo",
      },
      {
        capitulo: 15,
        descripcion: "Resisten milagrosamente la humedad del diluvio",
      },
      {
        capitulo: 16,
        descripcion: "Cerca de ser completamente descifrados por Aureliano Babilonia",
      },
    ],
    importancia_narrativa: 10,
    palabras_clave: ["pergaminos", "melquíades", "profecía", "destino", "descifrado", "tiempo", "circular"],
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcd206"),
    nombre: "El Avión de Gastón",
    tipo: "aeronave",
    descripcion:
      "Avión privado que representa la modernidad técnica europea y la conexión con el mundo exterior. Símbolo de progreso racional y científico que contrasta con el mundo mágico de Macondo.",
    capitulos_aparicion: [16],
    propietarios: [ObjectId("64a1b2c3d4e5f6789abcde58")], // Gastón
    ubicacion_fisica: "Hangar construido en Macondo",
    simbolismo: ["modernidad", "progreso técnico", "racionalidad", "mundo exterior"],
    transformaciones: [
      {
        capitulo: 16,
        descripcion: "De símbolo de modernidad a objeto abandonado",
      },
    ],
    importancia_narrativa: 6,
    palabras_clave: ["avión", "gastón", "modernidad", "técnica", "progreso", "hangar", "aviación"],
  },
]);

// ================================
// 6. INSERCIÓN DE SUEÑOS Y VISIONES
// ================================

db.suenos_visiones.insertMany([
  {
    _id: ObjectId(),
    soñador: "ursula_iguaran", // REFERENCIA: ObjectId del personaje Úrsula Iguarán
    tipo: "premonicion",
    capitulo: 13,
    descripcion: "Úrsula tiene premoniciones sobre la llegada de cambios destructivos al pueblo",
    interpretacion: "Anticipación de la transformación violenta que traerá la compañía bananera",
    elementos_simbolicos: ["extranjeros", "máquinas", "destrucción", "oro falso"],
    cumplimiento: "Se cumple con la llegada de la United Fruit Company",
    palabras_clave: ["premonición", "cambios", "extranjeros", "destrucción", "ursula"],
  },
  {
    _id: ObjectId(),
    soñador: "jose_arcadio_segundo", // REFERENCIA: ObjectId del personaje José Arcadio Segundo
    tipo: "vision_traumática",
    capitulo: 14,
    descripcion: "Visiones recurrentes de la masacre de los trabajadores bananeros",
    interpretacion: "Trauma post-masacre, obsesión por mantener viva la memoria",
    elementos_simbolicos: ["sangre", "tren", "muerte", "olvido colectivo"],
    cumplimiento: "Se manifiesta en su aislamiento y obsesión con la verdad",
    palabras_clave: ["visión", "masacre", "trauma", "memoria", "trabajadores"],
  },
  {
    _id: ObjectId(),
    soñador: "aureliano_segundo", // REFERENCIA: ObjectId del personaje Aureliano Segundo
    tipo: "pesadilla",
    capitulo: 15,
    descripcion: "Pesadillas sobre ahogarse en un mar de billetes que se convierten en hojas secas",
    interpretacion: "Premonición de su ruina económica y muerte durante el diluvio",
    elementos_simbolicos: ["billetes", "hojas secas", "agua", "abundancia perdida"],
    cumplimiento: "Muere empobrecido durante el diluvio",
    palabras_clave: ["pesadilla", "ruina", "billetes", "muerte", "abundancia"],
  },
  {
    _id: ObjectId(),
    soñador: "fernanda_del_carpio", // REFERENCIA: ObjectId del personaje Fernanda del Carpio
    tipo: "sueño_nostálgico",
    capitulo: 15,
    descripcion: "Sueña repetidamente con su ciudad natal y su juventud aristocrática",
    interpretacion: "Refugio mental ante la decadencia y el aislamiento",
    elementos_simbolicos: ["palacio", "juventud", "esplendor", "pureza"],
    cumplimiento: "Muere aferrada a sus recuerdos aristocráticos",
    palabras_clave: ["nostalgia", "aristocracia", "juventud", "palacio", "pureza"],
  },
  {
    _id: ObjectId(),
    soñador: "amaranta_ursula", // REFERENCIA: ObjectId del personaje Amaranta Úrsula
    tipo: "sueño_profético",
    capitulo: 16,
    descripcion: "Sueña con restaurar la casa familiar y devolverle su antiguo esplendor",
    interpretacion: "Deseo de renovación familiar que está destinado al fracaso",
    elementos_simbolicos: ["casa renovada", "jardines", "flores", "raíces"],
    cumplimiento: "Intenta restaurar la casa pero los patrones familiares se repiten",
    palabras_clave: ["restauración", "renovación", "casa", "jardines", "esperanza"],
  },
  {
    _id: ObjectId(),
    soñador: "aureliano_babilonia", // REFERENCIA: ObjectId del personaje Aureliano Babilonia
    tipo: "vision_profética",
    capitulo: 16,
    descripción: "Visiones sobre el contenido de los pergaminos mientras los descifra",
    interpretacion: "Revelación gradual del destino familiar",
    elementos_simbolicos: ["pergaminos", "escritura", "espejo", "futuro"],
    cumplimiento: "Logra descifrar completamente los pergaminos",
    palabras_clave: ["visión", "pergaminos", "destino", "descifrar", "futuro"],
  },
]);

// 7. COLECCIÓN: parejas_relaciones
db.parejas_relaciones.insertMany([
  {
    _id: ObjectId(),
    personaje1: "jose_arcadio_segundo", // REFERENCIA: ObjectId del personaje José Arcadio Segundo
    personaje2: "aureliano_segundo", // REFERENCIA: ObjectId del personaje Aureliano Segundo
    tipo_relacion: "hermanos_gemelos",
    capitulo_inicio: 13,
    descripcion: "Hermanos gemelos con personalidades completamente opuestas que se van diferenciando más con el tiempo",
    obstaculos: ["personalidades opuestas", "diferentes intereses", "conflictos ideológicos"],
    simbolismo: ["dualidad", "destinos paralelos", "soledad fraternal"],
    consecuencias: ["mueren el mismo día", "representan dos caminos de los Buendía"],
    palabras_clave: ["gemelos", "hermanos", "opuestos", "dualidad", "destino"],
  },
  {
    _id: ObjectId(),
    personaje1: "aureliano_segundo", // REFERENCIA: ObjectId del personaje Aureliano Segundo
    personaje2: "petra_cotes", // REFERENCIA: ObjectId del personaje Petra Cotes
    tipo_relacion: "amantes",
    capitulo_inicio: 13,
    descripcion: "Relación pasional y hedonista basada en el desenfreno y la abundancia",
    obstaculos: ["matrimonio con Fernanda", "diferencias sociales"],
    simbolismo: ["pasión desenfrenada", "abundancia material", "escape de la realidad"],
    consecuencias: ["deterioro del matrimonio con Fernanda", "ruina económica"],
    palabras_clave: ["amantes", "pasión", "abundancia", "desenfreno", "petra"],
  },
  {
    _id: ObjectId(),
    personaje1: "aureliano_segundo", // REFERENCIA: ObjectId del personaje Aureliano Segundo
    personaje2: "fernanda_del_carpio", // REFERENCIA: ObjectId del personaje Fernanda del Carpio
    tipo_relacion: "matrimonio_deteriorado",
    capitulo_inicio: 13,
    descripcion: "Matrimonio marcado por la incompatibilidad, el resentimiento y la distancia emocional",
    obstaculos: ["infidelidades", "diferencias de clase", "orgullo mutuo"],
    simbolismo: ["fracaso del amor burgués", "aislamiento", "orgullo destructivo"],
    consecuencias: ["separación emocional", "amargura", "soledad compartida"],
    palabras_clave: ["matrimonio", "deteriorado", "resentimiento", "orgullo", "fernanda"],
  },
  {
    _id: ObjectId(),
    personaje1: "amaranta_ursula", // REFERENCIA: ObjectId del personaje Amaranta Úrsula
    personaje2: "gaston", // REFERENCIA: ObjectId del personaje Gastón
    tipo_relacion: "matrimonio_moderno",
    capitulo_inicio: 16,
    descripcion: "Matrimonio europeo moderno basado en la companía intelectual y los intereses comunes",
    obstaculos: ["distancia geográfica", "diferencias culturales"],
    simbolismo: ["modernidad europea", "amor racional", "progreso"],
    consecuencias: ["Gastón se va", "Amaranta Úrsula queda libre para su destino"],
    palabras_clave: ["matrimonio", "moderno", "europeo", "racional", "gaston"],
  },
  {
    _id: ObjectId(),
    personaje1: "amaranta_ursula", // REFERENCIA: ObjectId del personaje Amaranta Úrsula
    personaje2: "aureliano_babilonia", // REFERENCIA: ObjectId del personaje Aureliano Babilonia
    tipo_relacion: "amor_prohibido",
    capitulo_inicio: 16,
    descripcion: "Amor pasional e incestuoso entre tía y sobrino que representa la culminación del destino familiar",
    obstaculos: ["parentesco", "matrimonio previo", "destino trágico"],
    simbolismo: ["incesto", "destino familiar", "amor imposible", "fin de la estirpe"],
    consecuencias: ["nacimiento del último Buendía", "muerte de Amaranta Úrsula", "fin de la familia"],
    palabras_clave: ["amor", "prohibido", "incesto", "destino", "pasión", "fin"],
  },
  {
    _id: ObjectId(),
    personaje1: "jose_arcadio_segundo", // REFERENCIA: ObjectId del personaje José Arcadio Segundo
    personaje2: "trabajadores_bananeros", // REFERENCIA: ObjectId de la colección de trabajadores (grupo)
    tipo_relacion: "solidaridad_laboral",
    capitulo_inicio: 14,
    descripcion: "Relación de solidaridad y liderazgo con los trabajadores durante la huelga",
    obstaculos: ["represión", "miedo", "olvido colectivo"],
    simbolismo: ["lucha de clases", "memoria histórica", "resistencia"],
    consecuencias: ["masacre de trabajadores", "aislamiento de José Arcadio Segundo"],
    palabras_clave: ["solidaridad", "trabajadores", "huelga", "liderazgo", "resistencia"],
  },
]);

// 8. COLECCIÓN: simbolos_temas
db.simbolos_temas.insertMany([
  {
    _id: ObjectId(),
    nombre: "La compañía bananera",
    tipo: "símbolo_histórico",
    capitulos_aparicion: [13, 14],
    interpretaciones: ["Imperialismo económico", "Explotación colonial", "Progreso destructivo", "Pérdida de identidad cultural"],
    elementos_asociados: ["tren", "extranjeros", "modernización", "explotación"],
    personajes_afectados: ["jose_arcadio_segundo", "trabajadores_bananeros", "macondo"], // REFERENCIAS a ObjectIds
    eventos_relacionados: ["llegada_compañia_bananera", "huelga_trabajadores", "masacre_estacion"], // REFERENCIAS a ObjectIds de eventos
    palabras_clave: ["compañía", "bananera", "imperialismo", "explotación", "progreso"],
  },
  {
    _id: ObjectId(),
    nombre: "La masacre olvidada",
    tipo: "símbolo_político",
    capitulos_aparicion: [14],
    interpretaciones: ["Manipulación de la historia oficial", "Amnesia colectiva impuesta", "Negación de la violencia estatal", "Resistencia de la memoria individual"],
    elementos_asociados: ["tres mil muertos", "tren", "documentos oficiales", "olvido"],
    personajes_afectados: ["jose_arcadio_segundo", "trabajadores_bananeros", "pueblo_macondo"], // REFERENCIAS a ObjectIds
    eventos_relacionados: ["masacre_trabajadores", "olvido_colectivo"], // REFERENCIAS a ObjectIds de eventos
    palabras_clave: ["masacre", "olvido", "memoria", "historia", "oficial", "tres mil"],
  },
  {
    _id: ObjectId(),
    nombre: "El diluvio",
    tipo: "símbolo_natural",
    capitulos_aparicion: [15],
    interpretaciones: ["Purificación bíblica", "Castigo divino por los pecados", "Renovación cíclica de la naturaleza", "Destrucción necesaria para el renacimiento"],
    elementos_asociados: ["lluvia interminable", "inundación", "hongos", "decadencia"],
    personajes_afectados: ["todos_los_buendia", "macondo_completo"], // REFERENCIAS a ObjectIds
    eventos_relacionados: ["muerte_gemelos", "deterioro_casa", "fin_epoca_dorada"], // REFERENCIAS a ObjectIds de eventos
    palabras_clave: ["diluvio", "lluvia", "purificación", "castigo", "renovación", "cuatro años"],
  },
  {
    _id: ObjectId(),
    nombre: "Los pergaminos de Melquíades",
    tipo: "símbolo_místico",
    capitulos_aparicion: [13, 14, 15, 16],
    interpretaciones: ["Destino familiar predeterminado", "Sabiduría ancestral oculta", "Profecía autocumplida", "Círculo temporal infinito"],
    elementos_asociados: ["escritura sánscrita", "espejo", "profecía", "tiempo"],
    personajes_afectados: ["jose_arcadio_segundo", "aureliano_babilonia"], // REFERENCIAS a ObjectIds
    eventos_relacionados: ["desciframiento_pergaminos", "revelacion_destino"], // REFERENCIAS a ObjectIds de eventos
    palabras_clave: ["pergaminos", "melquíades", "destino", "profecía", "sabiduría", "ancestral"],
  },
  {
    _id: ObjectId(),
    nombre: "La soledad",
    tipo: "tema_existencial",
    capitulos_aparicion: [13, 14, 15, 16],
    interpretaciones: ["Condición existencial de los Buendía", "Aislamiento emocional y social", "Incapacidad para el amor verdadero", "Destino inevitable de la estirpe"],
    elementos_asociados: ["aislamiento", "incomunicación", "destino", "repetición"],
    personajes_afectados: ["todos_los_buendia"], // REFERENCIA a ObjectIds de todos los Buendía
    eventos_relacionados: ["todos_los_eventos_familiares"], // REFERENCIA general a eventos
    palabras_clave: ["soledad", "aislamiento", "incomunicación", "destino", "buendía"],
  },
  {
    _id: ObjectId(),
    nombre: "El tiempo cíclico",
    tipo: "tema_temporal",
    capitulos_aparicion: [13, 14, 15, 16],
    interpretaciones: ["Historia que se repite en espirales", "Eterno retorno de los patrones", "Imposibilidad de escape del destino", "Circularidad mítica del tiempo"],
    elementos_asociados: ["repetición", "nombres", "patrones", "espejo"],
    personajes_afectados: ["generaciones_buendia"], // REFERENCIA a ObjectIds de múltiples generaciones
    eventos_relacionados: ["patrones_repetitivos_familiares"], // REFERENCIA general a eventos cíclicos
    palabras_clave: ["tiempo", "cíclico", "repetición", "patrones", "eterno", "retorno"],
  },
  {
    _id: ObjectId(),
    nombre: "La casa Buendía",
    tipo: "símbolo_espacial",
    capitulos_aparicion: [13, 14, 15, 16],
    interpretaciones: ["Microcosmos de Macondo", "Espejo de la decadencia familiar", "Refugio y prisión simultánea", "Testimonio físico de la historia"],
    elementos_asociados: ["deterioro", "renovación", "memoria", "refugio"],
    personajes_afectados: ["todos_los_buendia"], // REFERENCIA a ObjectIds de todos los Buendía
    eventos_relacionados: ["deterioro_casa", "renovacion_amaranta_ursula"], // REFERENCIAS a ObjectIds de eventos
    palabras_clave: ["casa", "buendía", "deterioro", "renovación", "microcosmos", "refugio"],
  },
  {
    _id: ObjectId(),
    nombre: "El progreso destructor",
    tipo: "tema_social",
    capitulos_aparicion: [13, 14],
    interpretaciones: ["Modernización que destruye tradiciones", "Colonialismo cultural y económico", "Falso desarrollo impuesto", "Pérdida de la identidad local"],
    elementos_asociados: ["tren", "modernización", "extranjeros", "explotación"],
    personajes_afectados: ["macondo_completo", "trabajadores"], // REFERENCIAS a ObjectIds
    eventos_relacionados: ["llegada_compañia", "transformacion_macondo"], // REFERENCIAS a ObjectIds de eventos
    palabras_clave: ["progreso", "destructor", "modernización", "tradiciones", "identidad"],
  },
  {
    _id: ObjectId(),
    nombre: "La memoria vs el olvido",
    tipo: "tema_cognitivo",
    capitulos_aparicion: [14, 15],
    interpretaciones: ["Lucha entre recordar y olvidar", "Memoria individual vs amnesia colectiva", "Resistencia ante la historia oficial", "Preservación de la verdad"],
    elementos_asociados: ["testimonio", "olvido colectivo", "verdad", "resistencia"],
    personajes_afectados: ["jose_arcadio_segundo", "pueblo_macondo"], // REFERENCIAS a ObjectIds
    eventos_relacionados: ["masacre_trabajadores", "olvido_colectivo"], // REFERENCIAS a ObjectIds de eventos
    palabras_clave: ["memoria", "olvido", "verdad", "testimonio", "resistencia", "historia"],
  },
]);
