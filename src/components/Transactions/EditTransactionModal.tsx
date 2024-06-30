import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
  Input,
} from '@chakra-ui/react';

import TransactionItem from '../../types/TransactionItem';
import { useAuth } from '../../context/AuthContext';
import { useUpdateTransaction } from '../../services/api';

type EditTransactionModalProps = {
  transaction: TransactionItem;
};

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({transaction }) => {
  const { token } = useAuth();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      status: transaction.status,
      type: transaction.type,
      clientName: transaction.clientName,
      amount: transaction.amount,
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useUpdateTransaction();

  const onSubmit = (data: { status: string; type: string; clientName: string; amount: number }) => {
    mutate(
      { id: transaction.id, updatedFields: data, token: token! },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('transactions');
          onClose();
        },
        onError: (error) => {
          console.error('Failed to update transaction:', error);
        },
      }
    );
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    reset({
      status: transaction.status,
      type: transaction.type,
      clientName: transaction.clientName,
      amount: transaction.amount,
    });
  }, [reset, transaction]);

  return (
    <>
      <Button colorScheme='blue' variant="outline" onClick={onOpen}>Edit</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Transaction</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select {...register('status')}>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </Select>

                <FormLabel>Type</FormLabel>
                <Select {...register('type')}>
                  <option value="Refill">Refill</option>
                  <option value="Withdrawal">Withdrawal</option>
                </Select>

                <FormLabel>Client Name</FormLabel>
                <Input {...register('clientName')} />

                <FormLabel>Amount</FormLabel>
                <Input {...register('amount')} />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditTransactionModal;
