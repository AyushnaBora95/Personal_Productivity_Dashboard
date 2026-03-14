function updateClock() {
    const now = new Date();

    // TIME — 12-hour format with leading zeros
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12
    minutes = minutes < 10 ? "0" + minutes : minutes;

    const timeString = `${hours}:${minutes} ${ampm}`;
    document.getElementById("clockTime").innerText = timeString;

    // DATE — Full name format
    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    const dateString = now.toLocaleDateString("en-US", dateOptions);
    document.getElementById("clockDate").innerText = dateString;
}

// Make sure it runs immediately and updates every second
updateClock();
setInterval(updateClock, 1000);
