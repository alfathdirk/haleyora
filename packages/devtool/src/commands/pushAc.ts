import {
  createPermission,
  createRole,
  readPermissions,
  readRoles,
  updatePermission,
  updateRole,
} from '@directus/sdk';
import { Client } from '../Client.js';
import { Config } from '../Config.js';
import path from 'path';
import fs from 'fs-extra';
import { deepEqual } from '../utils/deepEqual.js';

interface Role {
  id: string;
}

interface Permission {
  id: number;
}

export async function pushAc(client: Client, config: Config) {
  const baseDir = path.join(config.srcDir, 'ac');
  const roles = await readLocalRoles(baseDir);
  const permissions = await readLocalPermissions(baseDir);

  await syncRoles(roles, client);
  await syncPermissions(permissions, client);
}

async function syncPermissions(permissions: Permission[], client: Client) {
  const remotePermissions = await client.request(readPermissions());

  for (const permission of permissions) {
    const remotePermission = remotePermissions.find((remotePermission) => remotePermission.id === permission.id);
    if (!remotePermission) {
      await client.request(createPermission(permission));
      continue;
    }

    const eq = deepEqual(permission, remotePermission);
    if (eq) {
      continue;
    }

    await client.request(updatePermission(permission.id, permission));
  }
}

async function syncRoles(roles: Role[], client: Client) {
  const remoteRoles = await client.request(readRoles());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  remoteRoles.forEach((remoteRole: any) => {
    delete remoteRole.users;
  });

  for (const role of roles) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const remoteRole: any = remoteRoles.find((remoteRole) => remoteRole.id === role.id);
    if (!remoteRole) {
      await client.request(createRole(role));
      continue;
    }

    const eq = deepEqual(role, remoteRole);
    if (eq) {
      continue;
    }

    await client.request(updateRole(role.id, role));
  }
}

async function readLocalRoles(baseDir: string) {
  const roles = await readJson(path.join(baseDir, 'roles.json'));
  return roles;
}

async function readLocalPermissions(baseDir: string) {
  const permissions = await readJson(path.join(baseDir, 'permissions.json'));
  return permissions;
}

async function readJson(filePath: string) {
  const content = await fs.readFile(filePath, 'utf8');
  return JSON.parse(content);
}
