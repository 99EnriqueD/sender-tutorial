function calc_average () {
    sum = 0
    number_data_points = 1000
    for (let index = 0; index < number_data_points; index++) {
        sum += pins.analogReadPin(AnalogPin.P1)
    }
    return sum / number_data_points
}
function send_fev1 (team_name: string, fev1: number) {
    radio.sendValue("" + team_name + "." + "fev1", 0)
    basic.pause(20)
    radio.sendValue("" + team_name + "." + "fev1", fev1)
    basic.pause(20)
    radio.sendValue("" + team_name + "." + "fev1", 0)
}
function measure_propeller (team_name: string, ms: number) {
    start_time = control.millis()
    while (control.millis() < start_time + ms) {
        average = calc_average()
        radio_propeller(team_name, average)
    }
}
function radio_propeller (team_name: string, value: number) {
    radio.sendValue("" + team_name + "." + "propeller", value)
}
let average = 0
let start_time = 0
let number_data_points = 0
let sum = 0
radio.setGroup(5)
let threshold = 5
let team_name = "Team1"
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P1) >= threshold) {
        measure_propeller(team_name, 500)
        send_fev1(team_name, average)
        measure_propeller(team_name, 2500)
    }
})
control.inBackground(function () {
    while (true) {
        if (average < threshold) {
            basic.showLeds(`
                . # . . .
                . # . # #
                . . # . .
                # # . # .
                . . . # .
                `)
        } else {
            basic.showIcon(IconNames.Yes)
            basic.pause(1000)
        }
    }
})
