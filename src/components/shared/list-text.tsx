interface ListTextProps {
  title: string;
  description?: string;
  description1?: string;
  description2?: string;
  description3?: string;
  description4?: string;
  list1?: string;
  list2?: string;
  list3?: string;
  list4?: string;
  list5?: string;
  list6?: string;
  list7?: string;
  list8?: string;
  list9?: string;
  list10?: string;
  list11?: string;
  list12?: string;
  list13?: string;
  list14?: string;
  list15?: string;
  children?: React.ReactNode;
}

export const ListTextPrivacy = ({
  title,
  description,
  description1,
  description2,
  description3,
  description4,
  list1,
  list2,
  list3,
  list4,
  list5,
  list6,
  list7,
  list8,
  list9,
  list10,
  list11,
  list12,
  list13,
  list14,
  list15,
  children,
}: ListTextProps) => {
  return (
    <div className="w-full flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-[26px] font-bold w-full  text-start mb-2">
          {title}
        </h1>
        {description && (
          <p className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A]">
            {description}
          </p>
        )}
        {description1 && (
          <p className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A]">
            {description1}
          </p>
        )}
        {description2 && (
          <p className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A]">
            {description2}
          </p>
        )}
        {description3 && (
          <p className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A]">
            {description3}
          </p>
        )}
        {description4 && (
          <p className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A]">
            {description4}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {list1 && (
          <div className="flex gap-2 items-start">
            <p className="text-black text-lg -mt-1">&#x2022;</p>
            <p className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A] leading-6 tracking-wide">
              {list1}
            </p>
          </div>
        )}
        {list2 && (
          <div className="flex gap-2 items-start">
            <p className="text-black text-lg -mt-1">&#x2022;</p>
            <p className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A] leading-6 tracking-wide">
              {list2}
            </p>
          </div>
        )}
        {list3 && (
          <div className="flex gap-2 items-start">
            <p className="text-black text-lg -mt-1">&#x2022;</p>
            <p className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A] leading-6 tracking-wide">
              {list3}
            </p>
          </div>
        )}
        {list4 && (
          <div className="flex gap-2 items-start">
            <p className="text-black text-lg -mt-1">&#x2022;</p>
            <p className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A] leading-6 tracking-wide">
              {list4}
            </p>
          </div>
        )}
        {list5 && (
          <div className="flex gap-2 items-start">
            <p className="text-black text-lg -mt-1">&#x2022;</p>
            <p className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A] leading-6 tracking-wide">
              {list5}
            </p>
          </div>
        )}
        {list6 && (
          <div className="flex gap-2 items-start">
            <p className="text-black text-lg -mt-1">&#x2022;</p>
            <p className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A] leading-6 tracking-wide">
              {list6}
            </p>
          </div>
        )}
        {list7 && (
          <div className="flex gap-2 items-start">
            <p className="text-black text-lg -mt-1">&#x2022;</p>
            <p className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A] leading-6 tracking-wide">
              {list7}
            </p>
          </div>
        )}
        {list8 && (
          <div className="flex gap-2 items-start">
            <p className="text-black text-lg -mt-1">&#x2022;</p>
            <p className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A] leading-6 tracking-wide">
              {list8}
            </p>
          </div>
        )}
        {list9 && (
          <div className="flex gap-2 items-start">
            <p className="text-black text-lg -mt-1">&#x2022;</p>
            <p className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A] leading-6 tracking-wide">
              {list9}
            </p>
          </div>
        )}
        {list10 && (
          <div className="flex gap-2 items-start">
            <p className="text-black text-lg -mt-1">&#x2022;</p>
            <p className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A] leading-6 tracking-wide">
              {list10}
            </p>
          </div>
        )}
        {list11 && (
          <div className="flex gap-2 items-start">
            <p className="text-black text-lg -mt-1">&#x2022;</p>
            <p className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A] leading-6 tracking-wide">
              {list11}
            </p>
          </div>
        )}
        {list12 && (
          <div className="flex gap-2 items-start">
            <p className="text-black text-lg -mt-1">&#x2022;</p>
            <p className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A] leading-6 tracking-wide">
              {list12}
            </p>
          </div>
        )}
        {list13 && (
          <div className="flex gap-2 items-start">
            <p className="text-black text-lg -mt-1">&#x2022;</p>
            <p className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A] leading-6 tracking-wide">
              {list13}
            </p>
          </div>
        )}
        {list14 && (
          <div className="flex gap-2 items-start">
            <p className="text-black text-lg -mt-1">&#x2022;</p>
            <p className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A] leading-6 tracking-wide">
              {list14}
            </p>
          </div>
        )}
        {list15 && (
          <div className="flex gap-2 items-start">
            <p className="text-black text-lg -mt-1">&#x2022;</p>
            <p className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A] leading-6 tracking-wide">
              {list15}
            </p>
          </div>
        )}
        {children && (
          <div className="text-start w-full font-medium text-sm md:text-[16px] text-[#4A4A4A] leading-6 tracking-wide">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
