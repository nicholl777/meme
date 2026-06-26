const board = document.getElementById("board");

const colors = {
    red: "#ef4444",
    orange: "#f97316",
    yellow: "#eab308",
    green: "#22c55e",
    blue: "#3b82f6",
    purple: "#8b5cf6"
};

function getColor(title){

    if([
        "Anjing Ngejar",
        "Bangsat Kau",
        "Dada Sakit",
        "Om Burhan",
        "jowokwi"
    ].includes(title))
        return colors.red;

    if([
        "Awas Jatoh",
        "Nyawa Taruhan",
        "Selamatkan Diri",
        "bowok"
    ].includes(title))
        return colors.orange;

    if([
        "Gokgok",
        "Blok Woi",
        "Acumalaka",
        "Spongebob",
        "kaget"
    ].includes(title))
        return colors.yellow;

    if([
        "Among Us",
        "Anjay",
        "Terbaik Man",
        "jancog"
    ].includes(title))
        return colors.green;

    if([
        "Ilang",
        "Aman Ga",
        "pitik"
    ].includes(title))
        return colors.blue;

    return colors.purple;
}

let currentAudio = null;
let currentFile = null;
let activeCard = null;

function playSound(file,card){

    // kalau sound yang sama lagi diputar, abaikan
    if(currentAudio &&
       currentFile===file &&
       !currentAudio.paused){
        return;
    }

    // matikan sound lama
    if(currentAudio){
        currentAudio.pause();
        currentAudio.currentTime=0;
    }

    if(activeCard){
        activeCard.classList.remove("playing");
    }

    currentAudio = new Audio("audio/" + file);

    currentFile = file;

    activeCard = card;

    card.classList.add("playing");

    currentAudio.play();

    currentAudio.onended=()=>{

        card.classList.remove("playing");

        currentAudio=null;

        currentFile=null;

        activeCard=null;

    };

}

sounds.forEach(sound=>{

    const card=document.createElement("div");

    card.className="card";

    card.style.background=getColor(sound.title);

    card.innerHTML = `<div class="sound-title">${sound.title}</div>`;

    card.onclick=()=>{

        playSound(sound.file,card);

    };

    board.appendChild(card);

    sound.card=card;

});

document.addEventListener("keydown",(e)=>{

    const key=e.key.toUpperCase();

    const sound=sounds.find(s=>s.key===key);

    if(sound){

        playSound(sound.file,sound.card);

    }

});

const btn=document.getElementById("themeBtn");

btn.onclick=()=>{

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        btn.innerHTML="🌙 Dark Mode";

    }else{

        btn.innerHTML="☀️ Light Mode";

    }

};
