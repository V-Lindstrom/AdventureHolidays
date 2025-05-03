const paragliding = {
    ParaglidingInfo: {
        title: "Paragliding Packages",
        description: "Soar through the skies and experience breathtaking views with our expert pilots. Whether you're new to paragliding or a thrill-seeking adventurer, we have the perfect flight package for you.",
        pricing: [
            { Level: "Beginner", price: "£50", duration: "15-20 minutes" },
            { Level: "Intermediate", price: "£75", duration: "25-30 minutes" },
            { Level: "Advanced", price: "£100", duration: "35-40 minutes" },
            { Level: "Expert", price: "£130", duration: "45-60 minutes" }
        ],
        equipment: "All safety gear including helmets and harnesses will be provided. Wear comfortable clothing, sunglasses, and secure footwear. Cameras are welcome but must be securely mounted."
    },
    itinerary: {
        Beginner: [
            "9:00 AM - Meet at flight zone",
            "9:15 AM - Safety briefing & gear fitting",
            "9:45 AM - Tandem flight begins",
            "10:05 AM - Flight ends & photo session",
            "10:30 AM - Debrief and refresh"
        ],
        Intermediate: [
            "10:00 AM - Meet at flight zone",
            "10:15 AM - Safety briefing & gear fitting",
            "10:45 AM - Tandem flight begins",
            "11:15 AM - Flight ends & photo session",
            "11:45 AM - Debrief and feedback"
        ],
        Advanced: [
            "11:00 AM - Meet at flight zone",
            "11:20 AM - Advanced flight prep",
            "11:45 AM - Tandem flight begins",
            "12:25 PM - Flight ends & GoPro review",
            "12:45 PM - Chill and debrief"
        ],
        Expert: [
            "12:00 PM - Meet at flight zone",
            "12:30 PM - Full pilot briefing & gear fitting",
            "1:00 PM - Tandem flight begins",
            "2:00 PM - Flight ends & high-res media transfer",
            "2:30 PM - Final debrief and certification"
        ]
    },
    availability: {
        "2025-04-20": { Beginner: 6, Intermediate: 4, Advanced: 3, Expert: 2 },
        "2025-04-21": { Beginner: 5, Intermediate: 3, Advanced: 1, Expert: 1 },
        "2025-04-22": { Beginner: 2, Intermediate: 2, Advanced: 2, Expert: 0 }
    }
};

// Load page data on startup
document.addEventListener("DOMContentLoaded", () => {
    loadPageData();

    document.getElementById("Level").addEventListener("change", handleSelection);
    document.getElementById("date").addEventListener("change", checkAvailability);
    document.getElementById("booking-form").addEventListener("submit", submitBooking);
});

// Load Walking information
function loadPageData() {
    const { title, description, pricing, equipment } = paragliding.ParaglidingInfo;
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
    const itinerary = paragliding.itinerary[Level] || [];
    
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

    const spotsAvailable = paragliding.availability[date]?.[Level];
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
