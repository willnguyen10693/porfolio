function formatTime(){
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let meridiem = hours >= 12 ? "PM" : "AM"
    hours = hours % 12 || 12;

    // document.getElementById("time").innerText = hours + ":" + minutes + ":" + seconds + " " + meridiem;
    document.getElementById("time").innerText = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    displayMeridiem(meridiem);
}

function padZero(number){
    return (number < 10 ? "0" : "") + number; 
}

function displayMeridiem(meridiem){
    if(meridiem == 'AM'){
        document.getElementById("am-container").style.display = 'block';
        document.getElementById("pm-container").style.display = 'none';
    }else{
        document.getElementById("am-container").style.display = 'none';
        document.getElementById("pm-container").style.display = 'block';
    }

}

formatTime();

setInterval(formatTime,1000);