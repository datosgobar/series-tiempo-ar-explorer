import SerieApi from "./api/SerieApi";

const api = SerieApi.withUri("http://apis.datos.gob.ar/series/api/series");


// const delay = 2000;
// const api = {
//     getSeries: (ids: string[]) => 
//                     new Promise((resolve, reject) => 
//                         {
//                             setTimeout(resolve, delay, ids.map(toSerie))
//                         }
//                     )
// };


// function toSerie(id: string) {
//     return {
//         description: 'description' + id,
//         id,
//         publisher: { mbox: 'mail' + id, name: 'publi' + id },
//         title: 'title' + id,
//     }
// }

export default api;
