import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GAME_API } from './game.service.api';

@Injectable()
export class GameService {

    constructor(private http:HttpClient) { }


    findKill(fileName: string) {
        return  this.http.get(`${GAME_API}/games/kill/${fileName}`);
    }

    findFiles() {
        return  this.http.get(`${GAME_API}/games/files`);
    }

}