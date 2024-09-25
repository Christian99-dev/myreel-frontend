export class SessionService {
    static setItem(key: string, value: string) {
      // Ensure that localStorage is only accessed in the browser
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, value);
      } else {
        console.log("localStorage is not available (likely due to server-side rendering).");
      }
    }
  
    static getItem(key: string): string | null {
      // Ensure that localStorage is only accessed in the browser
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(key);
      } else {
        console.log("localStorage is not available (likely due to server-side rendering).");
        return null;
      }
    }
  
    static removeItem(key: string) {
      // Ensure that localStorage is only accessed in the browser
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(key);
      } else {
        console.log("localStorage is not available (likely due to server-side rendering).");
      }
    }
  }
  