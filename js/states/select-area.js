ArgExp.SelectAreaState = (function() {
    'use strict';

    function SelectAreaState(game) {
        if (!(this instanceof SelectAreaState)) {
            return new SelectAreaState(game);
        }
        this.selectAreaBackground = null;
        this.heroeSprite = null;
        this.playText = null;
        this.backText = null;
        this.areas = {
            'cuyo': {'name': 'CUYO', 'x': 660, 'y': 60, 'width': 160, 'height': 300},
            'norte': {'name': 'EL NORTE', 'x': 870, 'y': 30, 'width': 230, 'height': 330},
            'litoralTop': {'name': 'EL LITORAL', 'x': 1180, 'y': 90, 'width': 200, 'height': 190},
            'litoralBottom': {'name': 'EL LITORAL', 'x': 1250, 'y': 200, 'width': 230, 'height': 280},
            'pampaTop': {'name': 'LA PAMPA', 'x': 1020, 'y': 350, 'width': 220, 'height': 220},
            'pampaBottom': {'name': 'LA PAMPA', 'x': 970, 'y': 540, 'width': 350, 'height': 250},
            'patagoniaTop': {'name': 'PATAGONIA', 'x': 730, 'y': 400, 'width': 230, 'height': 300},
            'patagoniaBottom': {'name': 'PATAGONIA', 'x': 730, 'y': 640, 'width': 200, 'height': 350}
        };
        for(var key in this.areas) {
            if(this.areas.hasOwnProperty(key)) {
               this.areas[key].centerX = this.areas[key].x + (this.areas[key].width / 2);
               this.areas[key].centerY = this.areas[key].y + (this.areas[key].height / 2);
            }
        }
    }

    SelectAreaState.prototype = {

        create: function () {
            var textPosition = {
                x: 300,
                y: (this.game.world.centerY)+200
            };
            this.selectAreaBackground = this.add.sprite(0, 0, 'selectAreaBackground');
            this.heroeSprite = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'heroeSmSprite');
            this.heroeSprite.anchor.setTo(0.5, 0.5);
            this.heroeSprite.x = this.game.world.width*2;//Putting sprite out of screen
            this.playText = this.add.text(textPosition.x, textPosition.y, '', { font: "90px 'Yanone Kaffeesatz'", fill: "#000000", align: "center" });
            this.playText.anchor.setTo(0.5, 0.5);
            this.playText.inputEnabled = true;
            this.playText.events.onInputDown.add(this.play, this);
            this.backText = this.add.text(textPosition.x, textPosition.y+150, 'VOLVER', { font: "90px 'Yanone Kaffeesatz'", fill: "#000000", align: "center" });
            this.backText.anchor.setTo(0.5, 0.5);
            this.backText.inputEnabled = true;
            this.backText.events.onInputDown.add(this.back, this);
            this.game.input.onDown.add(this.selectArea, this);
        },

        selectArea: function(pointer, evt) {
            var heroePosition = this.getSelectedArea(pointer.x, pointer.y);
            if(heroePosition) {
                this.heroeSprite.x = heroePosition.x;
                this.heroeSprite.y = heroePosition.y;
            }
            //this.music.stop();
            //this.state.start('Game');
        },

        getSelectedArea: function (x, y) {
            for(var key in this.areas) {
                if(this.areas.hasOwnProperty(key)) {
                    if((this.areas[key].x < x) && (this.areas[key].x + this.areas[key].width > x) && (this.areas[key].y < y) && (this.areas[key].y + this.areas[key].height > y)) {
                        this.playText.setText('JUGAR '+this.areas[key].name);
                        return {
                            x: this.areas[key].x + (this.areas[key].width/2),
                            y: this.areas[key].y + (this.areas[key].height/2)
                        };
                    }
                }
            }
            return false;
        },

        play: function() {
            //this.music.stop();
            this.state.start('Game');
        },

        back: function() {
            this.state.start('Menu');
        }
    };

    return SelectAreaState;
}());
