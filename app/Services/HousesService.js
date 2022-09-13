import { appState } from "../AppState.js";
import { House } from "../Models/House.js";
import { SandboxServer } from "./AxiosService.js";





export class HousesService {
  async getHouses() {
    const res = await SandboxServer.get('/api/houses')
    appState.houses = res.data.map(h => new House(h))
    console.log('getHouses are in appstate', appState.houses);
  }
}


export const housesService = new HousesService()