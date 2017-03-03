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

function mapName(map) {
	map = map.replace(/_/g, " ");
	map = ucFirst(map);

	return map;
}

function ucFirst(str) {
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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
	maxKillsInGame: any = {};
	maxDeathsInGame: any = {};
	maxReaInGame: any = {};
	maxHeadInGame: any = {};
	nbSecretsDone: number = 0;
	bestRatioKillDead: any = {};
	bestRatioKillHeadshot: any = {};

	constructor(private playService: PlaysService) {

		this.playersName = ['ronan', 'alexis', 'guillaume'];
		this.plays = [];
		this.players = {};

		for(var i of this.playersName) {

			this.players[i] = {
				ratioKillDeath: 0,
				ratioKillHeadshot: 0,
				moyDeaths: 0,
				moyKills: 0,
				moyRea: 0,
				moyHeadshots: 0,
				maxKills: 0,
				totalKills: 0,
				maxDeaths: 0,
				totalDeaths: 0,
				maxHeadshots: 0,
				totalHeadshots: 0,
				maxRea: 0,
				totalRea: 0
			};
		}

		this.playService.getPlays().subscribe((response) => {
			this.plays = response.json();
			console.log(this.plays);
			this.makeCalculs();
		});
	}

	getTopFromManches(manches) {

		let top = 0;

		top = this.playMaxManches / manches * 200;

		if(top > 600) top = 600;

		const topString = top.toString()+"px";

		return topString;
	}

	getLinePosition() {

		let top = this.playMaxManches / this.moyManchesByGame * 200;
		top+=80;

		return {
			top: top.toString()+"px"
		};
	}

	getElementPlayStyle(play) {

		const styles = {
			'top': "",
			'color': "#000",
			'font-weight': "normal",
			'background-image': "",
			'background-size': "",
			'background-repeat': "",
			'background-position': ""
		};

		styles.top = this.getTopFromManches(play.manches);

		if(parseInt(play.secret) === 1) {
			styles.color = "green";
			styles['font-weight'] = "bold";
		}

		if(parseInt(play.music) === 1) {
			styles['background-image'] = "url(http://www.freeiconspng.com/uploads/audio-music-notation-note-notes-icon-9.png)";
			styles['background-size'] = "25px";
			styles['background-repeat'] = "no-repeat";
			styles['background-position'] = "50px 0px";
		}

		return styles;
	}

	makeCalculs() {

		// console.log(this.players);

		this.plays.map((x) => {
			x.mapString = this.createMapStrings(x);
			this.handleMoyManches(x);
			this.calculPlayMaxManches(x);
			this.calculSecretsDone(x);
		});

		this.calculMoyManches();
		this.calculMapMorePlayed();

		this.initMoyByPlayer();

		for (var i of this.playersName) {

			this.plays.map((x) => {
				x.players.map((y) => {

					console.log(y);

					this.calculMoyDeathsByPlayer(i, x, y);
					this.calculMoyKillsByPlayer(i, x, y);
					this.calculMoyHeadshotsByPlayer(i, x, y);
					this.calculMoyReaByPlayer(i, x, y);

					this.processMaxKillsByPlayers(i, x, y);
					this.processMaxDeathsByPlayers(i, x, y);
					this.processMaxHeadshotsByPlayers(i, x, y);
					this.processMaxReaByPlayers(i, x, y);
				});
			});

			this.players[i].moyDeaths = round(this.players[i].moyDeaths / this.plays.length, -1);
			this.players[i].moyKills = Math.floor(this.players[i].moyKills / this.plays.length);
			this.players[i].moyHeadshots = Math.floor(this.players[i].moyHeadshots / this.plays.length);
			this.players[i].moyRea = Math.floor(this.players[i].moyRea / this.plays.length);
		}

		this.calculBestRatioKillDead();
		this.calculBestRatioKillHeadshot();
	}

	createMapStrings(x) {
		return mapName(x.map);
	}

	handleMoyManches(x) {
		this.moyManchesByGame += parseInt(x.manches);
	}

	calculMoyManches() {
		this.moyManchesByGame = round(this.moyManchesByGame / this.plays.length, -1);
	}

	calculPlayMaxManches(x) {

		if(parseInt(x.manches) > this.playMaxManches) {
			this.playMaxManches = parseInt(x.manches);
		}
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
					name: mapName(i),
					count: mapsPlays[i]
				};
			}
		}
	}

	calculSecretsDone(x) {

		if(parseInt(x.secret) === 1) {
			++this.nbSecretsDone;
		}
	}

	initMoyByPlayer() {

		this.maxDeathsInGame = {
			name: "",
			count: 0,
			map: ""
		};

		this.maxKillsInGame = {
			name: "",
			count: 0,
			map: ""
		};

		this.maxHeadInGame = {
			name: "",
			count: 0,
			map: ""
		};

		this.maxReaInGame = {
			name: "",
			count: 0,
			map: ""
		};

		this.bestRatioKillDead = {
			name: "",
			count: 0
		};

		this.bestRatioKillHeadshot = {
			name: "",
			count: 100
		};
	}

	calculMoyDeathsByPlayer(i, x, y) {

		if(y.name === i) {
			this.players[i].moyDeaths += parseInt(y.nbDeaths);
		}

		if(parseInt(y.nbDeaths) > this.maxDeathsInGame.count) {

			this.maxDeathsInGame = {
				name: ucFirst(y.name),
				count: parseInt(y.nbDeaths),
				map: mapName(x.map)
			};
		}
	}

	calculMoyKillsByPlayer(i, x, y) {

		if(y.name === i) {
			this.players[i].moyKills += parseInt(y.kills);
		}

		if(parseInt(y.kills) > this.maxKillsInGame.count) {

			this.maxKillsInGame = {
				name: ucFirst(y.name),
				count: parseInt(y.kills),
				map: mapName(x.map)
			};
		}
	}

	calculMoyHeadshotsByPlayer(i, x, y) {

		if(y.name === i) {
			this.players[i].moyHeadshots += parseInt(y.headshots);
		}

		if(parseInt(y.headshots) > this.maxHeadInGame.count) {

			this.maxHeadInGame = {
				name: ucFirst(y.name),
				count: parseInt(y.headshots),
				map: mapName(x.map)
			};
		}
	}

	calculMoyReaByPlayer(i, x, y) {

		if(y.name === i) {
			this.players[i].moyRea += parseInt(y.nbRea);
		}

		if(parseInt(y.nbRea) > this.maxReaInGame.count) {

			this.maxReaInGame = {
				name: ucFirst(y.name),
				count: parseInt(y.nbRea),
				map: mapName(x.map)
			};
		}
	}

	processMaxKillsByPlayers(i, x, y) {

		if(y.name === i && parseInt(y.kills) > this.players[i].maxKills) {
			this.players[i].maxKills = parseInt(y.kills);
			this.players[i].totalKills += parseInt(y.kills);
		}
	}

	processMaxDeathsByPlayers(i, x, y) {

		if(y.name === i && parseInt(y.nbDeaths) > this.players[i].maxDeaths) {
			this.players[i].maxDeaths = parseInt(y.nbDeaths);
			this.players[i].totalDeaths += parseInt(y.nbDeaths);
		}
	}

	processMaxHeadshotsByPlayers(i, x, y) {

		if(y.name === i && parseInt(y.headshots) > this.players[i].maxHeadshots) {
			this.players[i].maxHeadshots = parseInt(y.headshots);
			this.players[i].totalHeadshots += parseInt(y.headshots);
		}
	}

	processMaxReaByPlayers(i, x, y) {

		if(y.name === i && parseInt(y.nbRea) > this.players[i].maxRea) {
			this.players[i].maxRea = parseInt(y.nbRea);
			this.players[i].totalRea += parseInt(y.nbRea);
		}
	}

	calculBestRatioKillDead() {

		const players = [];

		this.plays.map((x) => {

			x.players.map((y) => {

				if(typeof players[y.name] !== "undefined") {
					players[y.name].totalKills += parseInt(y.kills);
					players[y.name].totalDeaths += parseInt(y.nbDeaths);

				} else {
					players[y.name] = {
						totalKills: 0,
						totalDeaths: 0
					};
				}
			});
		});

		for(var i in players) {
			players[i].ratio = round(players[i].totalKills / players[i].totalDeaths, 0);
			this.players[i].ratioKillDeath = players[i].ratio;

			if(players[i].ratio > this.bestRatioKillDead.count) {

				this.bestRatioKillDead = {
					name: ucFirst(i),
					count: players[i].ratio
				};
			}
		}
	}

	calculBestRatioKillHeadshot() {

		const players = [];

		this.plays.map((x) => {

			x.players.map((y) => {

				if(typeof players[y.name] !== "undefined") {
					players[y.name].totalKills += parseInt(y.kills);
					players[y.name].totalHeadshots += parseInt(y.headshots);

				} else {
					players[y.name] = {
						totalKills: 0,
						totalHeadshots: 0
					};
				}
			});
		});

		for(var i in players) {
			players[i].ratio = round(players[i].totalKills / players[i].totalHeadshots, -1);
			this.players[i].ratioKillHeadshot = players[i].ratio;

			if(players[i].ratio < this.bestRatioKillHeadshot.count) {

				this.bestRatioKillHeadshot = {
					name: ucFirst(i),
					count: players[i].ratio
				};
			}
		}
	}
}
