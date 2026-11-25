document.addEventListener("DOMContentLoaded", function () {

    // Dashboard values
    let totalStudyHours = 0;

    // Page Navigation
    const navButtons = document.querySelectorAll(".nav-btn");

    navButtons.forEach(button => {
        button.addEventListener("click", function () {

            const pageId = this.dataset.page;

            document.querySelectorAll(".page").forEach(page => {
                page.classList.remove("active");
            });

            navButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            document.getElementById(pageId).classList.add("active");
            this.classList.add("active");
        });
    });

    // Subject Selection
    const saveButton = document.getElementById("saveSubjects");

    saveButton.addEventListener("click", function () {

        const selectedSubjects = document.querySelectorAll(
            '#subjectList input[type="checkbox"]:checked'
        );

        document.getElementById("subjectCount").textContent =
            selectedSubjects.length;

        document.getElementById("subjectMessage").textContent =
            selectedSubjects.length + " subjects saved successfully!";
    });

    // Study Planner
    document.getElementById("generatePlan")
        .addEventListener("click", function () {

        const subject = document.getElementById("studySubject").value.trim();
        const hoursInput = document.getElementById("studyHours").value;
        const hours = Number(hoursInput);
        const goal = document.getElementById("studyGoal").value.trim();

        const result = document.getElementById("planResult");

        if (
            subject === "" ||
            hoursInput.trim() === "" ||
            !Number.isFinite(hours) ||
            hours <= 0 ||
            hours > 24
        ) {
            result.textContent =
                "Please enter a subject and valid study hours (up to 24).";
            return;
        }

        const totalMinutes = Math.round(hours * 60);

        const learn = Math.round(totalMinutes / 3);
        const practice = Math.round(totalMinutes / 3);
        const revise = totalMinutes - learn - practice;

        totalStudyHours += hours;

        document.getElementById("studyTotal").textContent =
            totalStudyHours.toFixed(1);

        // Create result safely
        result.replaceChildren();

        const heading = document.createElement("h3");
        heading.textContent = "Your Study Plan";

        const details = [
            "Subject: " + subject,
            "Goal: " + (goal || "Improve understanding"),
            "Learning: " + learn + " minutes",
            "Practice: " + practice + " minutes",
            "Revision: " + revise + " minutes",
            "Total: " + totalMinutes + " minutes"
        ];

        result.appendChild(heading);

        details.forEach(detail => {
            const p = document.createElement("p");
            p.textContent = detail;
            result.appendChild(p);
        });
    });

    // Online Quiz
    document.getElementById("submitQuiz")
        .addEventListener("click", function () {

        const q1 = document.querySelector('input[name="q1"]:checked');
        const q2 = document.querySelector('input[name="q2"]:checked');

        const result = document.getElementById("quizResult");

        if (!q1 || !q2) {
            result.textContent = "Please answer all questions!";
            return;
        }

        let score = 0;

        if (q1.value === "HTML") score++;
        if (q2.value === "CSS") score++;

        const percentage = Math.round((score / 2) * 100);

        result.textContent =
            "Your Score: " + score + "/2 (" + percentage + "%)";

        document.getElementById("quizAverage").textContent =
            percentage + "%";
    });

    // Reset Quiz
    document.getElementById("resetQuiz")
        .addEventListener("click", function () {

        document.querySelectorAll('input[name="q1"], input[name="q2"]')
            .forEach(input => input.checked = false);

        document.getElementById("quizResult").textContent = "";
    });

    // Notes and PDF Upload
    document.getElementById("fileInput")
        .addEventListener("change", function () {

        const fileList = document.getElementById("fileList");

        fileList.replaceChildren();

        Array.from(this.files).forEach(file => {

            const li = document.createElement("li");

            li.textContent =
                file.name + " (" + (file.size / 1024).toFixed(1) + " KB)";

            fileList.appendChild(li);
        });
    });

    // Skill Tracker
    document.getElementById("addSkill")
        .addEventListener("click", function () {

        const input = document.getElementById("skillName");
        const skill = input.value.trim();

        if (skill === "") {
            alert("Please enter a skill!");
            return;
        }

        const li = document.createElement("li");

        li.textContent = skill + " - New Skill";

        document.getElementById("skillList").appendChild(li);

        // Update Dashboard Skill Count
        const skillCount = document.querySelectorAll(
            "#skillList li"
        ).length;

        document.getElementById("skillCount").textContent =
            skillCount;

        input.value = "";

        alert("New skill added successfully!");
    });

    // Initialize dashboard counts
    document.getElementById("skillCount").textContent =
        document.querySelectorAll("#skillList li").length;

    document.getElementById("subjectCount").textContent =
        document.querySelectorAll(
            '#subjectList input[type="checkbox"]:checked'
        ).length;

});
