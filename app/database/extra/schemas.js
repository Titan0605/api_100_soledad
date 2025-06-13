// ================================
// ESQUEMAS DE MONGODB PARA CIEN AÑOS DE SOLEDAD
// ================================

// 1. COLECCIÓN: capitulos
const capituloSchema = {
  _id: ObjectId,
  numero: 13, // 13, 14, 15, 16
  titulo: "La llegada de la compañía bananera",
  resumen: "Descripción general del capítulo...",
  temas_principales: ["progreso destructivo", "explotación económica", "transformación cultural"],
  importancia: 8, // Escala 1-10 para ranking de relevancia
  palabras_clave: ["compañía bananera", "modernización", "tren", "extranjeros"],
  fecha_creacion: new Date(),
  eventos_relacionados: [ObjectId("evento1"), ObjectId("evento2")] // Referencias a eventos
};

// 2. COLECCIÓN: eventos
const eventoSchema = {
  _id: ObjectId,
  nombre: "Llegada de la compañía bananera",
  descripcion: "La United Fruit Company establece operaciones en Macondo, transformando radicalmente el pueblo",
  capitulo: 13,
  importancia: 9, // Escala 1-10
  tipo: "historico", // historico, personal, sobrenatural, social
  fecha_narrativa: "aproximadamente 1915", // Fecha dentro de la narrativa
  personajes_involucrados: [ObjectId("jose_arcadio_segundo"), ObjectId("aureliano_segundo")],
  localizaciones: [ObjectId("estacion_tren"), ObjectId("macondo")],
  objetos_relacionados: [ObjectId("tren"), ObjectId("bananos")],
  simbolismo: ["progreso destructivo", "colonialismo económico"],
  consecuencias: ["transformación del pueblo", "conflictos laborales"],
  palabras_clave: ["compañía", "bananera", "modernización", "tren", "extranjeros", "progreso"],
  texto_completo: "Descripción extensa del evento para búsquedas de texto completo..."
};

// 3. COLECCIÓN: personajes
const personajeSchema = {
  _id: ObjectId,
  nombre: "José Arcadio Segundo",
  apellido: "Buendía",
  generacion: 4, // Cuarta generación de Buendía
  descripcion_fisica: "Alto, corpulento, con bigote característico",
  personalidad: ["determinado", "trabajador", "testigo de la verdad"],
  capitulos_aparicion: [13, 14, 15],
  eventos_principales: [ObjectId("huelga_bananera"), ObjectId("masacre_trabajadores")],
  relaciones: [
    {
      tipo: "hermano_gemelo",
      personaje: ObjectId("aureliano_segundo"),
      descripcion: "Hermano gemelo, personalidades opuestas"
    }
  ],
  transformacion: "De capataz de la compañía a guardián de la memoria histórica",
  muerte: {
    capitulo: 15,
    circunstancias: "Muere en el cuarto de Melquíades durante el diluvio",
    simbolismo: "Muerte del testigo de la verdad"
  },
  simbolismo: ["memoria histórica", "testimonio", "resistencia"],
  palabras_clave: ["josé arcadio segundo", "gemelo", "huelga", "masacre", "testigo", "memoria"]
};

// 4. COLECCIÓN: localizaciones
const localizacionSchema = {
  _id: ObjectId,
  nombre: "Estación del tren",
  tipo: "construcción", // construcción, natural, mítica
  descripcion: "Nueva estación ferroviaria construida por la compañía bananera",
  capitulos_aparicion: [13, 14],
  eventos_importantes: [ObjectId("llegada_tren"), ObjectId("masacre_trabajadores")],
  simbolismo: ["progreso", "modernidad", "conexión exterior", "violencia"],
  transformaciones: [
    {
      capitulo: 13,
      estado: "construcción nueva, símbolo de progreso"
    },
    {
      capitulo: 14,
      estado: "escenario de la masacre de trabajadores"
    }
  ],
  personajes_asociados: [ObjectId("jose_arcadio_segundo"), ObjectId("trabajadores")],
  palabras_clave: ["estación", "tren", "ferrocarril", "masacre", "trabajadores"]
};

// 5. COLECCIÓN: objetos
const objetoSchema = {
  _id: ObjectId,
  nombre: "Los pergaminos de Melquíades",
  tipo: "mágico", // mágico, cotidiano, simbólico
  descripcion: "Manuscritos proféticos que contienen la historia de la familia Buendía",
  capitulos_aparicion: [13, 14, 15, 16],
  propietarios: [ObjectId("melquiades"), ObjectId("jose_arcadio_segundo"), ObjectId("aureliano_babilonia")],
  ubicacion_fisica: "Cuarto de Melquíades",
  simbolismo: ["destino", "profecía", "verdad oculta", "sabiduría ancestral"],
  transformaciones: [
    {
      capitulo: 15,
      estado: "se deterioran con la humedad del diluvio"
    },
    {
      capitulo: 16,
      estado: "casi completamente descifrados"
    }
  ],
  importancia_narrativa: 10,
  palabras_clave: ["pergaminos", "melquíades", "profecía", "destino", "familia", "descifrar"]
};

// 6. COLECCIÓN: sueños_visiones
const sueñoSchema = {
  _id: ObjectId,
  soñador: ObjectId("ursula_iguaran"),
  tipo: "premonición", // premonición, pesadilla, visión, sueño_profético
  capitulo: 15,
  descripcion: "Úrsula sueña con la decadencia inevitable de la familia",
  interpretacion: "Premonición del fin de los Buendía",
  elementos_simbolicos: ["casa en ruinas", "soledad", "olvido"],
  cumplimiento: "Se cumple gradualmente a lo largo de los capítulos",
  palabras_clave: ["sueño", "premonición", "decadencia", "familia", "ruinas"]
};

// 7. COLECCIÓN: parejas_relaciones
const relacionSchema = {
  _id: ObjectId,
  personaje1: ObjectId("amaranta_ursula"),
  personaje2: ObjectId("aureliano_babilonia"),
  tipo_relacion: "amor_prohibido", // amor_prohibido, matrimonio, amistad, enemistad
  capitulo_inicio: 16,
  descripcion: "Amor pasional entre tía y sobrino, repitiendo patrones familiares",
  obstaculos: ["parentesco", "matrimonio previo de Amaranta Úrsula"],
  simbolismo: ["incesto", "destino familiar", "amor imposible"],
  consecuencias: ["continuación del patrón familiar", "soledad perpetua"],
  palabras_clave: ["amor", "prohibido", "incesto", "amaranta", "aureliano", "pasión"]
};

// 8. COLECCIÓN: símbolos_temas
const simboloSchema = {
  _id: ObjectId,
  nombre: "El diluvio",
  tipo: "símbolo_natural",
  capitulos_aparicion: [15],
  interpretaciones: [
    "Purificación bíblica",
    "Castigo divino",
    "Renovación cíclica",
    "Destrucción necesaria"
  ],
  elementos_asociados: ["lluvia", "inundación", "hongos", "decadencia"],
  personajes_afectados: ["todos los Buendía", "Macondo completo"],
  eventos_relacionados: [ObjectId("muerte_gemelos"), ObjectId("deterioro_casa")],
  palabras_clave: ["diluvio", "lluvia", "purificación", "castigo", "renovación"]
};