namespace Math {

    /**
     * Returns the sign of the number
     */
    //% blockId=getSign
    //% block="get sign of $num"
    //% weight=50
    export function getSign(num: number): number {
        return Math.sign(num);
    }

}

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
    //% block="on $sprite of kind $kind=spritekind hits edge of screen"
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
     * The attached code will run when a sprite of that kind leaves the tilemap
     * @param kind the sprite kind we check the exit of
     * @param handler the code to run on exit
    */
    //% group="Tile Comparisons"
    //% weight=98 
    //% blockId=onLeavingTilemap
    //% block="on $sprite of kind $kind=spritekind leaves tilemap"
    //% draggableParameters="reporter"
    export function onLeavingTilemap(kind: number, handler: (sprite: Sprite) => void): void {
        game.onUpdate(() => {
            for (let sprite of sprites.allOfKind(kind)) {
                let pos = sprite.tilemapLocation();
                let mapWidth = game.currentScene().tileMap.data.width;
                let mapHeight = game.currentScene().tileMap.data.height;
                if (pos.col < 0 || pos.col > mapWidth - 1 || pos.row < 0 || pos.row > mapHeight - 1) {
                    handler(sprite);
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
    export function placeSpriteRandomlyOnEdge(sprite: Sprite): void {
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

    /**
    * increases the velocity of a sprite in the given direction at a defined increment
    */
    //% blockId=changeSpriteVelocityByAtAngle
    //% block="change $sprite velocity by $increase at $angle"
    //% sprite.defl=mySprite
    //% sprite.shadow=variables_get
    //% group="Sprite"
    //% weight=20 
    export function changeSpriteVelocityByAtAngle(sprite: Sprite, increase: number, angle: number): void {
        sprite.vx += Math.sin(angle) * increase
        sprite.vy += Math.cos(angle) * -increase
    }


    /**
    * get the distance between two given points
    */
    //% blockId=getDistanceBetweenPoints
    //% block="get distance between x: $x1 y: $y1 and x: $x2 y: $y2"
    //% group="General"
    //% inlineInputMode=inline
    //% weight=20 
    export function getDistanceBetweenPoints(x1: number, y1: number, x2: number, y2: number): number {
        let a = x1 - x2
        let b = y1 - y2
        let c_squared = a ** 2 + b ** 2
        return Math.sqrt(c_squared)
    }

    /**
    * Make the sprite follow another sprite and rotate its image based on it's velocity
    */
    //% blockId=followAndRotate
    //% block="set %sprite follow %spriteToFollow and rotate|| with speed %speed and turn rate %turnRate"
    //% group="Sprite"
    //% sprite.defl=myEnemy
    //% sprite.shadow=variables_get
    //% spriteToFollow.defl=mySprite
    //% spriteToFollow.shadow=variables_get
    //% inlineInputMode=inline
    //% weight=20 
    export function followAndRotate(sprite: Sprite, spriteToFollow: Sprite, speed = 100, turnRate = 400) {
        sprite.follow(spriteToFollow, speed, turnRate)
        game.onUpdate(() => {
            let angleInRads = heading(sprite)
            let angleInDegrees = radiansToDegrees(angleInRads) + 90
            transformSprites.rotateSprite(sprite, angleInDegrees)
        })
    }

    /**
    * Position the given sprite relative to screen position but still able to overlap other sprites
    */
    //% blockId=setRelativeToCameraAndOverlapable
    //% block="set $sprite position relative to camera and overlapable $on"
    //% group="Sprite"
    //% sprite.defl=mySprite
    //% sprite.shadow=variables_get
    //% on.shadow="toggleOnOff"
    //% weight=2
    export function setRelativeToCameraAndOverlapable(sprite: Sprite, on: boolean) {
        sprite.setFlag(SpriteFlag.GhostThroughSprites, false);
        sprite.setFlag(SpriteFlag.GhostThroughWalls, true);
        sprite.setFlag(SpriteFlag.GhostThroughTiles, true);
        sprites.setDataBoolean(sprite, "relativeToCamera", true);
        sprites.setDataNumber(sprite, "screenX", sprite.x);
        sprites.setDataNumber(sprite, "screenY", sprite.y);
        game.onUpdate( () => {
            let x = sprites.readDataNumber(sprite, "screenX");
            let y = sprites.readDataNumber(sprite, "screenY");
            let cameraLeft = scene.cameraProperty(CameraProperty.Left);
            let cameraTop = scene.cameraProperty(CameraProperty.Top);
            sprite.setPosition(x + cameraLeft, y + cameraTop);
        })
    }

    /**
    * Set the position of a sprite that is relative to camera and can overlap
    */
    //% blockId=setPositionOfSpriteRelativeToCamera
    //% block="set $sprite position relative to camera a x:$x y:$y"
    //% group="Sprite"
    //% sprite.defl=mySprite
    //% sprite.shadow=variables_get
    //% weight=1
    export function setPositionOfSpriteRelativeToCamera(sprite: Sprite, x: number, y: number) {
        if (sprites.readDataBoolean(sprite, "relativeToCamera")) {
            sprites.setDataNumber(sprite, "screenX", x);
            sprites.setDataNumber(sprite, "screenY", y);
        }
    }

    /**
    * Destroys all sprites of the given sprite's kind except the given sprite
    */
    //% blockId=destroyAllOtherSpritesOfThisKind
    //% block="destroy all other sprites of same kind as $sprite"
    //% group="Sprite"
    //% sprite.defl=mySprite
    //% sprite.shadow=variables_get
    //% weight=3
    export function destroyAllOtherSpritesOfThisKind(sprite: Sprite) {
        for (let otherSprite of sprites.allOfKind(sprite.kind())){
            if (otherSprite != sprite){
                otherSprite.destroy();
            }
        }
    }

}

namespace sprites{

    /**
    * Make this sprite follow the target sprite.
    * Duplicate function to allow blocks to access turnRate param
    */
    //% group="Physics" weight=9
    //% sprite.defl=myEnemy
    //% sprite.shadow=variables_get
    //% spriteToFollow.defl=mySprite
    //% spriteToFollow.shadow=variables_get
    //% blockId=followSprite
    //% block="set %sprite follow %spriteToFollow|| with speed %speed and turn rate %turnRate"

    export function followSprite(sprite: Sprite, spriteToFollow: Sprite, speed = 100, turnRate = 400): void {
        sprite.follow(spriteToFollow, speed, turnRate)
    }

}