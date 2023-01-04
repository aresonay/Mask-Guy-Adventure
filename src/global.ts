const Global = {
    EVENTS:{
        LIVES: 'changelives',
        SCORE: 'updateScore',
        CLOCK: 'clock'
    },
    MENU:{
        PLAY: 'JUGAR'
    },
    HUD:{
        LIVES: 'Vidas: '
    }, 
    SCENES:{
        LOAD: 'Load',
        MENU: 'Menu',
        LEVEL1: 'Level1',
        HUD: 'HUD'

    }, 
    REGISTRY:{
        LIVES: 'lives',
        SCORE: 'score',
        CLOCK: 'clock'
    },
    MAPS:{
        LEVEL1:{
            TILEMAPJSON: 'level1Map',
            LAYERPLATFORMS: 'Platforms',
        },
        TILESET: 'tileset',
        FINALPOSITION: 'finalPosition'
    },
    BACKGROUNDS: {
        LEVEL1: 'Brown'
    },
    FONTS: {
        JSON: 'font',
        IMAGE: 'fontPixel',
        BITMAP: 'fontPixel'
    }, 
    PLAYER: {
        ID: 'player', 
        ANIMATIONS: {
            IDLE: 'idle',
            RUN: 'run',
            JUMP: 'jump-0'
        }
    },
    OBJECTS:{
        FINAL: 'final'
    }
}

export default Global;