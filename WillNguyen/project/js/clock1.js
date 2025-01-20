var intervalID;

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

function setReminder(){
    const min = document.getElementById("ftime").value;
    console.log(min);
    intervalID = setInterval(()=>{
        const time = new Date();
        const minutes = time.getMinutes();
        const hours = time.getHours();
        if(minutes == min){
            document.getElementById("reminder-msg").innerHTML = "Wake up";
            const reminderSound = new Audio('./sound/ominant.mp3');
            reminderSound.play();
        }
    }, 3000);
    console.log(intervalID);
}

function stopReminder(){
    clearInterval(intervalID);
    document.getElementById("reminder-msg").innerHTML = "Stop Reminder"
}
formatTime();
setInterval(formatTime,1000);