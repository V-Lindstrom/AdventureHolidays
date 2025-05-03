const RockClimbing = {
    ClimbingInfo: {
        title: "Rock Climbing Routes",
        description: "Conquer stunning rock faces with our expert climbing instructors. Whether you're new to climbing or an advanced mountaineer, we have the perfect route tailored for your experience level.",
        pricing: [
            { Level: "Beginner", price: "£30", duration: "1-2 hours" },
            { Level: "Intermediate", price: "£45", duration: "2-3 hours" },
            { Level: "Advanced", price: "£60", duration: "3 hours" },
            { Level: "Expert", price: "£80", duration: "4+ hours" }
        ],
        equipment: "Climbing shoes, helmets, harnesses, and ropes are provided. Please wear flexible sportswear and bring water and snacks for energy during the session."
    },
    itinerary: {
        Beginner: [
            "9:00 AM - Meet at climbing base",
            "9:15 AM - Safety briefing & gear fitting",
            "9:45 AM - Basic climbing techniques & warm-up",
            "10:15 AM - Begin climbing",
            "11:15 AM - Cool down & debrief"
        ],
        Intermediate: [
            "9:00 AM - Meet at climbing base",
            "9:20 AM - Gear fitting & safety briefing",
            "9:50 AM - Warm-up climb",
            "10:30 AM - Main climbing session",
            "12:00 PM - Review techniques & feedback"
        ],
        Advanced: [
            "8:30 AM - Meet at climbing site",
            "8:50 AM - Advanced briefing & gear check",
            "9:15 AM - Climb multiple challenging routes",
            "11:15 AM - Break & strategy session",
            "12:00 PM - Final climb & review"
        ],
        Expert: [
            "8:00 AM - Meet at advanced climbing site",
            "8:30 AM - Technical prep & team briefing",
            "9:00 AM - Begin multi-pitch or overhang routes",
            "12:00 PM - Mid-climb rest stop",
            "1:00 PM - Final ascent & advanced debrief"
        ]
    },
    availability: {
        "2025-04-20": { Beginner: 5, Intermediate: 3, Advanced: 2, Expert: 1 },
        "2025-04-21": { Beginner: 2, Intermediate: 4, Advanced: 0, Expert: 3 },
        "2025-04-22": { Beginner: 1, Intermediate: 0, Advanced: 2, Expert: 0 },
        "2025-04-23": { Beginner: 1, Intermediate: 0, Advanced: 2, Expert: 0 },
        "2025-04-24": { Beginner: 1, Intermediate: 0, Advanced: 2, Expert: 0 }
    }
};

// Load page data on startup
document.addEventListener("DOMContentLoaded", () => {
    loadPageData();

    document.getElementById("Level").addEventListener("change", handleSelection);
    document.getElementById("date").addEventListener("change", checkAvailability);
    document.getElementById("booking-form").addEventListener("submit", submitBooking);
});

// Load Climbing information
function loadPageData() {
    const { title, description, pricing, equipment } = RockClimbing.ClimbingInfo;
    const infoContainer = document.getElementById("info-container");

    let infoHTML = `<h2>${title}</h2><p>${description}</p><h3>Pricing:</h3><ul>`;
    pricing.forEach(({ Level, price, duration }) => {
        infoHTML += `<li><strong>${Level}</strong>: ${price} - ${duration}</li>`;
    });
    infoHTML += `</ul><p><strong>Equipment:</strong> ${equipment}</p>`;

    infoContainer.innerHTML = infoHTML;
    updateItinerary("Beginner"); // Default selection
}

// Update itinerary
function updateItinerary(Level) {
    const itineraryContent = document.getElementById("itinerary-content");
    const itinerary = RockClimbing.itinerary[Level] || [];
    
    let itineraryHTML = `<p>Typical ${Level} itinerary:</p><ul>`;
    itineraryHTML += itinerary.map(item => `<li>${item}</li>`).join("");
    itineraryHTML += `</ul>`;
    
    itineraryContent.innerHTML = itineraryHTML;
}

// Check availability
function checkAvailability() {
    const date = document.getElementById("date").value;
    const Level = document.getElementById("Level").value;
    const availabilityDiv = document.getElementById("availability");

    if (!date || !Level) {
        availabilityDiv.innerHTML = "";
        return;
    }

    const spotsAvailable = RockClimbing.availability[date]?.[Level];
    let message = "<p style='color:green; margin-top:10px;'>Spots available for this date!</p>";

    if (spotsAvailable === 0) {
        message = "<p style='color:red; margin-top:10px;'>Fully booked for this date and Level!</p>";
    } else if (spotsAvailable !== undefined) {
        message = `<p style='color:green; margin-top:10px;'>${spotsAvailable} spots available!</p>`;
    }

    availabilityDiv.innerHTML = message;
}

// Handle Level selection change
function handleSelection() {
    const Level = this.value;
    if (Level) {
        updateItinerary(Level);
        checkAvailability();
    }
}

// Submit booking
function submitBooking(event) {
    event.preventDefault();

    const date = document.getElementById("date").value;
    const people = document.getElementById("people").value;
    const Level = document.getElementById("Level").value;

    alert(`Booking submitted!\nDate: ${date}\nPeople: ${people}\nLevel: ${Level}\n\nThank you for booking with Adventure Holidays!`);
}
