const path = require("path");
const fs = require("fs-extra");

function addComponentData(gltf, components) {
  const { scenes, nodes } = components;

  if (scenes) {
    gltf.scenes = mergeIntoExtras(gltf.scenes, scenes);
  }

  if (nodes) {
    gltf.nodes = mergeIntoExtras(gltf.nodes, nodes);
  }

  return gltf;
}

function mergeIntoExtras(nodes, componentMap) {
  for (const nodeName in componentMap) {
    if (componentMap.hasOwnProperty(nodeName)) {
      const components = componentMap[nodeName];

      for (const node of nodes) {
        if (node.name && node.name === nodeName) {
          node.extras = Object.assign(node.extras || {}, {
            components
          });
        }
      }
    }
  }

  return nodes;
}

module.exports = addComponentData;
