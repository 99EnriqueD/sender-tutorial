# Sender tutorial

## Welcome

## Setup

## Measuring and transmission

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
