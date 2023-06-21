
const queryString = require('query-string');
const queryObj=(payload)=>{
     return  queryString.stringify(_.pickBy(payload, _.identity));
}

 export default {queryObj}
 