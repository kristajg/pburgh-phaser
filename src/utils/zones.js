import InteractiveZone from '../prefabs/InteractiveZone';

export const placeZonesFromObjectLayer = (scene, objects, player) => {
  objects.forEach(obj => {
    const { x, y, height, width, properties } = obj;

    // Create zone
    let zone = new InteractiveZone(scene, x, y, width, height, properties);
    scene.physics.world.enable(zone);

    // Add overlap function based on zone type
    let overlapFunction = zone.isInteractiveZone ? scene.overlapWithInteractive : scene.overlapWithSceneChange;
    scene.physics.add.overlap(player, zone, overlapFunction, null, scene);
  });
}
