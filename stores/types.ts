import ModalComponents from 'components/modals';
import { ComponentProps } from 'react';

export type ModalName = keyof typeof ModalComponents;
export type ModalProps = {
  [K in ModalName]: ComponentProps<(typeof ModalComponents)[K]>;
};

export type ModalComponents = typeof ModalComponents;
