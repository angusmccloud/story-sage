export default function getLastSeries() {
    const history = localStorage.getItem(`lastSeries`);
    console.log('getLastSeries -> history', history)
    return history ? JSON.parse(history) : null;
  }
  