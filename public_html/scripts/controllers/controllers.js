'use strict';

/* Controllers */

var appCtrl = angular.module('goodsPrice.controllers', []);


// Clear browser cache (in development mode)
//
// http://stackoverflow.com/questions/14718826/angularjs-disable-partial-caching-on-dev-machine
appCtrl.run(function ($rootScope, $templateCache) {
  $rootScope.$on('$viewContentLoaded', function () {
    $templateCache.removeAll();
  });
});


appCtrl.controller('DummyCtrl', ['$scope', 'DummyFactory', function ($scope, DummyFactory) {
  $scope.bla = 'bla bla bla from controller';
  DummyFactory.query({}, function (data) {
    $scope.foo = data;
  });
}]);

appCtrl.controller('GoodListCtrl', ['$scope', 'GoodsFactory', 'GoodFactory','KeepData', '$location',
  function ($scope, GoodsFactory, GoodFactory,KeepPageInfo, $location) {
      
      restorePageInfo();
    
      function restorePageInfo(){
        var pageInfo= KeepPageInfo.getData();
        if(angular.equals(pageInfo,{})){
            $scope.totalElements=0;
      $scope.currentPage=0;
      $scope.totalPages= 3; 
      $scope.pageSize =3; //min page size
        } else {
      $scope.totalElements=pageInfo.totalElements;
      $scope.currentPage=pageInfo.currentPage;
      $scope.totalPages= pageInfo.totalPages; 
      $scope.pageSize = pageInfo.pageSize;
  }
    }  
    function keepPageInfo(){
      var pageInfo={};
      pageInfo.totalElements= $scope.totalElements;
      pageInfo.currentPage=$scope.currentPage;
      pageInfo.totalPages=$scope.totalPages; 
      pageInfo.pageSize=$scope.pageSize;
      KeepPageInfo.keepData(pageInfo);
    }
    $scope.pageSizeChanged = function(size){
        $scope.pageSize= size;
        $scope.currentPage=0;
            queryPage();
    };
    /* callback for ng-click 'editUser': */
    $scope.editGood = function (goodId) {
            keepPageInfo();
      $location.path('/good-detail/' + goodId);
    };

    /* callback for ng-click 'deleteUser': */
    $scope.deleteGood = function (goodId) {
      GoodFactory.delete({ id: goodId }).$promise.then(function(data){
          console.log('deleted: '+data);
          $scope.currentPage=0;
            keepPageInfo();
      //$location.path('/goods-list');
      //$scope.goods = GoodsFactory.query();
            queryPage();
      $location.path('/goods-list');
      },
      function(error){
                        responseErrorHandler("Delete Error!",error);   
      });
     
    };

    /* callback for ng-click 'createUser': */
    $scope.createNewGood = function () {
      $location.path('/good-creation');
    };
$scope.prevPage= function(){
   $scope.currentPage= $scope.currentPage-1;
            queryPage();
};
$scope.nextPage= function(){
   $scope.currentPage = $scope.currentPage+1;
            queryPage();
};
$scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

function queryPage(){
    GoodsFactory.query({number:$scope.currentPage,size: $scope.pageSize}).$promise.then(function(data){
    var result= data._embedded.pgoods;
    $scope.goods = result;    
     $scope.currentPage=data.page.number;
      
      //$scope.pageSize = data.page.size;
      $scope.totalPages=data.page.totalPages;
    },
    function(error){
        responseErrorHandler("Can not Get page!",error);
    });
};

function responseErrorHandler(msg, error){
    console.log(error);
     alert(msg+"\n"+error.status+"\n"+error.statusText);
    
};
$scope.setItemsPerPage = function(num) {
  $scope.pageSize = num;
  $scope.currentPage = 0; //reset to first page
};
$scope.goods={};
/**
 * In case of pagenation request the returned result is json object but not as array
 * Therefore, instead of just query, I make a query with for promise waiting and
 * process the received data in 'then' function.
 * The main reason to use promise here is because i use pagenation filter and 
 * the filter does not accept the promise empty result while it is waiting for 
 * a response from server side.
 * REMARK: Actually paginating filtering is not used, because server sends back
 * exectly page data what was requested: the current page number and page size. 
 */

  
        queryPage();
   //$scope.goods= GoodsFactory.query();
   
   //  console.log($scope.goods);
    
  }]);

appCtrl.controller('GoodDetailCtrl', ['$scope', '$routeParams', 'GoodFactory', '$location',
  function ($scope, $routeParams, GoodFactory, $location) {

    /* callback for ng-click 'updateUser': */
    $scope.updateGood = function () {
      var result= GoodFactory.update($scope.good).$promise.then(function(data){
          
           $location.path('/goods-list');
      });
      //console.log(result);
      
     
    };

    /* callback for ng-click 'cancel': */
    $scope.cancel = function () {
      $location.path('/goods-list');
    };

    $scope.good = GoodFactory.show({id: $routeParams.id});
  }]);

appCtrl.controller('GoodCreationCtrl', ['$scope', 'GoodsFactory', '$location',
  function ($scope, GoodsFactory, $location) {

    /* callback for ng-click 'createNewUser': */
    $scope.createNewGood = function () {
      GoodsFactory.create($scope.good).$promise.then(function(data){
          $location.path('/goods-list');
      });
      
    };
  }]);



