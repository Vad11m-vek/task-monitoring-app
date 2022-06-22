import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/dbConnect'
import Task from '../../../models/Task'

type Data = {
  name: string,
  data?: any,
  success: boolean,
}

async function start() {
  await dbConnect()
}
start()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      try {
        const tasks = await Task.find({})
        return res.status(201).json({ success: true, data: tasks })
      } catch (error) {
        return res.status(400).json({ success: false })
      }
    case 'POST':
      try {
        console.log(req.body);

        const task = await Task.create(req.body)
        // console.log(req.query.user);
        // const task = new Task({
        //   ...req.body,
        // })
        // task.save()
        return res.status(201).json({ success: true, data: task })
      } catch (error) {
        return res.status(400).json({ success: false, e: error })
      }
    // try {
    //   const maybeteam = await User.findOne({ name: req.body.name }).exec()
    //   console.log(req.body.name, '--------', maybeteam)
    //   let team
    //   !maybeteam ? team = await User.create(req.body) : team = await User.updateOne({ name: req.body.name }, { $set: { score: maybeteam.score + 1 } })
    //   return res.status(201).json({ success: true, data: team })
    // } catch (error) {
    //   return res.status(400).json({ success: false })
    // }
  }
}