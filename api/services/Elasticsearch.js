var elasticsearch = require("elasticsearch");
var client = new elasticsearch.Client({
  host: "localhost:9200",
  log: "trace"
});
client.ping(
  {
    // ping usually has a 3000ms timeout
    requestTimeout: 3000
  },
  function(error) {
    if (error) {
      console.trace("elasticsearch cluster is down!");
    } else {
      console.log("All is well");
    }
  }
);
module.exports = {
  search: async function() {
    //search fulltext ịndex
    const response = await client.search({
      index: "post",
      // q: '*d*'

      // type: "post",

      type: "post",
      //search theo field của index
      body: {
        query: {
          // match_all: {
          //   // body: 'elasticsearch'
          // }
          match: { userId_post: 2 }
        }
      }
    });

    for (const post of response.hits.hits) {
      console.log("post:", post);
    }
  },

  searchFullText: async function(q) {
    //search fulltext all database
    try {
      const response = await client.search({
        q
      });
      console.log(response.hits.hits);
    } catch (error) {
      console.trace(error.message);
    }
  },
  searchNormal: function() {},
  searchFullTextIndex: async function(q, index, type) {
    let data = {
      index,
      q
    };
    if (type) data["type"] = type;
    const response = await client.search(data);

    for (const post of response.hits.hits) {
      console.log("post:", post);
    }
  },
  add: async function(index, type, data) {
    client.index(
      {
        index: index,
        id: data.id,
        type: type,
        body: JSON.stringify(data)
      },
      function(err, resp, status) {
        console.log(resp);
      }
    );
  }
};
