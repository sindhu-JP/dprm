const makeCommissionData = (data) => {
    return _.map(data, (item) => {
      return {
        ...item,
        title: item.commissionRuleCode,
        code: item.commissionRuleCode
      };
    });
  };

    
const transformEntry=(item, type)=> {
   if(item){

   
  
  switch (type) {
      case 'email':
          var parts = item.split("@"), len = parts[0].length;
           
          return item.replace(parts[0].slice(1,-1), "*".repeat(len - 2));
      case 'phone':
          return item[0] + "*".repeat(item.length - 4) + item.slice(-3);
     default: 
          throw new Error("Undefined type: " + type);
  }    
}     
}
  export default { makeCommissionData, transformEntry };
  

  