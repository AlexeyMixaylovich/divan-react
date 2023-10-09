export interface IExperimentConfig {
  _id: string;
  isEnabled: boolean;
  ios: {
    name: string
  },
  android: {
    name: string
  },
  name: string,
  defaultValue: number,
  created:string,
  updated: string,
}
