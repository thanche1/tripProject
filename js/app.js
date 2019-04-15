jQuery(document).ready(init);
//Same as: jQuery(document).ready(init);
//Our application goes here:
function init(){
 let options = {
 url : "data.json",
 success: jsonHandler
 }
 function jsonHandler(data){
 console.log(data);
 }
 $.ajax(options);
}