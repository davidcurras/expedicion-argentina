ArgExp.MenuState = (function() {
    'use strict';

    function MenuState(game) {
        if (!(this instanceof MenuState)) {
            return new MenuState(game);
        }
        this.cloudsBackground = null;
        this.playText = null;
        this.creditsText = null;
    }

    MenuState.prototype = {

        create: function () {
            var textPosition = {
                x: (this.game.world.centerX),
                y: (this.game.world.centerY)+300
            };
            this.cloudsBackground = this.add.sprite(0, 0, 'cloudsBackground');
            this.playText = this.add.text(textPosition.x, textPosition.y, 'JUGAR', { font: "120px Cookie", fill: "#000000", align: "center" });
            this.creditsText = this.add.text(textPosition.x, textPosition.y+150, 'CRÉDITOS', { font: "120px Cookie", fill: "#000000", align: "center" });
            this.playText.anchor.setTo(0.5, 0.5);
            this.creditsText.anchor.setTo(0.5, 0.5);
            this.game.input.onDown.add(this.click, this);
        },

        click: function(x, y, timedown) {
            //this.music.stop();
            this.state.start('SelectArea');
        }
    };

    return MenuState;
}());
