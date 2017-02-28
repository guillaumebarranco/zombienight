import { Component, OnInit } from '@angular/core';
import { PlaysService } from '../plays.service';
import { MomentModule } from 'angular2-moment';

function round(value, exp) {
	// Si la valeur de exp n'est pas définie ou vaut zéro...
	if (typeof exp === 'undefined' || +exp === 0) {
	return Math['round'](value);
	}
	value = +value;
	exp = +exp;
	// Si la valeur n'est pas un nombre 
	// ou si exp n'est pas un entier...
	if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
	return NaN;
	}
	// Décalage
	value = value.toString().split('e');
	value = Math['round'](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
	// Décalage inversé
	value = value.toString().split('e');
	return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

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
	playMaxManches: number = 0;
	mapMorePlayed: any = {};

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

	getTopFromManches(manches) {

		let top = 0;

		top = this.playMaxManches / manches * 50;

		if(top > 400) top = 400;

		const topString = top.toString()+"px";

		return {
			top: topString
		};
	}

	makeCalculs() {

		this.createMapStrings();
		this.calculMoyManches();
		this.calculPlayMaxManches();
		this.calculMapMorePlayed();

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

	createMapStrings() {

		this.plays.map((x) => {
			x.mapString = x.map.replace(/_/g, " ");
		});
	}

	calculMoyManches() {

		this.plays.map((x) => {
			this.moyManchesByGame += parseInt(x.manches);
		});

		this.moyManchesByGame = round(this.moyManchesByGame / this.plays.length, -1);
	}

	calculPlayMaxManches() {

		this.plays.map((x) => {

			if(parseInt(x.manches) > this.playMaxManches) {
				this.playMaxManches = parseInt(x.manches);
			}
		});
	}

	calculMapMorePlayed() {

		let mapsPlays = [];

		this.mapMorePlayed = {
			name: "",
			count: 0
		};

		this.plays.map((x) => {

			if(typeof mapsPlays[x.map] === "undefined") {
				mapsPlays[x.map] = 1;
			} else {
				mapsPlays[x.map] = mapsPlays[x.map] + 1;
			}
		});

		for(let i in mapsPlays) {

			if(mapsPlays[i] > this.mapMorePlayed.count) {

				this.mapMorePlayed = {
					name: i,
					count: mapsPlays[i]
				};
			}
		}
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

			this.players[i].moyDeaths = round(this.players[i].moyDeaths / this.plays.length, -1);
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
