document.addEventListener("keydown", function(event) {
    if(event.key == 'z'){
        if(keyPress[event.key]) return
        refresh = false;
        keyPress[event.key] = true;
    }
    if(event.key == 's'){
        if(keyPress[event.key]) return
        refresh = false;
        keyPress[event.key] = true;
    }
    if(event.key == 'q'){
        if(keyPress[event.key]) return
        refresh = false;
        keyPress[event.key] = true;
    }
    if(event.key == 'd'){
        if(keyPress[event.key]) return
        refresh = false;
        keyPress[event.key] = true;
    }
    else if(event.key == 'ArrowLeft'){
        if(keyPress[event.key]) return
        refresh = false;
        keyPress[event.key] = true;
    }
    else if(event.key == 'ArrowRight'){
        if(keyPress[event.key]) return
        refresh = false;
        keyPress[event.key] = true;
    }
});

document.addEventListener("keyup", function(event) {
    if(event.key == 'z'){
        delete keyPress[event.key];
    }
    if(event.key == 's'){
        delete keyPress[event.key];
    }
    if(event.key == 'q'){
        delete keyPress[event.key];
    }
    if(event.key == 'd'){
        delete keyPress[event.key];
    }
    if(event.key == 'ArrowLeft'){
        delete keyPress[event.key];
    }
    if(event.key == 'ArrowRight'){
        delete keyPress[event.key];
    }
});

setInterval(function(){
    if(keyPress['z']){
        if(!colision(pv[0] + Math.round(Math.cos(av*(Math.PI/180))*(vv+cc)) , pv[1] + Math.round(Math.sin(av*(Math.PI/180))*(vv+cc)))){
            pv[0] += Math.round(Math.cos(av*(Math.PI/180))*vv)
            pv[1] += Math.round(Math.sin(av*(Math.PI/180))*vv)
        }
    };
    if(keyPress['s']){
        if(!colision(pv[0] - Math.round(Math.cos(av*(Math.PI/180))*(vv+cc)) , pv[1] - Math.round(Math.sin(av*(Math.PI/180))*(vv+cc)))){
            pv[0] -= Math.round(Math.cos(av*(Math.PI/180))*vv)
            pv[1] -= Math.round(Math.sin(av*(Math.PI/180))*vv)
        }
    };

    if(keyPress['q']){
        if(!colision(pv[0] - Math.round(Math.cos((av+90)*(Math.PI/180))*(vv+cc)) , pv[1] - Math.round(Math.sin((av+90)*(Math.PI/180))*(vv+cc)))){
            pv[0] -= Math.round(Math.cos((av+90)*(Math.PI/180))*vv)
            pv[1] -= Math.round(Math.sin((av+90)*(Math.PI/180))*vv)
        }
    };
    if(keyPress['d']){
        if(!colision(pv[0] + Math.round(Math.cos((av+90)*(Math.PI/180))*(vv+cc)) , pv[1] + Math.round(Math.sin((av+90)*(Math.PI/180))*(vv+cc)))){
            pv[0] += Math.round(Math.cos((av+90)*(Math.PI/180))*vv)
            pv[1] += Math.round(Math.sin((av+90)*(Math.PI/180))*vv)
        }
    };

    if(keyPress['ArrowLeft']){
        av-=va;
        if(av < 0) av+=360;
    };
    if(keyPress['ArrowRight']){
        av+=va;
        if(av > 360) av-=360;
    };
    pv[2] = Math.floor(pv[0]/ds);
    pv[3] = Math.floor(pv[1]/ds);
}, 10);