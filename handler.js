'use strict';

const { ApolloServer, gql } = require('apollo-server-lambda'); 
const whatsappResolvers = require('./apollo-resolvers/whatsapp-request-resolvers'); 
// const mysql = require('mysql'); 
 
// This is a (sample) collection of books we'll be able to query 
// the GraphQL server for.  A more complete example might fetch 
// from an existing data source like a REST API or database. 
const books = [ 
  { 
    title: 'Harry Potter and the Chamber of Secrets', 
    author: 'J.K. Rowling', 
  }, 
  { 
    title: 'Jurassic Park', 
    author: 'Michael Crichton', 
  }, 
]; 
 
// Type definitions define the "shape" of your data and specify 
// which ways the data can be fetched from the GraphQL server. 
const typeDefs = gql` 
  # Comments in GraphQL are defined with the hash (#) symbol. 
 
  # This "Book" type can be used in other type declarations. 
  type Book { 
    title: String 
    author: String 
  } 
 
  # This is the property schema 
  type Property { 
    propiedad: Int 
    messageid: Int 
    empresa: Int 
    activa: Int 
    revisada: Int 
    id_repetida: Int 
    disponible: Int 
    disponible_fecha: String 
    publicable: Int 
    titulo: String 
    tipo: Int 
    tipopropiedad: String 
    tipo_grupo_slug: String 
    tipo_grupo_id: Int 
    dias_disp: Int 
    simbolo_moneda_venta: String 
    simbolo_moneda_alquiler: String 
    property_link: String 
    picture: String 
    sector: String 
    seguridad: Int 
    asesor: Int 
    direccion: String 
    zona: String 
    colonia: String 
    municipio: String 
    departamento: String 
    alquiler: Int 
    precioalquiler: Int 
    precioalquilermoneda: Int 
    venta: Int 
    precioventa: Int 
    precioventamoneda: Int 
    fechaupdate: String 
    fechaingreso: String 
    cliente: Int 
    fechaficha: String 
    foto: Int 
    colega: Int 
    fromemail: Int 
    inmaillist: Int 
    from_site: Int 
    prop_ext: Int 
    verificada: Int 
    corredores: Int 
    info: String 
    infotips: String 
    notas_internas: String 
    habitaciones: Int 
    banios: String 
    mediosbanios: String 
    parqueostechados: Int 
    parqueostotales: Int 
    construccionmedida: Int 
    construccion: Float 
    frente: String 
    fondo: String 
    salafam: String 
    cuartoservicio: String 
    estudio: String 
    terrenoareamedida: Int 
    terrenoarea: Float 
    topografia: String 
    ambientes: Int 
    codigo: Int 
    referido: Int 
    notasreferido: String 
    solo50: Int 
    potg: String 
} 
 
  # The "Query" type is the root of all GraphQL queries. 
  # (A "Mutation" type will be covered later on.) 
  type Query { 
    books: [Book],  
    whatsappRequest(id: String): [Property] 
    hello(name: String, id: String): [Property] 
  } 
`; 
const wr = 'Hello World'; 
 
let pool = null; 
/** 
 * This function is used to create a new pool if the created pool have been deleted 
 * @returns {*} 
 */ 
const createDatabasePool = ()=> { 
    if (pool === null || pool === undefined || pool === 'undefined') { 
      pool = mysql.createPool({ 
        'host': process.env.DATABASE_HOST, 
        'user': process.env.DATABASE_USER, 
        'password': process.env.DATABASE_PASSWORD, 
        'database': process.env.DATABASE_NAME 
      }); 
    } 
    console.log('After the pool creation'); 
    return pool; 
  }; 
 
 
// Resolvers define the technique for fetching the types in the 
// schema.  We'll retrieve books from the "books" array above. 
const resolvers = { 
  Query: { 
    books: () => books, 
    // whatsappRequest: async (parent, args, context, info) => { 
    //   createDatabasePool(); 
    //   return await whatsappResolvers.getWhatsappProperties(pool, args) 
    // }, 
    // hello: async (parent, args, context, info) => { 
    //   createDatabasePool(); 
 
    // } 
  }, 
}; 
 
// In the most basic sense, the ApolloServer can be started 
// by passing type definitions (typeDefs) and the resolvers 
// responsible for fetching the data for those types. 
const server = new ApolloServer({ typeDefs, resolvers }); 
 
exports.graphqlHandler = server.createHandler({ 
  cors: { 
    origin: "*" 
  } 
}); 
