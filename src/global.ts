const Global = {
    EVENTS:{
        LIVES: 'changelives',
        SCORE: 'updateScore'
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
        SCORE: 'score'
    },
    MAPS:{
        LEVEL1:{
            TILEMAPJSON: 'level1Map',
            LAYERPLATFORMS: 'Platforms',
        },
        TILESET: 'tileset'
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
        ID: 'playerAtlas', 
        ANIMATIONS: {
            IDLE: 'idle',
            RUN: 'run',
            JUMP: 'jump-0'
        }
    }
}

export default Global;