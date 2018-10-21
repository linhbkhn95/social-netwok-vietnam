// var elasticsearch = require('elasticsearch');
// var client = new elasticsearch.Client({
//   host: 'localhost:9200',
//   log: 'trace'
// });

// module.exports ={
//     search:async function(){
//       const response = await client.search({
//         index: 'post',
//         type: 'post',
//         body: {
//           query: {
//             match_all: {
//               // body: 'elasticsearch'
//             }
//           }
//         }
//       })

//       for (const post of response.hits.hits) {
//         console.log('post:', post);
//       }
//     },
//     add: async function(index,type,data){
//        client.index({
//         index: index,
//         id: data.id,
//         type: type,
//         body:JSON.stringify(data)
//   }, function(err, resp, status) {
//       console.log(resp);
//   });
// }
// }
