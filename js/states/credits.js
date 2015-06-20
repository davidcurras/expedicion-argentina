ArgExp.CreditsState = (function() {
    'use strict';

    function CreditsState(game) {
        if (!(this instanceof CreditsState)) {
            return new CreditsState(game);
        }
        this.background = null;
        this.title = null;
        this.programming = null;
        this.graphics = null;
        this.levelDesign = null;
        this.backText = null;
    }

    CreditsState.prototype = {

        create: function () {
            var titlePosition = { 
                x: this.game.world.centerX, 
                y: (this.game.world.centerY-180)
            };

            this.background = this.add.sprite(0, 0, 'menuBackground');
            this.blackboard = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'blackboard');
            this.blackboard.anchor.setTo(0.5, 0.5);
            this.title = this.add.text(titlePosition.x, titlePosition.y, 'CRÉDITOS', { font: "700 90px 'Yanone Kaffeesatz'", fill: "#000000", align: "center" });
            this.title.anchor.setTo(0.5, 0.5);
            this.programming = this.add.text(titlePosition.x-420, titlePosition.y+140, 'PROGRAMACIÓN: David Curras', { font: "400 55px 'Yanone Kaffeesatz'", fill: "#000000", align: "left" });
            this.programming.anchor.setTo(0, 0.5);
            this.graphics = this.add.text(titlePosition.x-420, titlePosition.y+220, 'GRÁFICOS: Agustina Barreñada - Sebastián Bossi', { font: "400 55px 'Yanone Kaffeesatz'", fill: "#000000", align: "left" });
            this.graphics.anchor.setTo(0, 0.5);
            this.levelDesign = this.add.text(titlePosition.x-420, titlePosition.y+300, 'NIVELES: Mariano Dabove', { font: "400 55px 'Yanone Kaffeesatz'", fill: "#000000", align: "left" });
            this.levelDesign.anchor.setTo(0, 0.5);
            this.backText = this.add.text(titlePosition.x+250, titlePosition.y+420, 'VOLVER', { font: "70px 'Yanone Kaffeesatz'", fill: "#000000", align: "right" });
            this.backText.anchor.setTo(0, 0.5);
            this.backText.inputEnabled = true;
            this.backText.events.onInputDown.add(this.back, this);
        },

        back: function() {
            this.state.start('Menu');
        }
    };

    return CreditsState;
}());
