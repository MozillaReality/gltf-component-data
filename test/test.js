const path = require("path");
const fs = require("fs-extra");
const assert = require('assert');
const addComponentData = require("../src/index");
const util = require('util');
const { execFile } = require('child_process');

const gltfPath = path.join(__dirname, "test.gltf");
const componentsPath = path.join(__dirname, "components.json");

describe('gltf-component-data', () => {
  const binPath = path.join(__dirname, "..", "bin", "gltf-component-data");
  const tmpDir = path.join(__dirname, "tmp");
  const tempGltfPath = path.join(tmpDir, "test.gltf");
  let childProcess;

  function execAsync(command, args) {
    return new Promise((resolve, reject) => {
      childProcess = execFile(command, args, (err, stdout, stderr) => {
        if (err) {
          console.error(stderr);
          console.log(stdout);
          reject(err);
        }
        childProcess = null;
        resolve();
      });
    });
  }

  beforeEach(async () => {
    await fs.remove(tmpDir);
    await fs.copy(gltfPath, tempGltfPath);
  });

  it('should overwrite the existing gltf file when the output dir is not specified', async () => {
    await execAsync(binPath, [tempGltfPath, componentsPath]);
  });

  it('should save to a new gltf file when the -o parameter is specified', async () => {
    const outputGltfPath = path.join(tmpDir, "out.gltf");
    await execAsync(binPath, [tempGltfPath, componentsPath, "-o", outputGltfPath]);
    await fs.stat(outputGltfPath);
  });

  afterEach(async () => {
    await fs.remove(tmpDir);

    if (childProcess) {
      childProcess.kill();
    }
  })
});

describe('addComponentData', () => {

  it('should add components to scenes and nodes', async () => {
    const gltf = await fs.readJson(gltfPath);
    const components = await fs.readJson(componentsPath);

    const modifiedGltf = addComponentData(gltf, components);

    assert.equal(modifiedGltf.scenes[0].extras.components.testComponent.testProperty, "testData1");
    assert.equal(modifiedGltf.nodes[0].extras.components.testComponent.testProperty, "testData2");
  });
});


