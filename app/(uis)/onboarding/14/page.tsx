'use client';
import { MobileContainer } from 'components/lib/MobileContainer';
import { FC, memo } from 'react';
import { Button } from 'components/ui/Button';
import { CustomCheckbox } from 'components/formElements/CustomCheckbox';

type PageProps = unknown;

const number = 14;

const DATA = [
  {
    title: 'Mental & Emotional',
    options: [
      'Difficulty staying motivated',
      'Lack of clarity on your life’s purpose',
      'Persistent anxiety or worry',
      'Easily distracted or mentally scattered',
      'Recurring negative self-talk or doubt',
    ],
  },
  {
    title: 'Physical & Energetic',
    options: [
      'Chronic tiredness or low energy',
      'Difficulty sleeping or restless nights',
      'Tension or stress held in the body',
      'Unexplained physical discomfort or aches',
    ],
  },
  {
    title: 'Social & Relational',
    options: [
      'Struggles forming meaningful connections',
      'Feeling isolated or misunderstood',
      'Difficulty maintaining healthy relationships',
      'Uncomfortable expressing your true self',
    ],
  },
];

const Page: FC<PageProps> = memo(() => {
  return (
    <MobileContainer
      showHeader
      className="flex flex-col gap-8"
      bgClassName='bg-[url("/images/assets/7.png")] bg-cover bg-center bg-no-repeat'
      isStackScreen
    >
      <div className="flex flex-col gap-2">
        <p className="font-bold text-center text-[#e8e8e8] opacity-80 text-[1.625rem]">
          Identifying Your Patterns
        </p>
        <p className="text-center text-[#98A1BD] text-[0.813rem]">
          Select any subconscious patterns you resonate with:
        </p>
      </div>
      {DATA.map(d => (
        <div key={d.title} className="flex flex-col items-start gap-2">
          <p className="text-[#98a1bd] font-bold">{d.title}</p>
          {d.options.map(opt => (
            <CustomCheckbox key={`${d.title}-${opt}`} label={opt} />
          ))}
        </div>
      ))}
      <Button theme="gradient" className="mx-auto mt-auto" href={`/onboarding/${number + 1}`}>
        Begin Your Transformation
      </Button>
    </MobileContainer>
  );
});

export default Page;
