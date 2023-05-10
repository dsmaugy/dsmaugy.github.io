import {
    Scene,
    Vector3,
    TextureLoader,
    Fog,
    MeshBasicMaterial,
} from 'three';
import { Bush } from 'objects';
import { BasicLights } from 'lights';
import { SphereGeometry, MeshToonMaterial, Mesh } from 'three';
import Planet from '../objects/Planet/Planet';
import AsteroidManager from './AsteroidManager';

const UP_VECTOR = new Vector3(0, 1, 0);
const SECONDS_PER_DAY = 30;
const SPHERE_RADIUS = 200;

class MainScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // set the space-sphere bounding box
        this.fog = new Fog(0xcccccc, 0, 350); // fog makes the background look cooler + asteroids fade away instead of disappearing

        const nebulaTexture = new TextureLoader().load(
            'src/components/textures/nebula.png'
        );
        const backgroundSphere = new SphereGeometry(SPHERE_RADIUS, 50, 20);
        const backgroundMat = new MeshToonMaterial({ map: nebulaTexture }); // toon material causes the weird shading
        const dayMat = new MeshToonMaterial({ map: nebulaTexture });
        const nightMat = new MeshBasicMaterial({ map: nebulaTexture });

        const backgroundMesh = new Mesh(backgroundSphere, backgroundMat);
        backgroundSphere.scale(-1, 1, 1);
        this.add(backgroundMesh);

        // TODO: add slow auto rotation?
        this.planet = new Planet('Planet1');

        this.lights = new BasicLights(backgroundMesh, dayMat, nightMat);

        this.asteroids = new AsteroidManager(100, 200);

        this.add(this.lights, this.planet, this.asteroids);
    }

    changePlanet(planetName) {
        this.remove(this.planet);
        this.planet = new Planet(planetName);
        this.add(this.planet);
    }

    plantBush(pos, face) {
        const bush = new Bush(this.planet);
        bush.init(this.planet.name);
        bush.position.copy(pos);
        bush.quaternion.setFromUnitVectors(UP_VECTOR, face.normal);
        this.planet.add(bush);
    }

    growBush(bush) {
        bush.animatedGrow(this.planet.name);
    }

    getPlanet() {
        return this.planet;
    }

    changeSunlightColor(newColor) {
        this.lights.changeLightColor(newColor);
    }

    update(timestamp) {
        // updates 60 times a second

        this.asteroids.update(timestamp);
        this.lights.update(timestamp);
    }
}

export default MainScene;
export { SECONDS_PER_DAY };
