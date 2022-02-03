function murs(x, y){
    if(mursX[x] && mursX[x][y]) return mursX[x][y]
    else if(mursY[y] && mursY[y][x]) return mursY[y][x]
    else return false
}

function colision(x , y){
    for(let my = 0; map[my]; my++){
        for(let mx = 0; map[my][mx] != null; mx++){
            if(map[my][mx] == 0) continue;
            else if((x >= (mx*ds) && x <= (mx*ds + ds)) && (y >= (my*ds) && y <= (my*ds + ds))) return true;
            
            else continue;

        };
    };
    return false;
};

function findPixel(parm) {
    for (let temp = parm; temp > 0; temp -=ds) {
        if(temp-ds <= 0 ) return temp-1;
    };
};