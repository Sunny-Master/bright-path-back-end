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

export { 
  create,
  show,
  update
}