/* eslint-disable no-underscore-dangle */
import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/mui';
import { RJSFSchema } from '@rjsf/utils';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ExperimentsServices } from '../../services/experiments.services';
import { IExperimentConfig } from '../../models';

const schema: RJSFSchema = {
  title: 'Experiment',
  type: 'object',
  required: ['name', 'isEnabled', 'defaultValue', 'ios', 'android'],
  properties: {
    name: { type: 'string', title: 'Name' },
    defaultValue: { type: 'number', title: 'defaultValue', default: 0 },
    isEnabled: { type: 'boolean', title: 'isEnabled', default: true },
    ios: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string', title: 'Name' },
      },
    },
    android: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string', title: 'Name' },
      },
    },
  },
};

const log = (type: any) => console.log.bind(console, type);

export function ExperimentDetail() {
  const { id } = useParams();
  const [experimentConfig, setExperimentConfig] = useState<Partial<IExperimentConfig>>({});
  const handleChange = (data: Partial<IExperimentConfig>) => {
    setExperimentConfig({
      ...data,
      _id: experimentConfig._id,
    });
  };
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const experiment = await ExperimentsServices.getById(id);
      setExperimentConfig(experiment);
    };
    fetchData();
  }, [id]);

  return (
    <Form
      schema={schema}
      validator={validator}
      formData={experimentConfig}
      onChange={(data) => handleChange(data.formData)}
      onSubmit={async () => {
        const experiment = await ExperimentsServices.updateById(
          experimentConfig as IExperimentConfig,
        );
        setExperimentConfig(experiment);
      }}
      onError={log('errors')}
    />
  );
}
