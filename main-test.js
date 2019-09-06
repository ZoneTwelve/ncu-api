const api = require("./index");

api.housing.www.bulletin(0).then(result=>console.log(result)).catch(e=>console.log(e));