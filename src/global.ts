const Global = {
    EVENTS:{
        LIVES: 'changelives',
        SCORE: 'updateScore',
        CLOCK: 'clock'
    },
    MENU:{
        PLAY: 'JUGAR',
        TITLE: 'MASKED GUY ADVENTURE',
        SETTINGS: 'AJUSTES',
        CREDITS: 'CREDITOS'
    },
    HUD:{
        LIVES: 'VIDAS: '
    }, 
    SCENES:{
        LOAD: 'Load',
        MENU: 'Menu',
        LEVEL1: 'Level1',
        HUD: 'HUD',
        SETTINGS: 'Settings',
        CREDITS: 'Credits'

    }, 
    REGISTRY:{
        LIVES: 'lives',
        SCORE: 'score',
        CLOCK: 'clock', 
        MUSIC: 'music',
        SFX: 'sfx'
    },
    MAPS:{
        LEVEL1:{
            TILEMAPJSON: 'level1Map',
            LAYERPLATFORMS: 'Platforms',
        },
        TILESET: 'tileset',
        FINALPOSITION: 'finalPosition',
        ENEMIES: 'enemies',
        MOVINGPLATFORMS: 'moving-platforms',
        MOVINGPLATFORM_Y: 'vertical',
        MOVINGPLATFORM_X: 'horizontal',
        COLLECTIBLES: 'collectibles'

    },
    BACKGROUNDS: {
        LEVEL1: 'Brown',
        MENU: 'Brown'
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
    },
    ENEMIES:{
        BUNNY:{
            ID: 'bunny',
            ANIM:'bunnyRun',
            SPEED: 75
        },
        CHICKEN:{
            ID: 'chicken',
            ANIM: 'chickenRun',
            SPEED: 100
        },
        MUSHROOM: {
            ID: 'mushroom',
            ANIM: 'mushroomRun',
            SPEED: 100
        },
        RADISH: {
            ID: 'radish',
            ANIM: 'radishRun',
            SPEED: 100
        },
        EXPLOSION:{
            ID: 'explosion',
            ANIM: 'explode'
        },
     
    },
    MOVINGPLATFORM:{
        ID:'moving-platform',
        SPEED: 60
    },
    SOUNDS: {
        EFFECTS: {
            JUMP: 'jump',
            FALLOVERENEMY: 'fallover',
            LIVEDOWN: 'livedown',
            ITEMCOLLECTED: 'itemcollected'
        },
        SOUNDTRACK: 'soundtrack'
    },
    COLLECTABLES: {
        APPLE: {
            ID:'apple',
            ANIM: 'appleAnim'
        },
        CHERRY:{
            ID: 'cherry',
            ANIM: 'cherryAnim'
        },
        PINEAPPLE: {
            ID: 'pineapple',
            ANIM: 'pineappleAnim'
        }
    },
    SETTINGS: {
        GOBACK: 'VOLVER',
        MUSIC: 'MUSICA',
        SFX: 'SFX',
        SOUNDON: 'SONIDO ON',
        SOUNDOFF: 'SONIDO OFF'
    }

}

export default Global;