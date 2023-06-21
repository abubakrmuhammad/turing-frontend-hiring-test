import React, { useCallback, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Call } from '@/types';
import { Cross2Icon } from '@radix-ui/react-icons';
import { authorizationHeader } from '@/utils/helpers';
import { baseURL } from '@/utils/api';
import axios from 'axios';
import { useFontElRef } from '@/context/FontElProvider';
import Button from '../Button/Button';
import DefaultSpinner from '../DefaultSpinner/DefaultSpinner';
import CallType from '../CallType/CallType';

type CallDetailsProps = {
  callID?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CallDetailsModal = ({ callID, open, onOpenChange }: CallDetailsProps) => {
  const [call, setCall] = useState<Call | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCallDetails = useCallback(async (callID: string) => {
    setLoading(true);

    const res = await axios({
      method: 'get',
      url: `${baseURL}/calls/${callID}`,
      headers: authorizationHeader(),
    });

    setCall(res.data);
    setLoading(false);

    console.log('fetchCallDetails >>>', res.data);
  }, []);

  useEffect(() => {
    if (callID) {
      fetchCallDetails(callID);
    }
  }, [callID, fetchCallDetails]);

  const fontElRef = useFontElRef();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal container={fontElRef.current}>
        <Dialog.Overlay className="bg-black opacity-50 fixed inset-0" />

        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[540px] translate-x-[-50%] translate-y-[-50%] bg-white p-[25px] shadow-[RGBA(34,48,73,0.2 )_0px_20px_33px_0px] focus:outline-none">
          <Dialog.Title className="text-lg font-medium">Add Notes</Dialog.Title>

          <Dialog.Description className="text-primary mt-2 mb-4 text-[12px] leading-normal font-medium">
            Call ID {callID}
          </Dialog.Description>

          {loading ? (
            <DefaultSpinner />
          ) : (
            <>
              <Separator />

              <div className="flex flex-col pt-8 pb-4 gap-3">
                <div className="flex gap-3 text-sm">
                  <span className="font-bold min-w-[60px]">Call type</span>
                  <span className="font-medium">
                    <CallType type={call?.call_type} />
                  </span>
                </div>
                <div className="flex gap-3 text-sm">
                  <span className="font-bold min-w-[60px]">Duration</span>
                  <span className="font-medium">{call?.duration}</span>
                </div>
                <div className="flex gap-3 text-sm">
                  <span className="font-bold min-w-[60px]">FROM</span>
                  <span className="font-medium">{call?.from}</span>
                </div>
                <div className="flex gap-3 text-sm">
                  <span className="font-bold min-w-[60px]">TO</span>
                  <span className="font-medium">{call?.to}</span>
                </div>
                <div className="flex gap-3 text-sm">
                  <span className="font-bold min-w-[60px]">VIA</span>
                  <span className="font-medium">{call?.via}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1" htmlFor="notes">
                  Notes
                </label>

                <textarea
                  className="w-full h-[100px] border border-[#CBD6E2] rounded p-[10px] text-sm resize-none font-medium mb-2"
                  placeholder="Add notes"
                  id="notes"
                />
              </div>

              <Separator />
            </>
          )}

          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <Button label="Save" className="w-full" />
            </Dialog.Close>
          </div>

          <Dialog.Close asChild>
            <button
              className="text-primary text-[17px] focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const Separator = () => (
  <div className="border-b border-[#CBD6E2] absolute left-0 right-0" />
);

export default CallDetailsModal;
