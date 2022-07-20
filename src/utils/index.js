const getDateTimes = function() {
  let data = new Date(new Date().toString());
  let timezoneOffsetInHours = -(data.getTimezoneOffset() / 60); //UTC minus local time
  let currDate = new Date(
    data.getFullYear(),
    data.getMonth(),
    data.getDate(),
    data.getHours(),
    data.getMinutes(),
    data.getSeconds()
  );
  currDate.setHours(data.getHours() + timezoneOffsetInHours);
  let toISO = currDate.toISOString().match(/\d+/g);
  let strDate = toISO.map(val => {
    return val.length === 1 ? "0" + val : val;
  });
  return parseInt(strDate.join("")) / 1000;
};
module.exports = {
  getDateTimes
};
