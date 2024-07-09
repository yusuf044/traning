interface Currency {
  name: string;
  value: number;
  flag: string;
  symbol: string;
}

type LabelType = {
  text: string | undefined | null;
  align?: 'left' | 'right' | 'center';
};
