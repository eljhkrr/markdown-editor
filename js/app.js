var app = angular.module("markdown-editor", ["ng-showdown"]);

app.controller("AppController",["$scope", "$showdown", function($scope, $showdown){

	$scope.plaintext = "";

}]);