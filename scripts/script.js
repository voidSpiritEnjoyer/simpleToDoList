const newGoalInp = document.getElementById('new-goal');
const goalList = document.getElementById("goal-list");
const listContainer = document.getElementById("list-container");
const mainContainer = document.getElementById("main-container");
const notesContainer = document.getElementById("notes-container");
const noteColor = document.getElementById("note-color");

const creatingNewGoalItem = (goalText) => {
    const newGoalItem = document.createElement('li');

    const newGoalItemText = document.createTextNode(goalText);

    newGoalItem.appendChild(newGoalItemText);

    newGoalItem.addEventListener("dblclick", () => {
        goalList.removeChild(newGoalItem);
        setLiElWidth();
        updateLocalStorage();
    })

    newGoalItem.classList.add("li-elem");
    
    return newGoalItem;
}

const newGoalAdding = (ev) => {
    const todoText = newGoalInp.value

    const newGoal = creatingNewGoalItem(todoText);
    goalList.appendChild(newGoal);

    newGoalInp.value = "";

    setLiElWidth();
    updateLocalStorage();
}

const setLiElWidth = () => {
    liElems = document.getElementsByClassName("li-elem");
    const liElemsArr = [...liElems];

    goalList.childElementCount > 9
    ? liElemsArr.forEach((elem) => {
        elem.classList.add("less-width-li")
    })
    : liElemsArr.forEach((elem) => {
        elem.classList.remove("less-width-li")
    })
}

const updateLocalStorage = () => {
    const goals = [];

    goalList.querySelectorAll('li').forEach(elem => {
        goals.push(elem.firstChild.textContent)
    })

    localStorage.setItem('goals', JSON.stringify(goals))

    console.log(goalList.childNodes);
}


const loadGoals = () => {
    const previousGoals = localStorage.getItem("goals");

    if (previousGoals) {
        const goals = JSON.parse(previousGoals);
        goals.forEach(elem => {
            const goalItem = creatingNewGoalItem(elem);
            goalList.appendChild(goalItem);
        })
    }

    setLiElWidth();
}


newGoalInp.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        newGoalAdding();
    }
})

document.addEventListener("DOMContentLoaded", loadGoals)

