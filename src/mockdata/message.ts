import message from '../services/message'
import remind from '../services/remind'
import moment from 'moment'

export default function createMockMessage() {
  const mockmessage = { type: 'test', category: '1-1', content: '本场风向变化大',categorytype:"",changeOn : ""}
  message.addMessage(mockmessage)
  const mockremind = { id: '1-1', updatetime: moment().format('YYYY-MM-DD HH:mm'), remindtype: '1' }
  remind.updateReminder(mockremind)

  message.getMessages()
}
