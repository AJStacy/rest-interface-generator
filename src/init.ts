import commander from 'commander';
import prompts from 'prompts';
import { Spinner } from 'cli-spinner';
import jetpack from 'fs-jetpack';
import adze from 'adze';

// rig init
// - records location for interfaces to write to
// - records basepath (for documentation purposes)

/**
 * Initializes the rig project.
 */
export default function makeInitCommand() {
  const init = new commander.Command('init');
  init.action(async () => {
    try {
      const { location, basePath } = await prompts(
        [
          {
            type: 'text',
            name: 'location',
            message: 'Where would you like put your generated interfaces?',
          },
          {
            type: 'text',
            name: 'basePath',
            message: 'What is the base path for your REST endpoints (ie. https://myapi.com/api)?',
          },
        ],
        {
          onCancel(prompt) {
            throw new Error('User cancelled the prompt. Aborting initialization.');
          },
        }
      );

      const spinner = new Spinner('Processing... %s');
      spinner.start();
      const config = { location, basePath };
      jetpack.write('./.rig.json', config);
      spinner.stop(true);

      adze({ useEmoji: true }).log('Successfully created the rig configuration.');
    } catch (e) {
      adze({ useEmoji: true }).error('An error occurred: ', e);
    }
  });

  return init;
}
