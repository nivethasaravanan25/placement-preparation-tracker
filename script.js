let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let goal = localStorage.getItem("goal") || 0;
let streak = localStorage.getItem("streak") || 0;
let dailyGoal=0;
let completedToday= 0;

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
    let priority = document.getElementById("difficulty").value;

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
let dailyGoal = 0;
let completedToday = 0;

function setGoal() {
    dailyGoal = document.getElementById("goalInput").value;
    completedToday = 0;
    updateGoal();
}

function updateGoal() {
    document.getElementById("goalText").innerText =
        `Goal: ${completedToday} / ${dailyGoal}`;
}

// DISPLAY TASKS

    function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <span onclick="toggleTask(${index})"
                  style="cursor:pointer; ${task.completed ? 'text-decoration:line-through;' : ''}">
                ${task.text} (${task.category}) - ${task.date}
            </span>
            <button onclick="deleteTask(${index})">X</button>
        `;

        list.appendChild(li);
    });

    updateProgress();
}
    updateGoalStatus();

    localStorage.setItem("tasks", JSON.stringify(tasks));


// TOGGLE
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;

if (!tasks[index].completed) {
    tasks[index].completed = true;
    completedToday++;
} else {
    tasks[index].completed = false;
    completedToday--;
}

updateGoal();
updateStreak();

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




function updateGoal() {
    document.getElementById("goalText").innerText =
        `Goal: ${completedToday} / ${dailyGoal}`;

    let percent = (completedToday / dailyGoal) * 100 || 0;
    document.getElementById("goalProgress").style.width = percent + "%";

    let msg = "";

    if (percent === 100) {
        msg = "🔥 Goal achieved! Great job!";
    } else if (percent > 50) {
        msg = "💪 Almost there!";
    } else {
        msg = "🚀 Keep going!";
    }

    document.getElementById("goalMsg").innerText = msg;
}
function resetGoal() {
    completedToday = 0;
    updateGoal();
}
if (completedToday == dailyGoal) {
    streak++;
}
let streak = localStorage.getItem("streak") || 0;
let lastDate = localStorage.getItem("lastDate") || "";
function updateStreak() {
    let today = new Date().toDateString();

    if (completedToday > 0) {
        if (lastDate === "") {
            streak = 1;
        } 
        else {
            let yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (lastDate === yesterday.toDateString()) {
                streak++; // continue streak
            } 
            else if (lastDate !== today) {
                streak = 1; // reset
            }
        }

        lastDate = today;

        localStorage.setItem("streak", streak);
        localStorage.setItem("lastDate", lastDate);
    }

    document.getElementById("streakText").innerText = `🔥 Streak: ${streak}`;
}

// STREAK
function updateStreak() {
    streak++;
    localStorage.setItem("streak", streak);
    document.getElementById("streak").innerText = "🔥 Streak: " + streak;
}
if (streak >= 5) {
    document.getElementById("streakText").innerText += " 💪 On fire!";
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