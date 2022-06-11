import { DIDService } from '../src/services/DIDService.js';
import { CredentialType, VCService } from '../src/services/VCService.js';

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

const vc = {
  credentialSubject: {
    tes: 'fd',
    id: 'did:key:z6MkiHACiksCs7dxBCEsngcR2Uoe5KFigw1NjjaapYfvvYqw',
  },
  issuer: { id: 'did:key:z6MkiHACiksCs7dxBCEsngcR2Uoe5KFigw1NjjaapYfvvYqw' },
  type: ['VerifiableCredential', 'Profile'],
  evidence: undefined,
  credentialStatus: {
    type: 'EthrStatusRegistry2019',
    id: 'rinkeby:0x97fd27892cdcD035dAe1fe71235c636044B59348',
  },
  termsOfUse: undefined,
  '@context': ['https://www.w3.org/2018/credentials/v1'],
  issuanceDate: '2022-05-29T06:07:36.000Z',
  proof: {
    type: 'JwtProof2020',
    jwt: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiUHJvZmlsZSJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJ0ZXMiOiJmZCJ9LCJjcmVkZW50aWFsU3RhdHVzIjp7InR5cGUiOiJFdGhyU3RhdHVzUmVnaXN0cnkyMDE5IiwiaWQiOiJyaW5rZWJ5OjB4OTdmZDI3ODkyY2RjRDAzNWRBZTFmZTcxMjM1YzYzNjA0NEI1OTM0OCJ9fSwic3ViIjoiZGlkOmtleTp6Nk1raUhBQ2lrc0NzN2R4QkNFc25nY1IyVW9lNUtGaWd3MU5qamFhcFlmdnZZcXciLCJuYmYiOjE2NTM4MDQ0NTYsImlzcyI6ImRpZDprZXk6ejZNa2lIQUNpa3NDczdkeEJDRXNuZ2NSMlVvZTVLRmlndzFOamphYXBZZnZ2WXF3In0.VAIyWl6WF3Na9k_PP1OfexcMm1Bu21oG3isDKJa6OqFbUMco133jaZw5QY2HVGWbW5jNd3-6shzny1-rVYZcAA',
  },
};

const vc2 = {
  credentialSubject: {
    name: 'Sean',
    id: 'did:key:z6MkiHACiksCs7dxBCEsngcR2Uoe5KFigw1NjjaapYfvvYqw',
  },
  issuer: { id: 'did:key:z6Mkkeo2Dnf1YdHYsnAV9YsAJH3cRB4QHa6TcKmmxMMAEuP8' },
  type: ['VerifiableCredential', 'Profile'],
  evidence: undefined,
  credentialStatus: {
    type: 'EthrStatusRegistry2019',
    id: 'rinkeby:0x97fd27892cdcD035dAe1fe71235c636044B59348',
  },
  termsOfUse: undefined,
  '@context': ['https://www.w3.org/2018/credentials/v1'],
  issuanceDate: '2022-05-29T06:55:03.000Z',
  proof: {
    type: 'JwtProof2020',
    jwt: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiUHJvZmlsZSJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJuYW1lIjoiU2VhbiJ9LCJjcmVkZW50aWFsU3RhdHVzIjp7InR5cGUiOiJFdGhyU3RhdHVzUmVnaXN0cnkyMDE5IiwiaWQiOiJyaW5rZWJ5OjB4OTdmZDI3ODkyY2RjRDAzNWRBZTFmZTcxMjM1YzYzNjA0NEI1OTM0OCJ9fSwic3ViIjoiZGlkOmtleTp6Nk1raUhBQ2lrc0NzN2R4QkNFc25nY1IyVW9lNUtGaWd3MU5qamFhcFlmdnZZcXciLCJuYmYiOjE2NTM4MDczMDMsImlzcyI6ImRpZDprZXk6ejZNa2tlbzJEbmYxWWRIWXNuQVY5WXNBSkgzY1JCNFFIYTZUY0ttbXhNTUFFdVA4In0.61XX-K5U7gkNGdSv-OLc-x-7lWqrKN0veCFPZXNJgfnOVnhnmUXhWj_QNkzia5uAq9bz8q6uGoViG5yGFa-0BQ',
  },
};

const vc1 = {
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      name: 'Sean',
      age: 18,
    },
  },
  iss: 'did:3:kjzl6cwe1jw145psu2c1a3hl81a0705910euvjjziyw5k0mkvx6lmbd4yy8rd5d',
};

const service = new DIDService();

async function createVC() {
  await service.login(id, mnemonic);
  const vcService = new VCService(service);

  const vc = await vcService.createVC({
    subjectDID: account2.did,
    type: CredentialType.vc,
    credentialSubject: {
      name: 'Sean',
      age: 18,
    },
  });
  console.log(vc);
}

createVC().catch(console.log);
