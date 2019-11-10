import { getManager } from 'typeorm'
import { Messages } from '../models/Message'
import moment from 'moment'
import Imessages from '../Interface/Imessage'
import reminder from '../services/remind'
import _ from 'lodash'
const getMessages = async () => {
  const reminders = await reminder.getReminders()
  const messageRepo = getManager().getRepository(Messages)
  const warning = [
    '1-1',
    '1-2',
    '1-3',
    '1-4',
    '1-6',
    '2-1',
    '2-2',
    '2-3',
    '3-1',
    '3-2',
    '3-3',
    '3-4',
    '4-1',
    '4-2',
    '4-3',
    '4-4',
    '5-1',
    '5-2',
    '5-3',
    '5-5'
  ]
  let result = new Array()
  let red =  new Array()
  let yellow =  new Array()
  for (let index = 0; index < warning.length; index++) {
    const element = warning[index]
    let reminder = _.find(reminders, { id: element })
    let color = 'red'
    let changeOn = ''
    let del1 = false
    let del2 = false
    const data = await messageRepo
      .createQueryBuilder('message')
      .select('*')
      .where('message.category = ' + "'" + element + "'")
      .orderBy('"createOn"', 'DESC')
      .limit(2)
      .getRawMany()
    for (let index = 0; index < data.length; index++) {
      const element = data[index]
      const oneday = moment(element.createOn)
        .add(24, 'hours')
        .diff(moment().format('YYYY-MM-DD HH:mm'))
      if (reminder) {
        switch (reminder.warningtype) {
          case '2':
            if (reminder && moment(element.warningOn).diff(moment().format('YYYY-MM-DD HH:mm')) < 7200000) {
              color = 'yellow'
            }
            break
          case '4':
            if (reminder && moment(element.warningOn).diff(moment().format('YYYY-MM-DD HH:mm')) < 14400000) {
              color = 'yellow'
            }
            break
          case '24':
            if (reminder && moment(element.warningOn).diff(moment().format('YYYY-MM-DD HH:mm')) < 86400000) {
              color = 'yellow'
            }
          default:
            break
        }
        changeOn = reminder.warningOn
      }
      if (index == 0 && oneday < 0) {
        del1 = true
      } else if (index == 1 && oneday < 0) {
        del2 = true
      }
      element.categortype = element.category + ' ' + element.type
      element.color = color
      element.changeOn = changeOn
    }
    if (del2) {
      delete data[1]
    }
    if (del1) {
      delete data[0]
    }
    for (let index = 0; index < data.length; index++) {
      const element = data[index]
      if (element.color == 'yellow')
      {
        yellow.push(element)
      }else {
        red.push(element)
      }
    }
  }
  red =  _.sortBy(red , -"createOn")
  yellow =  _.sortBy(yellow , -"createOn")
  result = _.concat(red , yellow)
  console.log(result)
  return result
}
const addMessage = async (data: Imessages) => {
  const messageRepo = getManager().getRepository(Messages)
  const message: Messages = new Messages()
  message.type = data.type
  message.content = data.content
  message.category = data.category
  message.createOn = moment().format('YYYY-MM-DD HH:mm')
  return messageRepo.save(message)
}

export default {
  getMessages,
  addMessage
}
