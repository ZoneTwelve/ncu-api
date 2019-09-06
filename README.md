# NCU-Third-Party-API
## 發想:
  當我來到大學之後，發現各種資訊是非常分散的.
  所以我認為比起年復一年的讓新生手動尋找各種資訊, 不如讓電腦自動化處理.
  因此雛型預計以公告取向去收集各大單位資訊.

## 結構:
  因為一個學校的網域都是 ${division}.${department}.*.edu.tw/${service} 建構的
  所以架構預計如下
  const api = require("third-part-api");
  api = {
    department:{
      service:function
    }
  }
  以資工系而言 csie.*.edu.tw/bulletin -> 預設指向 www
  ex:
    csie -> department
    ${undefined} -> division [default: www]
    bulletin -> service
  api = {
    csie:{
      www:{
        bulletin:function({paramter1. paramter2, ...});
      }
    }
  }
  如果例外 如: ${sub service}.#{division}.${department}.*.edu.tw/service 仍然使用與上面類似的架構, 只不過換成
  ex: 
    api -> sub service
    bulletin -> service
    develop -> division
  api = {
    csie:{
      division:{
        develop_api:{
          bulletin:function({paramter1, paramter2, ...});
        }
      }
    }
  }
  預設將域名掛為前綴再使用底線(_)表示服務項目
  若有例外, 將另行寫在說明文件中.
## 開發日誌
### log-20190905: 
  由於新生優先會入住學校再參與各種活動, 因此宿舍資訊顯得相當重要.
  所以預計先開發住宿服務相關爬蟲