import { ThreeIdProvider } from '@3id/did-provider';
// @ts-ignore
import { createVerifiableCredentialJwt } from 'did-jwt-vc';
// @ts-ignore
import { JwtCredentialPayload, JwtCredentialSubject, W3CCredential } from 'did-jwt-vc/lib/types';

import { DIDService } from './DIDService.js';
import { toUTCString } from '../utils/DateUtil.js';

/**
 * 声明类型
 */
export const CredentialType = {
  vc: 'VerifiableCredential',
  profile: 'Profile',
};

export type CreateVCOptions = {
  subjectDID?: string;
  /**
   * 可验证声明类型
   */
  type: string | string[];
  /**
   * 可验证证明主题
   */
  credentialSubject: JwtCredentialSubject;
  /**
   * 凭证可撤销
   * 未实现
   */
  credentialRevocable?: boolean;

  /**
   * 发行日期
   * 表示凭证的生效时间，如果不填写，则默认为当前时间
   */
  issuanceDate?: Date;
};

/**
 * VC 服务
 * 创建和验证可验证声明VC和可验证表达式VP
 *
 */
export class VCService {
  private readonly threeId?: ThreeIdProvider;

  constructor(private readonly didService: DIDService) {
    this.threeId = this.didService.threeId;
  }

  /**
   * 创建一个可验证声明 Creating a Verifiable Credential
   * @param subjectDID Subject DID
   * @param type
   * @param credentialSubject 可验证声明主题
   * @param issuanceDate
   */
  async createVC({
    subjectDID,
    type,
    credentialSubject,
    issuanceDate = new Date(),
  }: CreateVCOptions): Promise<W3CCredential> {
    if (!this.didService.authenticated || !this.threeId) {
      throw new Error('DID is not authenticated');
    }
    const payload: JwtCredentialPayload = {
      vc: {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type,
        credentialSubject,
      },
      nbf: parseInt(`${Date.now() / 1000}`),
      sub: subjectDID,
    };

    const keyring = this.threeId.keychain.keyring;

    const signer = keyring.getSigner();

    const jwt = await createVerifiableCredentialJwt(payload, {
      did: this.threeId.id,
      signer,
    });

    return {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      // id: '',
      type: Array.isArray(payload.vc.type) ? payload.vc.type : [payload.vc.type],
      issuer: {
        id: this.threeId.id,
      },
      issuanceDate: toUTCString(issuanceDate),
      expirationDate: '',
      credentialSubject: payload,
      credentialStatus: undefined,
      evidence: undefined,
      termsOfUse: undefined,
      proof: {
        type: 'JwtProof2020',
        jwt,
      },
    };
  }
}
