import Button from '@/components/Button/Button';
import FilterSelect from '@/components/FilterSelect/FilterSelect';
import Navbar from '@/components/Navbar/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="px-11 py-8">
        <h1 className="text-[28px] leading-[39px] font-medium mb-8">
          Turing Technologies Frontend Test
        </h1>

        <FilterSelect />

        <table className="w-full border border-[#CBD6E2] rounded-[4px]">
          <thead>
            <tr className="rounded-tr-[4px] rounded-tl-[4px] overflow-hidden">
              <th className="text-[12px] text-left leading-[17px] font-bold text-[#232323] bg-[#F4F4F9] py-4 pl-7 rounded-tl-[4px]">
                Call Type
              </th>

              {[
                'Direction',
                'Duration',
                'FROM',
                'TO',
                'VIA',
                'CREATED AT',
                'Status',
              ].map(label => (
                <th
                  key={label}
                  className="text-[12px] text-left leading-[17px] font-bold text-[#232323] py-4  bg-[#F4F4F9]"
                >
                  {label}
                </th>
              ))}

              <th className="text-[12px] text-left leading-[17px] font-bold text-[#232323] py-4 pr-28  bg-[#F4F4F9] rounded-tr-[4px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map(r => (
              <tr key={r}>
                <td className="text-[#325AE7]">Voice Mail</td>
                <td>Outbound</td>
                <td>80 minutes 23 seconds</td>
                <td>+33148288105</td>
                <td>+33166114113</td>
                <td>+33148288105</td>
                <td>12-08-2022</td>
                <td>Archived</td>
                <td>
                  <Button label="Add Note" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

const DataRow = () => {
  return (
    <tr>
      <td className="text-[#325AE7]">Voice Mail</td>
      <td>Outbound</td>
      <td>80 minutes 23 seconds</td>
      <td>+33148288105</td>
      <td>+33166114113</td>
      <td>+33148288105</td>
      <td>12-08-2022</td>
      <td>Archived</td>
      <td>
        <Button label="Add Note" />
      </td>
    </tr>
  );
};
