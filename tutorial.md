# Sender tutorial

## Welcome

Hello! In this lesson we will be programming the micro:bits you will be using to measure lung capacity. 
First we will write code that prepares the micro:bit for the game, then we will program the data measurements, and finally we will send the data to the teacher's micro:bit.
Let's go!

## Setup 1

First things first, let's make a ``||variables:team_name||`` variable with your team name! We will do this in the ``||basic:on start||`` block.

```blocks
let team_name = "your team name"
```

## Setup 2

Another variable we will need is a ``||variables:threshold||``. You will see why later but for now set it to `5`.

```blocks
let team_name = "your team name"
let threshold = 5
```

## Setup 3

Next we need to set our radio group correctly so that the teacher's micro:bit knows to listen to us.
For this, look through the ``||radio:Radio||`` blocks.

```blocks
let team_name = "your team name"
let threshold = 5
radio.setGroup(5)
```

## Setup 4

The last thing we will be setting is the ``||radio:transmit power||``. 
The more power we transmit our data with, the further away from the teacher's micro:bit we can be. 
More power will use more battery and we are very environmentally conscious and so we will only use about half of the maximum value which is more than enough for inside a classroom.

```blocks
let team_name = "your team name"
let threshold = 5
radio.setGroup(5)
radio.setTransmitPower(4)
```

## Propeller measuring 1

Next we will program how the micro:bit will measure the speed that the propeller will spin. 
This speed is proportional to the voltage which the motor will generate and this voltage is what we will be measuring.
Let's start by creating a ``||measure_propeller||`` function. 

```blocks
function measure_propeller () {
}
```

## Propeller measuring 2

We will use our ``||measure_propeller||`` function to measure the voltage from the propeller for certain amounts of time.
Add a parameter to ``||measure_propeller||`` so we can give it an amount of time in milliseconds to measure for.

```blocks
function measure_propeller (ms: number) {
}
```
## Propeller measuring 2

To measure the propeller for a certain amount of time, the micro:bit must keep track of time.
It does this by looking at its clock. 
Its clock is a bit different to what we humans use, it uses ``||control:millis (ms)||`` which gives it the amount of milliseconds that have passed since the micro:bit woke up.
Set a new variable ``||variables:start_time||`` to ``||control:millis (ms)||``.

```blocks
function measure_propeller (ms: number) {
    let start_time = control.millis()
}
```

## Propeller measuring 3

Now that we know the time when the function starts, we should make a ``||loops:while||`` loop with a condition that stops after the amount of ``||variables:ms||`` given as a parameter has passed.
Think about what this means and try your best to program it yourself. 
If you get stuck, don't worry, go ahead and look at the hint and ask the teacher if you don't understand the code.

```blocks
function measure_propeller (ms: number) {
    start_time = control.millis()
    while (control.millis() < start_time + ms) {
    }
}
```

## Propeller measuring 4

In this while loop we should now measure our propeller and send our measurements over the radio to the teacher's micro:bit.
Since the micro:bits measurements can be `noisy` (do you remember what this means?), we will average propeller measurements.
We will put our code to average measurements in its own function ``||functions:calculate_average()||``. Go ahead and define this function.


## Intermezzo 1

## Lung capacity logic

## Intermezzo 2

## Feedback

DEPRECATED : 

## Welcome

Hello! In this lesson we will be programming the micro:bits you will be using to measure lung capacity. 
First we will write code that prepares the micro:bit for the game, then we will program the data measurements, and finally we will send the data to the teacher's micro:bit.
Let's go!

## Setup 1

First things first, let's make a ``||variables:team_name||`` variable with your team name! We will do this in the ``||basic:on start||`` block.

```blocks
let team_name = "your team name"
```

## Setup 2

Next we need to set our radio group correctly so that the teacher's micro:bit knows to listen to us.
For this, look through the ``||radio:Radio||`` blocks.

```blocks
let team_name = "your team name"
radio.setGroup(5)
```

## Setup 3

The last thing we will be setting is the ``||radio:transmit power||``. 
The more power we transmit our data with, the further away from the teacher's micro:bit we can be. 
More power will use more battery and we are very environmentally conscious and so we will only use about half of the maximum value which is more than enough for inside a classroom.

```blocks
let team_name = "your team name"
radio.setGroup(5)
radio.setTransmitPower(5)
```

## Measure 1

All of our initial values are now properly set, great work! 
Let's move on to measuring data. 
First make a new ``||functions:Function||`` (look through the 'Advanced' blocks) where we will put all our code to do with measuring.
This will make the program neat and understandable.

```blocks
function measureWind () {
}
```

## Measure 2

TODO. For now just measure ``||input:light level||`` or something idunno lol 

```blocks
function measureWind () {
    return input.lightLevel()
}
```

## Measure 3

Now that we have measured and transformed the data, we should give this data so that it can be used outside of this function.
We do this by using the ``||functions:return||`` the data.

```blocks
function measureWind () {
    return input.lightLevel()
}
```

## Transmission 1

Perfect, now our program can measure our lung capacity!
We need to now send our lung capacity data to the teacher at all times.
We will start by continously calling our measure function in the 
``||basic:forever||`` block. Can you explain why?

```blocks
basic.forever(function () {
    measured_data = "call your function here"
})
```

## Transmission 2

To give ourselves an advantage, we will have our own micro:bit tell us how high/low our measured lung capacity is while it is being measured.
Let's do this by adding a ``||led:plot bar graph||``. 
At this point your virtual micro:bit in the editor should be flashing some of it's LEDs. 
Play around with the light levels and the values you give for the bar graph. Can you explain what's going on?

```blocks
basic.forever(function () {
    measured_data = "call your function here"
    led.plotBarGraph(
    measured_data,
    255
    )
})
```

## Transmission 3

Finally we will send our data to the teacher.
We send both our team name (we don't want to give points to the other teams!) and our data.
How do you determine the 'up to' value?

```blocks
basic.forever(function () {
    measured_data = "call your function here"
    led.plotBarGraph(
    measured_data,
    255
    )
    radio.sendValue(team_name, measured_data)
})
```

## Finish

You have now completed this lesson and your micro:bit is all ready for the challenge! 
In the next lesson we will program the teacher's micro:bit. See you there!

<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
