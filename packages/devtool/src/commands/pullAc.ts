import { readPermissions, readRoles } from '@directus/sdk';
import { Client } from '../Client.js';
import { Config } from '../Config.js';
import path from 'path';
import fs from 'fs-extra';

export async function pullAc(client: Client, config: Config) {
  const { roles, permissions } = await readRemoteRolesAndPermissions(client);

  const baseDir = path.join(config.srcDir, 'ac');
  await fs.remove(baseDir);
  await fs.ensureDir(baseDir);

  await fs.writeFile(path.join(baseDir, 'roles.json'), JSON.stringify(roles, null, 2));
  await fs.writeFile(path.join(baseDir, 'permissions.json'), JSON.stringify(permissions, null, 2));
}

async function readRemoteRolesAndPermissions(client: Client) {
  const roles = await client.request(readRoles());
  const permissions = await client.request(readPermissions());

  const adminRole = roles.find((role) => role.name === 'Administrator');

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    roles: roles.filter((role: any) => {
      delete role.users;
      return role.name !== 'Administrator';
    }),
    permissions: permissions.filter((permission) => {
      return permission.role !== adminRole?.id;
    }),
  };
}
