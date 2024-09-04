export function parseDurationToSeconds(duration) {
  const reg =
    /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/;
  const matches = duration.match(reg);

  if (!matches) {
    throw new Error("Invalid duration format");
  }

  const years = parseInt(matches[1] || 0, 10);
  const months = parseInt(matches[2] || 0, 10);
  const days = parseInt(matches[3] || 0, 10);
  const hours = parseInt(matches[4] || 0, 10);
  const minutes = parseInt(matches[5] || 0, 10);
  const seconds = parseFloat(matches[6] || 0);

  // CONVERT EVERYTHING TO SECONDS
  const totalSeconds =
    years * 365 * 24 * 60 * 60 +
    months * 30 * 24 * 60 * 60 +
    days * 24 * 60 * 60 +
    hours * 60 * 60 +
    minutes * 60 +
    seconds;

  return totalSeconds;
}

export function parseDateTime(dateTime) {
  return dateTime.split("T").join(" ");
}
