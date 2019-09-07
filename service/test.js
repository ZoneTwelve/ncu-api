const housingBulletin = require("./housing/bulletin");
const admBulletin = require("./adm/bulletin");
function readHousingBulletin(db){
  housingBulletin(parseInt(db)||0).then(result=>{
    console.log(result);
  }).catch(error=>{
    console.error(error);
  });
}

switch(process.argv[2]){
  case "housing-bulletin":
    return readHousingBulletin(process.argv[3]);
  case "adm-bulletin":
    return admBulletin({page:parseInt(process.argv[3])||0}).then(result=>{
      console.log(result)
    }).catch(error=>{
      console.error(error);
    });
}

