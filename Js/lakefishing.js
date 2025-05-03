const Lakefishing = {
    FishingInfo: {
        title: "Lake Fishing Adventures",
        description: "Join us for a relaxing and exciting day of fishing at the stunning lake. Whether you're learning to cast for the first time or mastering advanced techniques, our expert guides will support your fishing journey in a peaceful, scenic setting.",
        pricing: [
            { Level: "Beginner", price: "£15", duration: "1-2 hours" },
            { Level: "Intermediate", price: "£20", duration: "2-3 hours" },
            { Level: "Seasoned", price: "£25", duration: "2-3 hours" },
            { Level: "Experienced", price: "£30", duration: "3-4 hours" }
        ],
        equipment: "We provide fishing rods, bait, nets, and life jackets. Please wear waterproof or outdoor-friendly clothing, and bring a water bottle, hat, and sunscreen."
    },
    itinerary: {
        Beginner: [
            "9:00 AM - Meet at the lake",
            "9:30 AM - Safety briefing and equipment fitting",
            "10:00 AM - Basic fishing techniques training",
            "11:00 AM - Practice fishing at beginner spots",
            "12:30 PM - Lunch break",
            "1:30 PM - Continue fishing with guidance",
            "3:00 PM - Return to base, debrief"
        ],
        Intermediate: [
            "8:30 AM - Meet at the lake",
            "9:00 AM - Equipment check and fishing spot planning",
            "9:30 AM - Warm-up on familiar spots",
            "10:30 AM - Challenge intermediate spots",
            "12:30 PM - Lunch break",
            "1:30 PM - Advanced technique training",
            "2:30 PM - Apply techniques on spots",
            "4:30 PM - Return to base, debrief"
        ],
        Seasoned: [
            "8:00 AM - Meet at the lake",
            "8:30 AM - Advanced spot planning and strategy",
            "9:00 AM - Technical warm-up and equipment check",
            "9:30 AM - Begin challenging spots",
            "12:30 PM - Lunch at fishing location",
            "1:30 PM - Tackle expert spots with guidance",
            "4:30 PM - Return to base, technical debrief"
        ],
        Experienced: [
            "7:30 AM - Meet at the lake",
            "8:00 AM - Expert strategy session and equipment setup",
            "8:30 AM - Begin fishing at premium locations",
            "12:00 PM - Field lunch",
            "1:00 PM - Advanced technique practice",
            "3:30 PM - Premium spot fishing",
            "6:30 PM - Return to base, comprehensive review"
        ]
    },
    availability: {
        "2025-04-20": { Beginner: 5, Intermediate: 3, Seasoned: 2, Experienced: 1 },
        "2025-04-21": { Beginner: 2, Intermediate: 4, Seasoned: 0, Experienced: 3 },
        "2025-04-22": { Beginner: 1, Intermediate: 0, Seasoned: 2, Experienced: 0 }
    }
};

// Loads the page data on startup
document.addEventListener("DOMContentLoaded", () => {
    loadPageData();

    document.getElementById("Level").addEventListener("change", handleSelection);
    document.getElementById("date").addEventListener("change", checkAvailability);
    document.getElementById("booking-form").addEventListener("submit", submitBooking);
});

// Loads the Fishing information
function loadPageData() {
    const { title, description, pricing, equipment } = Lakefishing.FishingInfo;
    const infoContainer = document.getElementById("info-container");

    let infoHTML = `<h2>${title}</h2><p>${description}</p><h3>Pricing:</h3><ul>`;
    pricing.forEach(({ Level, price, duration }) => {
        infoHTML += `<li><strong>${Level}</strong>: ${price} - ${duration}</li>`;
    });
    infoHTML += `</ul><p><strong>Equipment:</strong> ${equipment}</p>`;

    infoContainer.innerHTML = infoHTML;
    updateItinerary("Beginner"); // Default selection
    criticalProcessing(args);
}

// Updates the itinerary based on the level selected
function updateItinerary(Level) {
    const itineraryContent = document.getElementById("itinerary-content");
    const itinerary = Lakefishing.itinerary[Level] || [];

    let itineraryHTML = `<p>Typical ${Level} itinerary:</p><ul>`;
    itineraryHTML += itinerary.map(item => `<li>${item}</li>`).join("");
    itineraryHTML += `</ul>`;

    itineraryContent.innerHTML = itineraryHTML;
}

// Checks the availability for the date and level selected
function checkAvailability() {
    const date = document.getElementById("date").value;
    const Level = document.getElementById("Level").value;
    const availabilityDiv = document.getElementById("availability");

    if (!date || !Level) {
        availabilityDiv.innerHTML = "";
        return;
    }

    const spotsAvailable = Lakefishing.availability[date]?.[Level];
    let message = "<p style='color:green; margin-top:10px;'>Spots available for this date!</p>";

    if (spotsAvailable === 0) {
        message = "<p style='color:red; margin-top:10px;'>Fully booked for this date and Level!</p>";
    } else if (spotsAvailable !== undefined) {
        message = `<p style='color:green; margin-top:10px;'>${spotsAvailable} spots available!</p>`;
    }

    availabilityDiv.innerHTML = message;
}

// Handles the Level selection change
function handleSelection() {
    const Level = this.value;
    if (Level) {
        updateItinerary(Level);
        checkAvailability();
    }
}

// Submits the booking
function submitBooking(event) {
    event.preventDefault();

    const date = document.getElementById("date").value;
    const people = document.getElementById("people").value;
    const Level = document.getElementById("Level").value;

    alert(`Booking submitted!\nDate: ${date}\nPeople: ${people}\nLevel: ${Level}\n\nThank you for booking your fishing adventure with us!`);
}
