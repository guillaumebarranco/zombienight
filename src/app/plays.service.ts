import { Injectable } from '@angular/core';

@Injectable()
export class PlaysService {
    players: any;
    plays: any;
    playTemplate: any;
    playerTemplate: any;

    constructor() {

        this.playTemplate = {
            timestamp: "",
            game: "",
            map: "",
            manches: 0,
            players: []
        };

        this.playerTemplate = {
            name: "",
            beginning: {
                level: 30,
                prestige: 0
            },
            end: {
                level: 35,
                prestige: 1
            },
            nbDeaths: "",
            nbRea: "",
            kills: "",
            headshots: ""
        };

        this.players = [
            {
                name: "Ronan"
            },
            {
                name: "Alexis"
            },
            {
                name: "Guillaume"
            }
        ];

        this.plays = [

            {
                timestamp: "",
                game: "BO3",
                map: "Gorod Krovi",
                manches: 23,

                players: this.players
            }

        ];
    }

    createPlayer(player) {
        this.players.push(player);
    }

    getPlayers() {
        return this.players;
    }

    getPlayTemplate() {
        return this.playTemplate;
    }

    getPlayerTemplate() {
        return this.playerTemplate;
    }

    createPlay(play) {

        console.log("new play", play);

        this.plays.push(play);
    }

    getPlays() {
        return this.plays;
    }
}
