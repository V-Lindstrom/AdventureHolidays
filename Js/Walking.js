const Walking = {
    WalkingInfo: {
        title: "Wilderness Walks",
        description: "Explore breathtaking trails with experienced guides. Whether you're a beginner or an advanced hiker, we have the perfect trail for you.",
        pricing: [
            { trail: "Easy", price: "£15", duration: "1-2 hours" },
            { trail: "Moderate", price: "£20", duration: "2-3 hours" },
            { trail: "Strenuous", price: "£25", duration: "2-3 hours" },
            { trail: "Unmarked", price: "£30", duration: "3-4 hours" }
        ],
        equipment: "Walking boots are strongly recommended. We provide walking sticks, backpacks, and first aid kits. Bring comfortable clothing, water, and snacks."
    },
    itinerary: {
        Easy: [
            "9:00 AM - Meet at base camp",
            "9:30 AM - Trail briefing & equipment fitting",
            "10:00 AM - Begin walk",
            "11:00 AM - Lunch break",
            "11:30 AM - Continue walking",
            "1:00 PM - Return to base, debrief"
        ],
        Moderate: [
            "9:00 AM - Meet at base camp",
            "9:30 AM - Trail briefing & equipment fitting",
            "10:00 AM - Begin walk",
            "12:00 PM - Lunch break",
            "1:00 PM - Continue Walking",
            "2:00 PM - Return to base, debrief"
        ],
        Strenuous: [
            "8:30 AM - Meet at base camp",
            "9:00 AM - Trail briefing & equipment fitting",
            "10:00 AM - Begin walk",
            "12:00 PM - Lunch break",
            "1:00 PM - Continue Walking",
            "2:30 PM - Return to base, debrief"
        ],
        Unmarked: [
            "8:45 AM - Meet at base camp",
            "9:30 AM - Trail briefing & equipment fitting",
            "10:00 AM - Begin walk",
            "12:00 PM - Lunch break",
            "1:00 PM - Continue Walking",
            "3:00 PM - Return to base, debrief"
        ]
    },
    availability: {
        "2025-04-20": { Easy: 5, Moderate: 3, Strenuous: 2, Unmarked: 1 },
        "2025-04-21": { Easy: 2, Moderate: 4, Strenuous: 0, Unmarked: 3 },
        "2025-04-22": { Easy: 1, Moderate: 0, Strenuous: 2, Unmarked: 0 }
    }
};

// Load everything once the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    loadPageData();

    document.getElementById("Trail").addEventListener("change", handleSelection);
    document.getElementById("date").addEventListener("change", checkAvailability);
    document.getElementById("booking-form").addEventListener("submit", submitBooking);
});

// Pulls data from Walking.WalkingInfo and displays it nicely
function loadPageData() {
    const { title, description, pricing, equipment } = Walking.WalkingInfo;
    const infoContainer = document.getElementById("info-container");

    let infoHTML = `<h2>${title}</h2><p>${description}</p><h3>Pricing:</h3><ul>`;
    pricing.forEach(({ trail, price, duration }) => {
        infoHTML += `<li><strong>${trail}</strong>: ${price} - ${duration}</li>`;
    });
    infoHTML += `</ul><p><strong>Equipment:</strong> ${equipment}</p>`;

    infoContainer.innerHTML = infoHTML;
    updateItinerary("Easy"); // just a default selection to start with
}

// Shows the itinerary based on selected trail
function updateItinerary(trail) {
    const itineraryContent = document.getElementById("itinerary-content");
    const itinerary = Walking.itinerary[trail] || [];
    
    let itineraryHTML = `<p>Typical ${trail} itinerary:</p><ul>`;
    itineraryHTML += itinerary.map(item => `<li>${item}</li>`).join("");
    itineraryHTML += `</ul>`;
    
    itineraryContent.innerHTML = itineraryHTML;
}

// Checks availability for selected trail and date
function checkAvailability() {
    const date = document.getElementById("date").value;
    const trail = document.getElementById("Trail").value;
    const availabilityDiv = document.getElementById("availability");

    if (!date || !trail) {
        availabilityDiv.innerHTML = "";
        return;
    }

    const spotsAvailable = Walking.availability[date]?.[trail];
    let message = "<p style='color:green; margin-top:10px;'>Spots available for this date!</p>";

    if (spotsAvailable === 0) {
        message = "<p style='color:red; margin-top:10px;'>Fully booked for this date and trail!</p>";
    } else if (spotsAvailable !== undefined) {
        message = `<p style='color:green; margin-top:10px;'>${spotsAvailable} spots available!</p>`;
    }

    availabilityDiv.innerHTML = message;
}

// Handle trail selection change
function handleSelection() {
    const trail = this.value;
    if (trail) {
        updateItinerary(trail);
        checkAvailability();
    }
}

// Submit booking
function submitBooking(event) {
    event.preventDefault();

    const date = document.getElementById("date").value;
    const people = document.getElementById("people").value;
    const trail = document.getElementById("Trail").value;

    alert(`Booking submitted!\nDate: ${date}\nPeople: ${people}\nTrail: ${trail}\n\nThank you for booking with Adventure Holidays!`);
}
