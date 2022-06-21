import Phaser from 'phaser';

export default class InteractiveZone extends Phaser.GameObjects.Zone {
  constructor(scene, x, y, width, height, properties, name, type){
    super(scene, x, y, width, height, properties, name, type);

    this.scene = scene;
    this.x = x + (width / 2);
    this.y = y;
    this.height = height;
    this.width = width;
    this.properties = properties;
    this.name = name;
    this.type = type;

    // Set interactive zone
    const interactiveZoneIndex = properties.findIndex(p => {
      return p.name === 'interactive' && p.value;
    });
    this.isInteractiveZone = interactiveZoneIndex === 0;

    // Set scene change
    const sceneChangeProperty = properties.find(p => {
      return p.name === 'changeSceneTo';
    });
    this.sceneChangeName = sceneChangeProperty ? sceneChangeProperty.value : null;

    // Add zone to scene
    this.scene.add.existing(this);
  }

  update() {}
}