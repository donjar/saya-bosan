var game_array = [];
var turn = "A";
var ended = true;

$(document).ready(function() {

	$('#human').click(function() {
		setup_playfield();
	});

	$('#bot').click(function() {
		alert("Blom dapet solusinya nih");
	});

	function setup_playfield() {
		var num = $('#number').val();
		if (/^[0-9]+$/.test(num)) {
			if (ended || (!ended && confirm("Nyerah?"))) {
				game_array = [];
				turn = "A";
				$("main").empty();
				for (var i = 1; i <= num; i++) {
					game_array[i - 1] = "";
					$("main").append('<div class="square" id=' + i + '>' + i +
							'</div>');
				}
				play_against_human();
			}
		} else {
			alert("Lu masukin apaan bego");
		}
	}

	function play_against_human() {
		ended = true;
		for (var i = 0; i < game_array.length; i++) {
			var selector = "#" + (i + 1);
			$(selector).removeClass("filled");
			$(selector).removeClass("illegal");
			if (game_array[i] === "A" || game_array[i] === "B") {
				$(selector).addClass("filled");
			} else if ((i !== 0 && game_array[i - 1] === turn) ||
					(i !== game_array.length - 1 &&
					 game_array[i + 1] === turn)) {
				$(selector).addClass("illegal");
			} else {
				ended = false;
			}
		}

		if (!ended) {
			$('#giliran').text("Giliran: " + turn);	
		} else {
			var draw = true;
			for (var i = 0; i < game_array.length; i++) {
				if (game_array[i] === "") {
					draw = false;	
					break;
				}
			}

			if (draw) {
				alert("Seri");
			} else {
				switch_turns();
				alert(turn + " menang!");
			}
		}
	}

	function switch_turns() {
		(turn === "A") ? (turn = "B") : (turn = "A");
	}

	$('main').on("click", '.square:not(.illegal):not(.filled)', function() {
		$(this).text(turn);
		game_array[$(this).attr('id') - 1] = turn;
		switch_turns();
		play_against_human();
	});
});
