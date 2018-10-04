'use strict';

var App = angular.module("goodsPrice", [
  "goodsPrice.services",
  "goodsPrice.controllers",
  "ngRoute",
  "ngResource"
  ])
.config(function ($routeProvider,$resourceProvider, $httpProvider) {
  $routeProvider.when("/dummy", {templateUrl: "views/dummy.html", controller: "DummyCtrl"})
                .when("/goods-list", {templateUrl: "views/good-list.html", controller: "GoodListCtrl"})
                .when("/good-detail/:id", {templateUrl: "views/good-detail.html", controller: "GoodDetailCtrl"})
                .when("/good-creation", {templateUrl: "views/good-creation.html", controller: "GoodCreationCtrl"})
                .otherwise({redirectTo: "/dummy"});

// Don't strip trailing slashes from calculated URLs
  //$resourceProvider.defaults.stripTrailingSlashes = false;
  /* CORS... */
  /* http://stackoverflow.com/questions/17289195/angularjs-post-data-to-external-rest-api */
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
/******
App.run([
  '$rootScope',
  function($rootScope) {
    // see what's going on when the route tries to change
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      // next is an object that is the route that we are starting to go to
      // current is an object that is the route where we are currently
      var currentPath = current.originalPath;
      var nextPath = next.originalPath;

      console.log('Starting to leave %s to go to %s', currentPath, nextPath);
    });
  }]);
******/

