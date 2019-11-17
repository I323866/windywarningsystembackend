import { Request, Response } from 'express'
import { getWarning } from '../services/AWOSwarning'
import { checkCloudWarning } from '../services/cloudWarning'
import { checkCloudWarning  as cloudWarning1 } from '../services/cloudWarning1'
import { checkRVRWarning } from '../services/RVRWarning'
import { checkTEMPWarning } from '../services/TEMPWarning'
import { checkWindWarning } from '../services/windWarning'
import createMockMessage from "../mockdata/message"

/* API Controllers */
export const getAWOSs = async (req: Request, res: Response) => {
  try {
      // createMockMessage()
    await checkCloudWarning()
    await cloudWarning1()
    await checkRVRWarning()
    await checkTEMPWarning()
    await checkWindWarning()

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

