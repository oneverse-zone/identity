import { DIDService } from '../src/services/DIDService.js';
import { mnemonicToSeed, randomMnemonic } from '../src/utils/mnemonic.js';

const mnemonic =
  'arrest govern damp index ability speak sick caution hero tooth manual amazing trophy grant control flame inherit mother gate banana media digital nuclear advance';
const password = '';

const mnemonicRandom = randomMnemonic();
// const password = '';

export const authSecret: Uint8Array = mnemonicToSeed(mnemonicRandom, password);

async function login() {
  const didService = await DIDService.newInstance({
    authSecret,
  });
  console.log(didService.authenticated);
}

login().catch(console.log);
