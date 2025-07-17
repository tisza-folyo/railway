let timer = 0;
let cycleTime = 1000;
let interval;
let difSelect;
let map;
let designerName;
const page = document.querySelector("#frame");
let table = document.createElement("table");
let gamePage = document.querySelector(".gameFrame");
const railsRot = [4]
let index = 0;
let side;
let difficulty;

addEventListener("load", () => {
    document.querySelector("#start").addEventListener("click", gameStart);
    document.querySelector("#easy").addEventListener("click", () => {
        selected("easy");
    })
    document.querySelector("#hard").addEventListener("click", () => {
        selected("hard");
    })
    d = document.querySelector(".description")
    d.className = "description"
    document.querySelector("#descript").addEventListener("click", () => {
        d.showModal()
    })
    d.addEventListener("click", () => {
        d.close()
    })

    const startButton = document.querySelector("#start");


    startButton.addEventListener("click", () => {
        setTimeout(startTimer);
    })

})

function gameStart(event) {
    railsRot[0] = 0;
    railsRot[1] = 90;
    railsRot[2] = 180;
    railsRot[3] = 270;
    page.style.display = "none";
    designerName = document.querySelector("input").value
    buildSecondPage();
    document.querySelector(".imG").addEventListener("click", newGame);
    document.querySelector(".board").addEventListener("click", putRail);
    gamePage = document.querySelector(".gameFrame");
    const randomNumber = Math.floor(Math.random() * 5) + 1
    if (difSelect == "easy") {
        makeEasy(randomNumber);
    } else if (difSelect == "hard") {
        makeHard(randomNumber);
    }
    loadMap();
}

function correct() {
    done = true;
    let i = 0;
    let j = 0;
    while (done && i < map.length) {
        while (done && j < map.length) {
            if (map[i][j] instanceof bridgeField || map[i][j] instanceof emptyField || map[i][j] instanceof mountainField) {
                done = false;
            } else if (!(map[i][j] instanceof oasisField)) {
                b = compareRails(i, j, map[i][j]);
                if (!b) {
                    done = false;
                }
            }
            j++;
        }
        i++;
        j = 0;

    }
    return done;
}

function compareRails(x, y, rail) {
    let connectCnt = 0;
    connectCnt += checkBottom(rail, x, y);
    connectCnt += checkTop(rail, x, y);
    connectCnt += checkRight(rail, x, y);
    connectCnt += checkLeft(rail, x, y);
    if (connectCnt == 2) {
        return true;
    } else {
        return false;
    }

}
function checkLeft(f, x, y) {
    let railPrev;
    if (y == 0) {
        railPrev = new emptyField();
    } else {
        railPrev = map[x][y - 1];
    }
    if (f.contacts.includes("left") && railPrev.contacts.includes("right")) {
        return 1;
    }
    return 0;
}
function checkTop(f, x, y) {
    let railPrev;
    if (x == 0) {
        railPrev = new emptyField();
    } else {
        railPrev = map[x - 1][y];
    }
    if (f.contacts.includes("top") && railPrev.contacts.includes("bottom")) {
        return 1;
    }
    return 0;
}
function checkRight(f, x, y) {
    let railNext;
    if (y == map.length - 1) {
        railNext = new emptyField();
    } else {
        railNext = map[x][y + 1];
    }
    if (f.contacts.includes("right") && railNext.contacts.includes("left")) {
        return 1;
    }
    return 0;
}
function checkBottom(f, x, y) {
    let railNext;
    if (x == map.length - 1) {
        railNext = new emptyField();
    } else {
        railNext = map[x + 1][y];
    }
    if (f.contacts.includes("bottom") && railNext.contacts.includes("top")) {
        return 1;
    }
    return 0;
}

function startTimer() {
    if (interval != undefined) {
        console.log("Already running")
        return;
    }
    interval = setInterval(tick, cycleTime);
}

function tick() {
    timer++;
    document.querySelector(".time").innerText = convertSecondsToString(timer);
    if (timer == 1500) {
        newGame()
    }
}

function buildSecondPage() {
    if (gamePage != null) {
        gamePage.remove();
        table = document.createElement("table");
    }

    railPic = document.querySelector("#rail")
    railPic.className = "railPic";


    gameFrame = document.createElement("div");
    gameFrame.className = "gameFrame";

    side = document.createElement("div")
    side.className = "side";

    imgDiv = document.createElement("div")
    imgDiv.className = "imgDiv";

    imG = document.createElement("img")
    imG.src = "./pics/screens/title.png"
    imG.className = "imG";


    generalThings = document.createElement("div")
    generalThings.className = "generalThings"

    temp = document.createElement("p")
    temp.innerText = "ÚTVONALTERVEZŐ:"
    temp.className = "desNameTitle"
    generalThings.appendChild(temp)
    temp = document.createElement("p")
    temp.innerText = designerName
    temp.className = "desName"
    generalThings.appendChild(temp)
    temp = document.createElement("hr")
    generalThings.appendChild(temp)
    temp = document.createElement("p")
    temp.innerText = "ELTELT IDŐ:"
    temp.className = "timeTitle"
    generalThings.appendChild(temp)
    temp = document.createElement("p")
    temp.innerText = "00:00"
    temp.className = "time"

    generalThings.appendChild(temp)

    divTable = document.createElement("div")
    divTable.className = "divTable"

    table.className = "board"

    divTable.appendChild(table)
    imgDiv.appendChild(imG)
    side.appendChild(imgDiv)
    side.appendChild(generalThings)
    gameFrame.appendChild(side)
    gameFrame.appendChild(divTable);
    document.body.appendChild(gameFrame);
}

function selected(d) {
    const e = document.querySelector("#easy");
    const h = document.querySelector("#hard")
    if (d == "easy" && difSelect != "easy") {
        e.classList.add("selectedDif");
        h.classList.add("deSelectedDif");
        e.classList.remove("deSelectedDif");
        h.classList.remove("selectedDif");
        difSelect = "easy";
    } else if (d == "hard" && difSelect != "hard") {
        h.classList.add("selectedDif");
        e.classList.add("deSelectedDif");
        h.classList.remove("deSelectedDif");
        e.classList.remove("selectedDif");
        difSelect = "hard";
    }

}

function sortTopList() {
    const records = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        records.push({ key, value });
    }

    records.sort((a, b) => {
        return a.value > b.value ? 1 : -1;
    });
    return records;
}


function makeEasy(x) {
    makeEmpty(5);
    if (x == 1) {
        map[0][1] = new mountainField(90)
        map[4][2] = new mountainField(270)
        map[2][2] = new mountainField(180)

        map[0][4] = new oasisField(0)
        map[1][4] = new oasisField(0)
        map[3][3] = new oasisField(0)

        map[1][3] = new bridgeField(0)
        map[2][0] = new bridgeField(0)
    } else if (x == 2) {
        map[1][1] = new mountainField(180)
        map[1][4] = new mountainField(180)
        map[2][2] = new mountainField(270)

        map[0][0] = new oasisField(0)
        map[2][1] = new oasisField(0)
        map[3][3] = new oasisField(0)

        map[0][2] = new bridgeField(90)
        map[2][0] = new bridgeField(0)
    } else if (x == 3) {
        map[2][1] = new mountainField(180)
        map[4][4] = new mountainField(180)

        map[3][1] = new oasisField(0)

        map[0][2] = new bridgeField(90)
        map[1][4] = new bridgeField(0)
        map[2][2] = new bridgeField(0)
        map[4][1] = new bridgeField(90)
    } else if (x == 4) {
        map[2][2] = new mountainField(90)
        map[2][4] = new mountainField(90)
        map[4][3] = new mountainField(270)

        map[4][2] = new oasisField(0)

        map[0][3] = new bridgeField(90)
        map[2][0] = new bridgeField(0)
    } else if (x == 5) {
        map[1][1] = new mountainField(0)
        map[2][3] = new mountainField(270)
        map[4][1] = new mountainField(180)

        map[3][3] = new oasisField(0)

        map[0][2] = new bridgeField(90)
        map[2][0] = new bridgeField(0)
        map[3][2] = new bridgeField(0)
    }
}

function makeHard(x) {
    makeEmpty(7);
    if (x == 1) {
        map[0][1] = new mountainField(90)
        map[3][3] = new mountainField(270)
        map[4][0] = new mountainField(270)
        map[4][2] = new mountainField(90)

        map[0][2] = new oasisField(0)
        map[0][3] = new oasisField(0)
        map[4][6] = new oasisField(0)

        map[0][5] = new bridgeField(90)
        map[1][0] = new bridgeField(0)
        map[2][2] = new bridgeField(0)
        map[4][4] = new bridgeField(90)
        map[6][3] = new bridgeField(90)
    } else if (x == 2) {
        map[1][5] = new mountainField(180)
        map[3][0] = new mountainField(0)
        map[4][3] = new mountainField(90)
        map[5][1] = new mountainField(0)

        map[0][2] = new oasisField(0)
        map[4][1] = new oasisField(0)
        map[6][2] = new oasisField(0)

        map[1][0] = new bridgeField(0)
        map[1][2] = new bridgeField(90)
        map[2][2] = new bridgeField(90)
        map[2][6] = new bridgeField(0)

    } else if (x == 3) {
        map[2][2] = new mountainField(270)
        map[4][2] = new mountainField(270)
        map[5][5] = new mountainField(90)
        map[6][3] = new mountainField(180)

        map[2][0] = new oasisField(0)
        map[4][1] = new oasisField(0)
        map[6][2] = new oasisField(0)

        map[0][2] = new bridgeField(90)
        map[1][6] = new bridgeField(0)
        map[4][4] = new bridgeField(90)
        map[5][0] = new bridgeField(0)
    } else if (x == 4) {
        map[1][5] = new mountainField(180)
        map[2][2] = new mountainField(270)
        map[4][2] = new mountainField(180)
        map[4][4] = new mountainField(90)
        map[5][5] = new mountainField(270)

        map[3][3] = new oasisField(0)

        map[1][3] = new bridgeField(0)
        map[3][1] = new bridgeField(90)
        map[3][5] = new bridgeField(90)
        map[5][0] = new bridgeField(0)
    } else if (x == 5) {
        map[1][5] = new mountainField(0)
        map[2][4] = new mountainField(90)
        map[4][2] = new mountainField(0)
        map[5][1] = new mountainField(180)

        map[4][4] = new oasisField(0)

        map[2][1] = new bridgeField(90)
        map[2][2] = new bridgeField(90)
        map[5][3] = new bridgeField(0)

    }
}

function makeEmpty(n) {
    map = new Array(n);
    for (let i = 0; i < n; i++) {
        map[i] = new Array(n)
        for (let j = 0; j < n; j++) {
            map[i][j] = new emptyField()
        }

    }
}

function loadMap() {
    if (map === undefined) {
        console.log("Nem választottál nehézséget!");
        return;
    }
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    for (let i = 0; i < map.length; i++) {
        tr = document.createElement("tr");
        for (let j = 0; j < map.length; j++) {
            f = map[i][j];
            f.field.id = ("" + i + "," + j);
            tr.appendChild(f.field)
        }
        table.appendChild(tr);
    }

}


function newGame() {

    page.style.display = "flex";
    gamePage.style.display = "none"
    clearInterval(interval);
    interval = undefined;
    timer = 0;
}
function endGame(desName) {
    let res = sortTopList();
    o = document.querySelector(".times");
    o.remove();
    o = document.createElement("ol");
    o.className = "times";
    for (let i = 0; i < res.length; i++) {
        const elem = document.createElement("li");
        const key = res[i].key;
        const value = res[i].value;       
        if (key.split(" ")[1] == difSelect) {
            elem.innerText = ("" + key.split(" ")[0] + " " + convertSecondsToString(value));
            if (key.split(" ")[0] == desName) {
                elem.className = "actual";
            }
            o.appendChild(elem);
        }

    }
    t = document.querySelector(".topListDialog");
    t.appendChild(o);
    t.showModal();
    t.addEventListener("click", () => {
        t.close();
        newGame();
    })
    clearInterval(interval);
    interval = undefined;
    timer = 0;
}

function convertSecondsToString(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

function putRail(event) {
    let target = event.target;
    if (target.tagName === "IMG") {
        target = target.parentElement;
    }

    if (target.tagName === "TD") {
        x = target.id.split(",")[0]
        y = target.id.split(",")[1]
        railOptions(event, map[x][y], x, y)

    }
    if (correct()) {
        localStorage.setItem((designerName + " " + difSelect), timer);
        endGame(designerName);
    }
}
function railOptions(e, f, x, y) {

    if (f instanceof bridgeField && !e.ctrlKey) {
        b = new bridgeRail(f.rotation);
        map[x][y] = b;
    } else if (f instanceof bridgeRail && e.ctrlKey) {
        b = new bridgeField(f.rotation);
        b.field.id = ("" + x + "," + y);
        map[x][y] = b;
    } else if (f instanceof mountainField && !e.ctrlKey) {
        m = new mountainRail(f.rotation)
        m.field.id = ("" + x + "," + y);
        map[x][y] = m;
    } else if (f instanceof mountainRail && e.ctrlKey) {
        m = new mountainField(f.rotation)
        m.field.id = ("" + x + "," + y);
        map[x][y] = m;
    } else if (f instanceof emptyField || f instanceof straightRail || f instanceof curveRail) {
        if (e.ctrlKey) {
            index = 1
            r = new emptyField();
        } else if (f instanceof straightRail && e.shiftKey) {
            index = 0
            r = new curveRail(0)
        } else if (f instanceof curveRail && e.shiftKey) {
            index = 0
            r = new straightRail(0)
        } else if (f instanceof straightRail && !e.shiftKey) {
            r = new straightRail(railsRot[index % railsRot.length]);
        } else if (f instanceof curveRail && !e.shiftKey) {
            r = new curveRail(railsRot[index % railsRot.length]);
        } else if (f instanceof emptyField && !e.shiftKey) {
            index = 0
            r = new straightRail(0)
        }else if(f instanceof emptyField && e.shiftKey){
            index = 0
            r = new curveRail(0)
        }
        index++;
        r.field.id = ("" + x + "," + y);
        map[x][y] = r;
    }
    loadMap()
}

class emptyField {
    field;
    contacts;
    constructor() {
        this.field = document.createElement("td");
        let i = document.createElement("img")
        i.src = "./pics/tiles/empty.png"
        i.className = "fieldImg";
        this.field.appendChild(i);
        this.contacts = [];
    }
}
class oasisField {
    rotation;
    field;
    contacts;
    constructor(x) {
        this.rotation = x;
        this.field = document.createElement("td");
        let i = document.createElement("img")
        i.src = "./pics/tiles/oasis.png"
        i.className = "fieldImg";
        this.field.className = "field";
        this.field.appendChild(i);
        this.contacts = [];

    }
}
class bridgeField {
    rotation;
    field;
    contacts;
    constructor(x) {
        this.rotation = x;
        this.field = document.createElement("td");
        let i = document.createElement("img")
        i.src = "./pics/tiles/bridge.png"
        i.className = "fieldImg";
        i.style.transform = `rotate(${x}deg)`;
        this.field.className = "field";
        this.field.appendChild(i)
        this.contacts = [];
    }
}
class mountainField {
    rotation;
    field;
    contacts;
    constructor(x) {
        this.rotation = x;
        this.field = document.createElement("td");
        let i = document.createElement("img")
        i.src = "./pics/tiles/mountain.png"
        i.className = "fieldImg";
        i.style.transform = `rotate(${x}deg)`;
        this.field.className = "field";
        this.field.appendChild(i)
        this.contacts = [];
    }
}
class bridgeRail {
    rotation;
    field;
    contacts;
    constructor(x) {
        this.rotation = x;
        this.field = document.createElement("td");
        let i = document.createElement("img")
        i.src = "./pics/tiles/bridge_rail.png"
        i.className = "fieldImg";
        i.style.transform = `rotate(${x}deg)`;
        this.field.className = "field";
        this.field.appendChild(i)
        if (x == 0 || x == 180) {
            this.contacts = ["top", "bottom"];
        } else if (x == 90 || x == 270) {
            this.contacts = ["left", "right"];
        }
    }
}
class curveRail {
    rotation;
    field;
    contacts;
    constructor(x) {
        this.rotation = x;
        this.field = document.createElement("td");
        let i = document.createElement("img")
        i.src = "./pics/tiles/curve_rail.png"
        i.className = "fieldImg";
        i.style.transform = `rotate(${x}deg)`;
        this.field.className = "field";
        this.field.appendChild(i)
        if (x == 0) {
            this.contacts = ["bottom", "right"];
        } else if (x == 90) {
            this.contacts = ["left", "bottom"];
        } else if (x == 180) {
            this.contacts = ["left", "top"];
        } else if (x == 270) {
            this.contacts = ["top", "right"];
        }
    }
}
class mountainRail {
    rotation;
    field;
    contacts;
    constructor(x) {
        this.rotation = x;
        this.field = document.createElement("td");
        let i = document.createElement("img")
        i.src = "./pics/tiles/mountain_rail.png"
        i.className = "fieldImg";
        i.style.transform = `rotate(${x}deg)`;
        this.field.className = "field";
        this.field.appendChild(i)
        if (x == 0) {
            this.contacts = ["bottom", "right"];
        } else if (x == 90) {
            this.contacts = ["left", "bottom"];
        } else if (x == 180) {
            this.contacts = ["left", "top"];
        } else if (x == 270) {
            this.contacts = ["top", "right"];
        }
    }
}
class straightRail {
    rotation;
    field;
    contacts;
    constructor(x) {
        this.rotation = x;
        this.field = document.createElement("td");
        let i = document.createElement("img")
        i.src = "./pics/tiles/straight_rail.png"
        i.className = "fieldImg";
        i.style.transform = `rotate(${x}deg)`;
        this.field.className = "field";
        this.field.appendChild(i)
        if (x == 0 || x == 180) {
            this.contacts = ["top", "bottom"];
        } else if (x == 90 || x == 270) {
            this.contacts = ["left", "right"];
        }
    }
}