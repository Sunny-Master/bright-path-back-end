import { Profile } from "../models/profile.js"
import { Job } from "../models/job.js"

async function create(req, res) {
  try {
    req.body.candidate = req.user.profile
    const job = await Job.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { jobs: job }},
      { new: true }
    )
    res.status(201).json(job)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function index(req, res){
  try {
    const jobs = await Job.find({candidate: req.user.profile}).sort({ updatedAt: 'desc'})
    res.status(200).json(jobs)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const job = await Job.findById(req.params.jobId)
    res.status(200).json(job)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.jobId,
      req.body,
      { new: true }
    )
    res.status(200).json(job)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteJob(req, res) {
  try {
    const job = await Job.findByIdAndDelete(req.params.jobId)
    const profile = await Profile.findById(req.user.profile)
    profile.jobs.remove({ _id: req.params.jobId })
    await profile.save()
    res.status(200).json(job)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function createTask(req, res) {
  try {
    const job = await Job.findById(req.params.jobId)
    job.tasks.push(req.body)
    await job.save()
    const newTask = job.tasks.at(-1)
    res.status(201).json(newTask)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function updateTask(req, res) {
  try {
    const job = await Job.findById(req.params.jobId)
    const task = job.tasks.id(req.body._id)
    task.set(req.body)
    await job.save()
    res.status(200).json(job)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export { 
  //job controller functions
  create,
  index,
  show,
  update,
  deleteJob as delete,

  // job-task controller functions
  createTask,
  updateTask
}