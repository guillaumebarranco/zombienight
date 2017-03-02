import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PlaysService {
    players: any;
    plays: any;
    playTemplate: any;
    playerTemplate: any;

    constructor(private http: Http) {

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

    private _serverError(err: any) {
        console.log('sever error:', err);  // debug
        if(err instanceof Response) {
          return Observable.throw(err.json().error || 'backend server error');
          // if you're using lite-server, use the following line
          // instead of the line above:
          //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(err || 'backend server error');
    }

    createAuthorizationHeader(headers:Headers) {
        headers.append('Authorization', 'Basic ' +
          btoa('a20e6aca-ee83-44bc-8033-b41f3078c2b6:c199f9c8-0548-4be79655-7ef7d7bf9d20')); 
      }

    createPlay(play) {

        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        var requestoptions = new RequestOptions({
            url: "http://localhost/zombienightapi/serveur.php?function=createPlay",
            headers: headers,
            body: JSON.stringify(play)
        })

        console.log("new play", play);

        // play = JSON.stringify(play);
        // console.log(play);

        return this.http.post("http://localhost/zombienightapi/serveur.php?function=createPlay", play, requestoptions)
            .map((res:Response) => {
                console.log(res.json());
            })
            .catch(this._serverError);
    }

    getPlays() {
        return this.http.get("http://localhost/zombienightapi/serveur.php?function=getPlays");
    }
}
