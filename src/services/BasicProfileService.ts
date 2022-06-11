import { DIDService } from './DIDService';
import { DIDDataStore } from '@glazed/did-datastore';
import { aliases as idxAliases, BasicProfile } from '@3id/model';
import { DataKey } from './DataKey.js';

/**
 * DID个人信息服务
 */
export class BasicProfileService {
  dataStore: DIDDataStore;

  constructor(private readonly didService: DIDService) {
    if (!this.didService.authenticated) {
      throw new Error('did 未授权');
    }
    this.dataStore = new DIDDataStore({
      ceramic: didService.ceramic,
      model: idxAliases,
    });
  }

  /**
   * 更新用户信息
   * @param basicProfile 用户信息
   */
  async updateProfile(basicProfile: BasicProfile) {
    const current = await this.getProfile();
    return await this.dataStore.set(DataKey.basicProfile, {
      ...current,
      ...basicProfile,
    });
  }

  /**
   * 获取用户信息
   */
  async getProfile() {
    return await this.dataStore.get(DataKey.basicProfile);
  }
}
