/**
 * @file Cookie management methods.
 * @see https://www.w3schools.com/js/js_cookies.asp
 */

/**
 * Creates/updates a browser cookie
 * @param {string} cname - Cookie Key 
 * @param {any} cvalue - Cookie Value
 * @param {number} exdays - Cookie Expiration Date, defaults to 30 days
 */
export function setCookie(cname, cvalue, exdays = 30) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Gets the value of a cookie.
 * @param {string} cname - Cookie Key 
 * @returns {string} Cookie Value
 */
export function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
		c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
		}
	}
	return "";
}

/**
 * Checks is a cookie has been set.
 * @param {string} cname 
 * @returns {boolean} true, if it has!
 * @returns {boolean} false, if not.
 */
export function checkCookie(cname) {
	if (getCookie(cname) != "") {
		return true
	} else {
		return false
	}
}

/**
 * Clears all cookies.
 */
export const clearAllCookies = () => {
    document.cookie.split(';').forEach(cookie => {
        const name = cookie.split('=')[0].trim();
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
};