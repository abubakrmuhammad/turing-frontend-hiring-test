import Button from '@/components/Button/Button';
import DefaultSpinner from '@/components/DefaultSpinner/DefaultSpinner';
import FilterSelect from '@/components/FilterSelect/FilterSelect';
import Navbar from '@/components/Navbar/Navbar';
import { Call } from '@/types';
import { baseURL } from '@/utils/api';
import { authorizationHeader } from '@/utils/helpers';
import axios from 'axios';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import CallDetailsModal from '@/components/CallDetailsModal/CallDetailsModal';

type CallsData = {
  nodes: Call[];
  totalCount: number;
  hasNextPage: boolean;
};

export default function Home() {
  const [callsData, setCallsData] = useState<CallsData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [callDetailsModalOpen, setCallDetailsModalOpen] = useState(false);
  const [selectedCallId, setSelectedCallId] = useState<string>();

  const fetchCallsData = useCallback(async () => {
    setLoading(true);

    const res = await axios({
      method: 'get',
      url: `${baseURL}/calls?offset=${(currentPage - 1) * 10}&limit=10`,
      headers: authorizationHeader(),
    });

    setCallsData(res.data);
    setLoading(false);

    console.log('fetchCallsData >>>', res.data);
  }, [currentPage]);

  useEffect(() => {
    fetchCallsData();
  }, [fetchCallsData]);

  const { nodes, totalCount, hasNextPage } = callsData || {};

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, hasNextPage]);

  const previousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const handlePageNumberClick = useCallback(
    (pageNumber: number) => {
      setCurrentPage(pageNumber);
    },
    [setCurrentPage]
  );

  const pageNumbers = totalCount
    ? Array.from({ length: Math.ceil(totalCount / 10) }, (_, i) => i + 1)
    : [];

  const startingEntryNumber = (currentPage - 1) * 10 + 1;
  const endingEntryNumber = currentPage * 10;

  return (
    <>
      <Navbar />

      <main className="px-11 py-8">
        <h1 className="text-[28px] leading-[39px] font-medium mb-8">
          Turing Technologies Frontend Test
        </h1>

        <FilterSelect />

        <table className="mt-7 w-full border border-[#CBD6E2] rounded-[4px] mb-12">
          <thead>
            <tr className="rounded-tr-[4px] rounded-tl-[4px] overflow-hidden">
              <th className="text-[12px] text-left leading-[17px] font-bold text-[#232323] bg-[#F4F4F9] py-4 pl-7 rounded-tl-[4px]">
                Call Type
              </th>

              {[
                'Direction',
                'Duration',
                'FROM',
                'TO',
                'VIA',
                'CREATED AT',
                'Status',
              ].map(label => (
                <th
                  key={label}
                  className="text-[12px] text-left leading-[17px] font-bold text-[#232323] py-4  bg-[#F4F4F9]"
                >
                  {label}
                </th>
              ))}

              <th className="text-[12px] text-left leading-[17px] font-bold text-[#232323] py-4 pr-28  bg-[#F4F4F9] rounded-tr-[4px]">
                Actions
              </th>
            </tr>
          </thead>

          {!loading && (
            <tbody>
              {nodes?.map(c => (
                <tr
                  key={c.id}
                  className="border-b border-[#CBD6E2] hover:bg-[#f4f4f98f] cursor-pointer"
                  onClick={() => {
                    setSelectedCallId(c.id);
                    setCallDetailsModalOpen(true);
                  }}
                >
                  <TableCell className="text-[#325AE7] pl-7">
                    {c.call_type}
                  </TableCell>
                  <TableCell>{c.direction}</TableCell>
                  <TableCell>{c.duration}</TableCell>
                  <TableCell>{c.from}</TableCell>
                  <TableCell>{c.to}</TableCell>
                  <TableCell>{c.via}</TableCell>
                  <TableCell>{c.created_at}</TableCell>
                  <TableCell>
                    {c.is_archived ? 'Archived' : 'Unarchived'}
                  </TableCell>
                  <TableCell>
                    <Button label="Add Note" />
                  </TableCell>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        <CallDetailsModal
          open={callDetailsModalOpen}
          onOpenChange={open => {
            if (!open) setSelectedCallId(undefined);
            setCallDetailsModalOpen(open);
          }}
          callID={selectedCallId}
        />

        {loading && (
          <div className="flex items-center justify-center h-[200px] w-full text-center">
            <DefaultSpinner />
          </div>
        )}

        <div className="flex items-center justify-center mt-8 mx-auto w-full">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <button
                className="text-[12px] leading-[17px] text-gray-500  px-3 py-1 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={loading || currentPage === 1}
                onClick={previousPage}
              >
                <ChevronLeftIcon />
              </button>

              {pageNumbers.map(page => (
                <PaginationButton
                  key={page}
                  label={page.toString()}
                  disabled={loading}
                  selected={page === currentPage}
                  onClick={() => handlePageNumberClick(page)}
                />
              ))}

              <button
                className="text-[12px] leading-[17px] text-gray-500  px-3 py-1 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={loading || !hasNextPage}
                onClick={nextPage}
              >
                <ChevronRightIcon />
              </button>
            </div>

            <span className="mt-4 text-[12px] leading-[17px] font-medium">
              {startingEntryNumber} - {endingEntryNumber} of {totalCount}{' '}
              results
            </span>
          </div>
        </div>
      </main>
    </>
  );
}

const PaginationButton = ({
  label,
  selected,
  ...props
}: {
  label: string;
  selected?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={clsx(
        'text-[12px] font-medium leading-[17px]  rounded-[4px] px-3 py-1',
        {
          'text-gray-500': !selected,
          'text-white bg-primary': selected,
        }
      )}
      {...props}
    >
      {label}
    </button>
  );
};

const TableCell = ({
  className,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
} & React.TdHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td className={clsx('py-3 font-medium text-sm', className)} {...props}>
      {props.children}
    </td>
  );
};
