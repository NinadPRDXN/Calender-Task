export const refineDate = (year, month, date) => {
  const addZero = (val) => {
    return `0${val}`
  }
  
  if ( month < 10 ) {
    month = addZero(month)
  }

  if ( date < 10 ) {
    date = addZero(date)
  }

  dataToReturn = `${year}-${month}-${date}`;

  return dataToReturn
}