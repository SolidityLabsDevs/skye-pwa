'use client';
import { ReactElement } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { useFormPersist } from 'hooks';

interface FormPersistProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  formKey: string;
}

export default function FormPersist<T extends FieldValues>(
  props: FormPersistProps<T>
): ReactElement {
  const { form, formKey } = props;
  useFormPersist(formKey, {
    control: form.control,
    setValue: form.setValue,
  });
  return <></>;
}
