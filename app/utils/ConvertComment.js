 module.exports = {
    convertComment: function (data, options) {
        // return new Promise((resolve,reject)=>{
        options = options || {};
        var ID_KEY = options.idKey || 'id';
        var PARENT_KEY = options.parentKey || 'parent';
        var CHILDREN_KEY = options.childrenKey || 'children';
    
        var tree = [],
          childrenOf = {};
        var item, id, parentId;
    
        for (var i = 0, length = data.length; i < length; i++) {
          item = data[i];
          delete item["updatedAt"]
          delete item["createdAt"]
          delete item["SHORTCUT"]
          delete item["LEV"]
          delete item["TLID"]
          delete item["USERID"]
          delete item["MODCODE"]
          id = item[ID_KEY];
          parentId = item[PARENT_KEY] || null;
          // every item may have children
          childrenOf[id] = childrenOf[id] || [];
          // init its children
          item[CHILDREN_KEY] = childrenOf[id];
          if (parentId != null) {
            // init its parent's children object
            childrenOf[parentId] = childrenOf[parentId] || [];
            // push it into its parent's children object
            childrenOf[parentId].push(item);
          } else {
            tree.push(item);
          }
        };
    
        return tree;
        // })
    
      },
 }