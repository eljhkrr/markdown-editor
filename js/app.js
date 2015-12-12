var app = angular.module("markdown-editor", ["ng-showdown", "ui.bootstrap", "Chronicle"]);

app.controller("AppController",["$scope", "$showdown", "Chronicle", function($scope, $showdown, Chronicle){

	$scope.plaintext = "";
	$scope.selectedText = "";
	$scope.isCollapsed = false;
	$scope.chronicle = Chronicle.record("plaintext", $scope);

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

	$scope.downloadAsFile = function(filename, data){

            var success = false;
            var contentType = 'text/plain;charset=utf-8';

            try
            {
                // Try using msSaveBlob if supported
                var blob = new Blob([data], { type: contentType });
                if(navigator.msSaveBlob) {
                    navigator.msSaveBlob(blob, filename);
                }
                else {
                    // Try using other saveBlob implementations, if available
                    var saveBlob = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
                    if(saveBlob === undefined) throw "Not supported";
                    saveBlob(blob, filename);
                }
                success = true;
            } catch(ex)
            {
                console.log("saveBlob method failed with the following exception:");
                console.log(ex);
            }

            if(!success)
            {
                // Get the blob url creator
                var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
                if(urlCreator)
                {
                    // Try to use a download link
                    var link = document.createElement('a');
                    if('download' in link)
                    {
                        // Try to simulate a click
                        try
                        {
                            // Prepare a blob URL
                            var blob = new Blob([data], { type: contentType });
                            var url = urlCreator.createObjectURL(blob);
                            link.setAttribute('href', url);

                            // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
                            link.setAttribute("download", filename);

                            // Simulate clicking the download link
                            var event = document.createEvent('MouseEvents');
                            event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                            link.dispatchEvent(event);
                            console.log("Download link method with simulated click succeeded");
                            success = true;

                        } catch(ex) {
                            console.log("Download link method with simulated click failed with the following exception:");
                            console.log(ex);
                        }
                    }

                    if(!success)
                    {
                        // Fallback to window.location method
                        try
                        {
                            // Prepare a blob URL
                            // Use application/octet-stream when using window.location to force download
                            console.log("Trying download link method with window.location ...");
                            var blob = new Blob([data], { type: octetStreamMime });
                            var url = urlCreator.createObjectURL(blob);
                            window.location = url;
                            console.log("Download link method with window.location succeeded");
                            success = true;
                        } catch(ex) {
                            console.log("Download link method with window.location failed with the following exception:");
                            console.log(ex);
                        }
                    }

                }
            }

            if(!success)
            {
                // Fallback to window.open method
                console.log("No methods worked for saving the arraybuffer, using last resort window.open.  Not Implemented");
                //window.open(httpPath, '_blank', '');
            }
        };

		$scope.insertHeader = function(level){
			var str = [];
			for (var i = 0; i < level; i++){
				str.push("#");
			}
			$scope.insertAtCaret("plaintext", "\n" + str.join("") + " ");
		};

		$scope.code = function(){
			console.log("Selected Text: " + $scope.selectedText);
			if ($scope.selectedText == ""){
				// insert line break and 4 spaces
				// TODO: findout why tab isn't working
				$scope.insertAtCaret("plaintext", "\n\n    ");
			} else {
				// surround text with tick marks ``
				var str = $scope.plaintext;
				$scope.plaintext = str.replace($scope.selectedText, " `" + $scope.selectedText + "` ");
			}
		};

		$scope.undo = function(){
			$scope.chronicle.undo();
		};

		$scope.redo = function(){
			$scope.chronicle.redo();
		};

}]);