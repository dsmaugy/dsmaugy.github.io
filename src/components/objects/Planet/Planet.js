import { Group, MeshPhongMaterial, TextureLoader } from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

class Planet extends Group {
    constructor(objName, size, overridenPlanetName) {
        // Call parent Group() constructor
        super();

        this.objLoader = new OBJLoader();
        this.mtlLoader = new MTLLoader();

        this.mtlLoader.setPath('src/components/SpacePack/OBJ/');
        this.objLoader.setPath('src/components/SpacePack/OBJ/');
        this.name = objName;
        this.model = null;
        this.size = size;
        this.overridenPlanetName = overridenPlanetName;

        this.mtlLoader.load(objName + '.mtl', (mtl) => {
            this.objLoader.setMaterials(mtl);
            this.loadPlanet(objName);
        });
    }

    loadPlanet(name) {
        this.objLoader.load(name + ".obj", (obj) => {
            this.add(obj);
            obj.name = 'internal_planet_group';
            this.model = obj.children[0];

            if (name === "Planet2") {
                this.model.scale.multiplyScalar(3);
            } else {
                this.model.scale.multiplyScalar(2);
            }

            if (this.size) {
                this.model.scale.multiplyScalar(this.size);
            }

            if (this.overridenPlanetName) {
                this.model.name = this.overridenPlanetName;
            }

            const texture = new TextureLoader().load("src/components/textures/planets/" + name + ".png");
            const planetMat = new MeshPhongMaterial({map: texture});
            this.model.material = planetMat;
        }); 
    }

}

export default Planet;
