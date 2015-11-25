var app = angular.module("markdown-editor", ["ngSanitize"]);
var converter = new showdown.Converter();

app.controller("AppController",["$scope", "$sce", function($scope, $sce){

	$scope.plaintext = "* this";


	$scope.htmlcontent = converter.makeHtml($scope.plaintext);

}]);