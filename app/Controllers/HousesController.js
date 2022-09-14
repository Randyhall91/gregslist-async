import { appState } from "../AppState.js";
import { House } from "../Models/House.js";
import { housesService } from "../Services/HousesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";


function drawHouses() {
  let template = ''
  appState.houses.forEach(house => template += house.HouseCardTemplate)
  setHTML('listings', template)
}



export class HousesController {
  constructor() {
    console.log('reporting in from the houses controller');
    this.showHouses()
    appState.on('houses', drawHouses)
  }
  async getHouses() {
    try {
      await housesService.getHouses()
    } catch (error) {
      console.error('[GetHouse]', error);
      Pop.error(error)
    }
  }
  showHouses() {
    this.getHouses()
    drawHouses()
    setHTML('forms', House.getHouseForm())
  }

  addHouse() {
    const template = House.getHouseForm()
    setHTML('forms', template)
  }

  async handleSubmit() {
    try {
      // @ts-ignore
      window.event.preventDefault
      // @ts-ignore
      const form = window.event.target
      let formData = getFormData(form)
      await housesService.addHouse(formData)
      // @ts-ignore
      form.reset()


    } catch (error) {
      console.error('[AddHouse]', error);
      Pop.error(error)
    }
  }

}