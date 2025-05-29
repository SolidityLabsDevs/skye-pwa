import { create } from 'zustand';
import { ModalName, ModalProps } from './types';

type ModalStore = {
  activeModal: ModalName | null;
  data: ModalProps[ModalName];
  show: <K extends ModalName>(modalName: K, data: ModalProps[K]) => void;
  hide: () => void;
};

export const useModalStore = create<ModalStore>(set => ({
  activeModal: null,
  data: {} as ModalProps[ModalName],
  show: (modalName, data) => set({ activeModal: modalName, data }),
  hide: () => set({ activeModal: null, data: {} as ModalProps[ModalName] }),
}));
