import mongoose from 'mongoose'

const Schema = mongoose.Schema

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
},{
  timestamps: true,
})

const jobSchema = new Schema({
  candidate: { type: Schema.Types.ObjectId, ref: 'Profile' },
  company: { type: String, required: true },
  position: { type: String, required: true },
  status: { 
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied'
  },
  appliedDate: { type: Date, required: true, default: Date.now },
  appliedFrom: String,
  docLink: { type: String, required: true },
  notes: String,
  tasks: [taskSchema],
},{
  timestamps: true,
})

const Job = mongoose.model('Job', jobSchema)

export { Job }