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
			this.players[i] = {};
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
		this.calculMoyKillsByPlayer();
		this.calculMoyHeadshotsByPlayer();
		this.calculMoyReaByPlayer();

		this.processMaxKillsByPlayers();
		this.processMaxDeathsByPlayers();
		this.processMaxHeadshotsByPlayers();
		this.processMaxReaByPlayers();

		console.log(this.players);
	}

	calculMoyManches() {

		this.plays.map((x) => {
			this.moyManchesByGame += parseInt(x.manches);
		});

		this.moyManchesByGame = this.moyManchesByGame / this.plays.length;
	}

	calculMoyDeathsByPlayer() {

		for (var i of this.playersName) {

			this.players[i].moyDeaths = 0;

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

	calculMoyKillsByPlayer() {

		for (var i of this.playersName) {

			this.players[i].moyKills = 0;

			this.plays.map((x) => {
				x.players.map((y) => {

					if(y.name === i) {
						this.players[i].moyKills += parseInt(y.kills);
					}
				});
			});

			this.players[i].moyKills = Math.floor(this.players[i].moyKills / this.plays.length);
		}
	}

	calculMoyHeadshotsByPlayer() {

		for (var i of this.playersName) {

			this.players[i].moyHeadshots = 0;

			this.plays.map((x) => {
				x.players.map((y) => {

					if(y.name === i) {
						this.players[i].moyHeadshots += parseInt(y.headshots);
					}
				});
			});

			this.players[i].moyHeadshots = Math.floor(this.players[i].moyHeadshots / this.plays.length);
		}
	}

	calculMoyReaByPlayer() {

		for (var i of this.playersName) {

			this.players[i].moyRea = 0;

			this.plays.map((x) => {
				x.players.map((y) => {

					if(y.name === i) {
						this.players[i].moyRea += parseInt(y.nbRea);
					}
				});
			});

			this.players[i].moyRea = Math.floor(this.players[i].moyRea / this.plays.length);
		}
	}

	processMaxKillsByPlayers() {

		for (var i of this.playersName) {

			this.players[i].maxKills = 0;

			this.plays.map((x) => {
				x.players.map((y) => {

					if(y.name === i && parseInt(y.kills) > this.players[i].maxKills) {
						this.players[i].maxKills = parseInt(y.kills);
					}
				});
			});
		}
	}

	processMaxDeathsByPlayers() {

		for (var i of this.playersName) {

			this.players[i].maxDeaths = 0;

			this.plays.map((x) => {
				x.players.map((y) => {

					if(y.name === i && parseInt(y.nbDeaths) > this.players[i].maxDeaths) {
						this.players[i].maxDeaths = parseInt(y.nbDeaths);
					}
				});
			});
		}
	}

	processMaxHeadshotsByPlayers() {

		for (var i of this.playersName) {

			this.players[i].maxHeadshots = 0;

			this.plays.map((x) => {
				x.players.map((y) => {

					if(y.name === i && parseInt(y.headshots) > this.players[i].maxHeadshots) {
						this.players[i].maxHeadshots = parseInt(y.headshots);
					}
				});
			});
		}
	}

	processMaxReaByPlayers() {

		for (var i of this.playersName) {

			this.players[i].maxRea = 0;

			this.plays.map((x) => {
				x.players.map((y) => {

					if(y.name === i && parseInt(y.nbRea) > this.players[i].maxRea) {
						this.players[i].maxRea = parseInt(y.nbRea);
					}
				});
			});
		}
	}
}
