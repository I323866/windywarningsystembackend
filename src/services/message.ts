import { getManager } from 'typeorm'
import { Messages } from '../models/Message'
import moment from 'moment'
const now = moment()
  .locale('zh-cn')
  .format('YYYY-MM-DD')
const yesterday = moment()
  .subtract(1, 'days')
  .format('YYYY-MM-DD')
const getMessages = async () => {
  const messageRepo = getManager().getRepository(Messages)

  // const messageRepo = getManager().getRepository(Messages).createQueryBuilder("message").where("message.createDateOn = " + now + "or message.createDateOn = "+ yesterday)
  return messageRepo.find()
}
const addMessage = async (type: string, content: string) => {
  const messageRepo = getManager().getRepository(Messages)
  const message: Messages = new Messages()
  message.type = type
  message.content = content
  message.createOn = moment()
    .locale('zh-cn')
    .format('YYYY-MM-DD HH:mm:ss')
  message.createDateOn = now
  return messageRepo.save(message)
}
const updateWarningOn = async (id: number, warningOn: string) => {
  const MessageRepo = getManager().getRepository(Messages)
  const Message = await MessageRepo.findOne(id)
  Message.warningOn = warningOn
  return MessageRepo.update(id, Message)
}
const updateDisable = async (id: number) => {
  const MessageRepo = getManager().getRepository(Messages)
  const Message = await MessageRepo.findOne(id)
  Message.disable = true
  return MessageRepo.update(id, Message)
}
export default {
  getMessages,
  addMessage,
  updateWarningOn,
  updateDisable
}
