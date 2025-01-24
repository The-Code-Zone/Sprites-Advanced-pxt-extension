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

    /**
    * The attached code will run when a sprite of that kind collides with the edge of the screen
    * @param kind the sprite kind we check the collision on
    * @param handler the code to run on the collision
    */
    //% group="Sprite"
    //% weight=98 
    //% blockId=onSpriteOfKindHitsEdgeOfScreen
    //% draggableParameters="reporter"
    //% block="on sprite of kind $kind=spritekind hits edge of screen"
    export function onSpriteOfKindHitsEdgeOfScreen(kind: number, handler: (sprite: Sprite) => void) {
        game.onUpdate(() => {
            for (let sprite of sprites.allOfKind(kind)) {
                if (sprite.left <= scene.cameraProperty(CameraProperty.Left) ||
                    sprite.right >= scene.cameraProperty(CameraProperty.Right) ||
                    sprite.top <= scene.cameraProperty(CameraProperty.Top) ||
                    sprite.bottom >= scene.cameraProperty(CameraProperty.Bottom)) {
                    handler(sprite)
                }
            }
        })
    }

    /**
    * places a given sprite on the edge of the screen in a random spot. does not work if the camera has moved
    */
    //% blockId=placeSpriteRandomlyOnEdge
    //% block="place $sprite randomly on edge of screen"
    //% sprite.defl=mySprite
    //% sprite.shadow=variables_get
    //% group="Sprite"
    //% weight=20 
    export function placeSpriteRandomlyOnEdge(sprite: Sprite) {
        let halfWidth = sprite.image.width;
        let halfHeight = sprite.image.height;
        let randNum = randint(1, 4);
        switch (randNum) {
            case 1: { //top
                sprite.bottom = 1;
                sprite.x = randint(halfWidth, 160 - halfWidth);
                break;
            }
            case 2: { // bottom
                sprite.top = 119;
                sprite.x = randint(halfWidth, 160 - halfWidth);
                break;
            }
            case 3: { // left
                sprite.right = 1;
                sprite.y = randint(halfHeight, 120 - halfHeight);
                break;
            }
            case 4: { // right
                sprite.left = 159;
                sprite.y = randint(halfHeight, 120 - halfHeight);
                break;
            }
        }
    }
}