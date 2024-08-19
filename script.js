const canvas = document.getElementById("snakeGameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
let snake = [{ x: 10, y: 10 }];
let snakeLength = 1;
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15, type: "" };
let score = 0;
let currentQuestion = 0;
let playerName = "";
const questions = [
  { q: "What is the unit of electric field?", options: ["Volt", "Tesla", "Newton/Coulomb", "Joule"], answer: 2 },
  { q: "Which law states that the line integral of the magnetic field around any closed loop is equal to μ₀ times the total current enclosed?", options: ["Gauss's Law", "Faraday's Law", "Lenz's Law", "Ampère's Law"], answer: 3 },
  { q: "What does Gauss's Law relate?", options: ["Electric flux and charge", "Magnetic flux and current", "Electric potential and charge", "Electric field and distance"], answer: 0 },
  { q: "What is the speed of light in vacuum?", options: ["3 x 10^8 m/s", "2 x 10^8 m/s", "1 x 10^8 m/s", "4 x 10^8 m/s"], answer: 0 },
  { q: "Which of the following describes Faraday's Law?", options: ["E = mc^2", "V = IR", "dΦ/dt = -EMF", "F = qE"], answer: 2 },
  { q: "In an electromagnetic wave, the electric and magnetic fields are:", options: ["In phase and perpendicular to each other", "Out of phase and perpendicular to each other", "In phase and parallel to each other", "Out of phase and parallel to each other"], answer: 0 },
  { q: "Which quantity is conserved in electromagnetic waves?", options: ["Energy", "Mass", "Momentum", "Both energy and momentum"], answer: 3 },
  { q: "Which of the following equations represents Maxwell’s first law (Gauss's law for electricity)?", options: ["∇·E = ρ/ε₀", "∇·B = 0", "∇×E = -∂B/∂t", "∇×B = μ₀J + μ₀ε₀∂E/∂t"], answer: 0 },
  { q: "What does Maxwell's third equation (Faraday's Law of Induction) state?", options: ["∇·E = ρ/ε₀", "∇×E = -∂B/∂t", "∇·B = 0", "∇×B = μ₀J + μ₀ε₀∂E/∂t"], answer: 1 },
  { q: "The Poynting vector represents:", options: ["The direction of energy propagation in an electromagnetic wave", "The direction of electric field", "The magnetic force", "The electric potential"], answer: 0 },
  { q: "Which of the following is not a fundamental force of nature?", options: ["Gravitational force", "Electromagnetic force", "Weak nuclear force", "Frictional force"], answer: 3 },
  { q: "The capacitance of a parallel plate capacitor increases when:", options: ["The area of the plates decreases", "The distance between the plates increases", "A dielectric material is inserted between the plates", "The voltage across the plates decreases"], answer: 2 },
  { q: "Which of the following statements is true about magnetic monopoles?", options: ["They have been observed experimentally", "They are theoretical constructs and have not been observed", "They are found in every magnet", "They can be isolated from dipoles"], answer: 1 },
  { q: "The energy density in an electromagnetic wave is proportional to:", options: ["E²", "B²", "E² + B²", "E + B"], answer: 2 },
  { q: "What is the formula for the energy stored in a capacitor?", options: ["U = 1/2 CV²", "U = CV", "U = 1/2 QV", "U = 1/2 CV"], answer: 0 },
  { q: "What is the nature of electromagnetic waves?", options: ["Transverse", "Longitudinal", "Both transverse and longitudinal", "None of the above"], answer: 0 },
  { q: "What is the relationship between electric field (E) and potential (V)?", options: ["E = dV/dx", "E = V/d", "E = Vdx", "E = V²/d²"], answer: 1 },
  { q: "The magnetic field inside a long solenoid is:", options: ["Zero", "Non-uniform", "Uniform", "Dependent on the shape of the solenoid"], answer: 2 },
  { q: "Electromagnetic waves are:", options: ["Unpolarized", "Only linearly polarized", "Can be polarized", "Cannot be polarized"], answer: 2 },
  { q: "Which of the following waves is not an electromagnetic wave?", options: ["Radio waves", "Sound waves", "X-rays", "Infrared waves"], answer: 1 },
  { q: "Which of the following is a scalar quantity?", options: ["Electric field", "Magnetic field", "Magnetic flux", "Magnetic vector potential"], answer: 2 },
  { q: "The force experienced by a charged particle moving in a magnetic field is given by:", options: ["F = qE", "F = qvB", "F = q(E + v × B)", "F = v × B"], answer: 2 },
  { q: "Which law is used to determine the induced emf in a coil?", options: ["Lenz's Law", "Ohm's Law", "Faraday's Law", "Ampère's Law"], answer: 2 },
  { q: "In a conductor at electrostatic equilibrium, the electric field inside the conductor is:", options: ["Zero", "Constant", "Non-zero and varying", "Non-zero but constant"], answer: 0 },
  { q: "Which of the following quantities is not conserved in electromagnetic theory?", options: ["Charge", "Energy", "Momentum", "Magnetic monopole"], answer: 3 },
  { q: "The displacement current is associated with:", options: ["Moving charges", "Time-varying electric fields", "Static magnetic fields", "Constant current"], answer: 1 },
  { q: "The potential difference between two points in an electric field depends on:", options: ["The path taken between the points", "The time taken to move between the points", "The nature of the medium between the points", "The distance and the electric field"], answer: 3 },
  { q: "The energy of a photon is proportional to its:", options: ["Amplitude", "Wavelength", "Frequency", "Speed"], answer: 2 },
  { q: "The curl of the magnetic field B in Maxwell’s equations gives rise to:", options: ["Electric field", "Displacement current", "Magnetic flux", "Potential difference"], answer: 1 },
  { q: "Which of the following quantities is dimensionless?", options: ["Magnetic permeability", "Dielectric constant", "Capacitance", "Inductance"], answer: 1 },
  { q: "Which of the following statements is true about the speed of electromagnetic waves in vacuum?", options: ["It depends on frequency", "It is always greater than the speed in a medium", "It is the same for all electromagnetic waves", "It depends on wavelength"], answer: 2 },
  { q: "Electromagnetic waves carry:", options: ["Electric charge", "Electric potential", "Energy and momentum", "Only energy"], answer: 2 },
  { q: "What happens to the wavelength of an electromagnetic wave when it enters a medium with a higher refractive index?", options: ["Increases", "Decreases", "Remains the same", "It depends on the wave's frequency"], answer: 1 },
  { q: "The electric flux through a closed surface is proportional to:", options: ["The charge enclosed", "The area of the surface", "The electric field strength", "The potential difference"], answer: 0 },
  { q: "In a capacitor, the electric field between the plates is:", options: ["Zero", "Uniform", "Non-uniform", "Zero at the edges"], answer: 1 },
  { q: "Which electromagnetic wave has the highest frequency?", options: ["Radio waves", "Microwaves", "Infrared", "Gamma rays"], answer: 3 },
  { q: "The resonance frequency of an LC circuit is given by:", options: ["ω = 1/√(LC)", "ω = √(LC)", "ω = LC", "ω = 1/LC"], answer: 0 },
  { q: "The time constant for an RC circuit is:", options: ["R/C", "RC", "1/RC", "√(RC)"], answer: 1 },
  { q: "A magnetic field is produced by:", options: ["Only stationary charges", "Only moving charges", "Both stationary and moving charges", "Electric fields only"], answer: 1 },
  { q: "The skin depth in a conductor depends on:", options: ["The frequency of the electromagnetic wave", "The material of the conductor", "The amplitude of the wave", "Both frequency and material"], answer: 3 },
  { q: "Which of the following is true for electromagnetic waves?", options: ["They require a medium to propagate", "They can propagate in a vacuum", "They are longitudinal waves", "Their speed depends on the source"], answer: 1 },
  { q: "In which region of the electromagnetic spectrum does visible light lie?", options: ["Between radio and microwaves", "Between infrared and ultraviolet", "Between ultraviolet and X-rays", "Between microwaves and infrared"], answer: 1 },
  { q: "The force between two parallel currents is:", options: ["Attractive if the currents are in opposite directions", "Repulsive if the currents are in the same direction", "Zero if the currents are in the same direction", "Attractive if the currents are in the same direction"], answer: 3 },
  { q: "What is the relationship between electric and magnetic fields in an electromagnetic wave?", options: ["E = B", "E = cB", "E = B/c", "E = c²B"], answer: 1 },
  { q: "The permittivity of free space (ε₀) is approximately:", options: ["8.85 x 10^-12 F/m", "9.11 x 10^-31 F/m", "1.60 x 10^-19 F/m", "6.63 x 10^-34 F/m"], answer: 0 },
  { q: "In the context of electromagnetic theory, the term 'wave impedance' refers to:", options: ["The resistance to current in a conductor", "The ratio of electric field to magnetic field in a wave", "The opposition to the flow of electromagnetic energy", "The refractive index of a medium"], answer: 1 },
  { q: "Which law gives the magnetic field due to a current element?", options: ["Ampère's Law", "Biot-Savart Law", "Faraday's Law", "Lenz's Law"], answer: 1 },
  { q: "Which of the following materials is typically used as a dielectric in capacitors?", options: ["Copper", "Iron", "Air", "Aluminum"], answer: 2 },
  { q: "Which physical quantity remains constant for all types of electromagnetic radiation in a vacuum?", options: ["Wavelength", "Frequency", "Speed", "Amplitude"], answer: 2 }
];
function startGame() {
    playerName = document.getElementById("player-name").value;
    if (!playerName) {
        alert("Please enter your name to start the game.");
        return;
    }
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    console.log("Game Started with player name:", playerName); // Debugging line
    loadQuestion();
    gameLoop();
}
function loadQuestion() {
    shuffleArray(questions);
    const questionObj = questions[currentQuestion];
    document.getElementById("question").innerText = questionObj.q;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    const shapes = ["square", "circle", "diamond", "triangle"];
    shuffleArray(shapes);
    questionObj.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.classList.add(shapes[index]);
        li.dataset.index = index;
        li.innerText = option;
        optionsContainer.appendChild(li);
    });
    placeFood(questionObj.answer, shapes);
}
function placeFood(correctIndex, shapes) {
    const correctShape = shapes[correctIndex];
    const randomX = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    const randomY = Math.floor(Math.random() * (canvas.height / 10)) * 10;
    food = { x: randomX, y: randomY, type: correctShape };
}
function gameLoop() {
    updateSnake();
    if (isGameOver()) {
        endGame();
        return;
    }
    render();
    setTimeout(gameLoop, 100);
}
function updateSnake() {
    const head = { x: snake[0].x + direction.x * 10, y: snake[0].y + direction.y * 10 };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        snakeLength++;
        score++;
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            endGame(true);
        }
    } else if (snake.length > snakeLength) {
        snake.pop();
    }
}
function render() {
    ctx.fillStyle = "black"; // Or any other color
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    snake.forEach(part => ctx.fillRect(part.x, part.y, 10, 10));
    ctx.fillStyle = getShapeColor(food.type);
    drawShape(food);
}
function drawShape(food) {
    const x = food.x + 5;
    const y = food.y + 5;
    ctx.save();
    switch (food.type) {
        case "square":
            ctx.fillRect(food.x, food.y, 10, 10);
            break;
        case "circle":
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
            break;
        case "diamond":
            ctx.translate(x, y);
            ctx.rotate((45 * Math.PI) / 180);
            ctx.fillRect(-5, -5, 10, 10);
            break;
        case "triangle":
            ctx.beginPath();
            ctx.moveTo(food.x + 5, food.y);
            ctx.lineTo(food.x + 10, food.y + 10);
            ctx.lineTo(food.x, food.y + 10);
            ctx.closePath();
            ctx.fill();
            break;
    }
    ctx.restore();
}
function getShapeColor(shape) {
    switch (shape) {
        case "square":
            return "red";
        case "circle":
            return "blue";
        case "diamond":
            return "green";
        case "triangle":
            return "yellow";
    }
}
function isGameOver() {
    const head = snake[0];
    if (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height ||
        snake.some((part, index) => index !== 0 && part.x === head.x && part.y === head.y)
    ) {
        return true;
    }
    return false;
}
function endGame(won = false) {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("game-over-screen").style.display = "block";
    document.getElementById("final-score").innerText = `Score: ${score}`;
    updateGoogleSheet(playerName, score);
}
function updateGoogleSheet(name, score) {
    const url = "https://script.google.com/macros/s/AKfycbwBpK8vLV96Dl_ZNWh4R07YONFsvhoO-_efEjevmG9T-hmM4IHEI9n_6tEla9SYAWS7/exec";
    const data = { name: name, score: score };
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});
