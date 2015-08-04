ArgExp.SelectLevelState = (function() {
    'use strict';

    function SelectLevelState(game) {
        if (!(this instanceof SelectLevelState)) {
            return new SelectLevelState(game);
        }
        this.selectLevelBackground = null;
        this.playText = null;
        this.backText = null;
    }

    SelectLevelState.prototype = {

        create: function () {
            var textPosition = {
                x: this.game.world.centerX,
                y: this.game.world.centerY + 300
            };
            this.selectLevelBackground = this.add.sprite(0, 0, 'selectLevelBackground');
            this.playText = this.add.text(textPosition.x-200, textPosition.y, 'JUGAR', { font: "60px 'Yanone Kaffeesatz'", fill: "#000000", align: "center" });
            this.playText.anchor.setTo(0.5, 0.5);
            this.playText.inputEnabled = true;
            this.playText.events.onInputDown.add(this.play, this);
            this.backText = this.add.text(textPosition.x+200, textPosition.y, 'VOLVER', { font: "60px 'Yanone Kaffeesatz'", fill: "#000000", align: "center" });
            this.backText.anchor.setTo(0.5, 0.5);
            this.backText.inputEnabled = true;
            this.backText.events.onInputDown.add(this.back, this);
        },

        play: function() {
            //this.music.stop();
            this.state.start('Game');
        },

        back: function() {
            this.state.start('Menu');
        }
    };

    return SelectLevelState;
}());
