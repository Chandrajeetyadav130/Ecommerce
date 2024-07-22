import Cookies from 'js-cookie';

export function getCookie(cookiename) {
    // Get name followed by anything except a semicolon
    const cookiestring = RegExp(cookiename + "=[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(
      !!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : ""
    );
  }
  
  export function setToken(token) {
    const date = new Date();
    date.setTime(date.getTime() + 8 * 60 * 60 * 1000); // FIXME: 8hrs
    document.cookie = `token=${token};expires=${date.toUTCString()};path=/;`
  }


  export const clearCookie = (cookieName) => {
    Cookies.remove(cookieName);
};

// Function to clear all cookies
export const clearAllCookies = () => {
    const allCookies = Cookies.get(); // Get all cookies
    for (const cookieName in allCookies) {
        Cookies.remove(cookieName);
    }
};