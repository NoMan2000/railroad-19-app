// @flow
export type ServerData = {
  title: string,
  division: string,
  project_owner: string,
  budget: number,
  status: string,
  created: string, // MM/DD/YYYY
  modified: string // MM/DD/YYYY
};
export type TotalData = {
  max: number,
  name: string
};

export type Totals = {
  title: TotalData,
  division: TotalData,
  project_owner: TotalData,
  budget: TotalData,
  status: TotalData,
  created: TotalData,
  modified: TotalData,
  id: TotalData
};

export type AnyValidNumber = {
  [key: string]: string | number
};

export type FirstPhase = {
  title: AnyValidNumber,
  division: AnyValidNumber,
  project_owner: AnyValidNumber,
  budget: AnyValidNumber,
  status: AnyValidNumber,
  created: AnyValidNumber,
  modified: AnyValidNumber,
  id: AnyValidNumber
};

export type ServerDataWithId = ServerData & {
  id: string
};
export type ServerDataWithShowModal = ServerDataWithId & {
  showModal: boolean
};
