import { Users, CalendarDays, ClipboardList, UserCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const STAT_CARDS = [
  {
    label: "Total Doctors",
    value: "—",
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Appointments Today",
    value: "—",
    icon: CalendarDays,
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    label: "Total Patients",
    value: "—",
    icon: UserCheck,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    label: "Pending Approvals",
    value: "—",
    icon: ClipboardList,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
  },
];

const StatsRow = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      {STAT_CARDS.map(({ label, value, icon: Icon, color, bg }) => (
        <Card key={label} className="border-0 shadow-md">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className={`rounded-xl p-3 shrink-0 ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsRow;
