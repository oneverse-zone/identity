import { CeramicClient } from '@ceramicnetwork/http-client';
import { ThreeIdProvider } from '@3id/did-provider';
import { DID } from 'dids';
import { getResolver as get3IDResolver } from '@ceramicnetwork/3id-did-resolver';
import { getResolver as getKeyResolver } from 'key-did-resolver';
import { DIDOptions } from 'dids/lib/did';

export type DIDServiceOptions = {
  ceramicApi?: string;

  authId?: string;
  authSecret: Uint8Array;
};

/**
 * DID 基础服务实现
 */
export class DIDService {
  ceramic: CeramicClient;
  threeId: ThreeIdProvider;
  did: DID;

  private constructor(
    ceramic: CeramicClient,
    threeId: ThreeIdProvider,
    did: DID,
  ) {
    this.ceramic = ceramic;
    this.threeId = threeId;
    this.did = did;
  }

  /**
   * 创建一个DID服务
   * @param options 服务参数
   */
  static async newInstance({
    ceramicApi,
    authId = 'AuthId',
    authSecret,
  }: DIDServiceOptions): Promise<DIDService> {
    const ceramic = new CeramicClient(ceramicApi);
    const threeId = await ThreeIdProvider.create({
      getPermission: (req) => req.payload?.paths,
      // 一套私钥， 不会生成秘钥,不会存储在去中心化中, 需要记忆 DID 和 助记词
      // seed,
      // did: id,

      // 两套秘钥,会随机生成一个工作秘钥存储在 去中心化存储中,  只需要记忆 一个助记词 authSecret
      authId,
      authSecret,
      ceramic,
    });

    const did = new DID({
      provider: threeId.getDidProvider(),
      resolver: {
        ...get3IDResolver(ceramic), // 3id
        ...getKeyResolver(), // key did
      },
    });
    // Authenticate the DID using the 3ID provider
    await did.authenticate();
    ceramic.did = did;

    return new DIDService(ceramic, threeId, did);
  }

  /**
   * 是否已经授权
   */
  get authenticated(): boolean {
    return this.did.authenticated;
  }

  /**
   * 创建一个DID实例
   */
  didInstance({ resolver, ...options }: DIDOptions = {}): DID {
    return new DID({
      ...options,
      resolver: {
        ...resolver,
        ...get3IDResolver(this.ceramic),
        ...getKeyResolver(),
      },
    });
  }
}
