import { EndpointExtensionContext } from '@directus/extensions';

export const useAuthService = async(ctx: EndpointExtensionContext) => {
  const { services, getSchema } = ctx;
  const { AuthenticationService } = services;
  return new AuthenticationService({
    schema: await getSchema(),
  });
};
