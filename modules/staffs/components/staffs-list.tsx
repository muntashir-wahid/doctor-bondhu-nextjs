"use client";

import { useState } from "react";
import {
  Search,
  UserPlus,
  Users,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  Clock,
  Shield,
  UserCog,
  Briefcase,
  Calendar,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Staff {
  id: string;
  name: string;
  role:
    | "receptionist"
    | "nurse"
    | "lab-technician"
    | "pharmacist"
    | "administrator"
    | "janitor";
  email: string;
  phone: string;
  joinedDate: string;
  shift: "morning" | "evening" | "night" | "flexible";
  department: string;
  employeeId: string;
  status: "active" | "inactive" | "on-leave";
  salary?: number;
  image?: string;
}

const mockStaffs: Staff[] = [
  {
    id: "s1",
    name: "Alice Cooper",
    role: "receptionist",
    email: "alice.cooper@clinic.com",
    phone: "+1 (555) 100-1001",
    joinedDate: "2022-04-15",
    shift: "morning",
    department: "Front Desk",
    employeeId: "EMP-001",
    status: "active",
    salary: 35000,
  },
  {
    id: "s2",
    name: "Betty Morrison",
    role: "nurse",
    email: "betty.morrison@clinic.com",
    phone: "+1 (555) 100-1002",
    joinedDate: "2021-08-20",
    shift: "morning",
    department: "General Ward",
    employeeId: "EMP-002",
    status: "active",
    salary: 48000,
  },
  {
    id: "s3",
    name: "Charles Williams",
    role: "lab-technician",
    email: "charles.williams@clinic.com",
    phone: "+1 (555) 100-1003",
    joinedDate: "2023-01-10",
    shift: "flexible",
    department: "Laboratory",
    employeeId: "EMP-003",
    status: "active",
    salary: 42000,
  },
  {
    id: "s4",
    name: "Diana Foster",
    role: "pharmacist",
    email: "diana.foster@clinic.com",
    phone: "+1 (555) 100-1004",
    joinedDate: "2022-11-05",
    shift: "morning",
    department: "Pharmacy",
    employeeId: "EMP-004",
    status: "active",
    salary: 52000,
  },
  {
    id: "s5",
    name: "Edward Chen",
    role: "nurse",
    email: "edward.chen@clinic.com",
    phone: "+1 (555) 100-1005",
    joinedDate: "2021-03-18",
    shift: "evening",
    department: "Emergency",
    employeeId: "EMP-005",
    status: "active",
    salary: 50000,
  },
  {
    id: "s6",
    name: "Fiona Martinez",
    role: "administrator",
    email: "fiona.martinez@clinic.com",
    phone: "+1 (555) 100-1006",
    joinedDate: "2020-06-12",
    shift: "flexible",
    department: "Administration",
    employeeId: "EMP-006",
    status: "active",
    salary: 55000,
  },
  {
    id: "s7",
    name: "George Thompson",
    role: "receptionist",
    email: "george.thompson@clinic.com",
    phone: "+1 (555) 100-1007",
    joinedDate: "2023-02-28",
    shift: "evening",
    department: "Front Desk",
    employeeId: "EMP-007",
    status: "on-leave",
    salary: 36000,
  },
  {
    id: "s8",
    name: "Hannah Lee",
    role: "nurse",
    email: "hannah.lee@clinic.com",
    phone: "+1 (555) 100-1008",
    joinedDate: "2022-09-15",
    shift: "night",
    department: "ICU",
    employeeId: "EMP-008",
    status: "active",
    salary: 51000,
  },
  {
    id: "s9",
    name: "Ian Rodriguez",
    role: "lab-technician",
    email: "ian.rodriguez@clinic.com",
    phone: "+1 (555) 100-1009",
    joinedDate: "2021-12-01",
    shift: "evening",
    department: "Laboratory",
    employeeId: "EMP-009",
    status: "active",
    salary: 43000,
  },
  {
    id: "s10",
    name: "Julia Anderson",
    role: "janitor",
    email: "julia.anderson@clinic.com",
    phone: "+1 (555) 100-1010",
    joinedDate: "2023-05-20",
    shift: "night",
    department: "Maintenance",
    employeeId: "EMP-010",
    status: "inactive",
    salary: 28000,
  },
];

const roleFilters = [
  "All Roles",
  "receptionist",
  "nurse",
  "lab-technician",
  "pharmacist",
  "administrator",
  "janitor",
];

const shiftFilters = ["All Shifts", "morning", "evening", "night", "flexible"];

const statusFilters = ["All Status", "active", "inactive", "on-leave"];

const StaffsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedShift, setSelectedShift] = useState("All Shifts");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  // Filter staffs
  const filteredStaffs = mockStaffs.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      selectedRole === "All Roles" || staff.role === selectedRole;
    const matchesShift =
      selectedShift === "All Shifts" || staff.shift === selectedShift;
    const matchesStatus =
      selectedStatus === "All Status" || staff.status === selectedStatus;
    return matchesSearch && matchesRole && matchesShift && matchesStatus;
  });

  // Calculate stats
  const totalStaffs = mockStaffs.length;
  const activeStaffs = mockStaffs.filter((s) => s.status === "active").length;
  const onLeaveStaffs = mockStaffs.filter(
    (s) => s.status === "on-leave",
  ).length;
  const departments = new Set(mockStaffs.map((s) => s.department)).size;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="gap-1 bg-green-500">
            <CheckCircle2 className="h-3 w-3" />
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="secondary" className="gap-1">
            <XCircle className="h-3 w-3" />
            Inactive
          </Badge>
        );
      case "on-leave":
        return (
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            On Leave
          </Badge>
        );
      default:
        return null;
    }
  };

  const getRoleBadge = (role: string) => {
    const roleConfig: Record<
      string,
      { color: string; icon: React.ElementType }
    > = {
      receptionist: {
        color: "bg-blue-100 text-blue-700 border-blue-200",
        icon: UserCog,
      },
      nurse: {
        color: "bg-pink-100 text-pink-700 border-pink-200",
        icon: Users,
      },
      "lab-technician": {
        color: "bg-purple-100 text-purple-700 border-purple-200",
        icon: Briefcase,
      },
      pharmacist: {
        color: "bg-green-100 text-green-700 border-green-200",
        icon: Shield,
      },
      administrator: {
        color: "bg-orange-100 text-orange-700 border-orange-200",
        icon: Shield,
      },
      janitor: {
        color: "bg-gray-100 text-gray-700 border-gray-200",
        icon: Users,
      },
    };

    const config = roleConfig[role];
    const Icon = config?.icon || Users;

    return (
      <Badge variant="outline" className={config?.color || ""}>
        <Icon className="mr-1 h-3 w-3" />
        {role
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")}
      </Badge>
    );
  };

  const getShiftBadge = (shift: string) => {
    const colors: Record<string, string> = {
      morning: "bg-yellow-100 text-yellow-700 border-yellow-200",
      evening: "bg-orange-100 text-orange-700 border-orange-200",
      night: "bg-indigo-100 text-indigo-700 border-indigo-200",
      flexible: "bg-green-100 text-green-700 border-green-200",
    };

    return (
      <Badge variant="outline" className={colors[shift] || ""}>
        {shift.charAt(0).toUpperCase() + shift.slice(1)}
      </Badge>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Members</h1>
          <p className="text-muted-foreground">
            Manage and view all clinic staff members
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add New Staff
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStaffs}</div>
            <p className="text-xs text-muted-foreground">All employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeStaffs}</div>
            <p className="text-xs text-muted-foreground">Currently working</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onLeaveStaffs}</div>
            <p className="text-xs text-muted-foreground">Temporarily away</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments}</div>
            <p className="text-xs text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, employee ID, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            {roleFilters.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedShift} onValueChange={setSelectedShift}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Shift" />
          </SelectTrigger>
          <SelectContent>
            {shiftFilters.map((shift) => (
              <SelectItem key={shift} value={shift}>
                {shift === "All Shifts"
                  ? shift
                  : shift.charAt(0).toUpperCase() + shift.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusFilters.map((status) => (
              <SelectItem key={status} value={status}>
                {status === "All Status"
                  ? status
                  : status
                      .split("-")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredStaffs.length}</span>{" "}
          of <span className="font-medium">{totalStaffs}</span> staff members
        </p>
        {(searchQuery ||
          selectedRole !== "All Roles" ||
          selectedShift !== "All Shifts" ||
          selectedStatus !== "All Status") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedRole("All Roles");
              setSelectedShift("All Shifts");
              setSelectedStatus("All Status");
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Staffs Table */}
      <Card>
        <CardContent className="p-0">
          {filteredStaffs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaffs.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={staff.image} alt={staff.name} />
                          <AvatarFallback>
                            {getInitials(staff.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{staff.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {staff.employeeId}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(staff.role)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs">{staff.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs">{staff.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium">{staff.department}</p>
                    </TableCell>
                    <TableCell>{getShiftBadge(staff.shift)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {formatDate(staff.joinedDate)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(staff.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Staff
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            View Schedule
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            Manage Permissions
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Staff
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Users className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No staff found</h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
                We couldn't find any staff members matching your search
                criteria. Try adjusting your filters.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedRole("All Roles");
                  setSelectedShift("All Shifts");
                  setSelectedStatus("All Status");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffsList;
