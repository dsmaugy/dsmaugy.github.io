import * as THREE from 'three';
import {
    getLeafMat,
    getLeafGeometry,
    getBranchMat,
    getBranchGeometry,
} from './bushUtils';

class Branch extends THREE.Mesh {
    constructor(props) {
        super();
        this.name = 'branch';
        this.currComplexity = 0;

        const { r1, r2, planet } = props;
        this.length = planet === 'Planet3' ? 0.9 : 0.7;

        this.geometry = getBranchGeometry(planet, r1, r2, this.length);
        this.material = getBranchMat(planet);
    }
}

class Leaves extends THREE.Mesh {
    constructor(props) {
        // Call parent Group() constructor
        super();

        const size = props && props.size !== undefined ? props.size : 0.1;
        const complexity =
            props && props.complexity !== undefined ? props.complexity : 1;
        const planet =
            props && props.planet !== undefined ? props.planet : 'Planet1';

        this.scale.multiplyScalar((size * complexity + 0.5) / 2);

        if (planet !== 'Planet2') this.scale.y = Math.random() * 0.5 + 0.2;
        this.rotation.z = (Math.random() - 1) / 2;
        this.rotation.x = (Math.random() - 1) / 5;

        this.name = 'leaves';
        this.geometry = getLeafGeometry(planet);
        this.material = getLeafMat(planet);
    }
}

class Bush extends THREE.Group {
    constructor(parent) {
        super();
        this.maxComplexity = 4;
        this.name = 'bush';
        this.segments = [];

        const bush = new THREE.Group();
        const seed = new Leaves();
        bush.add(seed);
        this.add(bush);
    }

    init(planet) {
        // add new segment leaf group to current tree
        const group = new THREE.Group();
        const segment = new Branch({ r1: 2 / 40, r2: 4 / 40, planet: planet });

        segment.currComplexity = this.maxComplexity;
        this.segments.push(segment);

        group.position.copy(this.position);
        group.add(segment);
        this.add(group);

        const dir = this.up;
        segment.dir = dir;
        segment.rz = 0;
        segment.ry = 0;
        segment.position.y += segment.length / 2;

        dir.multiplyScalar(segment.length);

        // apply rotation
        switch (planet) {
            case 'Planet3':
            case 'Planet1':
                const leaves = new Leaves({
                    size: 0.5,
                    complexity: segment.currComplexity,
                    planet: planet,
                });
                leaves.position.copy(segment.position);
                leaves.position.y += segment.length / 2;
                group.add(leaves);
                break;
            case 'Planet2':
                break;
        }
    }

    animatedGrow(planet) {
        this.currComplexity--;
        if (this.currComplexity == 0) {
            return;
        }

        const newSegments = [];
        this.segments.forEach((parentSegment) => {
            // get parameters for each parent
            const position = new THREE.Vector3().addVectors(
                parentSegment.dir,
                parentSegment.position
            );
            position.subScalar(parentSegment.length / 4);

            const numChildrenBranches = Math.floor(
                Math.random() * parentSegment.currComplexity * 2
            );
            // if parent has no child branches
            for (let i = 0; i < numChildrenBranches; i++) {
                const newComplexity = parentSegment.currComplexity - 1;

                // get the parent rotation
                const rz =
                    planet !== 'Planet2'
                        ? (Math.random() * Math.PI) / 2
                        : Math.random() * Math.PI + Math.PI;
                const ry =
                    parentSegment.ry +
                    ((Math.PI * 2) / numChildrenBranches) * i +
                    (Math.random() * Math.PI) / 6 -
                    Math.PI / 3;

                const group = new THREE.Group();
                this.add(group);

                // create child segment
                const segment = new Branch({
                    r1: 2 / 50 / Math.log(newComplexity),
                    r2: 4 / 50 / Math.log(newComplexity),
                    planet: planet,
                });
                segment.position.y += segment.length / 2;
                group.position.copy(position);
                group.add(segment);

                // get new direction and update child segment with new direction
                const dir = this.up;
                group.rotation.z = rz;
                dir.applyAxisAngle(new THREE.Vector3(0, 0, 1), rz);
                group.rotation.y = ry;
                dir.applyAxisAngle(new THREE.Vector3(0, 1, 0), ry);
                dir.multiplyScalar(segment.length);
                if (planet === 'Planet2') dir.addScalar(segment.length / 2);
                segment.dir = dir;
                segment.ry = ry;
                segment.rz = rz;

                // update complexity
                segment.currComplexity = newComplexity;
                newSegments.push(segment);

                // conditionally add leaves
                const leaves = new Leaves({
                    size: 0.5,
                    complexity: newComplexity,
                    planet: planet,
                });
                leaves.position.copy(segment.position);
                leaves.position.y += segment.length / 2;
                group.add(leaves);
            }
        });

        // update segments;
        this.segments = newSegments;
    }
}

export default Bush;
