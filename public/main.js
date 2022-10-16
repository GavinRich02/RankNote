const sounds=["/Sounds/a.wav","/Sounds/aSharp.wav","/Sounds/b.wav","/Sounds/bSharp.wav","/Sounds/c.wav","/Sounds/cSharp.wav","/Sounds/d.wav","/Sounds/dSharp.wav","/Sounds/e.wav","/Sounds/f.wav","/Sounds/fSharp.wav","/Sounds/g.wav","/Sounds/gSharp.wav"];

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

document.getElementById("star1").style.display="none";
document.getElementById("star2").style.display="none";
document.getElementById("star3").style.display="none";
document.getElementById("star4").style.display="none";
document.getElementById("star5").style.display="none";

let now = new Date();
let seed = Math.round(now.getTime() / 1000);
let id=seed;

/*document.getElementById("submit").onclick=function() {
    if(document.getElementsByTagName("input")[0].value!="") {
        seed=document.getElementsByTagName("input")[0].value;
    }
}*/

// Define the Murmur3Hash function
function MurmurHash3(string) {
    let i = 0;
    for (i, hash = 1779033703 ^ string.length; i < string.length; i++) {
        let bitwise_xor_from_character = hash ^ string.charCodeAt(i);
        hash = Math.imul(bitwise_xor_from_character, 3432918353);
        hash = hash << 13 | hash >>> 19;
    } return () => {
    // Return the hash that you can use as a seed
        hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
        hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
        return (hash ^= hash >>> 16) >>> 0;
    }
}

function SimpleFastCounter32(seed_1, seed_2, seed_3, seed_4) {
    return () => {
    seed_1 >>>= 0; seed_2 >>>= 0; seed_3 >>>= 0; seed_4 >>>= 0;
    let cast32 = (seed_1 + seed_2) | 0;
    seed_1 = seed_2 ^ seed_2 >>> 9;
    seed_2 = seed_3 + (seed_3 << 3) | 0;
    seed_3 = (seed_3 << 21 | seed_3 >>> 11);
    seed_4 = seed_4 + 1 | 0;
    cast32 = cast32 + seed_4 | 0;
    seed_3 = seed_3 + cast32 | 0;
    return (cast32 >>> 0) / 4294967296;
    }
}

var stars=0;

document.getElementById("fillStar").style.display="none";
document.getElementById("emptyStar").style.display="none";

document.getElementById("star1").onmouseover=function() {
    document.getElementById("star1").innerText=document.getElementById("fillStar").innerText;
};

document.getElementById("star1").onmouseleave=function() {
    document.getElementById("star1").innerText=document.getElementById("emptyStar").innerText;
};

document.getElementById("star2").onmouseover=function() {
    document.getElementById("star2").innerText=document.getElementById("fillStar").innerText;
};

document.getElementById("star2").onmouseleave=function() {
    document.getElementById("star2").innerText=document.getElementById("emptyStar").innerText;
};

document.getElementById("star3").onmouseover=function() {
    document.getElementById("star3").innerText=document.getElementById("fillStar").innerText;
};

document.getElementById("star3").onmouseleave=function() {
    document.getElementById("star3").innerText=document.getElementById("emptyStar").innerText;
};

document.getElementById("star4").onmouseover=function() {
    document.getElementById("star4").innerText=document.getElementById("fillStar").innerText;
};

document.getElementById("star4").onmouseleave=function() {
    document.getElementById("star4").innerText=document.getElementById("emptyStar").innerText;
};

document.getElementById("star5").onmouseover=function() {
    document.getElementById("star5").innerText=document.getElementById("fillStar").innerText;
};

document.getElementById("star5").onmouseleave=function() {
    document.getElementById("star5").innerText=document.getElementById("emptyStar").innerText;
};

var bests=[];
var seedsPlayed=[];

var seedIndex=0;

document.getElementById("button").onclick=function() {
    var seedToUse=0;

    console.log(seedToUse);

    document.getElementById("star1").style.display="none";
    document.getElementById("star2").style.display="none";
    document.getElementById("star3").style.display="none";
    document.getElementById("star4").style.display="none";
    document.getElementById("star5").style.display="none";

    now = new Date();

    let seedPlay=0;

    if(bests.length==0) {
        seedToUse = Math.round(now.getTime() / 1000);
        console.log(seedToUse);
    }

    else {
        var found=false;

        for(let i=0; i<bests.length; i++) {
            if(bests[i][1]!=id) {
                for(let j=0; j<seedsPlayed.length; j++) {
                    console.log(bests[i][1],seedsPlayed[j]);
                    if(bests[i][0]==seedsPlayed[j]) {
                        found=true;
                        break;
                    }
                }

                if(found==false) {
                    seedPlay=bests[i][0];
                    seedsPlayed[seedIndex]=0;

                    seedIndex++;
                    break;
                }
            }
        }
    }

    var index=0;

    if(seedPlay!=0 && seedPlay!=undefined) {
        seedToUse=seedPlay;
    }
    else {
        seedToUse = Math.round(now.getTime() / 1000);
        console.log(seedToUse);
    }

    console.log(seedToUse);

    let generate_seed = MurmurHash3(String(seedToUse));

    let random_number = SimpleFastCounter32(generate_seed(), generate_seed());

    console.log(random_number);
    
    var sound=Math.floor(random_number()*100)%sounds.length;
    document.getElementById("sound").src=sounds[sound];

    var audio=document.getElementById("sound");

    var count=0;

    audio.currentTime=0;

    document.getElementById("sound").play();

    stopTime=(Math.floor(random_number()*100)%2)+.25;

    fetch("/soundbyte", {
        headers: {'Content-Type': 'application/json'},
        method: "GET"
    }).then((response) => response.json()).then((data) => {
        console.log(data);
    });

    var time=0;

    setInterval(function(){
        if(time<4000) {
            time+=1;
            if(audio.currentTime>stopTime){
                audio.pause();

                sound=Math.floor(random_number()*100)%sounds.length;

                document.getElementById("sound").src=sounds[sound];

                audio=document.getElementById("sound");

                audio.currentTime=0;

                document.getElementById("sound").play();

                stopTime=(Math.floor(random_number()*100)%2)+.25;

                index++;
            }
        }
        else {
            document.getElementById("star1").style.display="inline-block";
            document.getElementById("star2").style.display="inline-block";
            document.getElementById("star3").style.display="inline-block";
            document.getElementById("star4").style.display="inline-block";
            document.getElementById("star5").style.display="inline-block";

            document.getElementById("star1").onclick=function() {
                stars=1;
            
                seed=Math.round(now.getTime() / 1000);
            
                console.log(seed);
            
                seed=String(seed);
            
                fetch("/soundbyte", {
                    headers: {'Content-Type': 'application/json'},
                    method: "POST",
                    body:JSON.stringify({"seed":seed,"stars":stars,"id":id})
                }).then((response) => response.json()).then((data) => {
                    console.log(data);
                });
            };

            document.getElementById("star2").onclick=function() {
                stars=2;
            
                seed=Math.round(now.getTime() / 1000);
            
                console.log(seed);
            
                seed=String(seed);
            
                fetch("/soundbyte", {
                    headers: {'Content-Type': 'application/json'},
                    method: "POST",
                    body:JSON.stringify({"seed":seed,"stars":stars,"id":id})
                }).then((response) => response.json()).then((data) => {
                    console.log(data);
                });
            };

            document.getElementById("star3").onclick=function() {
                stars=3;
            
                seed=Math.round(now.getTime() / 1000);
            
                console.log(seed);
            
                seed=String(seed);
            
                fetch("/soundbyte", {
                    headers: {'Content-Type': 'application/json'},
                    method: "POST",
                    body:JSON.stringify({"seed":seed,"stars":stars,"id":id})
                }).then((response) => response.json()).then((data) => {
                    console.log(data);
                });
            };

            document.getElementById("star4").onclick=function() {
                stars=4;
            
                seed=Math.round(now.getTime() / 1000);
            
                console.log(seed);
            
                seed=String(seed);
            
                fetch("/soundbyte", {
                    headers: {'Content-Type': 'application/json'},
                    method: "POST",
                    body:JSON.stringify({"seed":seed,"stars":stars,"id":id})
                }).then((response) => response.json()).then((data) => {
                    console.log(data);
                });
            };

            document.getElementById("star5").onclick=function() {
                stars=5;
            
                seed=Math.round(now.getTime() / 1000);
            
                console.log(seed);
            
                seed=String(seed);
            
                fetch("/soundbyte", {
                    headers: {'Content-Type': 'application/json'},
                    method: "POST",
                    body:JSON.stringify({"seed":seed,"stars":stars,"id":id})
                }).then((response) => response.json()).then((data) => {
                    console.log(data);
                });
            };
        }
    },1);
};
