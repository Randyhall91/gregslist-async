import { appState } from "../AppState.js"
import { Job } from "../Models/job.js"
import { jobsService } from "../Services/JobsService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function drawJobs() {
  let template = ''
  appState.jobs.forEach(job => template += job.JobCardTemplate)
  // TODO trigger bad set
  setHTML('listings', template)
}


export class JobsController {
  constructor() {
    // console.log('the jobs controller')
    appState.on('jobs', drawJobs)
    // this.showJobs()
  }

  async handleSubmit() {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      const form = window.event.target
      let formData = getFormData(form)



      if (appState.activeJob) {
        await jobsService.editJob(formData)
      } else {
        await jobsService.addJob(formData)
      }

      // @ts-ignore
      form.reset()
    } catch (error) {
      console.error('[AddJob]', error)
      Pop.error(error)
    }
  }

  async getJobs() {
    try {
      await jobsService.getJobs()
    } catch (error) {
      console.error('[GetJob]', error);
      Pop.error(error)
    }
  }

  showJobs() {
    drawJobs()
    this.getJobs()
    setHTML('forms', Job.getJobForm())
  }


  addJob() {
    const template = Job.getJobForm()
    setHTML('forms', template)
  }

  async deleteJob(id) {
    try {
      await jobsService.deleteJob(id)
    } catch (error) {
      console.error('[DeleteJob]', error);
    }
  }

  beginEdit(id) {
    jobsService.setActiveJob(id)
    const editable = appState.activeJob
    const template = Job.getJobForm(editable)
    setHTML('forms', template)
  }

}