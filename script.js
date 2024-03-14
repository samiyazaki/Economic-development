// Ensuring the DOM is fully loaded before attaching event handlers
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('rollDiceButton').addEventListener('click', calculateArmorAndRollDice);
    const form = document.getElementById('allocation-form'); 
    form.addEventListener('submit', calculateArmorAndRollDice);
});
let totalBudget = 1000000000000; // 1 trillion dollars

const sectors = {
    healthcare: { points: 0, armor: 0 },
    education: { points: 0, armor: 0 },
    defense: { points: 0, armor: 0 },
    infrastructure: { points: 0, armor: 0 },
    technology: { points: 0, armor: 0 },
    environment: { points: 0, armor: 0 },
    socialWelfare: { points: 0, armor: 0 },
    economicDevelopment: { points: 0, armor: 0 },
    publicSafety: { points: 0, armor: 0 },
};

const crises = [
    { sector: "healthcare", description: "Pandemic Outbreak", penalty: 20, bonus: 5 },
    { sector: "healthcare", description: "Critical Drug Shortage", penalty: 15, bonus: 5 },
    { sector: "education", description: "Educational Technology Breach", penalty: 10, bonus: 5 },
    { sector: "education", description: "Teacher Strike", penalty: 10, bonus: 5 },
    { sector: "defense", description: "Border Conflict", penalty: 20, bonus: 5 },
    { sector: "defense", description: "Cyber Warfare Attack", penalty: 15, bonus: 5 },
    { sector: "infrastructure", description: "Bridge Collapse", penalty: 15, bonus: 5 },
    { sector: "infrastructure", description: "Power Grid Failure", penalty: 20, bonus: 5 },
    { sector: "technology", description: "Tech Startup Crash", penalty: 15, bonus: 5 },
    { sector: "technology", description: "Research Lab Accident", penalty: 10, bonus: 5 },
    { sector: "environment", description: "Oil Spill", penalty: 20, bonus: 5 },
    { sector: "environment", description: "Deforestation Crisis", penalty: 15, bonus: 5 },
    { sector: "socialWelfare", description: "Housing Crisis", penalty: 15, bonus: 5 },
    { sector: "socialWelfare", description: "Unemployment Spike", penalty: 10, bonus: 5 },
    { sector: "economicDevelopment", description: "Market Crash", penalty: 20, bonus: 5 },
    { sector: "economicDevelopment", description: "Trade Embargo", penalty: 15, bonus: 5 },
    { sector: "publicSafety", description: "Natural Disaster", penalty: 20, bonus: 5 },
    { sector: "publicSafety", description: "Rioting and Civil Unrest", penalty: 15, bonus: 5 }
];

function updateBudgetDisplay() {
    const budgetDisplayElement = document.getElementById("current-budget");
    budgetDisplayElement.innerText = `$${totalBudget.toLocaleString()}`;
}
updateBudgetDisplay(); // This will update the display when the script loads

function getRandomCrisis() {
    return crises[Math.floor(Math.random() * crises.length)];
}

function applyOutcome(sector, diceRoll, armor) {
    const crisis = crises.find(crisis => crisis.sector === sector);
    let outcomeMessage;
    let budgetImpact;

    if (diceRoll <= armor) {
        // Apply bonus: Reduce the negative impact (or increase the budget)
        budgetImpact = totalBudget * (crisis.bonus / 100);
        totalBudget += budgetImpact; // Adjust total budget
        outcomeMessage = `Safe! Bonus: Budget increased by ${crisis.bonus}%, adding $${budgetImpact.toLocaleString()}.`;
    } else {
        // Apply penalty: Increase the negative impact (or decrease the budget)
        budgetImpact = totalBudget * (crisis.penalty / 100);
        totalBudget -= budgetImpact; // Adjust total budget
        outcomeMessage = `Crisis! Penalty: Budget decreased by ${crisis.penalty}%, losing $${budgetImpact.toLocaleString()}.`;
    }

    // Update the display of the total budget
    updateBudgetDisplay();

    return outcomeMessage;
}

function calculateArmorAndRollDice(event) {
    event.preventDefault(); // Prevent default form submission behavior

    for (const sector in sectors) {
        const points = parseInt(document.getElementById(sector).value) || 0;
        sectors[sector].points = points;
        sectors[sector].armor = points * 5; // Each point gives 5 points of armor
    }

    const crisisEvent = getRandomCrisis();
    const diceRoll = Math.ceil(Math.random() * 12); // Simulating a dice roll (1-12)
    const armor = sectors[crisisEvent.sector].armor;
    const outcome = applyOutcome(crisisEvent.sector, diceRoll, armor);

    document.getElementById("outcome-description").innerHTML = `
        Crisis in ${crisisEvent.sector}: <strong>${crisisEvent.description}</strong><br>
        Rolled ${diceRoll}, Armor ${armor}.<br>
        Outcome: ${outcome}
    `;
}
