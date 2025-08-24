import { DebounceInput } from "react-debounce-input";
import { BiSearch } from "react-icons/bi";

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function TableSearch({ search, setSearch }: Props) {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  return (
    <div className="flex items-center bg-white rounded-[10px] px-5 py-2 ">
      <DebounceInput
        value={search}
        minLength={2}
        debounceTimeout={500}
        onChange={onChangeHandler}
        className="bg-transparent outline-none focus:outline-none"
        placeholder="Αναζήτηση"
      />
      <BiSearch size={20} className="text-gray-400" />
    </div>
  );
}
