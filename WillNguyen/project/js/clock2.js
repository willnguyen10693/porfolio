const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let radians = 0;
let velocity  = 0.0008;
// Resize canvas
function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;

    // Set the canvas width and height according to the display resolution
    canvas.width = width;
    canvas.height = height;
    ctx.scale(dpr, dpr); // Scale the drawing context
}

function draw() {
    const time = new Date();
    const seconds = time.getSeconds();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const meridiem = hours >= 12 ? "PM" : "AM";
    let centerX = canvas.width/2;
    let centerY = canvas.height/2;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    // Draw the background
    draw_background(meridiem);

    // Set font for seconds
    ctx.font = "bold 50px monospace";
    ctx.fillStyle = "#FF6347";
    const secondsText = `${padZero(seconds)}`;
    const secondsTextMetrics = ctx.measureText(secondsText);
    const secondsTextWidth = secondsTextMetrics.width;

    // Calculate position
    let secondsY = centerY-50;

    // Calculate seconds movement.
    radians = seconds/60*2*Math.PI;
    centerX = centerX + Math.cos(radians)*400;
    secondsY = secondsY + Math.sin(radians)*300;
    
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(centerX-30, secondsY-30);
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#FF6347";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 1400);
    ctx.lineTo(centerX-30, secondsY-30);
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#FF6347";
    ctx.stroke();

    // Create a path to fill the space between the two lines
    ctx.beginPath();
    ctx.moveTo(100, 100); // Starting point of the first line
    ctx.lineTo(centerX - 30, secondsY - 30); // End of the first line
    ctx.lineTo(centerX - 30, secondsY - 30); // Same point as second line
    ctx.lineTo(100, 1400); // Starting point of the second line
    ctx.closePath(); // Close the shape

    // Fill the area between the lines with a different color
    ctx.fillStyle = "#FF6347"; // Lime green (change as needed)
    ctx.fill();

    // Draw seconds
    ctx.fillText(secondsText, centerX - secondsTextWidth/2, secondsY);

    // Set font for hours and minutes
    ctx.font = "bold 150px monospace";
    ctx.fillStyle = "#808080";
    const hoursText = `${padZero(hours)}:${padZero(minutes)}`;
    const hoursTextMetrics = ctx.measureText(hoursText);
    const hoursTextWidth = hoursTextMetrics.width;
    console.log(hoursTextWidth);

    // Calculate position
    const hoursY = centerY-50;

    // Draw hours and minutes
    ctx.fillText(hoursText, canvas.width/2 - hoursTextWidth/2, hoursY);

    requestAnimationFrame(draw);
}

function draw_background(meridiem){
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function padZero(number){
    return (number < 10 ? "0" : "") + number; 
}

draw();
resizeCanvas();
window.addEventListener("resize", resizeCanvas);