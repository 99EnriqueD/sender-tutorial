/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

/**
 * Custom radio blocks
 */
//% weight=100 color=#FF1493
namespace radio {
    
    /**
     * Transmits a value respresenting the propellers voltage over the radio.
     * 
     * @param team_name the name of the team which is sending the propeller value
     * @param value the propeller value
     */
    //% block="radio send propeller voltage $value $team_name"
    export function radio_propeller (team_name: string, value: number) {
        radio.sendValue("" + team_name + "." + "propeller", value)
    }

    /**
     * Transmits a spike value respresenting an fev1 over the radio.
     * 
     * This function prevents ugly interpolation in the built-in simulator.
     * 
     * @param team_name the name of the team which is sending the fev1 value
     * @param fev1 the fev1 value
     */
    //% block="radio send fev1 $fev1 $team_name"
    export function radio_fev1 (team_name: string, fev1: number) {
        radio.sendValue("" + team_name + "." + "fev1", 0)
        basic.pause(30)
        radio.sendValue("" + team_name + "." + "fev1", fev1)
        basic.pause(30)
        radio.sendValue("" + team_name + "." + "fev1", 0)
    }
}