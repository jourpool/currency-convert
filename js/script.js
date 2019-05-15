var rates = [];

$(document).ready(function() {
	getCurrency(); //Get currency rates on load

	$('#base-value').on('input', function() { //Display currency cards
		displayCurrency();
	});

	$('#add').click(function() { //Add currency button handler
		addCurrency($('#additional').val());
	});

	$('.card-container').on("click", ".card-close", function(){ //Remove currency button handler
		console.log('test');
		$(this).closest('.card').hide('slow', function(){ $(this).closest('.card').remove(); });
	});
});

function getCurrency() {
	$.ajax({
		url: "https://api.exchangeratesapi.io/latest",
		type: "GET",
		data: { 
		base: "USD"
	},
	success: function(response) {
		rates = response['rates'];
		displayCurrency();
	},
	error: function(xhr) {
		//Error Handler
	}
	});
}

function displayCurrency() {
	$('.card').each(function(i, obj) {
		var base 	= $('#base-value').val();
		var rate 	= rates[$('.card .card-title').eq(i).text()];
		var convert = base * rate;

		$('.card .card-value').eq(i).text(convert);
		$('.card .card-rate').eq(i).text('Rates: ' + rate);
	});
}

function addCurrency(curr) {
	$('.card-container').append('<div class="card"><div class="card-title">' + curr + '</div><div class="card-value">' + $('#base-value').val() * rates[curr] + '</div><div class="card-rate">Rates: ' + rates[curr] + '</div><div class="card-close">-</div></div>');
}

function validate(evt) { //Validate user input
	var theEvent = evt || window.event;

	if (theEvent.type === 'paste') {
		key = event.clipboardData.getData('text/plain');
	} else {
	var key = theEvent.keyCode || theEvent.which;
		key = String.fromCharCode(key);
	}
	var regex = /[0-9]|\./;
	if( !regex.test(key) ) {
		theEvent.returnValue = false;
		if(theEvent.preventDefault) theEvent.preventDefault();
	}
}