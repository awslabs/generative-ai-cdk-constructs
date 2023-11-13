import { generateDLCContainerImages } from './generate-dlc-container-images';
import { generateJumpStartModels } from './generate-jumpstart-models';

async function main() {
  await generateJumpStartModels();
  await generateDLCContainerImages();
}

main();
