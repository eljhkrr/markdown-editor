var app = angular.module("markdown-editor", ["ng-showdown"]);

app.controller("AppController",["$scope", "$showdown", function($scope, $showdown){

	$scope.plaintext = "";
	$scope.selectedText = "";

	$scope.getSelectedText = function() {
		var text = "";
		if (window.getSelection) {
		  text = window.getSelection().toString();
		} else if (document.selection && document.selection.type != "Control") {
		  text = document.selection.createRange().text;
		}
		console.log("Text:\n " + text);
		// console.log("\nRaw\n " + String.raw'{text}');
		$scope.selectedText = text;
		//return text;
	};

	$scope.insertAtCaret = function(areaId,text) {
	    var txtarea = document.getElementById(areaId);
	    var scrollPos = txtarea.scrollTop;
	    var strPos = 0;
	    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
	        "ff" : (document.selection ? "ie" : false ) );
	    if (br == "ie") { 
	        txtarea.focus();
	        var range = document.selection.createRange();
	        range.moveStart ('character', -txtarea.value.length);
	        strPos = range.text.length;
	    }
	    else if (br == "ff") strPos = txtarea.selectionStart;

	    var front = (txtarea.value).substring(0,strPos);  
	    var back = (txtarea.value).substring(strPos,txtarea.value.length); 
	    txtarea.value=front+text+back;
	    strPos = strPos + text.length;
	    if (br == "ie") { 
	        txtarea.focus();
	        var range = document.selection.createRange();
	        range.moveStart ('character', -txtarea.value.length);
	        range.moveStart ('character', strPos);
	        range.moveEnd ('character', 0);
	        range.select();
	    }
	    else if (br == "ff") {
	        txtarea.selectionStart = strPos;
	        txtarea.selectionEnd = strPos;
	        txtarea.focus();
	    }
	    txtarea.scrollTop = scrollPos;
	}

	$scope.bold = function(){

		console.log("$scope.selectedText#" + $scope.selectedText);

		var str = $scope.plaintext;

		console.log("str = " + str);

		$scope.plaintext = str.replace($scope.selectedText, "**" + $scope.selectedText + "**");

	};

	$scope.kbd = function(){

		console.log("$scope.selectedText#" + $scope.selectedText);

		var str = $scope.plaintext;

		console.log("str = " + str);

		$scope.plaintext = str.replace($scope.selectedText, "<kbd>" + $scope.selectedText + "</kbd>");
	};

	$scope.italic = function(){

		console.log("$scope.selectedText#" + $scope.selectedText);

		var str = $scope.plaintext;

		console.log("str = " + str);

		$scope.plaintext = str.replace($scope.selectedText, "*" + $scope.selectedText + "*");
	};

	$scope.paragraph = function(){

		console.log("$scope.selectedText#" + $scope.selectedText);

		var str = $scope.plaintext;

		console.log("str = " + str);

		$scope.plaintext = str.replace($scope.selectedText, "\n\n" + $scope.selectedText + "\n\n");

		//$scope.$apply();
	};

	$scope.insert_hr = function(){
		$scope.insertAtCaret("plaintext", "***\r");
	};

	$scope.ul = function(){
		console.log("$scope.selectedText#" + $scope.selectedText);
		var line_array = $scope.selectedText.split("\n");

		console.log(line_array);
		//var str = $scope.plaintext;
		for (var i = 0; i < line_array.length; i++){
			var str = $scope.plaintext;
			console.log("Loop i= " + i);
			var item = "* " + line_array[i] + "\n";
			console.log("Item: " + item);
			console.log("line_array[i] = " + line_array[i]);
			$scope.plaintext = str.replace(line_array[i]+"\n", item);
		}
	};

	$scope.ol = function(){
		console.log("$scope.selectedText#" + $scope.selectedText);
		var line_array = $scope.selectedText.split("\n");

		console.log(line_array);
		//var str = $scope.plaintext;
		for (var i = 0; i < line_array.length; i++){
			var str = $scope.plaintext;
			console.log("Loop i= " + i);
			var item = i + ". " + line_array[i] + "\n";
			console.log("Item: " + item);
			console.log("line_array[i] = " + line_array[i]);
			$scope.plaintext = str.replace(line_array[i]+"\n", item);
		}
	};


}]);