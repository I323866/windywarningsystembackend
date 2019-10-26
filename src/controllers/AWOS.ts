import { Request, Response } from 'express'
import {getRNO01} from '../services/AWOS'

/* API Controllers */
export const getAWOSs = async (req:Request, res:Response) => {
  try {
    const AWOSs = await getRNO01()
    res.json(AWOSs.rows)
  } catch (err) {
    res.status(500)
    res.send(err)
  }
}

