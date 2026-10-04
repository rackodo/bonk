const hammer = document.getElementById("hammer");
const contact = document.getElementById("contact");
const target = document.getElementById("target");

let rot = 0;
let mouseX = 0;
let mouseY = 0;

let hammerOffset = 0;

let clicking = false;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

window.addEventListener('mousemove', (e) => {
	mouseX = e.clientX;
	mouseY = e.clientY;

	let rawHammerOffset = (mouseX - window.innerWidth / 2) / window.innerWidth / 2 * 100;
	hammerOffset = clamp(rawHammerOffset * 5, -45, 45)
});

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

window.addEventListener('mousedown', () => {
	clicking = true

	console.log(checkIfHit())
})

window.addEventListener('mouseup', () => clicking = false)

function animate() {
	rot = clicking ? 85 * Math.sign(-hammerOffset) : -hammerOffset;

	hammer.style.top = mouseY + "px";
	hammer.style.left = mouseX + "px";

	let contactY = mouseY + 5;
	let contactX = mouseX + (255 * Math.sign(-hammerOffset))

	contact.style.top = contactY + "px"
	contact.style.left = contactX + "px"
	
	hammer.style.transform = `translate(-75px, -300px) rotate(${rot}deg)`;

	requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
