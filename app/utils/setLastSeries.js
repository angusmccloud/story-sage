export default function setLastSeries(seriesId) {
    console.log('setLastSeries -> seriesId', seriesId)
    localStorage.setItem(`lastSeries`, seriesId);
  }
  