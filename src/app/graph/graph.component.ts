import { Component, OnInit } from '@angular/core';
import { PlaysService } from '../plays.service';
import { MomentModule } from 'angular2-moment';

@Component({
	selector: 'app-graph',
	templateUrl: './graph.component.html',
	styleUrls: ['./graph.component.css'],
	providers: [PlaysService]
})

export class GraphComponent implements OnInit {
	plays: any;
	players: any;

	constructor(private playService: PlaysService) {

		this.plays = this.playService.getPlays();
		this.players = this.playService.getPlayers();
	}


	createPlay() {

		let play = this.playService.getPlayTemplate();

		play.timestamp = Date.now();
		play.game = "bo3";
		play.map = "Gorod Krovi";
		play.manches = 24;

		let player = this.playService.getPlayerTemplate();

		player.name = "Ronan";
		player.beginning.level = 34;
		player.beginning.prestige = 0;
		player.end.level = 2;
		player.end.prestige = 1;
		player.nbDeaths = 4;
		player.nbRea = 3;
		player.kills = 578;
		player.headshots = 213;

		play.players.push(player);

		this.playService.createPlay(play);
	}

	ngOnInit() {
	}

}
