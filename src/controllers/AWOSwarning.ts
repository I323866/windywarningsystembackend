import { Request, Response } from 'express'
import { checkWarning } from '../services/warning'
import moment from 'moment'
/* API Controllers */
export const getAWOSs = async (req: Request, res: Response) => {
  try {
    const AWOSs = await checkWarning()
    const AWOSwarnings = []
    // warning1: checkWindDir(latestwinddir, latestmin10winddir, latestTDZwinddir), //告警内容【类别：1.1风向趋势告警，内容：注意风向变化】
    // warning2: checkWindSpeed(latestwindspeed, latestmin10windspeed), //告警内容【类别：风速趋势告警，内容：风速快速变化】
    // warning3: checkBlastofWind(latestwindspeed), //告警内容【类别：1.3阵风告警，内容：注意阵风】
    // warning5: checkTwiceBlastofWind(latestwindspeed, latestmin2windspeed), //告警内容【类别：1.4大风告警，内容：注意大风】
    if (AWOSs) {
      if (AWOSs.warning1) {
        AWOSwarnings.push({  selection : false ,time: AWOSs.receivetime, priority: AWOSs.warning1.type, message: AWOSs.warning1.content })
      } 
     if (AWOSs.warning2) {
        AWOSwarnings.push({  selection : false ,time: AWOSs.receivetime, priority: AWOSs.warning2.type, message: AWOSs.warning2.content })
      }
      if (AWOSs.warning3) {
        AWOSwarnings.push({ selection : false , time: AWOSs.receivetime, priority: AWOSs.warning3.type, message: AWOSs.warning3.content })
      }
      if (AWOSs.warning5) {
        AWOSwarnings.push({  selection : false ,time: AWOSs.receivetime, priority: AWOSs.warning5.type, message: AWOSs.warning5.content })
      }

      // const AWOSwarnings = []
      // AWOSwarnings.push({ time: now, priority: 1, message: '告警' })
      // AWOSwarnings.push({ time: now, priority: 2, message: '告警' })
      // AWOSwarnings.push({ time: now, priority: 1, message: '告警' })
      res.json(AWOSwarnings)
    }else {
      const now = moment()
      .locale('zh-cn')
      .format('YYYY-MM-DD HH:mm:ss')
      AWOSwarnings.push({ time: now, priority: "风向趋势告警", message: "注意风向变化测试" })
      res.json(AWOSwarnings)
    }
    console.log(AWOSwarnings)
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

