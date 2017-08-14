var WikipediaViewer = function(){
	//cached jQuery objects
	var $searchContainer = $('.search-container');
	var $resultsContainer = $('.results-container');
	var $submitBtn = $('.submit-btn');
	var $searchText = $('#search-text');
	var $searchResultSnippet = $('.search-result-snippet');
	var $resultHeader = $('.result-header');
	var $resultLink = $('.result-link');
	var $searchCancelBtn = $("#search-cancel");

	$submitBtn.click(function(){
		//reset search results
		$searchResultSnippet.empty();
		$resultHeader.empty();
		$resultLink.attr('href', '');
		
		if($searchText.val() !== ''){
			$resultsContainer.show();
			//pushes search-container to the top
	   		$searchContainer.addClass('push-up-search-container');
	   		//results-container pushed right to the top right below search after short delay
			$resultsContainer.removeClass('push-up-results-container');
			setTimeout(function(){$resultsContainer.addClass('push-up-results-container');}, 50);

   			var userInput = $searchText.val();
   			//Data to be sent to the server appended to URL as query string
   			var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + userInput + '&limit=9&format=json&callback=?';
   			//loads JSON data from server using a HTTP GET request. 
   			$.getJSON(wikiUrl, processResult);
   		}

	});

	//callback passed returned data
	function processResult(data){
		console.log(data);
		for(var i = 0; i < 9; i++){
			//update results section
			$resultHeader.eq(i).text(data[1][i]);
			$searchResultSnippet.eq(i).html(data[2][i]);
			$resultLink.eq(i).attr('href', data[3][i]);
		}
	}

	//add 'return' key listener to trigger button click
	$searchText.keyup(function(event){
		event.preventDefault();
		if(event.keyCode === 13){
			$submitBtn.click();
		}
	});

	//reset position
	$searchCancelBtn.click( function(){
		$searchContainer.removeClass('push-up-search-container');
		$resultsContainer.removeClass('push-up-results-container');
		$resultsContainer.hide();
		$searchText.val('');
	});

	function init(){
		$resultsContainer.hide();
	}

	return{
		init: init
	}
}();

$(document).ready(function(){
	WikipediaViewer.init();
});