import { Component, OnInit } from '@angular/core';
import { PlaysService } from '../plays.service';

@Component({
	selector: 'app-play',
	templateUrl: './play.component.html',
	styleUrls: ['./play.component.css'],
	providers: [PlaysService]
})

export class PlayComponent implements OnInit {
	nbPlayers: 3;
  	plays: any;
  	play: any;
	players: any;
	player: any;
	playersName: any = ["Ronan", "Alexis", "Guillaume"];
	maps: any;

	submitted = false;

	constructor(private playService: PlaysService) {

		const maps = {

			bo1: ["Kino Der Toten", "Five", "Ascension", "Call Of The Dead", "Shangri-La", "Moon", "Nacht Der Untoten", "Verrukt", "Shi No Numa", "Der Riese"],
			bo2: ["TranZit", "Die Rise", "Buried", "Mob Of The Dead", "Origins"],
			bo3: ["Shadows Of Evils", "The Giant","Der Eisendrache", "Zetsubou No Shima", "Gorod Krovi", "Revelations"],
			waw: ["Nacht Der Untoten", "Verrukt", "Shi No Numa", "Der Riese"]
		};

		this.maps = {};

		for(var i in maps) {

			this.maps[i] = [];

			for(var j in maps[i]) {

				this.maps[i].push({
					name: maps[i][j],
					slug: maps[i][j].replace(/ /g, '_').toLowerCase()
				});
			}
		}

		this.plays = this.playService.getPlays();

		// FAKE
		this.play = {
			map: "five",
			manches: 1,
			game: "bo1"
		};

		this.players = [];

		for (let i = 0; i < this.playersName.length; ++i) {

			this.players[i] = {
				name: this.playersName[i].toLowerCase(),
				begin: {
					level : 0,
					prestige : 0
				},
				end: {
					level : 0,
					prestige : 0
				},
				nbDeaths : 0,
				nbRea : 0,
				kills : 0,
				headshots : 0
			};
		}
	}

	onSubmit() { this.submitted = true; }

	createPlay() {

		this.play.timestamp = Date.now();
		this.play.players = this.players;
		var test = this.playService.createPlay(this.play);
		console.log(test);
		test.subscribe((response) => {
			console.log(response);
		})
	}

	ngOnInit() {
	}
}
