let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let dailyGoal = 0;
let completedToday = 0;

let streak = localStorage.getItem("streak") || 0;
let lastDate = localStorage.getItem("lastDate") || "";

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
function updateProgress() {
    let completed = tasks.filter(t => t.completed).length;
    let total = tasks.length;

    let percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    document.getElementById("progress").innerText = `Progress: ${percent}%`;
    document.getElementById("stats").innerText =
        `Completed: ${completed}/${total} | Remaining: ${total - completed}`;

    document.getElementById("progressFill").style.width = percent + "%";
}

// DISPLAY TASKS
function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((t, i) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <span onclick="toggleTask(${i})"
            style="cursor:pointer; ${t.completed ? 'text-decoration:line-through;opacity:0.6;' : ''}">
                ${t.text} (${t.category})
                ${t.completed ? `<br><small>✅ Completed on: ${t.completedDate}</small>` : ''}
            </span>
            <button onclick="deleteTask(${i})">X</button>
        `;

        list.appendChild(li);
    });

    updateProgress();
    updateGoal();

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// TOGGLE TASK
function toggleTask(i) {
    tasks[i].completed = !tasks[i].completed;

    if (tasks[i].completed) {
        tasks[i].completedDate = new Date().toLocaleDateString();
    } else {
        tasks[i].completedDate = "";
    }

    completedToday = tasks.filter(t => t.completed).length;

    displayTasks();
    updateStreak();
}

// DELETE
function deleteTask(i) {
    tasks.splice(i, 1);
    displayTasks();
}

// PROGRESS
function updateProgress() {
    let completed = tasks.filter(t => t.completed).length;
    let total = tasks.length;

    let percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    document.getElementById("progress").innerText = `Progress: ${percent}%`;
    document.getElementById("stats").innerText =
        `Completed: ${completed}/${total} | Remaining: ${total - completed}`;
}
        date: new Date().toLocaleDateString()
        completedToday = tasks.filter(t => t.completed).length;
updateGoal();

// GOAL
function setGoal() {
    dailyGoal = parseInt(document.getElementById("goalInput").value) || 0;
    updateGoal();
}
    window.onload = function () {
    displayTasks();

    completedToday = tasks.filter(t => t.completed).length;

    updateGoal();
    updateStreak();
};
tasks[i].completedDate = new Date().toLocaleString();

function updateGoal() {
    document.getElementById("goalText").innerText =
        `Goal: ${completedToday} / ${dailyGoal}`;

    if (completedToday >= dailyGoal && dailyGoal > 0) {
        document.getElementById("goalMsg").innerText = "🔥 Goal Achieved!";
    } else {
        document.getElementById("goalMsg").innerText = "🚀 Keep going!";
    }
}

// 🔥 AUTO STREAK + QUOTES
function updateStreak() {
    let today = new Date().toDateString();

    if (completedToday > 0) {
        if (lastDate === "") {
            streak = 1;
        } else {
            let yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (lastDate === yesterday.toDateString()) {
                streak++;
            } else if (lastDate !== today) {
                streak = 1;
            }
        }

        lastDate = today;

        localStorage.setItem("streak", streak);
        localStorage.setItem("lastDate", lastDate);
    }

    document.getElementById("streakText").innerText = `🔥 Streak: ${streak}`;

    // 🔥 QUOTES
    let msg = "";

    if (streak >= 5) {
        msg = "🔥 You're on fire!";
    } else if (streak >= 3) {
        msg = "💪 Keep the momentum!";
    } else if (streak >= 1) {
        msg = "🚀 Good start!";
    } else {
        msg = "Start your streak today!";
    }

    document.getElementById("streakMsg").innerText = msg;
}

// COMPANY
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

// LOAD
window.onload = function () {
    displayTasks();
    updateStreak();
};