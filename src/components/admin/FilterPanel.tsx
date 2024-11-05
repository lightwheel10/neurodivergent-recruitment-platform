'use client';

import React from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DiagnosisType, MBTIType, DISCType } from '@/types/candidate';
import { X } from 'lucide-react';
import { cn } from "@/lib/utils";

interface FilterOptions {
  shortTermRange: [number, number];
  longTermRange: [number, number];
  severityRange: [number, number];
  diagnosis: DiagnosisType | 'all';
  diagnosis2: DiagnosisType | 'all';
  mbtiType: MBTIType | 'all';
  discType: DISCType | 'all';
  minOffice: [number, number];
  minWFH: [number, number];
  diagnosisPosition?: 'any' | 'primary' | 'secondary';
}

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

const defaultFilters: FilterOptions = {
  shortTermRange: [0, 5],
  longTermRange: [0, 5],
  severityRange: [0, 5],
  diagnosis: 'all',
  diagnosis2: 'all',
  mbtiType: 'all',
  discType: 'all',
  minOffice: [0, 5],
  minWFH: [0, 5],
  diagnosisPosition: 'any',
};

export function FilterPanel({ filters, onFilterChange, onReset }: FilterPanelProps) {
  const handleRangeChange = (
    field: keyof FilterOptions,
    index: 0 | 1,
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    const currentRange = filters[field] as [number, number];
    const newRange: [number, number] = [...currentRange];
    newRange[index] = Math.min(Math.max(numValue, 0), 5);

    if (index === 0 && newRange[0] > newRange[1]) {
      newRange[1] = newRange[0];
    } else if (index === 1 && newRange[1] < newRange[0]) {
      newRange[0] = newRange[1];
    }

    onFilterChange({ ...filters, [field]: newRange });
  };

  const getRangeValue = (field: keyof FilterOptions, index: 0 | 1): number => {
    const range = filters[field] as [number, number];
    return range[index];
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Filters</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onReset}
            className="h-7 text-xs hover:bg-gray-50 text-gray-600"
          >
            <X className="h-3 w-3 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Primary Filters - More Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* Primary and Secondary Diagnosis Filters */}
          <div className="space-y-1">
            <Label className="text-xs font-medium text-gray-700">Diagnoses</Label>
            <div className="grid grid-cols-2 gap-2">
              {/* Primary Diagnosis */}
              <div>
                <Select
                  value={filters.diagnosis}
                  onValueChange={(value) => 
                    onFilterChange({ ...filters, diagnosis: value as DiagnosisType | 'all' })
                  }
                >
                  <SelectTrigger className="h-8 text-sm w-full bg-white border-gray-200 hover:bg-gray-50 text-gray-900">
                    <SelectValue placeholder="Primary" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem className="text-sm text-gray-900" value="all">All Primary</SelectItem>
                    <SelectItem className="text-sm text-gray-900" value="ADHD">ADHD</SelectItem>
                    <SelectItem className="text-sm text-gray-900" value="Bipolar">Bipolar</SelectItem>
                    <SelectItem className="text-sm text-gray-900" value="PTSD">PTSD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Secondary Diagnosis */}
              <div>
                <Select
                  value={filters.diagnosis2}
                  onValueChange={(value) => 
                    onFilterChange({ ...filters, diagnosis2: value as DiagnosisType | 'all' })
                  }
                >
                  <SelectTrigger className="h-8 text-sm w-full bg-white border-gray-200 hover:bg-gray-50 text-gray-900">
                    <SelectValue placeholder="Secondary" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem className="text-sm text-gray-900" value="all">All Secondary</SelectItem>
                    <SelectItem className="text-sm text-gray-900" value="ADHD">ADHD</SelectItem>
                    <SelectItem className="text-sm text-gray-900" value="Bipolar">Bipolar</SelectItem>
                    <SelectItem className="text-sm text-gray-900" value="PTSD">PTSD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* MBTI Type */}
          <div className="space-y-1">
            <Label className="text-xs font-medium text-gray-700">MBTI Type</Label>
            <Select
              value={filters.mbtiType}
              onValueChange={(value) => 
                onFilterChange({ ...filters, mbtiType: value as MBTIType | 'all' })
              }
            >
              <SelectTrigger className="h-8 text-sm w-full bg-white border-gray-200 hover:bg-gray-50 text-gray-900">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem className="text-sm text-gray-900" value="all">All Types</SelectItem>
                {[
                  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
                  'ISTP', 'ISFP', 'INFP', 'INTP',
                  'ESTP', 'ESFP', 'ENFP', 'ENTP',
                  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
                ].map(type => (
                  <SelectItem className="text-sm text-gray-900" key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* DISC Type */}
          <div className="space-y-1">
            <Label className="text-xs font-medium text-gray-700">DISC Type</Label>
            <Select
              value={filters.discType}
              onValueChange={(value) => 
                onFilterChange({ ...filters, discType: value as DISCType | 'all' })
              }
            >
              <SelectTrigger className="h-8 text-sm w-full bg-white border-gray-200 hover:bg-gray-50 text-gray-900">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem className="text-sm text-gray-900" value="all">All Types</SelectItem>
                <SelectItem className="text-sm text-gray-900" value="D">D - Dominance</SelectItem>
                <SelectItem className="text-sm text-gray-900" value="I">I - Influence</SelectItem>
                <SelectItem className="text-sm text-gray-900" value="S">S - Steadiness</SelectItem>
                <SelectItem className="text-sm text-gray-900" value="C">C - Conscientiousness</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Combined Assessment Scores and Work Preferences in one line */}
        <div className="border-t border-gray-100 pt-3">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {/* Assessment Scores */}
            {[
              { label: 'Short Term', field: 'shortTermRange' },
              { label: 'Long Term', field: 'longTermRange' },
              { label: 'Severity', field: 'severityRange' }
            ].map(({ label, field }) => (
              <div key={field} className="space-y-1">
                <Label className="text-xs font-medium text-gray-700">{label}</Label>
                <div className="flex items-center gap-1 bg-gray-50 p-1.5 rounded-md">
                  <Input
                    type="number"
                    min={0}
                    max={5}
                    value={getRangeValue(field as keyof FilterOptions, 0)}
                    onChange={(e) => handleRangeChange(field as keyof FilterOptions, 0, e.target.value)}
                    className="h-7 w-12 text-sm text-center bg-white text-gray-900"
                    placeholder="Min"
                  />
                  <span className="text-xs text-gray-400">to</span>
                  <Input
                    type="number"
                    min={0}
                    max={5}
                    value={getRangeValue(field as keyof FilterOptions, 1)}
                    onChange={(e) => handleRangeChange(field as keyof FilterOptions, 1, e.target.value)}
                    className="h-7 w-12 text-sm text-center bg-white text-gray-900"
                    placeholder="Max"
                  />
                </div>
              </div>
            ))}

            {/* Work Preferences */}
            {[
              { label: 'Office Days', field: 'minOffice' },
              { label: 'WFH Days', field: 'minWFH' }
            ].map(({ label, field }) => (
              <div key={field} className="space-y-1">
                <Label className="text-xs font-medium text-gray-700">{label}</Label>
                <div className="flex items-center gap-1 bg-gray-50 p-1.5 rounded-md">
                  <Input
                    type="number"
                    min={0}
                    max={5}
                    value={getRangeValue(field as keyof FilterOptions, 0)}
                    onChange={(e) => handleRangeChange(field as keyof FilterOptions, 0, e.target.value)}
                    className="h-7 w-12 text-sm text-center bg-white text-gray-900"
                    placeholder="Min"
                  />
                  <span className="text-xs text-gray-400">to</span>
                  <Input
                    type="number"
                    min={0}
                    max={5}
                    value={getRangeValue(field as keyof FilterOptions, 1)}
                    onChange={(e) => handleRangeChange(field as keyof FilterOptions, 1, e.target.value)}
                    className="h-7 w-12 text-sm text-center bg-white text-gray-900"
                    placeholder="Max"
                  />
                  <span className="text-xs text-gray-500">d/w</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { type FilterOptions, defaultFilters }; 