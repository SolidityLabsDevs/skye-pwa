'use client';
import { FC, memo, useState, useEffect, ComponentType, ComponentProps } from 'react';
import loadable from '@loadable/component';
import { ModalName, ModalComponents } from 'stores/types';
import { useModalStore } from 'stores';

const loadComponent = (activeModal: ModalName) =>
  loadable(
    () =>
      import('components/modals').then(
        mod => mod[activeModal as ModalName] as ModalComponents[ModalName]
      ) as any
  );

const Modal: FC = memo(() => {
  const { activeModal, data } = useModalStore(state => state);
  const [ModalComponent, setComponent] = useState<ComponentType<any> | null>(null);

  useEffect(() => {
    if (!activeModal) {
      setComponent(null);
      return;
    }

    const modal = loadComponent(activeModal);
    setComponent(modal);
  }, [activeModal]);

  return (
    <>
      {ModalComponent ? (
        <ModalComponent {...(data as ComponentProps<typeof ModalComponent>)} />
      ) : null}
    </>
  );
});

export default Modal;
