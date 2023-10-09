/* eslint-disable no-underscore-dangle */
import {

  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';

import { ReactNode, useEffect, useState } from 'react';

import { get } from 'lodash';

const getElement = (d: unknown): ReactNode => {
  if (typeof d === 'string') { return d; }
  if (typeof d === 'boolean') { return d ? 'вкл' : 'выкл'; }
  if (typeof d === 'number') { return String(d); }
  return d as ReactNode;
};

export function CustomTable<TData extends { _id:string }>(props: {
  columns: string[],
  customColumns: {
    [key: string]: JSX.Element
  }
  getData: () => Promise<TData[]>
  rowClick: (data: TData) => void
}) {
  const {
    columns, customColumns, getData, rowClick,
  } = props;

  const [experimentConfigs, setExperimentConfigs] = useState<TData[]>([]);
  const generateHead = () => (
    <TableHead>
      <TableRow>
        {columns.map((name) => (
          <TableCell>{name}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  const generateRow = (experimentConfig: TData) => (
    <TableRow
      sx={{ '& > *': { borderBottom: 'unset' } }}
      key={experimentConfig._id}
      onClick={() => { rowClick(experimentConfig); }}
    >
      {columns.map((path) => {
        const data = get(experimentConfig, path) ?? get(customColumns, path);

        const el = getElement(data);
        return (
          <TableCell
            key={`${path}-${experimentConfig._id}`}
          >
            {el}
          </TableCell>
        );
      })}

    </TableRow>
  );
  const generateBody = () => (
    <TableBody>
      {experimentConfigs.map((experimentConfig) => generateRow(experimentConfig))}
    </TableBody>
  );

  useEffect(() => {
    const fetchData = async () => {
      const list = await getData();
      setExperimentConfigs(list);
    };
    fetchData();
  }, []);
  return (

    <TableContainer component={Paper}>
      <Table
        size="small"
        aria-label="a dense table"
      >
        {generateHead()}
        {generateBody()}
      </Table>
    </TableContainer>

  );
}
