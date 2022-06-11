import { DIDService } from '../src/services/DIDService.js';
import { JOSEService, fromDagJWS } from '../src/services/JOSEService.js';
import { authSecret } from './DIDService.test.js';

async function createJWS() {
  const service = await DIDService.newInstance({ authSecret });

  const joseService = new JOSEService(service);

  const jws = await joseService.createJWS({
    name: 'Sean',
    age: 18,
  });
  console.log(jws, fromDagJWS(jws));
}

// createJWS().catch(console.log);

let jwe: any;

async function createJWE() {
  const service = await DIDService.newInstance({ authSecret });

  const joseService = new JOSEService(service);

  jwe = await joseService.createJWE(
    {
      name: 'Sean',
    },
    [service.did.id || ''],
  );
  console.log(jwe, JSON.stringify(jwe));
}

// createJWE().catch(console.log);

async function decryptJWE() {
  const service = await DIDService.newInstance({ authSecret });
  // await service.login(account2.did, account2.mnemonic);
  const joseService = new JOSEService(service);

  const data = await joseService.decryptJWE(jwe);
  console.log(data);
}

// decryptJWE().catch(console.log);

createJWE().then(decryptJWE).catch(console.log);
