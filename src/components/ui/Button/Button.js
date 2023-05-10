import { Mesh, BoxGeometry, MeshBasicMaterial } from 'three';

class Button extends Mesh {
    constructor() {
        // Call parent Group() constructor
        // super();
        
        // const loader = new GLTFLoader();
        
        const geometry = new BoxGeometry(1, 1, 1);
        const material = MeshBasicMaterial({
            color: 0x7F7F7F,
            transparent: true,
            opacity: 1.0
        })
        
        super(geometry, material);
        this.name = 'Button';
        

        // loader.load(MODEL, (gltf) => {
            // this.add(gltf.scene);
        // });
    }
}

export default Button;
