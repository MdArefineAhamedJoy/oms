import {
  AlertTriangle,
  MapPin,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getIncidentStatusColor, getSeverityColor } from '@/lib/status-utils';
import { cn } from '@/lib/utils';

interface IncidentData {
  documentId: string;
  title: string;
  site: string;
  time: string;
  severity: string;
  status: string;
}

interface RecentIncidentsProps {
  incidents: IncidentData[];
}

export default function RecentIncidents({ incidents }: RecentIncidentsProps) {
  return (
    <Card className="p-4 bg-white h-full flex flex-col">
      <div className="flex justify-between items-center ">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Incidents
        </h2>
        {/* <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-700 cursor-pointer"
          onClick={() => route.push('/om/incidents')}
        >
          View All
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button> */}
      </div>
      <div className="flex-1 overflow-y-auto">
        {incidents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No recent incidents to display
          </div>
        ) : (
          <div className="space-y-2">
            {incidents.map((incident) => (
              <div
                key={incident.documentId}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <h3 className="font-medium text-gray-900">
                    {incident.title}
                  </h3>
                  <Badge
                    className={cn(
                      'border',
                      getSeverityColor(incident.severity),
                    )}
                  >
                    {incident.severity}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {incident.site}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {incident.time}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getIncidentStatusColor(incident.status)}>
                  {incident.status === 'reported' && 'Reported'}
                  {incident.status === 'acknowledged' && 'Acknowledged'}
                  {incident.status === 'investigating' && 'Investigating'}
                  {incident.status === 'resolved' && 'Resolved'}
                </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
