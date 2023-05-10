import { Group, MeshBasicMaterial, MeshToonMaterial } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

class Asteroid extends Group {
    constructor(objName, rotX, rotY, translationSpeed) {
        // Call parent Group() constructor
        super();

        this.objLoader = new OBJLoader();
        this.mtlLoader = new MTLLoader();

        this.mtlLoader.setPath("src/components/SpacePack/OBJ/");
        this.objLoader.setPath("src/components/SpacePack/OBJ/");
        this.name = 'asteroid_group';

        this.mtlLoader.load(objName + ".mtl", (mtl) => {
            this.objLoader.setMaterials(mtl);
            this.loadAsteroid(objName + ".obj");
        });

        this.rotX = rotX;
        this.rotY = rotY;
        this.trans = translationSpeed;
    }

    loadAsteroid(name) {
        this.objLoader.load(name, (obj) => {
            this.add(obj);
            obj.name = "internal_asteroid_group";
        });
    }
}

export default Asteroid;
