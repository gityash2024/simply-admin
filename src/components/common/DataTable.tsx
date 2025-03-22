import { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  IconButton,
  Typography,
  CircularProgress,
  Chip,
  Tooltip,
  Checkbox,
  LinearProgress,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

type Order = 'asc' | 'desc';

export interface Column<T> {
  id: string;
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
}

export interface Action<T> {
  icon?: React.ReactNode;
  label: string;
  onClick: (row: T) => void;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  tooltip?: string;
  disabled?: (row: T) => boolean;
  hidden?: (row: T) => boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  idField: keyof T;
  pagination?: {
    page: number;
    totalCount: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rowsPerPage: number) => void;
    rowsPerPageOptions?: number[];
  };
  loading?: boolean;
  actions?: Action<T>[];
  selectable?: boolean;
  onRowClick?: (row: T) => void;
  emptyStateMessage?: string;
  dense?: boolean;
  defaultSortBy?: string;
  defaultSortDirection?: 'asc' | 'desc';
  containerProps?: React.ComponentProps<typeof TableContainer>;
  handleSort?: (field: string, direction: 'asc' | 'desc') => void;
}

const DataTable = <T extends object>({
  columns,
  data,
  idField,
  pagination,
  loading = false,
  actions,
  selectable = false,
  onRowClick,
  emptyStateMessage = 'No data available',
  dense = false,
  defaultSortBy = '',
  defaultSortDirection = 'asc',
  containerProps,
  handleSort,
}: DataTableProps<T>) => {
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const [orderBy, setOrderBy] = useState<string>(defaultSortBy);
  const [order, setOrder] = useState<'asc' | 'desc'>(defaultSortDirection);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [activeRow, setActiveRow] = useState<T | null>(null);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(property);
    
    if (handleSort) {
      handleSort(property, newOrder);
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => String(n[idField]));
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (row: T) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const handleCheckboxClick = (event: React.MouseEvent<HTMLButtonElement>, id: T[keyof T]) => {
    event.stopPropagation();
    const stringId = String(id);
    const selectedIndex = selected.indexOf(stringId);
    let newSelected: (string | number)[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, stringId];
    } else {
      newSelected = selected.filter((item) => item !== stringId);
    }

    setSelected(newSelected);
  };

  const isSelected = (id: T[keyof T]) => selected.indexOf(String(id)) !== -1;

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, row: T) => {
    event.stopPropagation();
    setActionMenuAnchor(event.currentTarget);
    setActiveRow(row);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setActiveRow(null);
  };

  const handleActionClick = (action: Action<T>) => {
    if (activeRow) {
      action.onClick(activeRow);
      handleActionMenuClose();
    }
  };

  const defaultActions: Action<T>[] = [
    {
      icon: <VisibilityIcon />,
      label: 'View',
      onClick: (row) => console.log('View', row),
      tooltip: 'View details',
      color: 'primary',
    },
    {
      icon: <EditIcon />,
      label: 'Edit',
      onClick: (row) => console.log('Edit', row),
      tooltip: 'Edit item',
      color: 'primary',
    },
    {
      icon: <DeleteIcon />,
      label: 'Delete',
      onClick: (row) => console.log('Delete', row),
      tooltip: 'Delete item',
      color: 'error',
    },
  ];

  const tableActions = actions || defaultActions;

  return (
    <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer 
        {...containerProps} 
        sx={{ 
          ...containerProps?.sx,
          maxHeight: containerProps?.sx ? (containerProps.sx as any).maxHeight : 'auto' 
        }}
      >
        {loading && <LinearProgress />}
        <Table 
          stickyHeader 
          aria-label="data table"
          size={dense ? 'small' : 'medium'}
          sx={{ minWidth: 650 }}
        >
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < data.length}
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAllClick}
                    inputProps={{ 'aria-label': 'select all' }}
                  />
                </TableCell>
              )}

              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                >
                  {column.sortable !== false ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}

              {tableActions.length > 0 && (
                <TableCell align="right" sx={{ width: 60 }}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          
          <TableBody>
            {data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length + (selectable ? 1 : 0) + (tableActions.length > 0 ? 1 : 0)
                  }
                  align="center"
                >
                  <Box sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      {emptyStateMessage}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data?.map((row, index) => {
                const isItemSelected = isSelected(row[idField]);
                const labelId = `data-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={() => handleRowClick(row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={String(row[idField])}
                    selected={isItemSelected}
                    sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                  >
                    {selectable && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={(event) =>
                            handleCheckboxClick(event, row[idField])
                          }
                        />
                      </TableCell>
                    )}

                    {columns.map((column) => {
                      const value = row[column.id as keyof T];
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {column.format ? column.format(value, row) : String(value)}
                        </TableCell>
                      );
                    })}

                    {tableActions.length > 0 && (
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={(event) => handleActionMenuOpen(event, row)}
                          aria-label="actions"
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination && (
        <TablePagination
          rowsPerPageOptions={pagination.rowsPerPageOptions || [10, 25, 50, 100]}
          component="div"
          count={pagination.totalCount}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          onPageChange={(_, newPage) => pagination.onPageChange(newPage)}
          onRowsPerPageChange={(event) => {
            pagination.onRowsPerPageChange(parseInt(event.target.value, 10));
          }}
        />
      )}

      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {tableActions
          .filter((action) => !activeRow || !(action.hidden && action.hidden(activeRow)))
          .map((action, index) => (
            <MenuItem
              key={index}
              onClick={() => handleActionClick(action)}
              disabled={activeRow && action.disabled ? action.disabled(activeRow) : false}
            >
              {action.icon && (
                <ListItemIcon sx={{ color: action.color ? `${action.color}.main` : 'inherit' }}>
                  {action.icon}
                </ListItemIcon>
              )}
              <ListItemText>{action.label}</ListItemText>
            </MenuItem>
          ))}
      </Menu>
    </Paper>
  );
};

export default DataTable; 