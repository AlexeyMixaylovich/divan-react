import axios from 'axios';
import { IExperimentConfig } from '../models';

export const EXPERIMENT_DOMAIN = 'http://localhost:9010';

export const ExperimentsServices = {
  async getList(): Promise<IExperimentConfig[]> {
    const url = `${EXPERIMENT_DOMAIN}/v1/experiment_config`;
    const { data } = await axios.get<{ items: IExperimentConfig[] }>(url);
    return data.items;
  },
  async getById(id:string): Promise<IExperimentConfig> {
    const url = `${EXPERIMENT_DOMAIN}/v1/experiment_config/${id}`;
    const { data } = await axios.get<{ item: IExperimentConfig }>(url);
    return data.item;
  },
  async updateById({ _id: id, ...body }: IExperimentConfig) {
    const url = `${EXPERIMENT_DOMAIN}/v1/experiment_config/${id}`;

    const { data } = await axios.patch<{ item: IExperimentConfig }>(url, body);
    return data.item;
  },

  async deleteById(id: string) {
    const url = `${EXPERIMENT_DOMAIN}/v1/experiment_config/${id}`;

    const { data } = await axios.delete<{ item: IExperimentConfig }>(url);
    return data.item;
  },
};
