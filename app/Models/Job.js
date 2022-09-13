

export class Job {
  /**
   * 
   * @param {{jobTitle: string, company: string, hours: number, rate: number, description: string, id?: string}} data 
   */

  constructor(data) {
    this.id = data.id
    this.jobTitle = data.jobTitle
    this.company = data.company
    this.hours = data.hours
    this.rate = data.rate
    this.description = data.description
  }



  get JobCardTemplate() {
    return /*html*/`
  <div class="col-12">
      <h3>${this.jobTitle}</h3>
      <h5>${this.company}</h5>
      
      <p>Hours: ${this.hours}</p>
      <p>Rate: ${this.rate}</p>
      <p>Description: ${this.description}</p>
      <div class="d-flex">
        <button class="btn me-2 text-uppercase" onclick="app.jobsController.deleteJob('${this.id}')">Delete</button>
        <button class="btn text-success text-uppercase" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.jobsController.beginEdit('${this.id}')">Edit</button>
      
      </div>
      
  </div>

  `
  }


  /**@param {Job} [editable] */
  static getJobForm(editable) {

    editable = editable || new Job({ jobTitle: '', company: '', hours: 0, rate: 0, description: '' })



    return/*html*/`
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="rightBarLabel">${editable.id ? 'Edit Job' : 'Make Job'}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <form onsubmit="app.jobsController.handleSubmit()">

        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="company" required minlength="3" maxlength="20" value='${editable.company}'>
          <label for="company">Company</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="jobTitle" required value='${editable.jobTitle}'>
          <label for="jobTitle">Job Title</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="hours" required min="10" max="9999" value='${editable.hours}'>
          <label for="hours">Hours</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="rate" required min="0" value='${editable.rate}'>
          <label for="rate">Rate/hr</label>
        </div>

        <div class="form-floating">
          <textarea class="form-control" placeholder="Describe your Job" name="description">${editable.description}</textarea>
          <label for="description">Job Description</label>
        </div>

        <div class="d-flex my-4 gap-5 align-items-center">
          <button class="btn" type="reset">Cancel</button>
          <button class="btn btn-primary" type="submit">Submit</button>
        </div>


      </form>
    `
  }

}