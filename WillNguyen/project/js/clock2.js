const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let radians = 0;
// Resize canvas
function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;

    // Set the canvas width and height according to the display resolution
    ctx.scale(dpr, dpr); // Scale the drawing context
}

function draw() {
    const time = new Date();
    const seconds = time.getSeconds();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const meridiem = hours >= 12 ? "PM" : "AM";
    // Use the client dimensions for correct proportions
    let centerX = canvas.clientWidth / 2;
    let centerY = canvas.clientHeight / 2;

    let screenWidth = canvas.clientWidth;
    let screenHeight = canvas.clientHeight;

    // Coordination of line 1
    const xPos1 = screenWidth * 0.1;
    const yPos1 = screenHeight * 0.4;

    // Coordination of line 2
    const xPos2 = screenWidth * 0.9;
    const yPos2 = screenHeight * 0.4;

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
    
    // Draw seconds
    ctx.fillText(secondsText, centerX - secondsTextWidth/2, secondsY);


    ctx.beginPath();
    ctx.moveTo(xPos1, yPos1);
    ctx.lineTo(centerX-30, secondsY);
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#D8B7DD";
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(xPos2, yPos2);
    ctx.lineTo(centerX+30, secondsY);
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#D8B7DD";
    ctx.stroke();

    // Create a path to fill the space between the two lines
    ctx.beginPath();
    ctx.moveTo(xPos1, yPos1); // Starting point of the first line
    ctx.lineTo(centerX - 30, secondsY); // End of the first line
    ctx.lineTo(centerX + 30, secondsY); // Same point as second line
    ctx.lineTo(xPos2, yPos2); // Starting point of the second line
    // ctx.fillStyle = "#D8B7DD";
    // ctx.fill();
    ctx.closePath(); // Close the shape

    // Set font for hours and minutes
    ctx.font = "bold 150px monospace";
    ctx.fillStyle = "#FFB81C";
    const hoursText = `${padZero(hours)}:${padZero(minutes)}`;
    const hoursTextMetrics = ctx.measureText(hoursText);
    const hoursTextWidth = hoursTextMetrics.width;

    // Calculate position
    const hoursY = centerY-50;

    // Draw hours and minutes
    ctx.fillText(hoursText, canvas.clientWidth/2 - hoursTextWidth/2, hoursY);

    requestAnimationFrame(draw);
}

function draw_background(meridiem){
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function padZero(number){
    return (number < 10 ? "0" : "") + number; 
}
resizeCanvas();
draw();
window.addEventListener("resize", resizeCanvas);