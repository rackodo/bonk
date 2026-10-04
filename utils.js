/**
 * @file Utilities file. Various things that might be useful in the future.
 * @author Bash Elliott <bashelliott@gmail.com>
 * @version 2026.10.4
 */

/**
 * Checks if two elements are intersecting.
 * @param {HTMLElement} el1 
 * @param {HTMLElement} el2 
 * @returns true, if they intersect
 * @returns false, if they don't
 */
export const isIntersecting = (el1, el2) => {
	const rect1 = el1.getBoundingClientRect();
	const rect2 = el2.getBoundingClientRect();

	return !(
		rect1.right < rect2.left ||
		rect1.left > rect2.right ||
		rect1.bottom < rect2.top ||
		rect1.top > rect2.bottom
	)
}

/**
 * Clamps a value between two thresholds.
 * @param {number} num - number to clamp
 * @param {number} min - minimum possible value
 * @param {number} max - maximum possible value
 * @returns {number} clamped value
 */
export const clamp = (num, min, max) => (
	Math.min(Math.max(num, min), max)
)