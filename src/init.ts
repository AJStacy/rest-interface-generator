import commander from 'commander';
import prompts from 'prompts';
import { Spinner } from 'cli-spinner';
import jetpack from 'fs-jetpack';
import adze from 'adze';

// rig init
// - records location for interfaces to write to
// - records basepath (for documentation purposes)

/**
 * Initializes the rig project. A project must be initialized at the root of your repository and a
 * package.json must be present.
 */
export default function main() {
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

      const config = { location, basePath };

      if (jetpack.exists('./package.json')) {
        const spinner = new Spinner('Processing... %s');
        spinner.start();
        const pkg = jetpack.read('./package.json', 'json');
        pkg.rig = config;
        jetpack.write('./package.json', { overwrite: true });
        spinner.stop(true);
      } else {
        throw new Error(
          'Cannot find package.json. Please initialize your project from the same location of your package.json.'
        );
      }

      adze({ useEmoji: true }).log('Successfully created the rig configuration.');
    } catch (e) {
      adze({ useEmoji: true }).error('An error occurred: ', e);
    }
  });

  return init;
}
