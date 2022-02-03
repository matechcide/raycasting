const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const spriteCtx = document.getElementById('sprite').getContext('2d');
spriteCtx.scale(4, 4);
ctx.scale(4, 4);
document.getElementById('fond').getContext('2d').fillStyle = '#75757E';
document.getElementById('fond').getContext('2d').fillRect(0, 0, canvas.width, canvas.height/2);
document.getElementById('fond').getContext('2d').fillStyle = '#4D4D56';
document.getElementById('fond').getContext('2d').fillRect(0, canvas.height/2, canvas.width, canvas.height/2);

const map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,2,0,0,0,0,2,2,0,1],
    [1,0,0,0,2,0,0,0,0,0,0,0,1],
    [1,0,0,0,2,0,0,0,0,1,1,0,1],
    [1,0,0,0,0,0,2,0,0,1,1,0,1],
    [1,0,1,1,0,0,2,0,0,0,0,0,1],
    [1,0,1,1,0,0,2,0,0,2,2,0,1],
    [1,0,0,0,0,0,0,0,0,2,2,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,2,2,2,0,0,2,2,0,0,2,2,1],
    [1,0,0,0,0,0,1,0,0,0,0,0,1],
    [1,0,0,0,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const spriteMap = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,0,0,0,0],
    [0,0,2,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,0,0,0,2,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0,2,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,0,0,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,2,0,0,0,0,0,2,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
];

const mapX = {};
const mapY = {};
const mursX = {};
const mursY = {};
const lutinsX = {};
const lutinsY = {};
const joueursObj = {};

const joueurs = [];

const lutinsAff = {};

const seaSprite = {};
const spriteList = {};

const keyPress = {};

let dc = [300, 169]; //dimention caméras
let ds = 64; //dimention cube
let hv = ds/2; //hauteur de la vision
let pv = [65,65, 1, 1]; //position vision
let av = 45; //angle vision
let cv = 60; //chans visuel
let dvc = (dc[0]/2)/(Math.tan((cv/2)*(Math.PI/180))); //distance entre la caméras et la vision
let vv = 2; //vitess vision
let va = 2; //vitess angle vision
let cc = 10; //correction colission

(() => {
    for(let my = 0; map[my]; my++){
        for(let mx = 0; map[my][mx] != null; mx++){
            if(map[my][mx] != 0){
                for(let x = mx*ds; x <= (mx*ds + ds); x++){
                    for(let y = my*ds; y <= (my*ds + ds); y++){
                        if(Number.isInteger(x/ds) || Number.isInteger(y/ds)){
                            if(!mursX[x]){
                                mursX[x] = {};
                            }
                            if(!mursY[y]){
                                mursY[y] = {};
                            }
                            mursX[x][y] = [mx, my];
                            mursY[y][x] = [mx, my];
                        };
                    };
                };
            };
        };
    };

    for(let my = 0; spriteMap[my]; my++){
        for(let mx = 0; spriteMap[my][mx] != null; mx++){
            if(spriteMap[my][mx] != 0){
                for(let x = mx*ds; x <= (mx*ds + ds); x++){
                    for(let y = my*ds; y <= (my*ds + ds); y++){
                        if(Number.isInteger(x/ds) || Number.isInteger(y/ds)){
                            if(!lutinsX[x]){
                                lutinsX[x] = {};
                            }
                            if(!lutinsY[y]){
                                lutinsY[y] = {};
                            }
                            lutinsX[x][y] = [mx*ds + (ds/2), my*ds + (ds/2)];
                            lutinsY[y][x] = [mx*ds + (ds/2), my*ds + (ds/2)];
                            if(!lutinsAff[mx*ds + (ds/2)]){
                                lutinsAff[mx*ds + (ds/2)] = {};
                            }
                            lutinsAff[mx*ds + (ds/2)][my*ds + (ds/2)] = spriteMap[my][mx];
                        };
                    };
                };
            };
        };
    };

    for(let my = 0; map[my]; my++){
        for(let mx = 0; map[my][mx] != null; mx++){
            for(let x = mx*ds; x <= (mx*ds + ds); x++){
                for(let y = my*ds; y <= (my*ds + ds); y++){
                    if(Number.isInteger(x/ds) || Number.isInteger(y/ds)){
                        if(!mapX[x]){
                            mapX[x] = {};
                        }
                        if(!mapY[y]){
                            mapY[y] = {};
                        }
                        mapX[x][y] = [mx, my];
                        mapY[y][x] = [mx, my];
                    };
                };
            };
        };
    };

})()