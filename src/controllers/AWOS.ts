import { Request, Response } from 'express'
import {getRNO01} from '../services/AWOS'

/* API Controllers */
export const getAWOSs = async (req:Request, res:Response) => {
  try {
    // const AWOSs = await getRNO01()
    const AWOSs = 
    {"AWOS1":[["a201910271203SSS0001","ZSSS","2019-10-27T04:03:06.000Z","2019-10-27T04:03:06.000Z","20191027","1203","01","18L ","MID ","36R ","P2000","P2000","3800","3800",1556,2.4,263,2.09,265,3.2,355,1019.9,1019.6,15.3,68,9.49,null,null,"P2000","P2000","10000","10000",null,null,null,null,null,null,null,null,null,null,null,null,"P2000","P2000","10000","10000",null,2.23,233,1.94,222,2.8000000000000003,265,1019.9,14.6,74,null,null]],"AWOS2":[["a201910271203SSS0002","ZSSS","2019-10-27T04:03:06.000Z","2019-10-27T04:03:06.000Z","20191027","1203","02","18R ","MID ","36L ","P2000","P2000","10000","10000",1556,2.23,282,1.87,272,5.2,343,1019.9,1019.5,15.1,68,9.3,null,null,"P2000","P2000","9000","9000",null,2.79,236,2.77,234,5.8,263,null,null,null,null,null,"P2000","P2000","9000","9000",null,2.13,241,1.97,242,2.8000000000000003,300,1019.9,14.9,71,null,null]]}
    res.json(AWOSs)
  } catch (err) {
    res.status(500)
    res.send(err)
  }
}

