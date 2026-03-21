let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let goal = localStorage.getItem("goal") || 0;
let streak = localStorage.getItem("streak") || 0;

displayTasks();

// COMPANY DATA
let companies = {
    "TCS": [
        "Aptitude Round",
        "Coding Round",
        "Technical Interview",
        "HR Interview"
    ],
    "Infosys": [
        "Aptitude",
        "DBMS + OOPs",
        "Technical Round",
        "HR Round"
    ],
    "Wipro": [
        "Aptitude",
        "Coding",
        "Communication Test",
        "Interview"
    ],
    "Accenture": [
        "Pseudocode Round",
        "Coding Round",
        "Technical + HR"
    ],
    "Zoho": [
        "Advanced DSA",
        "Strong Coding",
        "Multiple Interview Rounds"
    ]
};

// ADD TASK
function addTask() {
    let text = document.getElementById("taskInput").value;
    let category = document.getElementById("category").value;
    let priority = document.getElementById("priority").value;

    if (text === "") return;

    tasks.push({
        text,
        category,
        priority,
        completed: false,
        date: new Date().toLocaleDateString()
    });

    document.getElementById("taskInput").value = "";
    displayTasks();
}

// DISPLAY TASKS
function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((t, i) => {
        let li = document.createElement("li");
        li.classList.add(t.priority.toLowerCase());

        li.innerHTML = `
            <span onclick="toggleTask(${i})">
                ${t.text} (${t.category}) - ${t.date}
            </span>
            <button onclick="deleteTask(${i})">X</button>
        `;
        if (t.completed) {
    li.style.textDecoration = "line-through";
    li.style.opacity = "0.6";
}

        list.appendChild(li);
    });

    updateProgress();
    updateGoalStatus();

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// TOGGLE
function toggleTask(i) {
    tasks[i].completed = !tasks[i].completed;
    displayTasks();
}

// DELETE
function deleteTask(i) {
    tasks.splice(i, 1);
    displayTasks();
}

// CLEAR
function clearAll() {
    tasks = [];
    displayTasks();
}



// PROGRESS
function updateProgress() {
    let completed = tasks.filter(t => t.completed).length;
    let total = tasks.length;

    let percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    document.getElementById("progress").innerText = "Progress: " + percent + "%";
    document.getElementById("progressBar").style.width = percent + "%";

    document.getElementById("stats").innerText =
        `Completed: ${completed}/${total} | Remaining: ${total - completed}`;
}

// GOAL
function setGoal() {
    goal = document.getElementById("goal").value;
    localStorage.setItem("goal", goal);
}

function updateGoalStatus() {
    let completed = tasks.filter(t => t.completed).length;
    document.getElementById("goalStatus").innerText =
        `Goal: ${completed}/${goal}`;
}

// STREAK
function updateStreak() {
    streak++;
    localStorage.setItem("streak", streak);
    document.getElementById("streak").innerText = "🔥 Streak: " + streak;
}

// COMPANY DETAILS
function showCompanyDetails() {
    let company = document.getElementById("companySelect").value;
    let list = document.getElementById("companyDetails");

    list.innerHTML = "";

    if (companies[company]) {
        companies[company].forEach(skill => {
            let li = document.createElement("li");
            li.innerText = skill;
            list.appendChild(li);
        });
    }
}

// THEME
function toggleTheme() {
    document.body.classList.toggle("light");
}