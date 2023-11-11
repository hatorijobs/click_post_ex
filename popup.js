
if (location.href.indexOf('https://clickpost.jp/mypage/') === 0) {
  console.log("sdfs")
  /*etInterval(function(){
    if($('.area').length > 1){
      $('.area')[1].remove();
      console.log(1);
    }
    if($('#num_get').length < 1 && location.href.indexOf('https://clickpost.jp/mypage/') === 0){
      $('#nav_box > div:nth-child(10)').after("\n    <div style=\"display: flex;align-items: flex-end;\">\n    <input aria-disabled=\"false\" class=\"button navi_button ui-button ui-widget ui-state-default ui-corner-all\" id=\"num_get\" role=\"button\" type=\"button\" value=\"\u65e5\u4ed8\u304c\u4eca\u65e5\u306e\u8ffd\u8de1\u756a\u53f7\u3092\u7d10\u4ed8\u3051\" style=\"width: 250px;background-color: lemonchiffon;height: 45px;margin-top: 10px;margin-left: 325px;\">\n　<input type=\"number\" id=\"tomorrow\" min=\"0\" max=\"7\" style=\"width: 30px;\">日前までのデータも含める</div>\n\n    ");
      console.log(2);
    }
  },200);*/
}

window.addEventListener('load', () => {
  chrome.storage.local.get('security_code_str', (value) => {
    document.getElementById('cvv').value = value['security_code_str']
    //document.getElementById('consent-matters-agree').checked = true
    //document.getElementByClassName('btn btn-primary btn-block btn-lg rounded-pill-block').disabled = false
    //btn btn-primary btn-block btn-lg rounded-pill
  });
});

chrome.storage.local.get('security_code_str', (value) => {
  //alert(value['security_code_str'])
  document.getElementById('security_code').value = value['security_code_str']
  //console.log("value.num_days_ago ... " + value.num_days_ago)
  //num_days_ago = value.num_days_ago;
});

document.getElementById("btn3").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: changeText,
  });
});


document.getElementById("btn4").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getSellData,
  });
});


/*
// https://yuki.world/how-to-develop-chrome-extension-basics/#t_1_popupjs
// https://yuki.world/how-to-develop-chrome-extension-basics/#t_1_popupjs
document.getElementById('btn5').addEventListener('click', async () => {
  document.querySelector('h1').textContent = "CHANGED !!";

  document.querySelector("#msg").innerText = `rrrryyyy`;

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getSellData,
  });
})*/


document.getElementById("get_tracking_number").addEventListener("click", async () => {
  var security_code = document.getElementById('security_code');
  //alert("security_code ... " + security_code.value)

  //var select = document.getElementById('days_ago');
  //console.log("select ... " + select )
  //num_days_ago = select.value
  //alert("select ... " + num_days_ago)
  //chrome.storage.local.set({"num_days_ago": num_days_ago});
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getClickPostTrackingNumber,
  });
});


document.getElementById("btn7").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: test,
  });
});

document.getElementById("btn_sc_save").addEventListener("click", async () => {
  let security_code_str = document.getElementById("security_code").value
  //alert(document.getElementById("security_code").value)
  chrome.storage.local.set({ "security_code_str": security_code_str });
  alert("保存完了")
  
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: security_code_save,
  });
});

document.getElementById("btn8").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: set_tracking_number,
  });
});



function onRun() {
  chrome.storage.sync.get(null, (options) => {
    document.body.style.backgroundColor = options.colorValue;
  });
}

function changeBackColor() {
  chrome.storage.sync.get(null, (options) => {
    document.body.style.backgroundColor = options.colorValue;
  });
}

// webページの任意の文字列を取得する
function changeText() {
  let elements = document.querySelectorAll("[id*=_shiire]");
  //let elements = document.getElementsByClassName('col_package_number');
  let num = elements.length;
  var $data = $('<div class="my_add">商品種類の数： ' + num + '</div>');

  // タイトル名を取得する
  const menuElements = document.querySelectorAll("td > div > a[href*='https://www.amazon.co.jp/dp'");
  console.log("menuElements.length ... " + menuElements.length);
  for (let i = 0; i < menuElements.length; i += 1) {
    const element = menuElements[i];
    // コンソールに要素のテキストを出力
    console.log(element.textContent);
  }
  console.log("++++++++++++");

  // タイトル名を取得する
  //const rankingElements = document.querySelectorAll('p[style="font-size: large;"]');
  const rankingElements = document.querySelectorAll('td > div > p[style="font-size: large;"]');
  //p[style="font-size:large;"]
  console.log("rankingElements.length ... " + rankingElements.length);
  for (let i = 0; i < rankingElements.length; i += 1) {
    //const element = rankingElements[i];
    // コンソールに要素のテキストを出力
    console.log("rank ...  " + rankingElements[i].textContent.replace("位", "" ).replace("RANK: ", ""));
  }
  console.log("-------------");

  // skuの文字列を取得する
  // https://www.javadrive.jp/javascript/dom/index8.html#section2_4
  // const sku_f14_Elements = document.querySelectorAll("input[f14]");
  // const sku_f14_Elements = document.querySelectorAll('input[style="width: 35px; margin: 5px;"].f14');
  // console.log("menuElements.length ... " + sku_f14_Elements.length);
  // for (let i = 0; i < sku_f14_Elements.length; i += 1) {
  //   const element = sku_f14_Elements[i];
  //   // コンソールにskuの文字列のテキストを出力
  //   console.log("sku_f14 ... " + element.value);
  // }
  // console.log("++++++++++++");

  // skuの文字列を取得する
  // https://www.javadrive.jp/javascript/dom/index8.html#section2_4
  //const sku_Elements = document.querySelectorAll("input[f14]");
  const sku_Elements = document.querySelectorAll('input[id$="_sku"].f14');
  console.log("sku_Elements.length ... " + sku_Elements.length);
  for (let i = 0; i < sku_Elements.length; i += 1) {
    const element = sku_Elements[i];
    // コンソールにskuの文字列のテキストを出力
    console.log("sku ... " + element.value);
    //if(element.value)
    
    // bcがつながっている場合、scがつながっている場合アラートを出す
    if(element.value.match(/bc/) || element.value.match(/sc/)) {
      alert("bcかscとなっています。数字を間に挟んで下さい。")
      return;
    }
  }
  console.log("++++++++++++");

  $("div.my_add").remove();
  $("table.my_add").remove();

  var dTime=new Date(); 
  var year = dTime.getFullYear();
  var month = dTime.getMonth() + 1;
  var day = dTime.getDate();
  let strDate = year + '/' + month + '/' + day;
  let strHtml;
  strHtml  = '<table class="my_add" style="margin:0 20px 0 20px;">';
  strHtml += '<thead><tr style="height:100px;">';
  strHtml += '<th style="width: 40px;">ASIN</th>';
  strHtml += '<th style="width: 180px;">タイトル</th>';
  strHtml += '<th style="width: 10px;">仕入日</th>';
  strHtml += '<th style="width: 10px;">作成日</th>';
  strHtml += '<th style="width: 1px;"></th>';
  strHtml += '<th style="width: 1px;"></th>';
  strHtml += '<th style="width: 1px;"></th>';
  strHtml += '<th style="width: 1px;"></th>';
  strHtml += '<th style="width: 20px;">仕入れ価格</th>';
  strHtml += '<th style="width: 1px;">戦略名</th>';
  strHtml += '<th style="width: 30px;">SKU</th>';
  strHtml += '<th style="width: 20px;">状態</th>';
  strHtml += '<th style="width: 30px;">ランキング</th>';
  strHtml += '<th style="width: 30px;">予定売上<br/>価格</th>';
  strHtml += '</tr></thead>';
  for (let i = 0; i < num; i++){
    let asin_ = document.getElementById(String(i) + '_asin');
    console.log('asin ... ' + asin_.innerHTML);
    let purchase_ = document.getElementById(String(i) + '_shiire');
    if(purchase_.value == 0){
      alert("仕入値が0になっている箇所があります。")
      return;
    }
    console.log(purchase_.value);
    
    let condition_ = document.getElementById(String(i) + '_condition');


    let price_ = document.getElementById(String(i) + '_price');
    console.log('prices ... ' + price_.value);
    let price_2 = Number(price_.value) - 350;

    let strAsin = asin_.innerHTML;
    if(asin_.innerHTML.charAt(0) == '0'){
      strAsin = "_" + asin_.innerHTML;
    }

    //チェック
    let price_in_sku = sku_Elements[i].value.split("]")[1].split("/")[0]
    if(price_2 != price_in_sku){
      alert(price_2 + " != " + price_in_sku + " " + i + "番目のSKUと出品価格-送料が一致しません。");
      return;
    }
    let shiire_in_sku = sku_Elements[i].value.split("-")[1].split("/")[0]
    if(purchase_.value != shiire_in_sku){
      alert(purchase_.value + " != " + shiire_in_sku + " " + i + "番目のSKUと仕入れ値が一致しません。");
      return;
    }


    strHtml += '<tr>';
    strHtml += '<th class="td-style">' + strAsin + '</th>';
    strHtml += '<th class="td-style" style="text-align:left;">' + menuElements[i * 2 + 1].textContent + '</th>';
    strHtml += '<th class="td-style"></th>';
    strHtml += '<th class="td-style">' + strDate + '</th>';
    strHtml += '<th class="td-style"></th>';
    strHtml += '<th class="td-style"></th>';
    strHtml += '<th class="td-style"></th>';
    strHtml += '<th class="td-style"></th>';
    strHtml += '<th class="td-style">' + purchase_.value  + '</th>';
    strHtml += '<th class="td-style"></th>';
    //strHtml += '<th class="td-style" style="text-align:right;">' + sku_f14_Elements[i].value + '</th>';
    strHtml += '<th class="td-style" style="text-align:left;">' + sku_Elements[i].value + '</th>';
    strHtml += '<th class="td-style">' + condition_.value + '</th>';
    strHtml += '<th class="td-style" style="text-align:right;">' + rankingElements[i].textContent.replace(/位|RANK: |,/g, "" ) + '</th>';
    strHtml += '<th class="td-style" style="text-align:right;">' + price_2 + '</th>';
    strHtml += '</tr>';

    if(condition_.value == 'Acceptable'){
      if(!sku_Elements[i].value.match(/c1/)) {
        alert("コンディションが「可」なのに、c1でない商品があります。")
        return;
      }
    }else if(condition_.value == 'Good'){
      if(!sku_Elements[i].value.match(/c2/)) {
        alert("コンディションが「良い」なのに、c2でない商品があります。")
        return;
      }
    }else if(condition_.value == 'VeryGood'){
      if(!sku_Elements[i].value.match(/c3/)) {
        alert("コンディションが「非常に良い」なのに、c3でない商品があります。")
        return;
      }
    }else if(condition_.value == 'Mint'){
      if(!sku_Elements[i].value.match(/c4/)) {
        alert("コンディションが「ほぼ新品」なのに、c4でない商品があります。")
        return;
      }
    }else if(condition_.value == 'New'){
      if(!sku_Elements[i].value.match(/c5/)) {
        alert("コンディションが「新品」なのに、c5でない商品があります。")
        return;
      }
    }else if(condition_.value == '8'){
      if(!sku_Elements[i].value.match(/c6/)) {
        alert("コンディションが「コレクター:可」なのに、c6でない商品があります。")
        return;
      }
    }else if(condition_.value == '7'){
      if(!sku_Elements[i].value.match(/c7/)) {
        alert("コンディションが「コレクター:良い」なのに、c7でない商品があります。")
        return;
      }
    }else if(condition_.value == '6'){
      if(!sku_Elements[i].value.match(/c8/)) {
        alert("コンディションが「コレクター:非常に良い」なのに、c8でない商品があります。")
        return;
      }
    }else if(condition_.value == '5'){
      if(!sku_Elements[i].value.match(/c9/)) {
        alert("コンディションが「コレクター:ほぼ新品」なのに、c9でない商品があります。")
        return;
      }
    }
  }
  strHtml += '</table>';
  //$("body").append($data);
  $("div.f14").append($data);
  //$("body").append(strHtml); // 画面に表示
  $("div.f14").append(strHtml); // 画面に表示
  alert("問題なし!!")
  
  //$("td:contains('商品名')").
}


async function set_tracking_number() {
  console.log("set_tracking_number")
  //let num_days_ago = 0;
  chrome.storage.local.get('tracking_number_list', (list) => {

    const tracking_Elements = document.querySelectorAll('input.tracking_number');
    const name_Elements = document.querySelectorAll('td.c_name');

    for(i = 0;i<tracking_Elements.length;i++){
      tracking_number = tracking_Elements[i].value.trim()
      recipient_name  = name_Elements[i].textContent.trim()

      //console.log(i+ " id ... " + tracking_Elements[i].id)
      //console.log(i + " ... " + tracking_Elements[i].value.trim() + 
      //  " " + name_Elements[i].textContent.trim())
      //console.log("list .. " + JSON.stringify(list[i]))

      for(j = 0;j < list['tracking_number_list'].length;j++){
        //console.log(j + " .. " + list['tracking_number_list'][j].name)
        if(recipient_name == list['tracking_number_list'][j].name ){
          //alert(recipient_name)
          //console.log("recipient_name .. " + recipient_name)
          //recipient_name = "aaaaaaa"
          document.getElementById(tracking_Elements[i].id).value = list['tracking_number_list'][j].tracking_number;
        }
      }
    }
  });
}

function test() {
  console.log("test")
  //let num_days_ago = 0;
  chrome.storage.local.get('tracking_number_list', (value) => {
    alert(JSON.stringify(value))
    //console.log("value.num_days_ago ... " + value.num_days_ago)
    //num_days_ago = value.num_days_ago;
  });
}

function security_code_save() {
  console.log("security_code_save")

  


  /*
  security_code_str = 
  chrome.storage.local.set({ "security_code_str": security_code_str });

  chrome.storage.local.get('items', (value) => {
    alert(JSON.stringify(value))
    
    //console.log("value.num_days_ago ... " + value.num_days_ago)
    //num_days_ago = value.num_days_ago;
  });*/
}

async function getClickPostTrackingNumber() {
  //const date_Elements     = document.querySelectorAll('td.col_registered_date');
  const tracking_Elements = document.querySelectorAll('td.col_package_number');
  const name_Elements     = document.querySelectorAll('td.col_receiver');

  tracking_number_list = [];
  for (let i = 0; i < name_Elements.length; i += 1) {
    if(tracking_Elements[i].textContent.trim() == ""){
      alert("tracking_ ... " + tracking_Elements[i].textContent.trim())
      continue
    }
    data_ = {
      "tracking_number": tracking_Elements[i].textContent.trim(),
      "name": name_Elements[i].textContent.trim()
    }
    tracking_number_list.push(data_)
  }
  alert("当ページのお問合せ番号を全て取得しました。" + JSON.stringify(tracking_number_list))
  //alert("取得した追跡番号 ... " + JSON.stringify(tracking_number_list))
  chrome.storage.local.set({ "tracking_number_list": tracking_number_list });

  return 
}

async function getClickPostTrackingNumber_x() {
  console.log("vvv")
  //let num_days_ago = 0;
  chrome.storage.local.get('num_days_ago', (value) => {
    console.log("value.num_days_ago ... " + value.num_days_ago)
    num_days_ago = value.num_days_ago;

    let date_arr = [];
    let json = [];
  
    //今日の日付データを変数hidukeに格納
    var hiduke = new Date();

    console.log("日 ... " + num_days_ago)
    aaa = hiduke.getDate() - num_days_ago
    console.log("日 ... " + aaa)
    
    let hiduke_2 = String(hiduke.getFullYear()) + String(hiduke.getMonth() + 1 ) + String(hiduke.getDate() - num_days_ago)
    console.log("hiduke_2 ... " + hiduke_2);

    var date_site; // = new Date(2020, 4, 1, 0, 0, 0);
    var date_input = new Date(
      hiduke.getFullYear(), 
      hiduke.getMonth() + 1, 
      hiduke.getDate() - num_days_ago, 
      0, 0, 0
    );

    let count = 0

    const date_Elements = document.querySelectorAll('td.col_registered_date');
    const tracking_Elements = document.querySelectorAll('td.col_package_number');
    const name_Elements = document.querySelectorAll('td.col_receiver');

    tracking_number_list = [];
    for (let i = 0; i < date_Elements.length; i += 1) {
      // コンソールに要素のテキストを出力
      //console.log("date_Elements ...  " + date_Elements[i].textContent);
      let str_date = date_Elements[i].textContent.split(' ')[0].trim()

      date_site = new Date(
        str_date.substring(0, 4),
        str_date.substring(5, 7), 
        str_date.substring(8, 10),
        0, 0, 0
      );

      //console.log("date_site ...  " + str_date.substring(0, 4) + ":" +
      //str_date.substring(5, 7) + ":" + str_date.substring(8, 10));

      if(date_input.getTime() <= date_site.getTime()){
        console.log( i + " ... " + date_site)

        tracking_Elements.textContent

        data_ = {
          "tracking_number": tracking_Elements[i].textContent.trim(),
          "name": name_Elements[i].textContent.trim()
        }
        //alert("aaa ... " + JSON.stringify(aaa))
        tracking_number_list.push(data_)
      }

      count += 1
    }
    alert("当ページのお問合せ番号を全て取得しました。" + JSON.stringify(tracking_number_list))
    //alert("取得した追跡番号 ... " + JSON.stringify(tracking_number_list))
    chrome.storage.local.set({ "tracking_number_list": tracking_number_list });


    /*
    sub_win = window.open("https://clickpost.jp/mypage/index?page=2");
    //alert("end")
    alert("2ページ目を取得します。")
    
    date_Elements = sub_win.document.querySelectorAll('td.col_registered_date');
    for (let i = 0; i < date_Elements.length; i += 1) {
      // コンソールに要素のテキストを出力
      //console.log("date_Elements ...  " + date_Elements[i].textContent);
      let str_date = date_Elements[i].textContent.split(' ')[0].trim()

      date_site = new Date(
        str_date.substring(0, 4),
        str_date.substring(5, 7), 
        str_date.substring(8, 10),
        0, 0, 0
      );

      //console.log("date_site ...  " + str_date.substring(0, 4) + ":" +
      //str_date.substring(5, 7) + ":" + str_date.substring(8, 10));

      if(date_input.getTime() <= date_site.getTime()){
        console.log( i + " ... " + date_site)
      }

      count += 1
    }
    */
  });

  return 
}

// webページの販売済データを取得する
// https://sellercentral.amazon.co.jp/orders-v3
function getSellData() {
  //class="myo-list-orders-product-name-cell"


  const num_Elements = document.querySelectorAll('div.total-orders-heading > span');
  console.log("num_Elements ... " + num_Elements[0].textContent.replace("件", ""));
  const sell_num = Number(num_Elements[0].textContent.replace("件", ""));
  console.log("sell_num ... " + sell_num);

  // タイトル名を取得する
  //const rankingElements = document.querySelectorAll('p[style="font-size: large;"]');
  const sku_Elements = document.querySelectorAll('div.myo-list-orders-product-name-cell > div > div');
  //p[style="font-size:large;"]
  console.log("sku_Elements.length ... " + sku_Elements.length);
  for (let i = 0; i < sku_Elements.length; i += 1) {
    console.log("sku_Elements ...  " + sku_Elements[i].textContent);
  }


  // 注文番号
  /*
  const order_number_Elements = document.querySelectorAll('div.cell-body-title');
  console.log("order_number_Elements.length ... " + order_number_Elements.length);
  for (let i = 0; i < order_number_Elements.length; i += 1) {
    console.log("order_number_Elements ...  " + order_number_Elements[i].textContent);
  }*/
  const order_number_Elements_ = document.querySelectorAll('div.cell-body-title');
  let order_number_Elements = [];
  for (let i = 0; i < order_number_Elements_.length; i += 1) {
    var pattern = /^\d{3}-?\d{7}-?\d{7}$/g;
    if(order_number_Elements_[i].textContent.match(pattern)){
      console.log("order_number_Elements_[i].textContent ...  " + order_number_Elements_[i].textContent);
      order_number_Elements.push(order_number_Elements_[i].textContent);
      //console.log("i ...  " + i);
      //console.log("order_number_Elements.length ...  " + order_number_Elements.length);
      //console.log("order_number_Elements ...  " + order_number_Elements[order_number_Elements.length - 1]);
    }
  }


  // 小計 and SKU
  let sub_total_arr = [];
  let sku_arr = [];
  const property_Elements = document.querySelectorAll('div.cell-body > div > div');
  console.log("property_Elements.length ... " + property_Elements.length);
  for (let i = 0; i < property_Elements.length; i += 1) {
    // コンソールに要素のテキストを出力
    if(property_Elements[i].textContent.match(/商品の小計/)){
      sub_total_arr.push(property_Elements[i].textContent.split("￥")[1]);
    }

    
    if(property_Elements[i].textContent.match(/SKU:/)){
      sku_arr.push(property_Elements[i].textContent.replace("SKU: ", ""));
    }
  }

  // 日付
  let date_arr = [];
  let hours_arr = [];
  const date_Elements = document.querySelectorAll('div.cell-body > div');
  console.log("date_Elements.length ... " + date_Elements.length);
  for (let i = 0; i < date_Elements.length; i += 1) {
    // コンソールに要素のテキストを出力
    console.log("date_Elements ...  " + date_Elements[i].textContent);

    //文字列が日付の場合は、日付の配列に追加する
    let date = new Date(date_Elements[i].textContent);
    if(isNaN(date.getDate()) == false){
      date_arr.push(date_Elements[i].textContent);
    }

    //文字列が日付の場合は、日付の配列に追加する
    if(date_Elements[i].textContent.match(/JST/)){
      hours_arr.push(date_Elements[i].textContent.split(":")[0]);
    }
  }


  alert(sku_arr.length + " " + date_arr.length + " " + hours_arr.length + " " + sub_total_arr.length);
 

  let strHtml;
  strHtml  = '<table style="margin:0 20px 0 20px;max-width:600px;">';
  strHtml += '<thead><tr style="height:50px;">';
  strHtml += '<th style="">SKU</th>';
  strHtml += '<th style="max-width:150px;">タイトル</th>';
  strHtml += '<th style="">ASIN</th>';
  strHtml += '<th style="">受注番号</th>';
  strHtml += '<th style="">販売日</th>';
  strHtml += '<th style="">時刻</th>';
  strHtml += '<th style="">小計</th>';
  strHtml += '</tr></thead>';
  for (let i = 0; i < sell_num; i++){
    console.log("i ... " + i);
    strHtml += '<tr>';
    strHtml += '<th class="td-style" style="text-align:left;">' + sku_arr[i] + '</th>';
    strHtml += '<th class="td-style" style="text-align:left;">' + sku_Elements[i * 5 + 0].textContent + '</th>';
    strHtml += '<th class="td-style" style="text-align:left;">' + sku_Elements[i * 5 + 1].textContent.replace("ASIN: ", "") + '</th>';
    //strHtml += '<th class="td-style" style="text-align:left;">' + order_number_Elements[i * 3 + 1].textContent + '</th>';
    strHtml += '<th class="td-style" style="text-align:left;">' + order_number_Elements[i] + '</th>';
    strHtml += '<th class="td-style" style="text-align:left;">' + date_arr[i] + '</th>';
    strHtml += '<th class="td-style" style="text-align:left;">' + hours_arr[i] + '</th>';
    strHtml += '<th class="td-style" style="text-align:left;">' + sub_total_arr[i] + '</th>';
    strHtml += '</tr>';
  }
  strHtml += '</table><br/><br/><br/>';
  
  alert(strHtml)

  //var $data = $('<div class="">ttttttttttt</div>');
  //$("body").append("rrrrrrrrrr");
  $("body").append(strHtml); // 画面に表示

}