import * as THREE from 'three';

const getJitteredColor = (color) => {
    return new THREE.Color(
        (color[0] + (Math.random() - 1) * 20) / 255,
        (color[1] + (Math.random() - 1) * 20) / 255,
        (color[2] + (Math.random() - 1) * 20) / 255
    );
};

const getLeafMat = (classification) => {
    switch (classification) {
        case 'Planet1':
        case 'Planet2':
            return new THREE.MeshPhongMaterial({
                color: getJitteredColor([226, 35, 213]),
                emissive: getJitteredColor([255, 128, 64]),
                specular: getJitteredColor([255, 155, 255]),
                shininess: 10,
                transparent: 1,
                flatShading: true,
                opacity: 1,
            });
        case 'Planet3':
            return new THREE.MeshPhongMaterial({
                color: getJitteredColor([230, 150, 50]),
                emissive: getJitteredColor([220, 55, 45]),
                specular: getJitteredColor([240, 220, 150]),
                shininess: 10,
                transparent: 1,
                flatShading: true,
                opacity: 1,
            });
        default:
            return undefined;
    }
};

const getBranchMat = (classification) => {
    switch (classification) {
        case 'Planet1':
            return new THREE.MeshPhongMaterial({
                color: getJitteredColor([71, 43, 37]),
                emissive: getJitteredColor([148, 66, 61]),
                specular: getJitteredColor([237, 105, 97]),
                shininess: 10,
                transparent: 1,
                flatShading: true,
                opacity: 1,
            });
        case 'Planet2':
            return new THREE.MeshPhongMaterial({
                color: getJitteredColor([100, 180, 100]),
                emissive: getJitteredColor([20, 100, 80]),
                specular: getJitteredColor([168, 200, 60]),
                shininess: 10,
                transparent: 1,
                flatShading: true,
                opacity: 1,
            });
        case 'Planet3':
            return new THREE.MeshPhongMaterial({
                color: getJitteredColor([60, 55, 40]),
                emissive: getJitteredColor([65, 45, 15]),
                specular: getJitteredColor([180, 170, 160]),
                shininess: 10,
                transparent: 1,
                flatShading: true,
                opacity: 1,
            });
        default:
            return undefined;
    }
};

const getLeafGeometry = (classification) => {
    switch (classification) {
        case 'Planet1':
            return new THREE.IcosahedronGeometry(
                Math.random() * 0.25 + 0.25,
                0
            );
        case 'Planet2':
            return new THREE.SphereGeometry(Math.random() * 0.2 + 0.2, 15, 15);
        case 'Planet3':
            return new THREE.TetrahedronGeometry((Math.random() + 0.6) * 0.6);
        default:
            return undefined;
    }
};

const getBranchGeometry = (classification, r1, r2, length) => {
    switch (classification) {
        case 'Planet1':
            return new THREE.CylinderGeometry(r1, r2, length, 8);
        case 'Planet2':
            return new THREE.IcosahedronGeometry(0.5, 0);
        case 'Planet3':
            return new THREE.CylinderGeometry(r1, r2, length, 8);
        default:
            return undefined;
    }
};

export { getLeafMat, getLeafGeometry, getBranchMat, getBranchGeometry };
