const request = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const path = require("path");
const urls = {
  main:"http://pdc.adm.ncu.edu.tw",
  home:"index.asp",
  bulletin:"news01_more.asp",
};

//require("./urls");
const config = require("../config");
async function main(params){
  let { page, filter } = initialize(params);
  let options = {
    url:`${urls.main}/${urls.bulletin}?p=${page}`,
    headers:{
      "User-Agent":config.agent,
    },
    encoding:"binary",
  }
  return new Promise((resolve, reject)=>{
    request(options, (e,r,d)=>{
      if(e||!d)
        return reject({error:e});
      
      let $ = cheerio.load(iconv.decode(d, "big5"));
      let trgroup = $("table>tbody>tr:nth-child(3)>td>table>tbody>tr:nth-child(odd)");
      let data = [];
      for(let i=0;i<trgroup.length;i++){
        let td = trgroup.eq(i).children("td");
        if(td.length==4){
          let tag = [td.eq(0), td.eq(1), td.eq(3)];
          let link = tag[2].children("a").attr("href");
          data.push({
            date:tag[0].text(),
            department:tag[1].text(),
            title:tag[2].text(),
            link:link,
          });
        }
      }
      if(data.length==0)
        return reject({error:"not thing here"});
      return resolve({
        data:data,
        update:Number(new Date())
      });
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
