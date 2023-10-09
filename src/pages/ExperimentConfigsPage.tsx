import { Button, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { CustomTable } from '../components/Table';
import { ExperimentsServices } from '../services/experiments.services';
import { IExperimentConfig } from '../models';

export function ExperimentConfigsPage() {
  const columns = [
    'name',
    'isEnabled',
    'defaultValue',
    'buttons',
    // 'android.name',
    // 'ios.name',
    // 'created',
    // 'updated',
  ];
  const nav = useNavigate();
  const getData = () => ExperimentsServices.getList();
  return (
    <>
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
      <CustomTable
        customColumns={{
          buttons: (
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>),
        }}
        columns={columns}
        getData={getData}
        // eslint-disable-next-line no-underscore-dangle
        rowClick={(experimentConfig: IExperimentConfig) => { nav(`/experiments/${experimentConfig._id}`); }}
      />
    </>
  );
}
