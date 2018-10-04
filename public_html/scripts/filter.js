/**
 * http://www.angulartutorial.net/2014/03/client-side-pagination-using-angular-js.html
 * 
 * 
 * */
var filters= angular.module('goodsPrice.filters', []);
filters.filter('pagination', function()
{
 return function(input, start)
 {
     //Dummy operation in case when response is not yet ready from server side and
     //we receive an empty input object. To prevent error output I use this dummy
     //opration
      if(Object.keys(input).length===0){
          return "a".slice(0);
     }
     
         
  //start = +start;
  return input.slice(start);
 };
});

