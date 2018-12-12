$(document).ready(function() {
    const frame = $('#frame');
    const bg = $('#background');
    const player = $('#player');

    const frameHeight = document.documentElement.clientHeight;
    const imageRealWidth = 2880;
    const imageFrameWidth = 480;
    const imageRealHeight = 360;
    const imageRatio = imageRealHeight / frameHeight;
    const frameWidth = imageFrameWidth / imageRatio;

    const deltaX = 3;  // шаг фона по горизонтали

    const playerSizesRatio = 0.81; // Отношение ширины к высоте персонажа
    const playerToFrameRatio = 1 / 6; // Отношение размера персонажа к размеру фрейма

    let interval = null;  // таймер для анимации персонажа
    let i = 0; // используется для анимации  персонажа

    /* Подгонка размеров фона и фрейма под размер окна */
    bg
        .css('background-size', imageRealWidth / imageRatio + 'px,' + frameHeight + 'px')
        .width(imageRealWidth / imageRatio)
        .height(frameHeight);

    frame
        .width(frameWidth)
        .height(frameHeight);

    /* Подгонка размеров персонажа */
    let playerWidth = frameWidth * playerToFrameRatio;
    let playerHeight = playerWidth / playerSizesRatio;

    player
        .css('background-size', playerWidth * 2 + 'px,' + playerHeight + 'px')
        .width(playerWidth)
        .height(playerHeight);

    /* Обработка нажатия клавиши */
    document.addEventListener('keydown', function(event) {
        let key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

        if (key === 'ArrowRight') {
            bg.offset(function(i, val){
                return {top: val.top, left: val.left - deltaX};
            });
        } else if (key === 'ArrowLeft') {
            bg.offset(function(i, val){
                return {top: val.top, left: val.left + deltaX};
            });
        }

        if (!interval) {
            interval = setInterval(function () {
                if (i === 0) {
                    i = 1;
                    player.css('background-position-x', '-' + playerWidth + 'px');
                } else {
                    i = 0;
                    player.css('background-position-x', '0%');
                }
            }, 200);
        }
    });

    document.addEventListener('keyup', function(event) {
        clearInterval(interval);
        interval = null;
        player.css('background-position-x', '0%');
    });

});