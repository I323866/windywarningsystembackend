import * as db  from '../dao/getdb'
import message from './message'

export const  getWarning = () => {
  return  message.getMessages()
}