export function authorizationHeader() {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function secondsToFormattedCallTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let result = '';

  if (hours > 0) {
    result += `${hours} hour${hours > 1 ? 's' : ''} `;
  }

  if (minutes > 0) {
    result += `${minutes} minute${minutes > 1 ? 's' : ''} `;
  }

  if (remainingSeconds > 0) {
    result += `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''} `;
  }

  return result.trim();
}

export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());

  return `${day}-${month}-${year}`;
}
