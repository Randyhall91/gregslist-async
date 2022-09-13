import { appState } from "../AppState.js"
import { Job } from "../Models/job.js"
import { Pop } from "../Utils/Pop.js"
import { SandboxServer } from "./AxiosService.js"


class JobsService {
  async editJob(formData) {
    const job = appState.activeJob
    const res = await SandboxServer.put(`/api/jobs/${job.id}`, formData)
    console.log('update response', res.data);
    const updateJob = new Job(res.data)

    const index = appState.jobs.findIndex(i => i.id == job.id)
    appState.jobs.splice(index, 1, updateJob)
    appState.emit('jobs')
  }
  setActiveJob(id) {
    const job = appState.jobs.find(j => j.id == id)
    if (!job) { throw new Error('Not the job you are looking for') }

    appState.activeJob = job
    console.log("active job", job);

  }
  async deleteJob(id) {
    const yes = await Pop.confirm('Delete this Job?')
    if (!yes) { return }

    await SandboxServer.delete(`/api/jobs/${id}`)
    appState.jobs = appState.jobs.filter(j => j.id = id)
  }

  async getJobs() {
    const res = await SandboxServer.get('/api/jobs')
    appState.jobs = res.data.map(j => new Job(j))
    console.log('getJobs', appState.jobs);
  }


  async addJob(formData) {
    const res = await SandboxServer.post('/api/jobs', formData)
    console.log('Create job response', res.data)
    let job = new Job(res.data)
    appState.jobs = [job, ...appState.jobs]
    // console.log('jobs from server', res.data);
  }
}

export const jobsService = new JobsService()