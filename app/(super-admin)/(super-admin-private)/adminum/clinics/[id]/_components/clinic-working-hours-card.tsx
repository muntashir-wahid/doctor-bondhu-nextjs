import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type ClinicWorkingHour, DAY_NAMES } from "./types";

interface ClinicWorkingHoursCardProps {
  workingHours: ClinicWorkingHour[];
}

const ClinicWorkingHoursCard = ({
  workingHours,
}: ClinicWorkingHoursCardProps) => {
  const sortedHours = [...workingHours].sort(
    (a, b) => a.dayOfWeek - b.dayOfWeek,
  );

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <span>Working Hours</span>
          <Badge variant="secondary" className="font-normal">
            {workingHours.length} days
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {workingHours.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No working hours configured
          </p>
        ) : (
          <div className="space-y-2">
            {sortedHours.map((wh) => (
              <div
                key={wh.uid}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-muted/40"
              >
                <div className="flex items-center gap-2.5">
                  <Clock className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span className="text-sm font-medium">
                    {DAY_NAMES[wh.dayOfWeek]}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground tabular-nums">
                  {wh.openTime} – {wh.closeTime}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClinicWorkingHoursCard;
