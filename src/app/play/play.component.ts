import { Component, OnInit } from '@angular/core';
import { PlaysService } from '../plays.service';
import { Player }    from '../classes/Player';

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

		console.log(this.maps);

		this.plays = this.playService.getPlays();

		// FAKE
		this.player = {
			name :"Alexis",
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

		// FAKE
		this.play = {
			map: "Kino Der Toten",
			manches: 0,
			game: "bo1"
		};

		this.players = [];

		console.log(this.playersName.length);

		for (let i = 0; i < this.playersName.length; ++i) {
			this.players[i] = this.player;
		}

		console.log(this.players);
	}

	onSubmit() { this.submitted = true; }

	createPlay() {

		let play = this.playService.getPlayTemplate();

		console.log(this.player);
		this.play.timestamp = Date.now();


		this.play.players.push(this.player);

		this.playService.createPlay(play);
	}

	ngOnInit() {
	}
}
