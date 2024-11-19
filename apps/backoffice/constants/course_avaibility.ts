export const CourseAvailabilityType = {
  All: 'All',
  unit_pelaksana_region: 'Unit Pelaksana (Region)',
  unit_layanan: 'Unit Layanan',
  unit_pln: 'Unit PLN',
  pekerjaan: 'Pekerjaan',
  penempatan: 'Penempatan',
}

export const CourseAvailabilityToEmployee = {
  All: 'All',
  unit_pelaksana_region: 'unit_pln',
  unit_layanan: 'unit',
  unit_pln: 'unit_pln',
  pekerjaan: 'job',
  penempatan: 'position',
}

export const CourseAvailabilityArray = [
  {
    id: 'All',
    value: 'All',
    employee_key: 'All',
  },
  {
    id: 'unit_pelaksana_region',
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
    id: 'penempatan',
    value: 'Penempatan',
    employee_key: 'position',
  }
]

