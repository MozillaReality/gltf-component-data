# gltf-component-data

Small library and command line utility for adding component data to a glTF file.

## Library Usage

```js
import fs from "fs";
import addComponentData from "gltf-component-data";

const gltf = JSON.parse(fs.readFileSync("mygltf.gltf"));

// Add component data mutates the gltf object
addComponentData(gltf, {
  {
    scenes: {
      Root Scene: {
        loop-animation: {
          clip: "idle_eyes"
        }
      }
    },
    nodes: {
      Head: {
        scale-audio-feedback: ""
      }
    }
  }
});
```

## CLI Usage

```
npm install -g gltf-component-data
```

```
Usage: gltf-component-data <gltfPath> <componentsPath> [options]

  Options:

    -V, --version    output the version number
    -o, --out <out>  The directory to output the modified glTF file. Defaults to the existing glTF path.
    -h, --help       output usage information
```

## Components JSON Format:

```json
{
  "scenes": {
    "Root Scene": {
      "loop-animation": {
        "clip": "idle_eyes"
      }
    }
  },
  "nodes": {
    "Head": {
      "scale-audio-feedback": ""
    }
  }
}
```
