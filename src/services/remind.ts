import { getManager } from 'typeorm'
import { Reminder } from '../models/reminder'
import Iremind from '../Interface/Iremind'
import moment from 'moment'

const getReminders = async () => {
  const reminderRepo = getManager().getRepository(Reminder)
  return reminderRepo.find()
}
const deleteReminders = async (remindid : String) => {
  const reminderRepo = getManager().getRepository(Reminder)
  const reminder1 = await reminderRepo.findByIds([ remindid ])
  if (reminder1) {
    return reminderRepo.delete(reminder1[0])
  }
}
const updateReminder = async (remind: Iremind) => {
  const reminderRepo = getManager().getRepository(Reminder)
  let reminder: Reminder = new Reminder()
  reminder = await reminderRepo.findOne({ id: remind.id })
  if (reminder) {
    reminder.warningOn = remind.updatetime
    reminder.warningtype = remind.remindtype
    reminder.createOn = moment().format('YYYY-MM-DD HH:mm')
    return reminderRepo.save(reminder)
  } else {
    const reminder: Reminder = new Reminder()
    reminder.id = remind.id
    reminder.warningOn = remind.updatetime
    reminder.warningtype = remind.remindtype
    reminder.createOn = moment().format('YYYY-MM-DD HH:mm')
    return reminderRepo.save(reminder)
  }
}

export default {
  getReminders,
  updateReminder,
  deleteReminders
}
