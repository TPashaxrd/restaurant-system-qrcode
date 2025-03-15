import { DateTime } from 'luxon';
export const isVerified: boolean = localStorage.getItem("verified") === 'true'; //Checking to LocalStorage for Verification
export const currentDate = DateTime.now().toLocaleString(DateTime.DATE_FULL);

export function verifyControl() {
    const verifLocal = localStorage.getItem('verified') == 'true';
    if (verifLocal) {
      window.location.href = "/verified"
    } else {
      window.location.href = "/"
    }
 }

export function Reload() {
  window.location.reload();
}
export function GoUsers() {
  window.location.href = "/user"
}

export function Exit() {
    localStorage.clear();
}

export function menuSec() {
  const verifMenu = localStorage.getItem('verified') == 'true';
  if (verifMenu) {
    window.location.href = "/verified"
  } else {
    window.location.href = "/"
  }
}

export function GoBack() {
    window.location.href = "/";
}


export const authVerified = () => {
    return localStorage.getItem("verified") === "true";
  };
  
export function authVerifieds() {
  localStorage.setItem('verified', 'true');
  window.location.href = "/verified";
}