import Button from '@/components/Button/Button';
import DefaultSpinner from '@/components/DefaultSpinner/DefaultSpinner';
import FilterSelect from '@/components/FilterSelect/FilterSelect';
import Navbar from '@/components/Navbar/Navbar';
import { Call, FilterBy } from '@/types';
import { baseURL } from '@/utils/api';
import {
  authorizationHeader,
  formatDate,
  secondsToFormattedCallTime,
} from '@/utils/helpers';
import axios from 'axios';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import CallDetailsModal from '@/components/CallDetailsModal/CallDetailsModal';
import CallType from '@/components/CallType/CallType';
import StatusPill from '@/components/StatusPill/StatusPill';
import Head from 'next/head';

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
  const [filter, setFilter] = useState<FilterBy>('all');

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

  const changeArchiveStatus = useCallback(
    async (callId: string) => {
      const res = await axios({
        method: 'put',
        url: `${baseURL}/calls/${callId}/archive`,
        headers: authorizationHeader(),
      });

      if (!callsData) return;

      const updatedCalls = callsData.nodes.map(call => {
        if (call.id === callId) {
          return res.data as Call;
        }

        return call;
      });

      setCallsData({
        ...callsData,
        nodes: updatedCalls,
      });

      console.log('changeArchiveStatus >>>', res.data);
    },
    [callsData]
  );

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

  const filteredCalls = nodes?.filter(call => {
    if (filter === 'all') return true;
    else if (filter === 'archived') return call.is_archived;
    else return !call.is_archived;
  });

  return (
    <>
      <Head>
        <title>Turing Technologies Frontend Test</title>
      </Head>

      <Navbar />

      <main className="px-11 py-8">
        <h1 className="text-[28px] leading-[39px] font-medium mb-8">
          Turing Technologies Frontend Test
        </h1>

        <FilterSelect
          value={filter}
          onValueChange={value => {
            setFilter(value);
          }}
        />

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
              {filteredCalls?.map(c => (
                <tr
                  key={c.id}
                  className="border-b border-[#CBD6E2] hover:bg-[#f4f4f98f]"
                >
                  <TableCell className="pl-7">
                    <CallType type={c.call_type} />
                  </TableCell>
                  <TableCell className="capitalize text-[#325AE7]">
                    {c.direction}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span>{secondsToFormattedCallTime(c.duration)}</span>

                      <span className="text-[#325AE7]">
                        ({c.duration} seconds)
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{c.from}</TableCell>
                  <TableCell>{c.to}</TableCell>
                  <TableCell>{c.via}</TableCell>
                  <TableCell>{formatDate(new Date(c.created_at))}</TableCell>
                  <TableCell>
                    <StatusPill
                      archived={c.is_archived}
                      onClick={() => changeArchiveStatus(c.id)}
                      className="cursor-pointer"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      label="Add Note"
                      onClick={() => {
                        setSelectedCallId(c.id);
                        setCallDetailsModalOpen(true);
                      }}
                    />
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

        <div className="flex items-center justify-center mt-8 mx-auto w-full mb-8">
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
