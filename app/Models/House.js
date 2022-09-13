





export class House {

  /**@param {{id?: string, bedrooms: number, levels: number, year: number, price: number, imgUrl: string, description: string}} data*/
  constructor(data) {
    this.id = data.id
    this.bedrooms = data.bedrooms
    this.levels = data.levels
    this.year = data.year
    this.price = data.price
    this.imgUrl = data.imgUrl
    this.description = data.description
  }

  get HouseCardTemplate() {
    return/*html*/`
    <div class="col-md-4 col-lg-3 mb-3">
      <div class="card">
        <img src="${this.imgUrl}" alt="house" class="img-fluid">
        <div class="card-body">
          <h5 class="text-uppercase">
             Year:${this.year} | Rooms:${this.bedrooms} Levels:${this.levels}
          </h5>
          <p>
            <strong>$ ${this.price}</strong>
          </p>
          <p>${this.description}</p>
        </div>
        <div class="card-footer d-flex align-items-center justify-content-around">
          <button class="btn text-uppercase" onclick="app.carsController.deleteHouse('${this.id}')">Delete</button>
          <button class="btn text-uppercase text-success" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.carsController.beginEdit('${this.id}')">Edit</button>
        </div>
      </div>
    </div>
  
  `
  }



  /**@param {House} [editable] */
  static getHouseForm(editable) {

    editable = editable || new House({ bedrooms: 0, levels: 0, year: 0, price: 0, imgUrl: '', description: '' })



    return/*html*/`
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="rightBarLabel">Edit House</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <form onsubmit="app.housesController.handleSubmit()">

        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="price" required minlength="3" maxlength="20" value='${editable.price}'>
          <label for="price">Price</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="bedrooms" required value='${editable.bedrooms}'>
          <label for="bedrooms">Bedrooms</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="levels" required min="0" value='${editable.levels}'>
          <label for="levels">Levels</label>
        </div>
        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="year" required min="10" max="9999" value='${editable.year}'>
          <label for="year">Year</label>
        </div>
        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="imgUrl" required min="10" max="9999" value='${editable.imgUrl}'>
          <label for="imgUrl">Image Link</label>
        </div>


        <div class="form-floating">
          <textarea class="form-control" placeholder="Describe your House" name="description">${editable.description}</textarea>
          <label for="description">House Description</label>
        </div>

        <div class="d-flex my-4 gap-5 align-items-center">
          <button class="btn" type="reset">Cancel</button>
          <button class="btn btn-primary" type="submit">Submit</button>
        </div>


      </form>
    `
  }

}