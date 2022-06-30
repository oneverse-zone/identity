import { CreateJWEOptions, CreateJWSOptions, VerifyJWSOptions, VerifyJWSResult, DagJWS, DID } from 'dids';
// @ts-ignore
import { JWE } from 'did-jwt';

import { DIDService } from './DIDService.js';

/**
 * 转成jws为字符串形式
 * @param jws jws对象
 */
export function fromDagJWS(jws: DagJWS): string {
  if (jws.signatures.length > 1) {
    throw new Error('Cant convert to compact jws');
  }
  return `${jws.signatures[0].protected}.${jws.payload}.${jws.signatures[0].signature}`;
}

/**
 * json 签名和加密服务
 */
export class JOSEService {
  private readonly did?: DID;

  constructor(private readonly didService: DIDService) {
    this.did = didService.did;
  }

  /**
   * 创建一个JSON对象的签名
   * @param payload 待签名数据
   * @param options 签名选项
   */
  createJWS<T>(payload: T, options?: CreateJWSOptions): Promise<DagJWS> {
    if (!this.didService.authenticated || !this.did) {
      throw new Error('DID is not authenticated');
    }
    return this.did.createJWS(payload, options);
  }

  /**
   * 验证一个JSON签名数据。
   * 支持key did、3did
   * @param jws json签名数据
   * @param options 验签选项
   */
  async verifyJWS(jws: string | DagJWS, options?: VerifyJWSOptions): Promise<VerifyJWSResult> {
    const did = this.didService.didInstance();
    return await did.verifyJWS(jws, options);
  }

  /**
   * 创建一个JWE
   *
   * @param cleartext 明文
   * @param recipients 接收着数组,既接收方的DID数组
   * @param options
   */
  async createJWE(cleartext: Record<string, any>, recipients: Array<string>, options?: CreateJWEOptions): Promise<JWE> {
    const did = this.didService.didInstance();
    return did.createDagJWE(cleartext, recipients, options);
  }

  /**
   * 解密一个JWE
   * DID 必须登录才能执行
   * @param jwe JWE数据
   */
  async decryptJWE<T>(jwe: string | JWE): Promise<T> {
    if (!this.didService.authenticated || !this.did) {
      throw new Error('DID is not authenticated');
    }
    let data: any = jwe;
    if (typeof jwe === 'string') {
      data = JSON.parse(jwe);
    }
    return (await this.did.decryptDagJWE(data)) as T;
  }
}
