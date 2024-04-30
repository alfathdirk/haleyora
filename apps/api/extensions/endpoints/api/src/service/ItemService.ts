import { EndpointExtensionContext } from '@directus/extensions';

export const useItemService = async(ctx: EndpointExtensionContext, collection: string) => {
  const { services, getSchema } = ctx;
  const { ItemsService } = services;
  return new ItemsService(collection, {
    schema: await getSchema(),
    accountability: false,
  });
};
