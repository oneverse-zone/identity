import { DIDService } from '../src/services/DIDService.js';
import { mnemonicToSeed, randomMnemonic } from '@oneverse/utils';

// const mnemonic =
//   'arrest govern damp index ability speak sick caution hero tooth manual amazing trophy grant control flame inherit mother gate banana media digital nuclear advance';

const mnemonicRandom = randomMnemonic();
const password = '123';

export const authSecret: Uint8Array = mnemonicToSeed(mnemonicRandom, { password });
export const ceramicApi = 'http://192.168.7.14:7007';

async function login() {
  const didService = await DIDService.newInstance({
    authSecret,
    ceramicApi,
  });
  console.log(didService.authenticated);
  console.log(didService.did);
}

login().catch(console.log);
