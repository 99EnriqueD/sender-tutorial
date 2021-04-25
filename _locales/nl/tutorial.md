# Sender tutorial

## Welcome

Hallo! In deze beginnerscursus programmeren we de micro:bits die je gaat gebruiken om de longcapaciteit te meten in het IoTeach spel. 
Als je de tutorial voor docenten/ontvangers nog niet hebt gevolgd, doe dit dan [hier](https://makecode.microbit.org/#tutorial:github:99enriqued/receiver-tutorial/tutorial).
Deze tutorial is een beetje geavanceerder, maar ik weet zeker dat je het kunt doen! Zorg ervoor dat je je leraar vraagt als je vastloopt.
Eerst zullen we code schrijven die de micro:bit voorbereidt op het spel, dan zullen we de gegevensmetingen programmeren en ten slotte zullen we de gegevens naar de micro:bit van de leraar sturen.
Laten we gaan!

## Setup 1

Laten we eerst een ``||variables:teamnaam||`` variabele aanmaken en instellen met je teamnaam! We doen dit in het ``||basic:bij opstarten||`` blok.

```blocks
let teamnaam = "je teamnaam"
```

## Setup 2

Een andere variabele die we nodig hebben is een ``||variables:drempelwaarde||``. Je zult later zien waarom, maar stel het voorlopig in op '5'.

```blocks
let teamnaam = "je teamnaam"
let drempelwaarde = 5
```

## Setup 3

Vervolgens moeten we onze radiogroep correct instellen, zodat de micro:bit van de leraar naar ons weet te luisteren.
Kijk hiervoor in de ``||radio:Radio||`` blokken.

```blocks
let teamnaam = "je teamnaam"
let drempelwaarde = 5
radio.setGroup(5)
```

## Setup 4

Het laatste wat we gaan instellen is de ``||radio: zend macht||`` van onze radio (kijk in het gedeelte 'meer' van de ``||radio:Radio||`` blokken).
Hoe meer kracht we gebruiken om onze gegevens door te geven, hoe verder weg van de centrale micro:bit we kunnen zijn.
Meer stroom zal meer batterij gebruiken en we zijn zeer milieubewust, dus we zullen slechts ongeveer de helft van de maximale waarde gebruiken. 
Dit is normaal gezien meer dan genoeg voor in een klaslokaal.

```blocks
let teamnaam = "je teamnaam"
let drempelwaarde = 5
radio.setGroup(5)
radio.setTransmitPower(4)
```

## Propeller measuring 1

Vervolgens zullen we programmeren hoe de micro:bit de snelheid meet die de propeller zal draaien.
Deze snelheid is evenredig met de spanning die de motor zal genereren en deze spanning is wat we eigenlijk kunnen meten met onze micro:bit.
Laten we beginnen met het maken van een ``||functions:meet_propeller||`` functie. 

```blocks
function meet_propeller () {
}
```

## Propeller measuring 2

We gebruiken onze ``||functions:meet_propeller||`` functie om de spanning van de propeller gedurende bepaalde tijd te meten.
Voeg een parameter ``||variables:ms||`` toe naar ``||functions:meet_propeller||`` zodat we het een hoeveelheid tijd in milliseconden kunnen geven om voor te meten.
Je kan parameters aan functies toevoegen door met de rechtermuisknop op de functie te klikken en "Functie bewerken" te selecteren.

```blocks
function meet_propeller (ms: number) {
}
```
## Propeller measuring 2

Om de propeller gedurende een bepaalde tijd te meten, moet de micro:bit de tijd bijhouden.
Het doet dit door naar zijn klok te kijken. 
De klok is een beetje anders dan wat wij mensen gebruiken, die gebruikt ``||control: millis (ms)||`` wat het de hoeveelheid milliseconden geeft die zijn verstreken sinds de micro:bit wakker werd.
Stel een nieuwe variabele ``||variables:begin_tijd||`` met als waarde ''||control:millis (ms)|| ``.
```blocks
function meet_propeller (ms: number) {
    let begin_tijd = control.millis()
}
```

## Propeller measuring 3

Nu we weten wanneer de functie begint, moeten we een ``||loops:while||`` lus met een voorwaarde die stopt na de hoeveelheid ``||variables:ms||`` gegeven als parameter is verstreken.
Denk na over wat dit betekent en doe je best om het zelf te programmeren. 
Als je vastloopt, maak je geen zorgen, kijk naar de hint en vraag de leraar.

```blocks
function meet_propeller (ms: number) {
    let begin_tijd = control.millis()
    while (control.millis() < begin_tijd + ms) {
    }
}
```

## Propeller measuring 4

In deze while lus moeten we nu onze propeller meten en onze metingen via de radio naar de micro:bit van de leraar sturen.
Omdat de micro:bits metingen ruis-achtig kunnen zijn (weet je nog wat dit betekent?), zullen we gemiddelde propellermetingen doen.
We zetten onze code op gemiddelde metingen in zijn eigen functie ``||functions:gemiddelde_bereken()||``. 
Definieer deze functie en laat deze een getal retourneren (gelijkwelk nummer is voorlopig in orde).


```blocks
function meet_propeller (ms: number) {
    let begin_tijd = control.millis()
    while (control.millis() < begin_tijd + ms) {
    }
}
function gemiddelde_berekenen () {
    return 0
}
```

## Propeller measuring 5

In de ``||loops:while||`` lus van onze ``||functions:meet_propeller||`` functie kunnen we nu ``||functions:gemiddelde_berekenen||`` gebruiken door aan te nemen dat het de gemiddelde spanning zal teruggeven.
Stel een ``||variables:gemiddelde||`` variabele gelijk aan ``|| functies:aanroep gemiddelde_berekenen||``


```blocks
function meet_propeller (ms: number) {
    let begin_tijd = control.millis()
    while (control.millis() < begin_tijd + ms) {
        gemiddelde = gemiddelde_berekenen()
    }
}
function gemiddelde_berekenen () {
    return 0
}
```

## Propeller measuring 6

Before programming the ``||functions:calculate_average||`` function, we can go ahead and add a ``||radio:radio send propeller voltage||`` to ``||functions:measure_propeller||``.
This block will transmit the ``||variables:average||`` voltage of the propeller along with our ``||variables:teamnaam||`` so that the teacher knows who is sending these values.

```blocks
function measure_propeller (ms: number) {
    start_time = control.millis()
    while (control.millis() < start_time + ms) {
        average = calculate_average()
        radio.radio_propeller(team_name, average)
    }
}
function gemiddelde_berekenen () {
    return 0
}
```

## Propeller measuring 7



Laten we nu ``||functions:gemiddelde_berekenen||`` programmeren.
Een gemiddelde over een lijst met waarden is gelijk aan de som van alle waarden in de lijst gedeeld door het aantal waarden in de lijst.
Het gemiddelde van '[1,2,3]' is bijvoorbeeld (1+2+3)/3 = 6/3 = 2.

Begin met het instellen van twee nieuwe variabelen, ``||variables:som||`` and ``||variables:aantal_gegevenspunten||``. 
Maak ``||variables:sum||`` gelijk aan 0 en ``||variables:aantal_gegevenspunten||`` gelijk aan 1000.

```blocks
function gemiddelde_berekenen () {
    som = 0
    aantal_gegevensunten = 1000
    return 0
}
```

## Propeller measuring 8

We tellen nu 1000 propellerspanningsgegevenspunten op.
Laten we een ``||loops:repeat||`` lus hiervoor gebruiken.

```blocks
function gemiddelde_berekenen () {
    som = 0
    aantal_gegevensunten = 1000
    for (let index = 0; index < aantal_gegevensunten; index++) {
    }
    return 0
}
```

## Propeller measuring 9

In deze ``||loops:repeat||`` lus voegen we nu propellerspanningsgegevenspunten toe aan ``||variables:som||``.
De micro:bit krijgt de spanning van de propeller van pin 1 (linksonder in de micro:bit).
Het ``||pins:analogReadPin(P1)||`` blok doet dit voor ons. 

```blocks
function gemiddelde_berekenen () {
    som = 0
    aantal_gegevensunten = 1000
    for (let index = 0; index < aantal_gegevensunten; index++) {
        som += pins.analogReadPin(AnalogPin.P1)
    }
    return 0
}
```

## Propeller measuring

Nu hebben we alle nodige informatie om daadwerkelijk de juiste gemiddelde spanning te retourneren.
Vergeet niet dat het gemiddelde gelijk is aan de som van alle gegevenspunten over het aantal gegevenspunten...

```blocks
function gemiddelde_berekenen () {
    som = 0
    aantal_gegevensunten = 1000
    for (let index = 0; index < aantal_gegevensunten; index++) {
        som += pins.analogReadPin(AnalogPin.P1)
    }
    return som / aantal_gegevenspunten
}
```


## Intermezzo 1

Amai, dat was veel werk. Het goede nieuws is dat je meer dan halverwege bent!
Jij mag zeker tevreden zijn.

Nu kunnen we onze ``||functions:meet_propeller||`` functie gebruiken om longcapaciteit te meten (dat is het hele punt van de uitdaging)!
Om de longcapaciteit te meten, moeten we een grafiek maken van onze propellersnelheid (die dezelfde vorm zal hebben als de spanning die we meten).
De belangrijke onderdelen van de grafiek zijn de snelheid na een halve seconde blazen, de fev1-score, en de maximale snelheid van de grafiek.


## Lung capacity logic 1
Om te weten wanneer we op de propeller blazen, moet de spanning die door de propeller wordt gegenereerd boven onze ``||variables:drempelwaarde||`` zijn.
Ga je gang en schrijf deze voorwaarde in een ``||logica:if||`` blok in het ``||basic:de hele tijd||`` blok.

```blocks
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P1) >= drempelwaarde) {
    }
})
```

## Lung capacity logic 2

Als we op de propeller blazen zitten we in het ``||logic:if||`` blok 

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
Split up these two cases by adding an ``||logic:if then else||`` block.
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

Your project is all done now! Test it out on your real or virtual micro:bit. 
For the virtual micro:bit, you can change the voltage on the pins by dragging up or down the pin.
Great programming today, I hope you're as excited as I am for the challenge! 

<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
