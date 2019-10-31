import { Request, Response } from 'express'
import { checkSpeed } from '../services/Warning'
import moment from 'moment'
/* API Controllers */
export const getAWOSs = async (req: Request, res: Response) => {
  try {
    const AWOSs = await checkSpeed()
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
