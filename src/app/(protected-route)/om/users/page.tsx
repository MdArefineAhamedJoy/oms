import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreVertical, Mail, Phone, MapPin, Clock } from "lucide-react";
import DataTable, { Column } from "@/components/DataTable";

type Row = {
  id: string;
  name: string;
  userId: string;
  email: string;
  phone: string;
  role: string;
  site: string;
  status: string;
  lastActive: string;
  avatarColor: string;
};

const data: Row[] = [
  { id: "1", name: "Eaint27855 Officer", userId: "OF-01", email: "samkeann7855@gmail.com", phone: "+959976234333", role: "OFFICER", site: "HarbourFront Tower", status: "ACTIVE", lastActive: "Never", avatarColor: "bg-blue-100 text-blue-700" },
  { id: "2", name: "fariha [Officer] Prod", userId: "OF-09", email: "fariha45718@gmail.com", phone: "01852055416", role: "OFFICER", site: "HarbourFront Tower +7 more", status: "ACTIVE", lastActive: "Never", avatarColor: "bg-blue-100 text-blue-700" },
  { id: "3", name: "Khaing Khaing", userId: "N/A", email: "userone@gmail.com", phone: "65600600", role: "OFFICER", site: "Unassigned", status: "ACTIVE", lastActive: "Never", avatarColor: "bg-blue-100 text-blue-700" },
  { id: "4", name: "Eaint [OM]", userId: "GRD-001", email: "eainthanni27@gmail.com", phone: "+6533333333", role: "OM", site: "JTC CleanTech One", status: "ACTIVE", lastActive: "Never", avatarColor: "bg-purple-100 text-purple-700" },
  { id: "5", name: "Sai Sai", userId: "N/A", email: "sai@nexbe.sg", phone: "+66653437233", role: "OFFICER", site: "CityHub Mall", status: "ACTIVE", lastActive: "Never", avatarColor: "bg-blue-100 text-blue-700" },
];

const columns: Column<Row>[] = [
  {
    key: "user",
    header: "User",
    className: "min-w-[260px]",
    cell: (row) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback className={row.avatarColor}>{row.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-zinc-900">{row.name}</div>
          <div className="text-xs text-zinc-500">ID: {row.userId}</div>
        </div>
      </div>
    ),
  },
  {
    key: "contact",
    header: "Contact",
    className: "min-w-[260px]",
    cell: (row) => (
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-sm text-zinc-700">
          <Mail className="h-3.5 w-3.5 text-zinc-400" />
          {row.email}
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-700">
          <Phone className="h-3.5 w-3.5 text-zinc-400" />
          {row.phone}
        </div>
      </div>
    ),
  },
  {
    key: "role",
    header: "Role",
    className: "min-w-[110px]",
    cell: (row) => (
      <Badge
        variant="secondary"
        className={row.role === "OM" ? "bg-purple-100 text-purple-700 border-none px-3 py-1 font-semibold text-xs rounded-md hover:bg-purple-100" : "bg-blue-100 text-blue-700 border-none px-3 py-1 font-semibold text-xs rounded-md hover:bg-blue-100"}
      >
        {row.role}
      </Badge>
    ),
  },
  {
    key: "site",
    header: "Assigned Site",
    className: "min-w-[240px]",
    cell: (row) => (
      <div className="flex items-center gap-2 text-sm text-zinc-700">
        <MapPin className="h-4 w-4 text-zinc-400 " />
        <span className="line-clamp-1">{row.site}</span>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    className: "min-w-[120px]",
    cell: (row) => (
      <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-md w-fit">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
        <span className="text-xs font-bold">{row.status}</span>
      </div>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    className: "w-[60px] text-right",
    cell: () => (
      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900">
        <MoreVertical className="h-4 w-4" />
      </Button>
    ),
  },
];

export default function Page() {
  return (
    <main >
      <div>
        <div className="rounded-md border bg-white">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </main>
  );
}


