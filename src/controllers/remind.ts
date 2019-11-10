import { Request, Response } from 'express'
import reminder from '../services/remind'
import Iremind from '../Interface/Iremind'
/* API Controllers */
export const updateRemind = async (req:Request, res:Response) => {
  try {
    const para : Iremind = {
      id: req.params.id,
      updatetime: req.body.updatetime,
      remindtype: req.body.type
    }
    reminder.updateReminder(para)
    res.json('OK')
  } catch (err) {
    res.status(500)
    res.send(err)
  }
}
export const getRemind = async (req:Request, res:Response) => {
  try {
    const data = await reminder.getReminders()
    res.json(data)
  } catch (err) {
    res.status(500)
    res.send(err)
  }
}

export const deleteRemind = async (req:Request, res:Response) => {
  try {
    const data = await reminder.deleteReminders(req.params.id)
    res.json(data)
  } catch (err) {
    res.status(500)
    res.send(err)
  }
}


