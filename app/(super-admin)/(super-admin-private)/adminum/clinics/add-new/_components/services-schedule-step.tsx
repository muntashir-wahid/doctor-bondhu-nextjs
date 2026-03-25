"use client";

import { useState } from "react";
import { useFormikContext } from "formik";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormValues } from "./types";

const ServicesScheduleStep = () => {
  const { values, errors, setFieldValue } = useFormikContext<FormValues>();

  const [newService, setNewService] = useState({ name: "", description: "" });
  const [newFacility, setNewFacility] = useState({ name: "", description: "" });

  const addService = () => {
    if (!newService.name.trim()) return;
    setFieldValue("services", [
      ...values.services,
      {
        name: newService.name.trim(),
        description: newService.description.trim(),
      },
    ]);
    setNewService({ name: "", description: "" });
  };

  const removeService = (index: number) => {
    setFieldValue(
      "services",
      values.services.filter((_, i) => i !== index),
    );
  };

  const addFacility = () => {
    if (!newFacility.name.trim()) return;
    setFieldValue("facilities", [
      ...values.facilities,
      {
        name: newFacility.name.trim(),
        description: newFacility.description.trim(),
      },
    ]);
    setNewFacility({ name: "", description: "" });
  };

  const removeFacility = (index: number) => {
    setFieldValue(
      "facilities",
      values.facilities.filter((_, i) => i !== index),
    );
  };

  const toggleDay = (index: number) => {
    const updated = values.workingHours.map((wh, i) =>
      i === index ? { ...wh, enabled: !wh.enabled } : wh,
    );
    setFieldValue("workingHours", updated);
  };

  const updateWorkingHour = (
    index: number,
    field: "openTime" | "closeTime",
    value: string,
  ) => {
    const updated = values.workingHours.map((wh, i) =>
      i === index ? { ...wh, [field]: value } : wh,
    );
    setFieldValue("workingHours", updated);
  };

  const servicesError =
    typeof errors.services === "string" ? errors.services : null;
  const facilitiesError =
    typeof errors.facilities === "string" ? errors.facilities : null;
  const workingHoursError =
    typeof errors.workingHours === "string" ? errors.workingHours : null;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Services Offered</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Service Name *</Label>
            <Input
              placeholder="e.g., General Consultation"
              value={newService.name}
              onChange={(e) =>
                setNewService((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Description (Optional)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Routine checkup and consultation"
                value={newService.description}
                onChange={(e) =>
                  setNewService((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                onKeyDown={(e) => e.key === "Enter" && addService()}
              />
              <Button
                type="button"
                onClick={addService}
                disabled={!newService.name.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        {servicesError && (
          <p className="text-sm text-destructive">{servicesError}</p>
        )}
        {values.services.length > 0 && (
          <div className="space-y-2">
            {values.services.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg bg-muted/30"
              >
                <div>
                  <p className="font-medium text-sm">{service.name}</p>
                  {service.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {service.description}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeService(index)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Facilities Available</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Facility Name *</Label>
            <Input
              placeholder="e.g., Pharmacy"
              value={newFacility.name}
              onChange={(e) =>
                setNewFacility((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Description (Optional)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., In-house pharmacy with 24/7 service"
                value={newFacility.description}
                onChange={(e) =>
                  setNewFacility((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                onKeyDown={(e) => e.key === "Enter" && addFacility()}
              />
              <Button
                type="button"
                onClick={addFacility}
                disabled={!newFacility.name.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        {facilitiesError && (
          <p className="text-sm text-destructive">{facilitiesError}</p>
        )}
        {values.facilities.length > 0 && (
          <div className="space-y-2">
            {values.facilities.map((facility, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg bg-muted/30"
              >
                <div>
                  <p className="font-medium text-sm">{facility.name}</p>
                  {facility.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {facility.description}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFacility(index)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Working Hours</h3>
        {workingHoursError && (
          <p className="text-sm text-destructive">{workingHoursError}</p>
        )}
        <div className="space-y-3">
          {values.workingHours.map((wh, index) => (
            <div
              key={wh.dayOfWeek}
              className="flex items-center gap-4 p-4 border rounded-lg"
            >
              <div className="w-28 font-medium capitalize">{wh.dayName}</div>
              <div className="flex items-center gap-2 flex-1">
                <Input
                  type="time"
                  value={wh.openTime}
                  onChange={(e) =>
                    updateWorkingHour(index, "openTime", e.target.value)
                  }
                  disabled={!wh.enabled}
                  className="w-32"
                />
                <span className="text-muted-foreground text-sm">to</span>
                <Input
                  type="time"
                  value={wh.closeTime}
                  onChange={(e) =>
                    updateWorkingHour(index, "closeTime", e.target.value)
                  }
                  disabled={!wh.enabled}
                  className="w-32"
                />
                <Button
                  type="button"
                  variant={wh.enabled ? "outline" : "destructive"}
                  size="sm"
                  onClick={() => toggleDay(index)}
                >
                  {wh.enabled ? "Open" : "Closed"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesScheduleStep;
