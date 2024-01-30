import { describe, it, expect } from 'vitest';
import { Devtool } from './Devtool.js';

describe('Devtool', () => {
  describe('constructor', () => {
    it('create new devtool', () => {
      const devtool = new Devtool({
        adminEmail: 'admin@example.com',
        adminPassword: 'xxx',
      });
      expect(devtool.adminEmail).toStrictEqual('admin@example.com');
      expect(devtool.adminPassword).toStrictEqual('xxx');
      expect(devtool.baseUrl).toStrictEqual('http://localhost:8055');
      expect(devtool.dbDir).toStrictEqual('directus/database');
      expect(devtool.uploadDir).toStrictEqual('directus/uploads');
      expect(devtool.srcDir).toStrictEqual('directus/src');
    });
  });

  describe('#config()', () => {
    it('return config', () => {
      const devtool = createDevtool();
      expect(devtool).toMatchObject({
        adminEmail: 'admin@example.com',
        adminPassword: 'xxx',
        baseUrl: 'http://localhost:8055',
        dbDir: 'directus/database',
        uploadDir: 'directus/uploads',
        srcDir: 'directus/src',
      });
    });
  });
});

function createDevtool() {
  return new Devtool({
    adminEmail: 'admin@example.com',
    adminPassword: 'xxx',
  });
}
