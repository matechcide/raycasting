const wall = {};
const sprite = {};
const player = {};


(() => {
    wall[1] = new Image();
    wall[1].src = '/public/images/greystone.png';
    wall[2] = new Image();
    wall[2].src = '/public/images/wood.png';

    sprite[1] = new Image();
    sprite[1].src = '/public/images/barrel.png';
    sprite[2] = new Image();
    sprite[2].src = '/public/images/greenlight.png';

    player[0] = new Image();
    player[0].src = '/public/images/playerFront.png';
    player[1] = new Image();
    player[1].src = '/public/images/playerBack.png';
    player[2] = new Image();
    player[2].src = '/public/images/playerLeft.png';
    player[3] = new Image();
    player[3].src = '/public/images/playerRight.png';
})()