/*
 * 助记词工具类
 */

import { randomBytes } from '@stablelib/random';
import { entropyToMnemonic } from '@ethersproject/hdnode';
import { toUtf8Bytes, UnicodeNormalizationForm } from '@ethersproject/strings';
import { pbkdf2 } from '@ethersproject/pbkdf2';
import { hexToBytes } from 'did-jwt';

/**
 * 随机生成一个助记词
 * @return 助记词
 */
export function randomMnemonic(): string {
  // 随机熵
  const entropy = randomBytes(32); // RN  不支持
  // 根据熵生成助记词
  return entropyToMnemonic(entropy);
}

/**
 * 助记词转换为秘钥种子
 * @param mnemonic 助记词
 * @param password 密码
 */
export function mnemonicToSeed(
  mnemonic: string,
  password?: string,
): Uint8Array {
  if (!password) {
    password = '';
  }

  const salt = toUtf8Bytes(
    'mnemonic' + password,
    UnicodeNormalizationForm.NFKD,
  );

  const seedHexStr = pbkdf2(
    toUtf8Bytes(mnemonic, UnicodeNormalizationForm.NFKD),
    salt,
    2048,
    32,
    'sha512',
  );
  return hexToBytes(seedHexStr);
}
