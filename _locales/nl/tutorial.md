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

Voor het programmeren van de ``||functions:gemiddelde_berekenen||`` functie, kunnen we doorgaan en een ``||radio:radio send propeller voltage||`` toevoegen in ``||functions:meet_propeller||``.
Dit blok verzendt de ``||variables:gemiddelde||`` spanning van de propeller samen met onze ``||variables:teamnaam||`` zodat de leerkracht weet wie deze waarden stuurt.

```blocks
function meet_propeller (ms: number) {
    let begin_tijd = control.millis()
    while (control.millis() < begin_tijd + ms) {
        gemiddelde = gemiddelde_berekenen()
        radio.radio_propeller(teamnaam, gemiddelde)
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

Als we op de propeller blazen zitten we in het ``||logic:if||`` blok waar we propellerspanningen gaan meten.
Laten we ``||functions:meet_propeller||`` oproepen gedurende een halve seconde (hoeveel milliseconden is dat?). 
Dan sturen we onze fev1 score, die gelijk is aan de laatste waarde van ``||variables:gemiddelde||``, aan de leerkracht hun micro:bit met behulp van het ``||radio.radio send fev1||`` blok.


```blocks
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P1) >= drempelwaarde) {
        meet_propeller(500)
        radio.radio_fev1(teamnaam, gemiddelde)
    }
})
```

## Lung capacity logic 3

Nadat we de fev1-score hebben verzonden, blijven we de propellerspanning meten totdat deze stopt met draaien.
We maken het onszelf gemakkelijk door aan te nemen dat de proppeller na tweeënhalve seconde stopt met draaien.
Roep ``||functions:meet_propeller||`` op gedurende tweeënhalve seconde (in milliseconden natuurlijk).

```blocks
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P1) >= drempelwaarde) {
        meet_propeller(500)
        radio.radio_fev1(teamnaam, gemiddelde)
        meet_propeller(2500)
    }
})
```

## Intermezzo 2

Onze micro:bit zou nu eigenlijk klaar moeten zijn voor de uitdaging! 
Het meet de spanning van de propeller en stuurt deze waarden naar de micro:bit van de leraar, samen met onze teamnaam.
Klik op de hint en controleer of je blokken dezelfde dingen doen als de getoonde hintblokken en wat zijn zouden moeten doen.

Op dit moment is het moeilijk te zeggen wanneer we moeten blazen of niet, dus we zullen nu de LED's van onze micro:bit gebruiken om ons wat feedback te geven.

```blocks
function gemiddelde_berekenen () {
    som = 0
    aantal_gegevensunten = 1000
    for (let index = 0; index < aantal_gegevensunten; index++) {
        som += pins.analogReadPin(AnalogPin.P1)
    }
    return som / aantal_gegevenspunten
}
function meet_propeller (ms: number) {
    let begin_tijd = control.millis()
    while (control.millis() < begin_tijd + ms) {
        gemiddelde = gemiddelde_berekenen()
        radio.radio_propeller(teamnaam, gemiddelde)
    }
}
let gemiddelde = 0
let begin_tijd = 0
let aantal_gegevensunten = 0
let som = 0
let teamnaam = ""
radio.setGroup(5)
radio.setTransmitPower(5)
let drempelwaarde = 5
teamnaam = "Team1"
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P1) >= drempelwaarde) {
        meet_propeller(500)
        radio.radio_fev1(teamnaam, gemiddelde)
        meet_propeller(2500)
    }
})
```

## Feedback 1

Om de rest van ons programma niet te belemmeren, laten we een ``||control:voer uit op de achtergrond||`` blok maken.
Dit blok start op hetzelfde moment als het ``||basic:bij opstarten||`` blok maar we willen dat het altijd loopt zoals het ``||basic:de hele tijd||`` blok.
We kunnen ervoor zorgen dat dit gebeurt door een ``||loops:while||`` lus met zijn toestand altijd ``|| logic:waar||``.

```blocks
control.inBackground(function () {
    while (true) {
    }
})
```

## Feedback 2

We willen dat de LED's van onze micro:bit verschillende pictogrammen tonen, een voor wanneer de propeller klaar is om op te worden geblazen en een wanneer het programma bezig is.
Splits deze twee zaken op door een ``||logic:if then else||`` blok te gebruiken.
Kijk naar je ``||basic:de hele tijd||`` blok voor een hint over wat de voorwaarde voor dit blok zou moeten zijn...

```blocks
control.inBackground(function () {
    while (true) {
        if (gemiddelde < drempelwaarde) {
        } else {
        }
    }
})
```

## Feedback 3

Voeg nu een ``||basic:toon pictogram||`` blok toe of teken er zelf een met ``||basic:toon lichtjes||`` voor elk geval.

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

Uw project is nu klaar! Test het uit op je echte of virtuele micro:bit. 
Voor de virtuele micro:bit kunt u de spanning op de pinnen wijzigen door de pin omhoog of omlaag te slepen.
Goed gewerkt, ik hoop dat je net zo enthousiast bent als ik voor de uitdaging!

<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
