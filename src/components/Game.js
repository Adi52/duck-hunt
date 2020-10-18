import Input from "./Input";
import Collision from "./Collision";
import GameStats from "./GameStats";

import Dog from "./Dog";
import Duck from "./Duck";
import RedDuck from "./RedDuck";
import BlueDuck from "./BlueDuck";


export default class Game {
    constructor(gameWidth, gameHeight, ctx) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.ctx = ctx;

        this.gameMode = 1; // 1 or 2 ducks
    }

    start() {
        this.ducks = [new Duck(this), new RedDuck(this), new BlueDuck(this)];

        this.input = new Input(this, document.querySelector('#canvas'));
        this.gameStats = new GameStats(this);

        this.dog = new Dog(this);
        this.duck = this.ducks[0];
        this.colission = new Collision(this);

        this.canShoot = false;
        this.newRound();
    }

    runIntro() {
        this.dog.runIntro = true;
    }

    respawnDuck() {
        this.duck.startRespawn = true;
    }

    gameMode1() {
        if (this.duck.runDogPickUp) {
            this.dog.pickUp(1, this.duck.position.x);
            this.duck.runDogPickUp = false;
        }
    }

    gameMode2() {

    }

    newRound() {
        console.log(`Round: ${this.gameStats.round}`);
        this.canShoot = false;
        this.dog.drawGrass = false;

        this.gameStats.currentSubRound = 0;

        this.gameStats.round++;

        this.gameStats.changeDuckSpeed();

        this.runIntro();
        this.newSubRound();
    }

    newSubRound() {
        this.dog.resetPropertiesAfterRound();
        this.duck.wholeDistanceTraveled = 0;

        console.log(`Score: ${this.gameStats.score}`);
        // Generate random color duck
        this.duck = this.ducks[Math.floor(Math.random() * 3)];
        this.dog.canStartNextSubRound = false;

        this.canFlyAway = true;

        this.gameStats.currentSubRound++;
        this.gameStats.shoot = 0;

        this.respawn = true;
    }

    loseSubRound() {
        this.canShoot = false;
        // lose sub round
        if (!this.duck.beHit && this.duck.duckAlive && this.canFlyAway) {
            // console.log('Koniec strzałów');
            this.duck.flyAwayNow = true;
        }
    }

    draw() {
        this.dog.draw();
        this.duck.draw();
    }

    update(deltaTime) {
        if (this.gameMode === 1) {
            this.gameMode1();
        } else if (this.gameMode === 2) {
            this.gameMode2();
        } else {
            return;
        }

        this.colission.update(this.duck);
        this.dog.update(deltaTime);
        this.duck.update(deltaTime);
        this.gameStats.update();


        if (!this.dog.runIntro && this.respawn) {
            this.respawnDuck();
            this.canShoot = true;
            this.respawn = false;
        }

        if (this.gameStats.shoot >= 3) {
            this.loseSubRound();
        }

        if (this.dog.canStartNextSubRound) {
            if (this.gameStats.currentSubRound !== 10) {
                this.newSubRound();
            } else {
                // New round after 10 sub rounds;
                this.gameStats.summaryRounds();
                this.newRound();
            }
        }
    }
}

// Pozostało zrobienie sprawdzania ile razy ptak nie został trafiony i określanie kiedy jest GameOver.
// Dodanie perfect bonus
// Czerwone tło gdy ptak odlatuje + komunikaty na canvasie

// Ilość punktów za trafienie po zestrzeleniu kaczki wyświetlana w tle


// Strzały graficznie na canvas aktualizowane
// Uniemożliwienie szybkich strzałów, odczekanie miedzy nimi ok 500ms

// Dodanie kaczek w pasku na dole oraz zrobienie ich animacji, zmiana 0 w tablicy correctHits na -1 gdy kaczka nie zostanie trafiona
// na podstawie tego określanie koloru kaczki w pasku



// Dodanie menu oraz stworzenie grafik
// Śmiech psa gdy jest gameover
// Konfiguracja trybu 2 kaczek (wtedy zachowanie psa gdy kaczki spadną!)
// Dodanie dźwięków
