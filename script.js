let method = "GET";
let url = "https://jsonplaceholder.typicode.com/users";
let badUrl = "http://fjdskla.com";
let timeoutUrl = "http://www.google.com:81/"

//create xmlhttprequest object
let client = new XMLHttpRequest();

let result = document.getElementById("result");

let button = document.getElementById("button");
button.addEventListener("click",sendRequest);
function sendRequest(){
    client.send();
}

let stopper = document.getElementById("stop");
stopper.onclick = function(){
    client.abort();
}
//Events
client.onloadstart = function (){
    console.log("Yuklemeye başladı.",">onloadstart")
    setTimeout(null, 5000);
}

client.onprogress = function(){
    console.log("İşlem devam ediyor.",">onprogress")
    
}

client.onabort = function(){
    console.log("İşlem iptal edildi.",">onabort")
    
}

client.onerror = function(){
    console.log("Bir hata oluştu.",">onerror","\tstatus:",this.status)
    
}

client.onload = function(){
    console.log("Yükleme başarılı.",">onload")
    setTimeout(null, 5000);
}

client.ontimeout = function (){
    console.log("İstek zaman aşımına uğradı.",">ontimeout")
    
}

client.onloadend = function (){
    console.log("Yukleme tamamlandı.",">onloadend")
    //yukleme tamamlandiginda responsu format fonksiyonuna gonderelim.
    if(this.status ==200){
        formatJsonToHtml(this.response);
    }
}

client.onreadystatechange = function(){
    logStateMean(this.readyState)
}

// client.open(method,badUrl);
// client.open(method,url);
client.open(method,timeoutUrl); //


//response formatting
function formatJsonToHtml(data){
    let jsonData = JSON.parse(data);
    let rows = jsonData.map(e=>{
        return `
        <tr>
        <td>${e.id}</td>
        <td>${e.name}</td>
        <td>${e.phone}</td>
        <td>${e.username}</td>
        <td>${e.website}</td>
        <td>${e.address.city}</td>
        <td>${e.company.name}</td>
        <td>${e.email}</td>
      </tr>
        `
    })
    result.innerHTML = rows;
}

//ready state means logger
function logStateMean(state){
    switch(state){
        case 0:
            console.log(state,"=UNSENT")
            break;
        case 1:
            console.log(state,"=OPENED")
            break;
        case 2:
            console.log(state,"=HEADERS_RECEIVED")
            break;
        case 3:
            console.log(state,"=LOADING")
            break;
        case 4:
            console.log(state,"=DONE")
            break;
        default:
            console.log("undefined state")
            break;
    }
}