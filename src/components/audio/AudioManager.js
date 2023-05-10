import { Audio, AudioListener, AudioLoader } from "three";
import { getRandomNumber } from "../../util";


class AudioManager extends AudioListener {
    constructor() {
        super();

        this.audioLoader = new AudioLoader();
        this.audioLoader.setPath("src/components/audio/files/");
        this.playBackgroundAmbiance();
    }

    playBackgroundAmbiance() {
        const backgroundAudio = new Audio(this);
        this.audioLoader.load('river_flute.mp3', function(buffer) {
            backgroundAudio.setBuffer(buffer);
            backgroundAudio.setLoop(true);
            backgroundAudio.setVolume(0.5);
            backgroundAudio.play();
        });
    }

    // TODO: audio growing effect here? meteors? random nature/climate sounds?
    playSoundEffect(audioName, volume=0.5) {
        const soundEffect = new Audio(this);
        this.audioLoader.load(audioName, function(buffer) {
            soundEffect.setBuffer(buffer);
            soundEffect.setLoop(false);
            soundEffect.setVolume(volume);
            soundEffect.play();
        });
    }

    playRandomChime() {
        const r = Math.floor(getRandomNumber(1, 6));
        this.playSoundEffect("chime_" + r + ".wav");
    }

    playPlanetChime(num) {
        this.playSoundEffect("planet_chime_" + num + ".wav");
    }

}

export default AudioManager;


/*
Background Audio Attribution:
"River Flute" Kevin MacLeod (incompetech.com)
Licensed under Creative Commons: By Attribution 4.0 License
http://creativecommons.org/licenses/by/4.0/
*/
