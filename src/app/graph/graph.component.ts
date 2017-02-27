import { Component, OnInit } from '@angular/core';
import { PlaysService } from '../plays.service';
import { MomentModule } from 'angular2-moment';

@Component({
	selector: 'app-graph',
	templateUrl: './graph.component.html',
	styleUrls: ['./graph.component.css'],
	providers: [PlaysService]
})

export class GraphComponent {
	plays: any;
	moyManchesByGame: number = 0;
	players: any;
	playersName: any;

	constructor(private playService: PlaysService) {

		this.playersName = ['ronan', 'alexis', 'guillaume'];

		this.plays = [];

		this.players = {};

		for(var i of this.playersName) {

			this.players[i] = {

			};
		}

		this.playService.getPlays().subscribe((response) => {

			this.plays = response.json();
			console.log(this.plays);

			this.makeCalculs();
		});
	}

	makeCalculs() {

		this.calculMoyManches();
		this.calculMoyDeathsByPlayer();
	}

	calculMoyManches() {

		this.plays.map((x) => {
			this.moyManchesByGame += parseInt(x.manches);
		});

		this.moyManchesByGame = this.moyManchesByGame / this.plays.length;
	}

	calculMoyDeathsByPlayer() {

		for (var i of this.playersName) {

			this.players[i] = {
				moyDeaths: 0
			};

			this.plays.map((x) => {
				x.players.map((y) => {

					if(y.name === i) {
						this.players[i].moyDeaths += parseInt(y.nbDeaths);
					}
				});
			});

			this.players[i].moyDeaths = this.players[i].moyDeaths / this.plays.length;
		}
	}
}
