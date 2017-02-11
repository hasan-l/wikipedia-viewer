$(document).ready(function(){

	var searchContainer = $('.search-container');
	var resultsContainer = $('.results-container');
	resultsContainer.hide();

	$('.submit-btn').click(function(){
		$('.result-pane div').empty();
		$('.result-pane h3').empty();
		
		if($('#search-text').val() !== ''){
			resultsContainer.show();
	   		searchContainer.addClass('push-up-search');
			resultsContainer.removeClass('push-up-results');
			setTimeout(function(){resultsContainer.addClass('push-up-results');}, 50);

   			var title = $('#search-text').val();
   			var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + title + '&limit=9&format=json&callback=?';
   			$.getJSON(wikiUrl, processResult);
   		}

	});

	function processResult(apiResult){
		var resultPaneDiv = $('.result-pane div');
		var resultPaneHeading = $('.result-pane h3');
		var resultLink = $('.result-link');

		for(var i = 0; i < 9; i++){
			resultPaneHeading.eq(i).text(apiResult[1][i]);
			resultPaneDiv.eq(i).html(apiResult[2][i]);
			resultLink.eq(i).attr('href', apiResult[3][i]);
		}
	}

	//add return key listener to trigger button click
	var searchTxt = document.getElementById("search-text");
	searchTxt.addEventListener("keyup", function(event){
		event.preventDefault();
		if(event.keyCode === 13){
			document.querySelector(".submit-btn").click();
		}
	});

	//reset position
	var searchCancelBtn = document.getElementById("search-cancel");
	searchCancelBtn.addEventListener("click", function(){
		searchContainer.removeClass('push-up-search');
		resultsContainer.removeClass('push-up-results');
		resultsContainer.hide();

		searchTxt.value = "";
	}, false);

});