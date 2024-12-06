export const CourseAvailabilityType = {
  All: 'All',
  unit_region: 'Unit Pelaksana (Region)',
  unit_layanan: 'Unit Layanan',
  unit_pln: 'Unit PLN',
  pekerjaan: 'Pekerjaan',
  placement: 'Penempatan',
}

export const CourseAvailabilityToEmployee = {
  All: 'All',
  unit_pelaksana_region: 'unit_pln',
  unit_layanan: 'unit',
  unit_pln: 'unit_pln',
  pekerjaan: 'job',
  placement: 'placement',
}

export const CourseAvailabilityArray = [
  {
    id: 'All',
    value: 'All',
    employee_key: 'All',
  },
  {
    id: 'unit_region',
    value: 'Unit Pelaksana (Region)',
    employee_key: 'unit_pln',
  },
  {
    id: 'unit_layanan',
    value: 'Unit Layanan',
    employee_key: 'unit',
  },
  {
    id: 'unit_pln',
    value: 'Unit PLN',
    employee_key: 'unit_pln',
  },
  {
    id: 'pekerjaan',
    value: 'Pekerjaan',
    employee_key: 'job',
  },
  {
    id: 'placement',
    value: 'Penempatan',
    employee_key: 'placement',
  }
]

