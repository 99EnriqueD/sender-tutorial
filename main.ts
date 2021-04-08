function measureWind () {
    return input.lightLevel()
}
let measured_data = 0
let team_name = "Team 1"
radio.setGroup(5)
radio.setTransmitPower(5)
basic.forever(function () {
    measured_data = measureWind()
    led.plotBarGraph(
    measured_data,
    255
    )
    radio.sendValue(team_name, measured_data)
})

