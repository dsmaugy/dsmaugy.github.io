import { Scene } from 'three';
import { RoundedButton, PlanetButton } from 'objects';



class UIScene extends Scene {
    constructor(camX, camY) {
        // Call parent Scene() constructor
        super();

        // Current Flower Display UI Elements

        // const currFlower = new RoundedButton(camX*.4, camX*.4, 1, 0xc072d4, "currFlower");
        // currFlower.SetPosition(-camX + currFlower.width/2, -camY + currFlower.length/2, 0);
        // this.add( currFlower );

        // const flowerZero = new RoundedButton(currFlower.width*.9, currFlower.width*.9, 2, 0xff0000, "flowerZero");
        // flowerZero.SetPosition(currFlower.position.x, currFlower.position.y, 0);
        // this.add( flowerZero );
        
        // Flower Selection UI elements

        const flowerSelect = new RoundedButton(camX*.6, camY/3, 1, 0xE7A2F9, "flowerSelect");
        // flowerSelect.SetPosition(-camX/3, -camY + flowerSelect.length/2, 0);
        flowerSelect.SetPosition(-camX + flowerSelect.width/2, -camY + flowerSelect.length/2, 0);
        this.add( flowerSelect );

        let fbuttonlen = flowerSelect.width*.25;

        const lightOne = new RoundedButton(fbuttonlen, fbuttonlen, 1, 0xedcc72, "lightOne");
        lightOne.SetPosition(flowerSelect.position.x - (flowerSelect.width*.3), -camY + flowerSelect.length/2, 1);
        this.add( lightOne );

        const lightTwo = new RoundedButton(fbuttonlen, fbuttonlen, 1, 0xe38171, "lightTwo");
        lightTwo.SetPosition(flowerSelect.position.x - flowerSelect.width*0, -camY + flowerSelect.length/2, 1);
        this.add( lightTwo );

        const lightThree = new RoundedButton(fbuttonlen, fbuttonlen, 1, 0x739fe6, "lightThree");
        lightThree.SetPosition(flowerSelect.position.x + flowerSelect.width*.3, -camY + flowerSelect.length/2, 1);
        this.add( lightThree );


        // Planet selection UI Elements
        const planetSelect = new RoundedButton(camX*.2, camY, 1, 0xE7A2F9, "planetSelect");
        planetSelect.SetPosition(camX - planetSelect.width/2, -camY/2, 0);
        this.add( planetSelect );

        let pbuttonlen = planetSelect.width*.75;
        
        this.planetOne = new PlanetButton("Planet1", "Planet1Button");
        this.planetOne.SetPosition(camX - planetSelect.width/2, -camY/2 + planetSelect.length* 3/10, 1);
        this.add( this.planetOne );

        this.planetTwo = new PlanetButton("Planet2", "Planet2Button");
        this.planetTwo.SetPosition(camX - planetSelect.width/2, -camY/2, 1);
        this.add( this.planetTwo );

        this.planetThree = new PlanetButton("Planet3", "Planet3Button");
        this.planetThree.SetPosition(camX - planetSelect.width/2, -camY/2 - planetSelect.length* 3/10, 1);
        this.add( this.planetThree );
    }

    update(timestamp, currentPlanet) {

        if (currentPlanet == 1) {
            this.planetOne.miniPlanet.rotation.y += 0.01;

        } else if (currentPlanet == 2) {
            this.planetTwo.miniPlanet.rotation.y += 0.01;

        } else if (currentPlanet == 3) {
            this.planetThree.miniPlanet.rotation.y += 0.01;

        }

    }

}

export default UIScene;
