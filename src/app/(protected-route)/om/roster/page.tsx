'use client';

import React, { useState } from 'react';
import RosterTable from './components/RosterTable';
import RosterToolbar, { RosterHeaderActions } from './components/RosterToolbar';
import { ShiftTypeProvider } from '@/contexts/ShiftTypeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export default function RosterPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const [selectedCellsCount, setSelectedCellsCount] = useState(0);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const totalPages = 5; // Fake total pages

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthName = new Date(currentYear, currentMonth).toLocaleDateString(
    'en-US',
    {
      month: 'long',
      year: 'numeric',
    },
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 3;

    // Always show first page
    if (currentPage > maxVisiblePages) {
      buttons.push(
        <Button
          key={1}
          variant={1 === currentPage ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCurrentPage(1)}
          className="w-8 h-8 p-0"
        >
          1
        </Button>,
      );
      if (currentPage > maxVisiblePages + 1) {
        buttons.push(
          <Button
            key="dots1"
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0"
            disabled
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>,
        );
      }
    }

    // Show pages around current page
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    for (let i = start; i <= end; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === currentPage ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCurrentPage(i)}
          className="w-8 h-8 p-0"
        >
          {i}
        </Button>,
      );
    }

    // Always show last page
    if (currentPage < totalPages - maxVisiblePages + 1) {
      if (currentPage < totalPages - maxVisiblePages) {
        buttons.push(
          <Button
            key="dots2"
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0"
            disabled
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>,
        );
      }
      buttons.push(
        <Button
          key={totalPages}
          variant={totalPages === currentPage ? 'default' : 'outline'}
          size="sm"
          onClick={() => setCurrentPage(totalPages)}
          className="w-8 h-8 p-0"
        >
          {totalPages}
        </Button>,
      );
    }

    return buttons;
  };

  return (
    <ShiftTypeProvider>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">
              Security Guard Roster Planner
            </h3>
            <p className="text-sm text-muted-foreground">
              Manage guard shifts and schedules
            </p>
          </div>
          <RosterHeaderActions />
        </div>

        {/* Main Content */}
        <div>
          <Tabs defaultValue="roster" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="roster">Roster</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-4">
                {/* Month Navigation */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePreviousMonth}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="font-medium min-w-[150px] text-center">
                    {monthName}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextMonth}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Separator */}
                <div className="h-8 w-px bg-gray-300"></div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">Rows: 5</div>

                  {/* Page navigation */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className="h-8"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-1">
                      {renderPaginationButtons()}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="h-8"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Records info */}
                  <div className="text-sm text-gray-600">
                    {(currentPage - 1) * rowsPerPage + 1}-{currentPage * rowsPerPage} of {totalPages * rowsPerPage}
                  </div>
                </div>
              </div>
            </div>

            <TabsContent value="roster" className="space-y-4">
              <div className="bg-card rounded-lg border p-6">
                <RosterToolbar
                  selectedCellsCount={selectedCellsCount}
                  onClearSelection={() => setSelectedCellsCount(0)}
                  onCopyNextMonth={() => alert('Copied to next month!')}
                />
                <RosterTable
                  month={currentMonth}
                  year={currentYear}
                  daysInMonth={daysInMonth}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ShiftTypeProvider>
  );
}
