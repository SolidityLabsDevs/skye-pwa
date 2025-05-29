'use client';
import { FC, memo, useEffect, useState } from 'react';
import cn from 'classnames';
import type { TableRow, TableColumn } from 'types';

import { FiPlus } from 'react-icons/fi';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import { RiEqualizerLine } from 'react-icons/ri';
import { IoSearchOutline } from 'react-icons/io5';

import { customScrollbar } from 'constants/classNames';
import { Button } from 'components/ui/Button';
import { Skeleton } from 'components/ui/Skeleton';
import { VerticalDivider } from 'components/ui/VerticalDivider';
import { ScreenTitle } from 'components/ui/ScreenTitle';
import { Input } from 'components/formElements/Input';
import { Option } from 'components/formElements';
import { Select } from 'components/formElements/Select';
import { Checkbox } from 'components/formElements/Checkbox';

type TableProps = {
  // Data and Content
  heading?: string;
  description?: string;
  tableRows: TableRow[];
  tableColumns: TableColumn[];
  // Search
  searchPlaceholder?: string;
  search?: string;
  setSearch?: (value: string) => void;
  // Pagination
  pageCount?: number;
  page?: number;
  setPage?: (page: number) => void;
  onPrev?: () => void;
  onNext?: () => void;
  // Limit
  limit?: number;
  setLimit?: (limit: string) => void;
  // Actions
  addAction?: () => void;
  addText?: string;
  // Other
  loading?: boolean;
};

const SELECT_OPTIONS = [
  {
    label: '5 per page',
    value: '5',
  },
  {
    label: '10 per page',
    value: '10',
  },
  {
    label: '15 per page',
    value: '15',
  },
  {
    label: '20 per page',
    value: '20',
  },
  {
    label: '30 per page',
    value: '30',
  },
  {
    label: '50 per page',
    value: '50',
  },
  {
    label: '100 per page',
    value: '100',
  },
  {
    label: '250 per page',
    value: '250',
  },
];

export const Table: FC<TableProps> = memo(
  ({
    heading,
    description,
    tableRows,
    tableColumns,
    //
    page,
    pageCount,
    setPage,
    //
    limit = 5,
    setLimit,
    onNext,
    onPrev,
    //
    addAction,
    addText,
    //
    search,
    setSearch,
    searchPlaceholder = 'Search',
    //
    loading,
  }) => {
    const [selectedLimit, setSelectedLimit] = useState(
      SELECT_OPTIONS.find(item => item.value === String(limit)) || SELECT_OPTIONS[1]
    );
    const [show, setShow] = useState(() =>
      tableColumns.map(item => ({ show: true, key: item.key, value: item.value }))
    );

    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen(cur => !cur);

    const onCheckboxChange = (value: boolean, index: number) => {
      const arr = [...show];
      arr[index].show = value;
      setShow(arr);
    };

    useEffect(() => {
      setLimit?.(selectedLimit.value);
    }, [selectedLimit]);

    return (
      <div className="w-full h-max bg-onNeutralBg p-4 rounded-[14px] shadow-sm">
        {heading && <ScreenTitle title={heading} text={description} />}
        <div className="flex flex-col w-full gap-2">
          <div className={cn('flex flex-row w-full gap-2 flex-wrap', { hidden: !open })}>
            {addAction && (
              <Button
                theme="outline"
                onClick={addAction}
                disabled={loading}
                icon={<FiPlus size={24} />}
              >
                {addText}
              </Button>
            )}
            {setSearch && (
              <Input
                value={search}
                type="search"
                onChange={e => setSearch?.(e.target.value)}
                placeholder={searchPlaceholder}
                icon={<IoSearchOutline size={18} />}
              />
            )}
            {setLimit && (
              <Select
                onChange={opt => setSelectedLimit(opt as Option)}
                placeholder={selectedLimit.label}
                value={[selectedLimit]}
                options={SELECT_OPTIONS}
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              theme="outline"
              disabled={page === 1}
              loading={loading}
              onClick={onPrev}
              icon={<FiArrowLeftCircle size={24} />}
            ></Button>
            <Button
              theme="outline"
              disabled={Number(page) >= Number(pageCount)}
              loading={loading}
              onClick={onNext}
              icon={<FiArrowRightCircle size={24} />}
            ></Button>
            <VerticalDivider />
            <Button
              theme="outline"
              onClick={toggleOpen}
              icon={<RiEqualizerLine size={24} />}
            ></Button>
          </div>
        </div>
        <div className={cn('p-0 my-4 overflow-auto text-defaultText', customScrollbar)}>
          <table className="w-full text-left table-auto min-w-max rounded-[24px] overflow-hidden border border-default border-separate border-spacing-0 mb-1">
            <thead className="bg-primaryBg text-defaultText">
              <tr
                className={cn('opacity-80', {
                  hidden: !open,
                })}
              >
                {tableColumns?.map((head, index) => (
                  <th
                    key={`col-${head?.key}-${index}-shoToggle`}
                    className={cn(
                      'px-[1.5rem] py-[0.75rem] text-[0.875rem] font-normal text-left whitespace-nowrap',
                      {
                        'animate-tilt': open,
                      }
                    )}
                  >
                    <div className="flex flex-row items-center gap-2 leading-none dark:opacity-1 opacity-70">
                      {head?.value}
                      {open && (
                        <Checkbox
                          checked={show[index].show}
                          key={show[index]?.value?.toString()}
                          onChange={e => onCheckboxChange(e.target.checked, index)}
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
              <tr>
                {tableColumns?.map((head, index) => (
                  <th
                    key={`col-${head?.key}-${index}`}
                    className={cn(
                      'px-[1.5rem] py-[0.75rem] text-[0.875rem] font-normal text-left whitespace-nowrap',
                      {
                        hidden: !show[index].show,
                        'cursor-pointer hocus:opacity-80': !!head?.onClick,
                      }
                    )}
                    onClick={() => head?.onClick?.()}
                  >
                    <p className="flex flex-row items-center gap-2 leading-none dark:opacity-1 opacity-70">
                      {head?.value}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? new Array(limit).fill(null).map((_, skeletonRowIdx) => {
                    return (
                      <tr key={skeletonRowIdx} className="min-h-[30px] odd:bg-neutralBg">
                        {tableColumns?.map((_, skeletonColIdx) => (
                          <td
                            className="px-[1.5rem] py-[0.75rem]"
                            key={`${skeletonRowIdx}-${skeletonColIdx}`}
                          >
                            <p className="h-5" style={{ paddingTop: '8px' }}>
                              <Skeleton />
                            </p>
                          </td>
                        ))}
                      </tr>
                    );
                  })
                : tableRows.map((row, index: number) => {
                    return (
                      <tr key={`row-${row?.id}-${index}`} className="odd:bg-neutralBg min-h-[30px]">
                        {tableColumns?.map((column, colIdx) => (
                          <td
                            className={cn('px-[1.5rem] py-[0.75rem]', {
                              hidden: !show[colIdx].show,
                              'border-b border-default': index !== tableRows?.length - 1,
                            })}
                            key={`row-col-${column?.key}-${index}-${colIdx}`}
                          >
                            {column?.render ? (
                              column?.render(row[column?.key], row)
                            ) : (
                              <p className="text-[0.875rem]">{row[column?.key]}</p>
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
        {pageCount && setPage && (
          <Select
            placeholder={`Page ${page} of ${pageCount}`}
            isLoading={loading}
            onChange={opt => setPage?.(+(opt as Option).value)}
            value={[{ label: `Page #${page}`, value: String(page) }]}
            options={new Array(pageCount)
              .fill(null)
              .map((_, idx) => ({ label: `Page #${idx + 1}`, value: String(idx + 1) }))}
          />
        )}
      </div>
    );
  }
);
