setInterval(function(){
    for(let angle = 0; angle <= cv; angle += (cv/dc[0])){
        let a = angle;
        let tempAngle = (av-(cv/2))+a;
        let x = 0;
        let y = 0;
        let dist = 0;
        let coMurs = false;
        while(!coMurs){
            dist++
            x = Math.round(Math.cos(tempAngle*(Math.PI/180))*dist);
            y = Math.round(Math.sin(tempAngle*(Math.PI/180))*dist);
            if(Number.isInteger((pv[0] + x)/ds) || Number.isInteger((pv[1] + y)/ds)){
                checkSprite(lutins(pv[0] + x, pv[1] + y), [av, pv[0], pv[1]]);
                coMurs = murs(pv[0] + x, pv[1] + y);
            };
        };
        ctx.clearRect(Math.round(((tempAngle-(av-(cv/2))))*dc[0]/cv), 0, 1, dc[1]);
        let choise = 0;
        if(Number.isInteger((pv[0] + x)/ds)){
            choise = findPixel(pv[1] + y);
        }
        else if(Number.isInteger((pv[1] + y)/ds)){
            choise = findPixel(pv[0] + x);
        }
        dist = dist*Math.cos((tempAngle-av)*(Math.PI/180));
        ctx.drawImage(wall[map[coMurs[1]][coMurs[0]]], choise, 0, 1, 64, Math.round(((tempAngle-(av-(cv/2))))*dc[0]/cv), (dc[1]-(ds/dist*dvc))/2, 1, ds/dist*dvc);
    };
}, 10);