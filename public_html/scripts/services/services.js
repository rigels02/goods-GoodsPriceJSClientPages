'use strict';

var services = angular.module('goodsPrice.services', ['ngResource']);

var baseUrl = 'http://localhost:8080';

services.factory('DummyFactory', function ($resource) {
    return $resource(baseUrl + '/goods/dummy', {}, {
        query: { method: 'GET', params: {} }
    });
});

services.factory('GoodsFactory', function ($resource) {
    function resourceErrorHandler(error){
        console.log(error);
        alert("Error!\n"+error.config.method+"\n"+error.status+"\n"+error.statusText);
    }
    return $resource(baseUrl + '/pgoods?page=:number&size=:size', {}, {
        query: { method: 'GET',responseType :"json",params:{number:'@number',size:'@size'}},
        create: { method: 'POST', interceptor : {responseError : resourceErrorHandler}}
    });
});

services.factory('GoodFactory', function ($resource) {
    function resourceErrorHandler(error){
        console.log(error);
    alert("Error!\n"+error.config.method+"\n"+error.status+"\n"+error.statusText);
    }
    return $resource(baseUrl + '/goods/:id', {}, {
        show: { method: 'GET', interceptor : {responseError : resourceErrorHandler}},
        update: { method: 'PUT', params: {id: '@id'}, interceptor : {responseError : resourceErrorHandler}},
        delete: { method: 'DELETE', params: {id: '@id'} }
    });
});
services.factory('KeepData',function(){
    var data={};
    
    return {
      getData:function(){ return data;},
      keepData: function(data2keep){
          data= data2keep;
      }
    };
});

