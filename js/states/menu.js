ArgExp.MenuState = (function() {
    'use strict';

    function MenuState(game) {
        if (!(this instanceof MenuState)) {
            return new MenuState(game);
        }
        this.gameMessageText = null;
        this.gameMessageSecondLineText = null;
    }

    MenuState.prototype = {

        create: function () {
            var textPosition = {
                x: (this.game.world.centerX),
                y: (this.game.world.centerY)+400
            };
            this.preloadBackground = this.add.sprite(0, 0, 'preloadBackground');
            this.gameText = this.add.text(textPosition.x, textPosition.y, 'Click para empezar', { font: "72px Arial", fill: "#000000", align: "center" });
            this.gameText.anchor.setTo(0.5, 0.5);
            this.game.input.onDown.add(this.click, this);
        },

        click: function(x, y, timedown) {
            //this.music.stop();
            this.state.start('Game');
        }
    };

    return MenuState;
}());
