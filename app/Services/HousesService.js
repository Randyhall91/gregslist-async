import { appState } from "../AppState.js";
import { House } from "../Models/House.js";
import { SandboxServer } from "./AxiosService.js";





export class HousesService {
  async addHouse(formData) {
    const res = await SandboxServer.post('/api/houses', formData)
    console.log('house creation respons', res.data);
    let house = new House(res.data)
    appState.houses = [house, ...appState.houses]

  }

  async getHouses() {
    const res = await SandboxServer.get('/api/houses')
    appState.houses = res.data.map(h => new House(h))
    console.log('getHouses are in appstate', appState.houses);
  }

}


export const housesService = new HousesService()