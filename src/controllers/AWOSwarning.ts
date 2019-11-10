import { Request, Response } from 'express'
import { getWarning } from '../services/AWOSwarning'
import createMockMessage from "../mockdata/message"

/* API Controllers */
export const getAWOSs = async (req: Request, res: Response) => {
  try {
      // createMockMessage()
   
    const AWOSwarnings = await getWarning()
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

