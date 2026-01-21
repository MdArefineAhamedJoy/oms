import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X, Calendar } from 'lucide-react';

interface AttendanceFiltersProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  siteFilter: string;
  setSiteFilter: (filter: string) => void;
  sites: string[];
  onClearFilters: () => void;
}

export default function AttendanceFilters({
  selectedDate,
  setSelectedDate,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  siteFilter,
  setSiteFilter,
  sites,
  onClearFilters,
}: AttendanceFiltersProps) {
  const hasActiveFilters = searchTerm || statusFilter !== 'all' || siteFilter !== 'all';

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="flex gap-3">
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="pl-10 w-[180px]"
          />
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-[250px]"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="PRESENT">Present</SelectItem>
            <SelectItem value="LATE">Late</SelectItem>
            <SelectItem value="ABSENT">Absent</SelectItem>
            <SelectItem value="EARLY_DEPARTURE">Early Departure</SelectItem>
          </SelectContent>
        </Select>

        <Select value={siteFilter} onValueChange={setSiteFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Site" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sites</SelectItem>
            {sites.map((site) => (
              <SelectItem key={site} value={site}>
                {site}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" onClick={onClearFilters} className="cursor-pointer">
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
