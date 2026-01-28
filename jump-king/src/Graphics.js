export const SpriteManager = {
    //Wczytywanie spriteów MC
    sprites: {},
    isLoaded: false,

    assetList: {
        standing: 'standing.png',
        charging: 'chargingjump.png',
        rising: 'midjump1.png',
        falling: 'midjump2.png',
        walk1: 'walk1.png',
        walk2: 'walk2.png',
        walk3: 'walk3.png',
        knockback: 'knockback.png',
        faceplant: 'faceplant.png'
    },

    //Czarna magia
    async load() {
        const loadPromises = Object.entries(this.assetList).map(([key, fileName]) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = `/sprites/${fileName}`; 
                
                img.onload = () => {
                    this.sprites[key] = img;
                    resolve();
                };
                img.onerror = () => {
                    console.error(`Failed to load sprite: ${fileName}`);
                    reject();
                };
            });
        });

        await Promise.all(loadPromises);
        this.isLoaded = true;
        console.log('All sprites loaded');
    }
};

