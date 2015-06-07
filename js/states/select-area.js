ArgExp.SelectAreaState = (function() {
    'use strict';

    function SelectAreaState(game) {
        if (!(this instanceof SelectAreaState)) {
            return new SelectAreaState(game);
        }
        this.selectAreaBackground = null;
        this.heroeSprite = null;
        this.areas = {
            'cuyo': {'x': 520, 'y': 20, 'width': 70, 'height': 110},
            'norte': {'x': 600, 'y': 10, 'width': 100, 'height': 130},
            'litoralTop': {'x': 720, 'y': 40, 'width': 110, 'height': 80},
            'litoralBottom': {'x': 750, 'y': 110, 'width': 60, 'height': 70},
            'pampaTop': {'x': 660, 'y': 130, 'width': 90, 'height': 70},
            'pampaBottom': {'x': 650, 'y': 190, 'width': 120, 'height': 100},
            'patagonia': {'x': 550, 'y': 150, 'width': 90, 'height': 240}
        };
    }

    SelectAreaState.prototype = {

        create: function () {
            this.selectAreaBackground = this.add.sprite(0, 0, 'selectAreaBackground');
            this.heroeSprite = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'heroeSprite');
            this.heroeSprite.scale.x = 0.3;
            this.heroeSprite.scale.y = 0.3;
            this.heroeSprite.x = this.areas.pampaBottom.x;
            this.heroeSprite.y = this.areas.pampaBottom.y;
            this.game.input.onDown.add(this.click, this);
        },

        click: function(pointer) {
            var heroePosition = this.getSelectedArea(pointer.clientX, pointer.clientY);
            if(heroePosition) {
                this.heroeSprite.x = (heroePosition.x*2.5)-700;
                this.heroeSprite.y = heroePosition.y*2.1;
            }
            //this.music.stop();
            //this.state.start('Game');
        },

        getSelectedArea: function (x, y) {
            for(var key in this.areas) {
                if(this.areas.hasOwnProperty(key)) {
                    if((this.areas[key].x < x) && (this.areas[key].x + this.areas[key].width > x) && (this.areas[key].y < y) && (this.areas[key].y + this.areas[key].height > y)) {
                        return {
                            x: this.areas[key].x + (this.areas[key].width/2),
                            y: this.areas[key].y + (this.areas[key].height/2)
                        };
                    }
                }
            }
            return false;
        }
    };

    return SelectAreaState;
}());
