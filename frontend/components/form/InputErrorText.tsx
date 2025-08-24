type Props = {
  error?: string;
};

export default function InputErrorText({ error }: Props) {
  return <small className="text-red-600 -translate-y-1">{error}</small>;
}
