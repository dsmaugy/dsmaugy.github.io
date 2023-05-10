import { Mesh, BoxGeometry, MeshBasicMaterial, Vector3 } from 'three';

class Button extends Mesh {
    // static screenWidth = 0;
    // static screenHeight = 0;
    
    constructor( camX, camY, useColor) {
        
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({ color: useColor });
        
        super(geometry, material);
        this.name = 'Button';
        this.position.set(0, 0, 2);
    }

    // static Dimensions(camX, camY) {
    //     screenWidth = camX;
    //     screenHeight = camY;
    // }
}

export default Button;
