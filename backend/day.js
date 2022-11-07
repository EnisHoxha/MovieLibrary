const dayjs = require("dayjs");
const localizedFormat = require("dayjs/plugin/localizedFormat");

dayjs.extend(localizedFormat);

const timeNow = dayjs().format("LL, HH:mm");

module.exports = timeNow;
