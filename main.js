/**
 * @file Main script file. Handles events and the like.
 * @author Bash Elliott <bashelliott@gmail.com>
 * @version 2026.10.4
 */

import { checkCookie, getCookie, setCookie } from "./cookieManagement.js";
import { clamp, isIntersecting } from "./utils.js";

const hammer = document.getElementById("hammer"); // hammer
const contact = document.getElementById("contact"); // point of contact for when the hammer is used
const target = document.getElementById("target"); // what the hammer will be hitting
const scoreText = document.getElementById("score"); // how many times have you successfully used the hammer?

let rot = 0; // hammer rotation
let mouseX = 0; // mouse position (x)
let mouseY = 0; // mouse position (y)

let hammerOffset = 0; // the hammer's position compared to the center of the screen, calculated as -25% to 25% (more or less)

let clicking = false; // are we clicking

let score = checkCookie("score") ? Number(getCookie("score")) : 0; // number of times we've hit the target with the hammer
scoreText.innerHTML = score;

// calculate the hammer offset, clamped
window.addEventListener('mousemove', (e) => {
	mouseX = e.clientX;
	mouseY = e.clientY;

	let rawHammerOffset = (mouseX - window.innerWidth / 2) / window.innerWidth / 2 * 100;
	hammerOffset = clamp(rawHammerOffset * 5, -45, 45)
});

// bring down the hammer. if it's intersecting, increment the score
window.addEventListener('mousedown', () => {
	clicking = true

	if (isIntersecting(contact, target)) {
		score += 1
		scoreText.innerHTML = score;
	}
})

// bring the hammer back up
window.addEventListener('mouseup', () => clicking = false)

/**
 * Does a bunch of math to set the position and rotation of the hammer, and the position of the contact point.
 */
function calculateHammerAndContact() {
	// rotate the hammer according to the offset, or bring it down if the user is clicking
	rot = clicking ? 85 * Math.sign(-hammerOffset) : -hammerOffset;

	hammer.style.top = mouseY + "px";
	hammer.style.left = mouseX + "px";

	// hardcoded mouse offsets because i Don't Care!
	let contactY = mouseY + 25;
	let contactX = mouseX + (255 * Math.sign(-hammerOffset))

	contact.style.top = contactY + "px"
	contact.style.left = contactX + "px"
	
	hammer.style.transform = `translate(-75px, -300px) rotate(${rot}deg)`;

	requestAnimationFrame(calculateHammerAndContact);
}

requestAnimationFrame(calculateHammerAndContact);

// Basic wall for mobile players, cos I don't wanna deal with adding mobile support yet
document.getElementById("bypass-mobile").addEventListener("click", () => {
	document.getElementById("mobile-barrier").remove()
})

// basic time tracking and saving every 30s
let timePlayed = 0;

setInterval(() => {
	timePlayed += 1;
	if (timePlayed % 30 === 0) {
		setCookie("score", score)
		console.log("Score saved at " + timePlayed + ": " + score)
	}
}, 1000)