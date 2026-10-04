/**
 * @file Making a silly kind of hammer bonking thing cos I'm incredibly bored.
 * @author Bash Elliott <bashelliott@gmail.com>
 * @version 2026.10.4
 */

const hammer = document.getElementById("hammer"); // hammer
const contact = document.getElementById("contact"); // point of contact for when the hammer is used
const target = document.getElementById("target"); // what the hammer will be hitting
const scoreText = document.getElementById("score"); // how many times have you successfully used the hammer?

let rot = 0; // hammer rotation
let mouseX = 0; // mouse position (x)
let mouseY = 0; // mouse position (y)

let hammerOffset = 0; // the hammer's position compared to the center of the screen, calculated as -25% to 25% (more or less)

let clicking = false; // are we clicking

let score = 0; // number of times we've hit the target with the hammer

/**
 * Clamps a value between two thresholds.
 * @param {number} num - number to clamp
 * @param {number} min - minimum possible value
 * @param {number} max - maximum possible value
 * @returns {number} clamped value
 */
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// calculate the hammer offset, clamped
window.addEventListener('mousemove', (e) => {
	mouseX = e.clientX;
	mouseY = e.clientY;

	let rawHammerOffset = (mouseX - window.innerWidth / 2) / window.innerWidth / 2 * 100;
	hammerOffset = clamp(rawHammerOffset * 5, -45, 45)
});

/**
 * Check if the contact point is intersecting with the target
 * @returns {boolean} true if the two boxes are intersecting
 * @returns {boolean} false if they aren't
 */
const checkIfHit = () => {
	const contactRect = contact.getBoundingClientRect();
	const targetRect = target.getBoundingClientRect();

	return !(
		contactRect.right < targetRect.left ||
		contactRect.left > targetRect.right ||
		contactRect.bottom < targetRect.top ||
		contactRect.top > targetRect.bottom
	)
}

// bring down the hammer. if it's intersecting, increment the score
window.addEventListener('mousedown', () => {
	clicking = true

	if (checkIfHit()) {
		score += 1;
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