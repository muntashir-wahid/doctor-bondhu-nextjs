import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type ClinicWorkingHour, DAY_NAMES } from "./types";

interface ScheduleCardProps {
  workingHours: ClinicWorkingHour[];
}

const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6];

const ScheduleCard = ({ workingHours }: ScheduleCardProps) => {
  const scheduleMap = new Map(workingHours.map((wh) => [wh.dayOfWeek, wh]));

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <span>Weekly Schedule</span>
          <Badge variant="secondary" className="font-normal">
            {workingHours.length} open days
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ALL_DAYS.map((day) => {
            const wh = scheduleMap.get(day);
            const isOpen = !!wh;
            return (
              <div
                key={day}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg border ${
                  isOpen
                    ? "bg-emerald-500/5 border-emerald-200"
                    : "bg-muted/30 border-transparent"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock
                    className={`h-3.5 w-3.5 shrink-0 ${isOpen ? "text-emerald-600" : "text-muted-foreground/40"}`}
                  />
                  <span
                    className={`text-sm font-medium ${isOpen ? "text-foreground" : "text-muted-foreground/60"}`}
                  >
                    {DAY_NAMES[day].slice(0, 3)}
                  </span>
                </div>
                {isOpen ? (
                  <span className="text-xs text-emerald-700 tabular-nums font-medium">
                    {wh.openTime} – {wh.closeTime}
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground/50">
                    Closed
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;
