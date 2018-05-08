let datareq ={
    data:[],
    number_reqfriend:0
}
var requestFriend = (state = datareq, action) => {
   switch (action.type) {
     
     case "ADD_LIST_REQ" :
         let reqfriend  = {...state}
         reqfriend.data = reqfriend.data.concat(action.data)
         return reqfriend;
         break
     case 'SET_REQFRIEND':
       return {...state,number_reqfriend:action.data};
         break
     case 'ADD_REQFRIEND':
       let data = {...state};
        data.data.unshift(action.data)
        data.number_reqfriend +=1 
        
       return data;
        break
        case 'REMOVE_REQFRIEND':
       let datareq = {...state}
        for (var i =0; i < datareq.data.length; i++)
        if (datareq.data[i].username === action.data.username) {
          datareq.data.splice(i,1);
            break;
        }

         
        return datareq;
         break
     case 'RESET_REQFRIEND':
       return {...state,number_reqfriend:0};
       break
     default:
       return state;
   }
 }
 module.exports = requestFriend;
 