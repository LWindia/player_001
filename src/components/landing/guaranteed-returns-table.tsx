import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const rows = [
  { episode: "Episode 1", experience: "Battle Skill Kit", value: "Worth ₹2000" },
  { episode: "Episode 2", experience: "Advanced Battle Insights", value: "Guaranteed Return Value" },
  { episode: "Episode 3", experience: "Collaboration Toolkit", value: "Guaranteed Return Value" },
  { episode: "Episode 4", experience: "Decision Framework", value: "Guaranteed Return Value" },
  { episode: "Episode 5", experience: "Strategic Playbook", value: "Guaranteed Return Value" },
  { episode: "Episode 6", experience: "Elite Battle Kit", value: "Guaranteed Return Value" },
];

export function GuaranteedReturnsTable() {
  return (
    <div className="premium-card rounded-2xl p-2 md:p-3 overflow-hidden">
      <Table className="w-full text-white">
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="text-white/70 font-display tracking-[0.18em] uppercase text-[10px] px-4 py-4">Episode</TableHead>
            <TableHead className="text-white/70 font-display tracking-[0.18em] uppercase text-[10px] px-4 py-4">What Players Experience</TableHead>
            <TableHead className="text-white/70 font-display tracking-[0.18em] uppercase text-[10px] px-4 py-4">Guaranteed Return Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.episode} className="border-white/[0.08] hover:bg-white/[0.02]">
              <TableCell className="px-4 py-4 text-white font-semibold">{row.episode}</TableCell>
              <TableCell className="px-4 py-4 text-white/70">{row.experience}</TableCell>
              <TableCell className="px-4 py-4 text-secondary">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
