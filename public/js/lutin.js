function lutins(x, y){
    if(lutinsX[x] && lutinsX[x][y]) return lutinsX[x][y];
    else if(lutinsY[y] && lutinsY[y][x]) return lutinsY[y][x];
    else return false;
}

async function checkSprite(coLutins, nom){
    if(!coLutins) return;
    if(seaSprite.nom != `${nom}`){
        seaSprite.nom = `${nom}`;
        seaSprite.sea = {};
        seaSprite.list = [];
    }

    if(!seaSprite.sea[`${coLutins}`] && coLutins.length < 3){
        seaSprite.sea[`${coLutins}`] = true;
        seaSprite.list.push(coLutins);
    }
    else if(!seaSprite.sea[`${coLutins[4]}`] && coLutins.length > 2){
        seaSprite.sea[`${coLutins[4]}`] = seaSprite.list.length;
        seaSprite.list.push(coLutins);

    }
    else if(seaSprite.sea[`${coLutins[4]}`] && coLutins.length > 2){
        seaSprite.list[seaSprite.sea[`${coLutins[4]}`]] = coLutins;
        
    }
}

setInterval(function(){
    let list = seaSprite.list
    if(!list) return;
    let classList = [];
    let tempList = list;
    let numsup = [0,0,[]];
    for(let ts = 0; list[ts]; ts++){
        numsup[0] = 0;
        for (let t = 0; tempList[t]; t++) {
            let num = Math.sqrt( (tempList[t][0]-pv[0]) * (tempList[t][0]-pv[0]) + (tempList[t][1]-pv[1]) * (tempList[t][1]-pv[1]) );
            if(num > numsup[0] && !numsup[2].includes(t)){
                numsup[0] = num;
                numsup[1] = t;
            };
            if(!tempList[t+1]) numsup[2].push(numsup[1]);
        };
        classList.push(tempList[numsup[1]]);
    };

    let x = 0;
    let y = 0;
    spriteCtx.clearRect(0, 0, canvas.width, canvas.height);
    for(let t = 0; classList[t]; t++){
        x = classList[t][0];
        y = classList[t][1];
        if(pv[0] <= x && pv[1] <= y){
            x = x - pv[0];
            y = y - pv[1];
            if(seaMurs(Math.atan(y/x)*(180/Math.PI), classList[t][0], classList[t][1])) continue;
            let angle = Math.atan(y/x)*(180/Math.PI)-av+(cv/2);
            spriteCtx.drawImage(sprite[lutinsAff[classList[t][0]][classList[t][1]]], Math.round((angle*dc[0]/cv))-((ds)/(Math.sqrt((x*x)+(y*y)))*dvc)/2, (dc[1]/2)-(((ds)/(Math.sqrt((x*x)+(y*y)))*dvc)/2), ((ds)/(Math.sqrt((x*x)+(y*y)))*dvc), ((ds)/(Math.sqrt((x*x)+(y*y)))*dvc));
        }
        else if(pv[0] >= x && pv[1] >= y){
            x = pv[0] - x;
            y = pv[1] - y;
            if(seaMurs(Math.atan(y/x)*(180/Math.PI)+180, classList[t][0], classList[t][1])) continue;
            let angle = Math.atan(y/x)*(180/Math.PI)-av+(cv/2)+180;
            spriteCtx.drawImage(sprite[lutinsAff[classList[t][0]][classList[t][1]]], Math.round((angle*dc[0]/cv))-((ds)/(Math.sqrt((x*x)+(y*y)))*dvc)/2, (dc[1]/2)-(((ds)/(Math.sqrt((x*x)+(y*y)))*dvc)/2), ((ds)/(Math.sqrt((x*x)+(y*y)))*dvc), ((ds)/(Math.sqrt((x*x)+(y*y)))*dvc));
        }
        else if(pv[0] >= x && pv[1] <= y){
            x = pv[0] - x;
            y = pv[1] - y;
            if(seaMurs(Math.atan(y/x)*(180/Math.PI)+180, classList[t][0], classList[t][1])) continue;
            let angle = Math.atan(y/x)*(180/Math.PI)-av+(cv/2)+180;
            spriteCtx.drawImage(sprite[lutinsAff[classList[t][0]][classList[t][1]]], Math.round((angle*dc[0]/cv))-((ds)/(Math.sqrt((x*x)+(y*y)))*dvc)/2, (dc[1]/2)-(((ds)/(Math.sqrt((x*x)+(y*y)))*dvc)/2), ((ds)/(Math.sqrt((x*x)+(y*y)))*dvc), ((ds)/(Math.sqrt((x*x)+(y*y)))*dvc));
        }
        else if(pv[0] <= x && pv[1] >= y){
            x = x - pv[0];
            y = y - pv[1];
            if(seaMurs(Math.atan(y/x)*(180/Math.PI), classList[t][0], classList[t][1])) continue;
            let angle = Math.atan(y/x)*(180/Math.PI)-av+(cv/2)+360;
            spriteCtx.drawImage(sprite[lutinsAff[classList[t][0]][classList[t][1]]], Math.round((angle*dc[0]/cv))-((ds)/(Math.sqrt((x*x)+(y*y)))*dvc)/2, (dc[1]/2)-(((ds)/(Math.sqrt((x*x)+(y*y)))*dvc)/2), ((ds)/(Math.sqrt((x*x)+(y*y)))*dvc), ((ds)/(Math.sqrt((x*x)+(y*y)))*dvc));
        }
        continue;
    }
}, 17);



function seaMurs(a, posX, posY) {
    if(a > 360) a -= 360;
    if(a <= 0) a += 360;
    let dist = 0;
    let coMurs = false;
    while(!coMurs){
        dist++;
        x = Math.round(Math.cos(a*(Math.PI/180))*dist);
        y = Math.round(Math.sin(a*(Math.PI/180))*dist);
        if(Number.isInteger((pv[0] + x)/(ds/2)) || Number.isInteger((pv[1] + y)/(ds/2))){
            if(pv[0] <= posX && pv[1] <= posY && (pv[0]+x >= posX || pv[1]+y >= posY)){
                return false;
            }
            else if(pv[0] >= posX && pv[1] >= posY && (pv[0]+x <= posX || pv[1]+y <= posY)){
                return false;
            }
            else if(pv[0] >= posX && pv[1] <= posY && (pv[0]+x <= posX || pv[1]+y >= posY)){
                return false;
            }
            else if(pv[0] <= posX && pv[1] >= posY && (pv[0]+x >= posX || pv[1]+y <= posY)){
                return false;
            }

            coMurs = murs(pv[0] + x, pv[1] + y);
        };
    };
    return coMurs;
};