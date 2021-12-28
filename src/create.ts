import commander from 'commander';
import prompts from 'prompts';
import { Spinner } from 'cli-spinner';
import jetpack from 'fs-jetpack';
import adze from 'adze';
import { coerceList } from '~/util';

// rig create <path> (example /resources/{id})
//  - parses the path to know which file to create interfaces in
//  - options:
//    + --description, -d "Description of the endpoint."
//    + --get, -G (GET method)
//    + --post, -P (POST method)
//    + --put, -T (PUT method)
//    + --delete, -D (DELETE method)

/**
 * Resource: `/api/order/cancel
 *
 * Type: Request
 *
 * Method: DELETE
 *
 * Success Code: `202`
 */

/**
 * Generates interfaces that correspond to API's.
 */
export default function main() {
  const create = new commander.Command('create');
  create.option('-d, --description <message>', 'The description of this API endpoint.');
  create.option(
    '-G, --get [codes]',
    'Specifies that this API endpoint supports GET requests and responds with the provides codes.',
    coerceList
  );
  create.option('-P, --post [codes]', 'The description of this API interface.', coerceList);
  create.option('-T, --put [codes]', 'The description of this API interface.', coerceList);
  create.option('-D, --delete [codes]', 'The description of this API interface.', coerceList);
  create.option(
    '-e, --error <codes>',
    'Declares the HTTP codes that could be returned for an error response.',
    coerceList
  );

  // create.action(async () => {
  //   try {
  //     const { location, basePath } = await prompts(
  //       [
  //         {
  //           type: 'text',
  //           name: 'location',
  //           message: 'Where would you like put your generated interfaces?',
  //         },
  //         {
  //           type: 'text',
  //           name: 'basePath',
  //           message: 'What is the base path for your REST endpoints (ie. https://myapi.com/api)?',
  //         },
  //       ],
  //       {
  //         onCancel(prompt) {
  //           throw new Error('User cancelled the prompt. Aborting initialization.');
  //         },
  //       }
  //     );

  //     const spinner = new Spinner('Processing... %s');
  //     spinner.start();
  //     const config = { location, basePath };
  //     jetpack.write('./.rig.json', config);
  //     spinner.stop(true);

  //     adze({ useEmoji: true }).log('Successfully created the rig configuration.');
  //   } catch (e) {
  //     adze({ useEmoji: true }).error('An error occurred: ', e);
  //   }
  // });

  return create;
}
