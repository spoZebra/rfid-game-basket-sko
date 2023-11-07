import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playerName: string;

  constructor() {
    this.playerName = '';
  }

  setPlayerName(name: string) {
    this.playerName = name;
  }

  getPlayerName() {
    return this.playerName;
  }
}