import { BasicProfileService } from '../src/services/BasicProfileService.js';
import { DIDService } from '../src/services/DIDService.js';

// 本地
const id =
  'did:3:kjzl6cwe1jw145psu2c1a3hl81a0705910euvjjziyw5k0mkvx6lmbd4yy8rd5d';
const mnemonic =
  'check citizen casino bargain stamp noise quarter chunk toe dish raise debris execute sleep recipe buddy erase laundry record lobster repeat park bird phone';

const account2 = {
  mnemonic:
    'undo chimney engage hurdle envelope suffer swarm world melody flavor parade clump game scrap property purse broom lava record similar velvet sleep dutch ocean',
  did: 'did:3:kjzl6cwe1jw149xfxjomprlt3y56db86jw58kuje6hclw01bu11p8mbc884rzx6',
};

const service = new DIDService();

async function test() {
  await service.login(id, mnemonic);
  const basicProfileService = new BasicProfileService(service);

  const result = await basicProfileService.getProfile();
  console.log(result);
}

test().catch(console.log);
