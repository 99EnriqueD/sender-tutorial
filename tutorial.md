# Sender tutorial

## Welcome

Hello! In this lesson we will be programming the micro:bits you will be using to measure lung capacity. 
If you have not yet followed the teacher/receiver tutorial, do so [here](https://makecode.microbit.org/#tutorial:github:99enriqued/receiver-tutorial/tutorial).
This tutorial is a little more advanced but I'm sure you can do it! Be sure to ask your teacher if you get stuck.
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
Let's start by creating a ``||functions:measure_propeller||`` function. 

```blocks
function measure_propeller () {
}
```

## Propeller measuring 2

We will use our ``||functions:measure_propeller||`` function to measure the voltage from the propeller for certain amounts of time.
Add a parameter to ``||functions:measure_propeller||`` so we can give it an amount of time in milliseconds to measure for.

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
We will put our code to average measurements in its own function ``||functions:calculate_average()||``. 
Go ahead and define this function and let it return a number (any number is okay for now).

```blocks
function measure_propeller (ms: number) {
    start_time = control.millis()
    while (control.millis() < start_time + ms) {
    }
}
function calculate_average () {
    return 0
}
```

## Propeller measuring 5

In the ``||loops:while||`` loop of our ``||functions:measure_propeller||`` function we can now use ``||functions:calculate_average()||`` by assuming it will return the average propeller voltage.
Set a ``||variables:average||`` variable equal to ``||functions:call calculate_average||``.

```blocks
function measure_propeller (ms: number) {
    start_time = control.millis()
    while (control.millis() < start_time + ms) {
        average = calculate_average()
    }
}
function calculate_average () {
    return 0
}
```

## Propeller measuring 6

Before programming the ``||functions:calculate_average||`` function, we can go ahead and add a ``||radio:radio send propeller voltage||`` to ``||functions:measure_propeller||``.
This block will transmit the ``||variables:average||`` voltage of the propeller along with our ``||variables:team_name||`` so that the teacher knows who is sending these values.

```blocks
function measure_propeller (ms: number) {
    start_time = control.millis()
    while (control.millis() < start_time + ms) {
        average = calculate_average()
        radio.radio_propeller(team_name, average)
    }
}
```

## Propeller measuring 7

Let's now program ``||functions:calculate_average||``.
An average over a list of values is equal to the sum of all the values in the list divided by the number of values in the list.
For example, the average of `[1,2,3]` is (1+2+3)/3 = 6/3 = 2.
Start by setting two new variables, ``||variables:sum||`` and ``||variables:number_data_points||``. 
Make ``||variables:sum||`` equal to 0 and ``||variables:number_data_points||`` equal to 1000.

```blocks
function calculate_average () {
    sum = 0
    number_data_points = 1000
    return 0
}
```

## Propeller measuring 8

We now will add up 1000 propeller voltage data points.
Let's use a ``||loops:repeat||`` loop for this.

```blocks
function calculate_average () {
    sum = 0
    number_data_points = 1000
    for (let index = 0; index < number_data_points; index++) {
    }
    return 0
}
```

## Propeller measuring 9

In this ``||loops:repeat||`` loop we will now add a propeller voltage measurment to ``||variables:sum||``.
The micro:bit gets the voltage from the propeller from pin 1 (bottom left of the micro:bit).
The ``||pins:analogReadPin(AnalogPin.P1)||`` block does this for us.

```blocks
function calculate_average () {
    sum = 0
    number_data_points = 1000
    for (let index = 0; index < number_data_points; index++) {
        sum += pins.analogReadPin(AnalogPin.P1)
    }
    return 0
}
```

## Propeller measuring

Now we have all the information we need to actually ``||functions:return||`` the average of the propeller voltage.
Remember, the average is equal to the sum of all data points over the number of data points...

function calculate_average () {
    sum = 0
    number_data_points = 1000
    for (let index = 0; index < number_data_points; index++) {
        sum += pins.analogReadPin(AnalogPin.P1)
    }
    return sum / number_data_points
}


## Intermezzo 1

Whew, that was a lot of work. The good news is you're more than halfway there!
So go ahead and give a pat on the back to you and your team, you deserve it!

## Lung capacity logic 1

Now we can use our ``||functions:measure_propeller||`` function to measure lung capacity, the whole point of the challenge!
To measure lung capacity we need to make a graph of our propeller speed (which will have the same shape as the voltage we are measuring).
The important parts of the graph is the speed after half a second of blowing, the fev1 score, and the maximum speed of the graph.

To know when we are blowing on the propeller, the voltage generated by the propeller should be above the ``||variables:threshold||`` we defined at the start of the lesson.
Go ahead and write this condition in an ``||logic:if||`` statement in the ``||basic:forever||`` block.

```blocks
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P1) >= threshold) {
    }
})
```

## Lung capacity logic 2

When we are blowing on the propeller we will be in the ``||logic:if||`` statement where we will start measuring propeller voltages.
Let's call ``||functions:measure_propeller||`` for half a second (how many milliseconds is that?). 
Then we will send our fev1 score, which is equal to the latest value of ``||variables:average||``, to the teacher using the ``||radio.radio send fev1||`` block.

```blocks
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P1) >= threshold) {
        measure_propeller(500)
        radio.radio_fev1(team_name, average)
    }
})
```

## Lung capacity logic 3

After we have sent the fev1 score, we will continue measuring propeller voltage untill it stops spinning.
We'll make it easy for ourselves by assuming that the proppeller will stop spinning after two and a half seconds.
Call ``||functions:measure_propeller||`` for two and a half seconds (in milliseconds, of course).

```blocks
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P1) >= threshold) {
        measure_propeller(500)
        radio.radio_fev1(team_name, average)
        measure_propeller(2500)
    }
})
```

## Intermezzo 2

Our micro:bit should actually be ready for the challenge now! 
It measures the voltage from the propeller and sends these values to the teacher's micro:bit along with our team name.
Click on the hint and check if your blocks do the same things as the shown hint blocks.
Right now it is hard to tell when we should blow or not however so we will now use our micro:bit's LEDs to give us some feedback.

```blocks
function calculate_average () {
    sum = 0
    number_data_points = 1000
    for (let index = 0; index < number_data_points; index++) {
        sum += pins.analogReadPin(AnalogPin.P1)
    }
    return sum / number_data_points
}
function measure_propeller (ms: number) {
    start_time = control.millis()
    while (control.millis() < start_time + ms) {
        average = calculate_average()
        radio.radio_propeller(team_name, average)
    }
}
let average = 0
let start_time = 0
let number_data_points = 0
let sum = 0
let team_name = ""
radio.setGroup(5)
radio.setTransmitPower(5)
let threshold = 5
team_name = "Team1"
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P1) >= threshold) {
        measure_propeller(500)
        radio.radio_fev1(team_name, average)
        measure_propeller(2500)
    }
})
```

## Feedback 1

To not interfere with the rest of our program, let's make a ``||control:run in background||`` block.
This block will start at the same time as the ``||basic:on start||`` but we want it to always be running like the ``||basic:forever||`` block.
We can make sure this happens by adding a ``||loops:while||`` loop with its condition always ``||logic:true||``.

```blocks
control.inBackground(function () {
    while (true) {
    }
})
```

## Feedback 2

We want to our micro:bit's LEDs to show different icons, one for when the propeller is ready to be blown on and one when the program is busy.
Split up these two cases by adding  ``||logic:if then else||`` block.
Look at your ``||basic:forever||`` block for a hint as to what the condition for this block should be...

```blocks
control.inBackground(function () {
    while (true) {
        if (average < threshold) {
        } else {
        }
    }
})
```

## Feedback 3

Now add an ``||basic:show icon||``, or draw one yourself with ``||basic:show leds||``, for each case.

```blocks
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
        }
    }
})
```

## Finish

Your project is all ready now! Test it out on your real or virtual micro:bit. 
For the virtual micro:bit, you can change the voltae on the pins by dragging up or down the pin.
Great programming today, I hope you're as excited as I am for the challenge! 

<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
