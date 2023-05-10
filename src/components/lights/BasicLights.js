import { Group, AmbientLight, DirectionalLight } from 'three';
import { SECONDS_PER_DAY } from '../scenes/Main';


class BasicLights extends Group {
    constructor(bg, dayMat, nightMat, ...args) {
        // Invoke parent Group() constructor with our args
        super(...args);
        this.ambi = new AmbientLight(0x404040, 2.32);

        this.dayMat = dayMat;
        this.nightMat = nightMat;
        this.backgroundMesh = bg;
        this.sunlight = new DirectionalLight(0xedcc72, 0.75);
        this.daytime = true;

        this.add(this.ambi, this.sunlight);
    }

    update(timestamp) {
        const timeOfDay = timestamp/1000/SECONDS_PER_DAY;
        this.sunlight.position.setY(Math.cos(timeOfDay));
        this.sunlight.position.setZ(Math.sin(timeOfDay));
    }

    changeLightColor(newColor) {
        this.sunlight.color = newColor;
    }
}

export default BasicLights;
