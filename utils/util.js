const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const formatTime = (date, format) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  if (format === 'date') {
    return [year, month, day].map(formatNumber).join('-')
  } else {
    return [hour, minute].map(formatNumber).join(':')
  }
}

const formatTimeText = (date) => {
  const year = date.getFullYear()
  const month = months[date.getMonth()]
  const weekDay = weekDays[date.getDay()]
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return {date: `${weekDay}, ${day} ${month}`, time: `${hour}:${formatNumber(minute)}`}
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatTimeText: formatTimeText
}
