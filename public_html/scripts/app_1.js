'use strict';

var App = angular.module("goodsPrice", [
  "goodsPrice.services",
  "goodsPrice.controllers",
  "goodsPrice.filters",
  "ngRoute",
  "ngMessages"
 
  ]);
  App.config(function ($routeProvider,$httpProvider) {
  $routeProvider.when("/dummy", {templateUrl: "views/dummy.html", controller: "DummyCtrl"})
                .when("/goods-list", {templateUrl: "views/good-list.html", controller: "GoodListCtrl"})
                .when("/goods-after", {templateUrl: "views/good-list.html", controller: "GoodListCtrl"})
                .when("/good-detail/:id", {templateUrl: "views/good-detail.html", controller: "GoodDetailCtrl"})
                .when("/good-creation", {templateUrl: "views/good-creation.html", controller: "GoodCreationCtrl"})
                .otherwise({redirectTo: "/dummy"});
    
   /* CORS... */
  /* http://stackoverflow.com/questions/17289195/angularjs-post-data-to-external-rest-api */
  //$httpProvider.defaults.useXDomain = true;
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];
   
  });

