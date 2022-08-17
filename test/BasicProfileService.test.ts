import { BasicProfileService } from '../src/services/BasicProfileService.js';
import { DIDService } from '../src/services/DIDService.js';
import { ceramicApi } from './DIDService.test';
import { mnemonicToSeed } from '@oneverse/utils';

// 本地
const mnemonic =
  'check citizen casino bargain stamp noise quarter chunk toe dish raise debris execute sleep recipe buddy erase laundry record lobster repeat park bird phone';

const authSecret: Uint8Array = mnemonicToSeed(mnemonic, { password: '' });

const service = await DIDService.newInstance({
  authSecret,
  ceramicApi,
});

async function test() {
  const basicProfileService = new BasicProfileService(service);

  const result = await basicProfileService.getProfile();
  console.log(result);
}

test().catch(console.log);
