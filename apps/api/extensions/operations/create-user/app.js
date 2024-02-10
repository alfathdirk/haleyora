export default {
  id: 'roh-create-user',
  name: 'ROH: Create User',
  icon: 'box',
  description: 'ROH: Create User',
  overview: ({ role }) => [
    {
      label: 'Role',
      text: role,
    },
  ],
  options: [
    {
      field: 'role',
      name: 'Role',
      type: 'string',
      meta: {
        width: 'full',
        interface: 'input',
      },
    },
    {
      field: 'template',
      name: 'Template',
      type: 'json',
      meta: {
        width: 'full',
        interface: 'input-code',
        options: {
          language: 'json',
        },
      },
    },
  ],
};
