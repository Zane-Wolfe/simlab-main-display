function startTime() {
    const today = new Date();
    let month = today.getMonth();
    let dayOfWeek = today.getDay();
    let day = today.getDate();
    let year = today.getFullYear();

    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    var AM = true;
    var monthText = "";
    var dayText = "";
    var dayPostfix = "";
    var cursor = ":"
    m = checkTime(m);
    s = checkTime(s);
    if (h > 12) {
        hCorrected = h - 12;
        AM = false;
    }
    else if (h == 0)
    {
        hCorrected = h + 12;
        AM = true;
    }
    else
    {
        hCorrected = h;
        AM = true;
    }

    switch(dayOfWeek)
    {
        case(1):
        dayText = "Sunday"
        break;
        case(2):
        dayText = "Monday"
        break;
        case(3):
        dayText = "Tuesday"
        break;
        case(4):
        dayText = "Wednesday"
        break;
        case(4):
        dayText = "Thursday"
        break;
        case(5):
        dayText = "Friday"
        break;
        case(6):
        dayText = "Saturday"
        break;
    }

    switch(day % 10)
    {
        case(0):
        case(4):
        case(5):
        case(6):
        case(7):
        case(8):
        case(9):
        dayPostfix = "th"
        break;
        case(1):
        dayPostfix = "st"
        break;
        case(2):
        dayPostfix = "nd"
        break;
        case(3):
        dayPostfix = "rd"
        break;
    }

    switch(month)
    {
        case(0):
        monthText = "January"
        break;
        case(1):
        monthText = "Febuary"
        break;
        case(2):
        monthText = "March"
        break;
        case(3):
        monthText = "April"
        break;
        case(4):
        monthText = "May"
        break;
        case(5):
        monthText = "June"
        break;
        case(6):
        monthText = "July"
        break;
        case(7):
        monthText = "August"
        break;
        case(8):
        monthText = "September"
        break;
        case(9):
        monthText = "October"
        break;
        case(10):
        monthText = "November"
        break;
        case(11):
        monthText = "December"
        break;
    }

    document.getElementById('date').innerHTML =  dayText + ", " + monthText + " " + day + dayPostfix;
    document.getElementById('time').innerHTML =  hCorrected + ":" + m;
    if (AM) 
    {
        document.getElementById('time').innerHTML +=  " AM";
    }
    else
    {
        document.getElementById('time').innerHTML +=  " PM";
    }
    setTimeout(startTime, 1000);
    }
    
    function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
    }