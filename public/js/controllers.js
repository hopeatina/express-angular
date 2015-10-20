'use strict';

               /* Controllers */


function NavBarController($scope) {
    $scope.onTwitterLogin = function()
    {
        // a direct window.location to overcome Angular intercepting your call!
        window.location = "/auth/twitter";
    };

    $scope.onFacebookLogin = function () {

    }
}

function IndexCtrl($scope, $http) {
  $scope.posts = [];
  //$scope.getindicators = FilteredIndicators($scope);

  $http.get('/api/posts').then(function(data, status, statusText) {
     $scope.posts = data.data.posts;
        $scope.locales = data.data.hiwdata;
       $scope.gender = data.data.gender;
        console.log($scope.posts.title + " It's not here. " + data.status + " " + Object.keys(data) );
    });

  $scope.refresh = function() {
    var params = {localeid: $scope.localeid, genderid: $scope.genderid};
    console.log(params.localeid);

    $http.post('/api/getIndicators', params).then(function (data) {
      $scope.indicators = data.data;
    });
  };
  $scope.getDescrip = function() {
    var params = {localeid: $scope.localeid, genderid: $scope.genderid};
    console.log(params.localeid);

    $http.post('/api/getIndicators', params).then(function (data) {
      $scope.indicators = data.data;
    });
  };
}
/*function FilteredIndicators($scope){
  var req = {
    method: 'POST',
    url: '/api/getindicators',
    data: { locale: $scope.localeid, gender: $scope.genderid }
  }
  $http.(req).then(function(data, status, headers, config){
    $scope.indicators = data;
  })
}*/

function LoginCtrl($scope,$location)
{
    $scope.onLoginClick = function()
    {
        // a direct window.location to overcome Angular intercepting your call!
        window.location = "/auth/twitter";
    }
}

function AddPostCtrl($scope, $http, $location) {
  $scope.submitPost = function () {
    $http.post('/api/addPost', {
      title: $scope.title,
      text: $scope.text
    }).
    success(function(data, status, headers, config) {
      $location.path('/');
    });
  };
}

function ReadPostCtrl($scope, $http, $routeParams) {
  $http({method: 'GET', url: '/api/post/' + $routeParams.id}).
    success(function(data, status, headers, config) {
      $scope.post = data.post;
    });
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
  $http({method: 'GET', url: '/api/post/' + $routeParams.id}).
    success(function(data, status, headers, config) {
      $scope.title = data.post.title;
      $scope.text = data.post.text;
    });

  $scope.editPost = function () {
    $http.post('/api/editPost', {
      id: $routeParams.id,
      title: $scope.title,
      text: $scope.text
    }).
    success(function(data, status, headers, config) {
      $location.path('/readPost/' + $routeParams.id);
    });
  };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http({method: 'GET', url: '/api/post/' + $routeParams.id}).
    success(function(data, status, headers, config) {
      $scope.post = data.post;
    });

  $scope.deletePost = function () {
    $http.post('/api/deletePost', {
      id: $routeParams.id
    }).
    success(function(data, status, headers, config) {
      $location.path('/');
    });
  };

  $scope.home = function () {
    $location.path('/');
  };
}
