import { Fragment } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'

const Orders = ({rows}) => {
  return (
    <Fragment>
    <Typography>Orders</Typography>
    <Table size='small'>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Ship To</TableCell>
          <TableCell>Method</TableCell>
          <TableCell>Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </Fragment>
  )
}

export default Orders