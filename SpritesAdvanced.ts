namespace spriteutils {

    let framesPerSecond: number = 0;
    let deltaTime: number = 0;
    game.onUpdate(() => {
        framesPerSecond++;
    })
    game.onUpdateInterval(1000, () => {
        deltaTime = 1000 / framesPerSecond;
        framesPerSecond = 0
    })

    /**
     * Returns a given list of sprites sorted by their distance to a given sprite
     */
    //% blockId=sortListOfSpritesByDistanceFrom
    //% block="sort $allSprites by distance to $sprite"
    //% allSprites.defl=list
    //% allSprites.shadow=variables_get
    //% sprite.defl=mySprite
    //% sprite.shadow=variables_get
    //% group="Sprite"
    //% weight=20     

    export function sortListOfSpritesByDistanceFrom(sprite: Sprite, allSprites: Sprite[]): Sprite[] {
        let sortedSprites: Sprite[] = [];
        sortedSprites.push(allSprites.shift());
        allSprites.forEach((unsortedSprite: Sprite) => {
            let inserted = false;
            for (let i = 0; i < sortedSprites.length; i++) {
                let sortedSprite: Sprite = sortedSprites[i];
                if (spriteutils.distanceBetween(sprite, unsortedSprite) < spriteutils.distanceBetween(sprite, sortedSprite)) {
                    sortedSprites.insertAt(i, unsortedSprite);
                    inserted = true;
                    break;
                }
            }
            if (!inserted) {
                sortedSprites.push(unsortedSprite);
            }
        })
        return sortedSprites;
    }

    /**
     * Returns delta time - the length of a frame in ms
     */
    //% blockId=getDeltaTime
    //% block="delta time"
    //% group="General"
    //% weight=20     
    export function getDeltaTime(): number{
        return deltaTime
    }

    /**
     * Returns all the sprites in the game
     */
    //% blockId=getAllSprites
    //% block="array of all sprites"
    //% group="Sprite"
    //% weight=20  

    export function getAllSprites(): Sprite[]{
        return game.currentScene().allSprites as Sprite[]
    }

    /**
     * Does not run the code after the function until the boolean condition given is true
     * Will pause the game if placed in a game loop
     */
    //% blockId=waitUntil
    //% block="wait until $condition"
    //% group="General"
    //% weight=20 

    // export function waitUntil(condition: boolean){
    //     pauseUntil(function (): boolean {
    //         return condition
    //     })
    // }
}