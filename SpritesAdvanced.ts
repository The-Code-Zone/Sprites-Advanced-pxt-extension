namespace sprites{

    /**
    * Display a speech bubble with the text, for the given time
    * @param text the text to say, eg: ":)"
    * @param time time to keep text on
    * @param animated whether to print the text character by character or not
    * @param colour of the text
    * @param colour of the text box
    */
    //% group="Effects"
    //% weight=60
    //% blockId=sayColouredText 
    //% block="$sprite say $text with text colour $textColor and text box colour $textBoxColor for $timeOnScreen ms with animation $animated "
    //% timeOnScreen.shadow=timePicker
    //% text.shadow=text
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% textColor.shadow="colorNumberPicker"
    //% textBoxColor.shadow="colorNumberPicker"
    export function sayColouredText(sprite: Sprite, text: any, timeOnScreen: number, animated = false, textColor = 15, textBoxColor = 1) {
        sprite.sayText(text, timeOnScreen, animated, textColor, textBoxColor)
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
    * Returns the current collision direction of all controlled sprites
    */
    //% blockId=getDirectionFromInput
    //% block="get %sprite direction from input"
    //% group="Sprite"
    //% weight=-1 
    export function getDirectionFromInput(sprite: controller.ControlledSprite): any {
        if (game.currentScene().controlledSprites[0].indexOf(sprite) > -1){
            let direction = -1
            if (controller.up.isPressed()) {
                direction = CollisionDirection.Top
            }
            else if (controller.down.isPressed()) {
                direction = CollisionDirection.Bottom
            }
            else if (controller.left.isPressed()) {
                direction = CollisionDirection.Left
            }
            else if (controller.right.isPressed()) {
                direction = CollisionDirection.Right
            }
            return direction
        }
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
