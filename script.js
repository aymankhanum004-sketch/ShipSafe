
const form = document.getElementById("ticket-form");
const issueInput = document.getElementById("issue");
const categoryInput = document.getElementById("category");
const priorityInput = document.getElementById("priority");
const ticketList = document.getElementById("ticket-list");

const STORAGE_KEY = "shipsafe-tickets";

// Load saved tickets when the page opens
let tickets = [];

try {
  const savedTickets = localStorage.getItem(STORAGE_KEY);
  tickets = savedTickets ? JSON.parse(savedTickets) : [];

  if (!Array.isArray(tickets)) {
    tickets = [];
  }
} catch (error) {
  tickets = [];
  console.error("Could not load saved tickets:", error);
}

let nextTicketId =
  tickets.reduce((highest, ticket) =>
    Math.max(highest, Number(ticket.id) || 0), 0
  ) + 1;

// Save tickets to the browser
function saveTickets() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  } catch (error) {
    alert("Could not save tickets in this browser.");
    console.error("Could not save tickets:", error);
  }
}

// Create a new ticket
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const description = issueInput.value.trim();

  if (!description) {
    alert("Please describe the IT issue.");
    return;
  }

  const ticket = {
    id: nextTicketId,
    description: description,
    category: categoryInput.value,
    priority: priorityInput.value,
    status: "Open"
  };

  tickets.push(ticket);
  nextTicketId++;

  saveTickets();
  displayTickets();
  form.reset();
});

// Display tickets
function displayTickets() {
  ticketList.replaceChildren();

  if (tickets.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No tickets yet. Create your first ticket!";
    ticketList.appendChild(message);
    return;
  }

  tickets.forEach(function (ticket) {
    const card = document.createElement("article");
    card.className = "ticket";

    const heading = document.createElement("h3");
    heading.textContent = "Ticket #" + ticket.id;
    card.appendChild(heading);

    const description = document.createElement("p");
    description.textContent = ticket.description;
    card.appendChild(description);

    const category = document.createElement("p");
    category.textContent = "Category: " + ticket.category;
    card.appendChild(category);

    const priority = document.createElement("p");
    priority.textContent = "Priority: " + ticket.priority;
    card.appendChild(priority);

    const status = document.createElement("p");
    status.textContent = "Status: " + ticket.status;
    card.appendChild(status);

    if (ticket.status === "Open") {
      const resolveButton = document.createElement("button");
      resolveButton.textContent = "Mark as Resolved";

      resolveButton.addEventListener("click", function () {
        ticket.status = "Resolved";
        saveTickets();
        displayTickets();
      });

      card.appendChild(resolveButton);
    }

    ticketList.appendChild(card);
  });
}

// Show saved tickets immediately
displayTickets();

const equipmentForm = document.getElementById("equipment-form");
const equipmentList = document.getElementById("equipment-list");

const EQUIPMENT_KEY = "shipsafe-equipment";

let equipment = [];

try {
  const savedEquipment = localStorage.getItem(EQUIPMENT_KEY);
  equipment = savedEquipment ? JSON.parse(savedEquipment) : [];

  if (!Array.isArray(equipment)) {
    equipment = [];
  }
} catch (error) {
  equipment = [];
}

function saveEquipment() {
  try {
    localStorage.setItem(
      EQUIPMENT_KEY,
      JSON.stringify(equipment)
    );
    return true;
  } catch (error) {
    alert("Could not save equipment in this browser.");
    return false;
  }
}

equipmentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("equipment-name").value.trim();
  const type = document.getElementById("equipment-type").value;
  const location = document.getElementById("equipment-location").value.trim();
  const status = document.getElementById("equipment-status").value;

  if (!name || !location) {
    alert("Please enter the equipment name and location.");
    return;
  }

  const item = {
    id: Date.now(),
    name: name,
    type: type,
    location: location,
    status: status
  };

  equipment.push(item);

  if (saveEquipment()) {
    displayEquipment();
    equipmentForm.reset();
  } else {
    equipment.pop();
  }
});

function displayEquipment() {
  equipmentList.replaceChildren();

  if (equipment.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No equipment recorded yet.";
    equipmentList.appendChild(message);
    return;
  }

  equipment.forEach(function (item) {
    const card = document.createElement("article");
    card.className = "ticket";

    const heading = document.createElement("h3");
    heading.textContent = item.name;
    card.appendChild(heading);

    const type = document.createElement("p");
    type.textContent = "Type: " + item.type;
    card.appendChild(type);

    const location = document.createElement("p");
    location.textContent = "Location: " + item.location;
    card.appendChild(location);

    const status = document.createElement("p");
    status.textContent = "Condition: " + item.status;
    card.appendChild(status);

    equipmentList.appendChild(card);
  });
}

displayEquipment();

const securityForm = document.getElementById("security-form");
const securityList = document.getElementById("security-list");

const SECURITY_KEY = "shipsafe-security-incidents";

let incidents = [];

try {
  const savedIncidents = localStorage.getItem(SECURITY_KEY);
  incidents = savedIncidents ? JSON.parse(savedIncidents) : [];

  if (!Array.isArray(incidents)) {
    incidents = [];
  }
} catch (error) {
  incidents = [];
}

function saveIncidents() {
  try {
    localStorage.setItem(SECURITY_KEY, JSON.stringify(incidents));
    return true;
  } catch (error) {
    alert("Could not save incidents in this browser.");
    return false;
  }
}

securityForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const description = document
    .getElementById("incident-description")
    .value.trim();

  const severity = document.getElementById("incident-severity").value;

  if (!description) {
    alert("Please describe the incident.");
    return;
  }

  const incident = {
    id: Date.now(),
    description: description,
    severity: severity,
    status: "Open",
    date: new Date().toLocaleString()
  };

  incidents.push(incident);

  if (saveIncidents()) {
    displayIncidents();
    securityForm.reset();
  } else {
    incidents.pop();
  }
});

function displayIncidents() {
  securityList.replaceChildren();

  if (incidents.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No incidents recorded yet.";
    securityList.appendChild(message);
    return;
  }

  incidents.forEach(function (incident) {
    const card = document.createElement("article");
    card.className = "ticket";

    const heading = document.createElement("h3");
    heading.textContent = "Incident #" + incident.id;
    card.appendChild(heading);

    const description = document.createElement("p");
    description.textContent = incident.description;
    card.appendChild(description);

    const severity = document.createElement("p");
    severity.textContent = "Severity: " + incident.severity;
    card.appendChild(severity);

    const date = document.createElement("p");
    date.textContent = "Reported: " + incident.date;
    card.appendChild(date);

    const status = document.createElement("p");
    status.textContent = "Status: " + incident.status;
    card.appendChild(status);

    if (incident.status === "Open") {
      const button = document.createElement("button");
      button.textContent = "Mark as Reviewed";

      button.addEventListener("click", function () {
        incident.status = "Reviewed";
        saveIncidents();
        displayIncidents();
      });

      card.appendChild(button);
    }

    securityList.appendChild(card);
  });
}

displayIncidents();

function updateDashboard() {
  const openCount = tickets.filter(function (ticket) {
    return ticket.status === "Open";
  }).length;

  const resolvedCount = tickets.filter(function (ticket) {
    return ticket.status === "Resolved";
  }).length;

  document.getElementById("total-tickets").textContent =
    tickets.length;

  document.getElementById("open-tickets").textContent =
    openCount;

  document.getElementById("resolved-tickets").textContent =
    resolvedCount;

  document.getElementById("total-equipment").textContent =
    equipment.length;

  document.getElementById("total-incidents").textContent =
    incidents.length;
}

// Display the initial summary
updateDashboard();