import sumBy from 'lodash/sumBy';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
import axios from '../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// _mock_
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../components/table';
// sections
import SalesAnalytic from '../../sections/@dashboard/_sales/SalesAnalytic';
import { SalesTableRow, SalesTableToolbar } from '../../sections/@dashboard/_sales/list';
import { CompanyTableRow } from '../../sections/@dashboard/_company/list';


const TABLE_HEAD = [
  { id: 'name', label: 'Nama', align: 'left' },
  { id: 'formalName', label: 'Nama formal', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'telp', label: 'Telepon', align: 'left' },
  { id: 'city', label: 'Kota', align: 'left' },
  { id: 'address', label: 'Alamat', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function CompanyList() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });

  const [tableData, setTableData] = useState([]);
  const denseHeight = dense ? 56 : 76;

  useEffect(() => {
    const fecthCompany = () => {
        axios
          .get('/company?length=10000000', {
            headers: {
              accept: 'application/json',
            },
          })
          .then((res) => {
            if (res.data.Success) {
              setTableData(res.data.Data)
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }

    fecthCompany()
  }, [])

    const handleDeleteRow = (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setSelected([]);
      setTableData(deleteRow);
    };

   const handleDeleteRows = (selected) => {
     const deleteRows = tableData.filter((row) => !selected.includes(row.id));
     setSelected([]);
     setTableData(deleteRows);
   };

   const handleEditRow = (id) => {
     navigate(PATH_DASHBOARD.invoice.edit(id));
   };

   const handleViewRow = (id) => {
     navigate(PATH_DASHBOARD.invoice.view(id));
   };

  useEffect(() => {
    // console.log(tableData)
  }, [tableData])

  return (
    <Page title="Company: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Company List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Company', href: PATH_DASHBOARD.company.root },
            { name: 'List' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.sales.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New Company
            </Button>
          }
        />

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {tableData.map((row) => (
                    <CompanyTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onViewRow={() => handleViewRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={tableData.length === 0} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          {/* <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box> */}
        </Card>
      </Container>
    </Page>
  );
}
