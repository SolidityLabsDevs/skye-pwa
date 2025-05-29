'use client';
import cn from 'classnames';
import { ComponentProps, FC, memo, useRef, useState, useEffect } from 'react';
import { Input } from './Input';

type CodeInputProps = {
  onComplete?: (val: string) => void;
  len?: number;
  wrapperClassName?: string;
} & ComponentProps<typeof Input>;

export const CodeInput: FC<CodeInputProps> = memo(
  ({ onComplete, len = 6, wrapperClassName, ...inputProps }) => {
    const [code, setCode] = useState<string[]>(new Array(len).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
      const firstEmptyIndex = code.findIndex(num => num === '');
      if (firstEmptyIndex !== -1 && inputRefs.current[firstEmptyIndex]) {
        inputRefs.current[firstEmptyIndex]?.focus();
      }
    }, [code]);

    const handleChange = (index: number, value: string) => {
      if (!/^[0-9]?$/.test(value)) return;
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < len - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      if (newCode.every(num => num !== '')) {
        onComplete?.(newCode.join(''));
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !code[index] && index > 0) {
        setTimeout(() => {
          inputRefs.current[index - 1]?.focus();
        });
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text').slice(0, len).split('');
      if (!pastedData.every(char => /^[0-9]$/.test(char))) return;

      setCode(pastedData.concat(new Array(len - pastedData.length).fill('')));
      inputRefs.current[pastedData.length - 1]?.focus();

      if (pastedData.length === len) {
        onComplete?.(pastedData.join(''));
      }
    };

    return (
      <div className={cn('flex gap-2 w-full justify-between', wrapperClassName)}>
        {code.map((num, index) => (
          <Input
            key={index}
            type="text"
            maxLength={1}
            value={num}
            onChange={e => handleChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            ref={(el: any) => (inputRefs.current[index] = el)}
            onPaste={handlePaste}
            disabled={index > 0 && !code[index - 1]}
            className="!m-0 h-full text-center text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            wrpInputClassName="!w-9 !h-12 text-center rounded-md !p-0"
            inputMode="numeric"
            {...inputProps}
          />
        ))}
      </div>
    );
  }
);
