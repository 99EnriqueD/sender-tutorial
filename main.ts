// function calc_average () {
//     sum = 0
//     number_data_points = 1000
//     for (let index = 0; index < number_data_points; index++) {
//         sum += pins.analogReadPin(AnalogPin.P1)
//     }
//     return sum / number_data_points
// }
// function measure_propeller (ms: number) {
//     start_time = control.millis()
//     while (control.millis() < start_time + ms) {
//         average = calc_average()
//         radio.radio_propeller(team_name, average)
//     }
// }

// let average = 0
// let start_time = 0
// let number_data_points = 0
// let sum = 0
// radio.setGroup(5)
// let threshold = 5
// let team_name = "Team1"
// basic.forever(function () {
//     if (pins.analogReadPin(AnalogPin.P1) >= threshold) {
//         measure_propeller(500)
//         radio.radio_fev1(team_name, average)
//         measure_propeller(2500)
//     }
// })
// control.inBackground(function () {
//     while (true) {
//         if (average < threshold) {
//             basic.showLeds(`
//                 . # . . .
//                 . # . # #
//                 . . # . .
//                 # # . # .
//                 . . . # .
//                 `)
//         } else {
//             basic.showIcon(IconNames.Yes)
//         }
//     }
// })
