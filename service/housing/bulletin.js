const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const urls = {
  main:"https://in.ncu.edu.tw/~ncu7221/OSDS",
  home:"index.php"
}
const config = require("../config");

async function main(params){
  let { page, filter } = initialize(params);
  return await new Promise((resolve, reject)=>{
    let options = {
      url:`${urls.main}/${urls.home}?pageNum_OSDS_bulletin=${page}`,
    }
    request(options, (e,r,d)=>{
      if(e||!d)
        return reject({error:e});
      let $ = cheerio.load(d);
      let td = $("#customers>tbody>tr>td");
      let data = [];
      for(let i=0;i<td.length;i+=2){
        let tag = [td.eq(i), td.eq(i+1)];
        let link = path.join(urls.main, tag[1].children("a").attr("href"));
        data.push({
          date:tag[0].text(),
          title:tag[1].text(),
          url:link,
          top:tag[0].attr("data-pin"),
        });
      }
      data.time = Number(new Date());
      return resolve(data);
    }); 
  });
}

function initialize(params){
  let dbtype = typeof params;
  if(dbtype==="undefined")
    return {
      page:0,
      filter:[],
    };
  if(dbtype==="string"||dbtype==="number"){
    return {
      page:parseInt(params)||0,
      filter:[],
    };
  }
  if(dbtype==="object"){
    let { page, filter } = params;
    return {
      page:parseInt(page)||0,
      filter:filter||new Array(),
    };
  }
}

module.exports = main;
