import { Request, Response } from 'express'
import { checkWarning } from '../services/warning'
import moment from 'moment'
/* API Controllers */
export const getAWOSs = async (req: Request, res: Response) => {
  try {
    const AWOSs = await checkWarning()
    const now = moment()
      .locale('zh-cn')
      .format('YYYY-MM-DD HH:mm:ss')
    const AWOSwarnings = []
    AWOSwarnings.push({ time: now, priority: 1, message: '告警' })
    AWOSwarnings.push({ time: now, priority: 2, message: '告警' })
    AWOSwarnings.push({ time: now, priority: 1, message: '告警' })
    res.json(AWOSwarnings)
  } catch (err) {
    res.status(500)
    res.send(err)
  }
}
export const updateWarningOn = async (req: Request, res: Response) => {
  try {
    const text = req.body.name
    const id = req.params.id
    // await updateDisable()
    // res.json()
  } catch (err) {
    res.status(500)
    res.send(err)
  }
}
export const updateDisable = async (req: Request, res: Response) => {
  try {
    const text = req.body.name
    const id = req.params.id
    // await updateDisable(id ,text)
    // res.json()
  } catch (err) {
    res.status(500)
    res.send(err)
  }
}

