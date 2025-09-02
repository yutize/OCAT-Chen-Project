import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table as BTable, Button } from 'react-bootstrap';
import { AssessmentService } from '../../services/AssessmentService';

const onClick = (data) => {
  console.log(`data`, data);
  AssessmentService.submitDelete(data);
};

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);
  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList());
    };
    fetchAssessments();
  }, []);
  const data = assessments;
  console.log(`front-end data`, data);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.group({
      id: `title`,
      columns: [
        {
          accessorKey: `id`,
          header: `ID Number`,
        },
        {
          accessorKey: `catName`,
          header: `Cat Name`,
        },
        {
          accessorKey: `catDateOfBirth`,
          header: `Cat Date of Birth`,
        },
        {
          accessorKey: `score`,
          header: `Score`,
        },
        {
          accessorKey: `riskLevel`,
          header: `Risk Level`,
        },
        {
          accessorKey: `instrumentType`,
          header: `Instrument Type`,
        },
        {
          accessorKey: `createdAt`,
          header: `Assessment Creation Date`,
        },
        {
          accessorKey: `updatedAt`,
          header: `Updated At`,
        },
      ],
      header: () => <span>OCAT Information System</span>,
    }),

  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return <div className="p-2">
    <BTable striped bordered hover responsive size="sm">
      <thead>
        {table.getHeaderGroups().map((headerGroup) =>
          <tr key={headerGroup.id} style={{ borderBottom: `2px solid #ccc` }}>
            {headerGroup.headers.map((header) =>
              <th key={header.id} style={{ padding: `8px`, textAlign: `left` }}>
                {header.isPlaceholder ?
                  null :
                    flexRender(header.column.columnDef.header, header.getContext())}
              </th>)}
          </tr>)}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) =>
          <tr key={row.id} style={{ borderBottom: `1px solid #ddd` }}>
            {row.getVisibleCells().map((cell) =>
              <td key={cell.id} style={{ padding: `8px` }}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>)}
            <Button
              type="button"
              class="btn btn-outline-danger"
              onClick={() => onClick(data[row.id])}
            >Delete Record</Button>
          </tr>)}
      </tbody>
    </BTable>
  </div>;
};
