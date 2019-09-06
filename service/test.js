const housingBulletin = require("./housing/bulletin");

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

}

