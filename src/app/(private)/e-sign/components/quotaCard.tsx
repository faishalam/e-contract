'use client';
// import { AreaChart } from '@mui/icons-material';
import { LinearProgress, Box } from '@mui/material';

type QuotaCardProps = {
  title: string;
  value?: number | string;
  total?: number;
  percentage?: number;
  description?: string;
  renewalText?: string;
  icon?: React.ReactNode;
  accentColor?: string;
  linkText?: string;
  linkHref?: string;
  chartData?: number[];
};

export default function QuotaCard({
  title,
  value,
  total,
  percentage,
  description,
  renewalText,
  icon,
  accentColor = '#3b82f6',
  linkText,
  linkHref,
  chartData,
}: QuotaCardProps) {
  return (
    <div className="rounded-md bg-white p-4 shadow border border-gray-200">
      <div className="flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-600">{title}</p>
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
            {icon}
          </div>
        </div>

        <div className="text-2xl font-bold text-gray-900 mb-2">
          {value} {total && <span className="text-sm font-normal">of {total} total</span>}
        </div>

        {percentage !== undefined && (
          <Box sx={{ width: '100%', mb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                height: 8,
                borderRadius: 5,
                [`& .MuiLinearProgress-bar`]: {
                  backgroundColor: accentColor,
                },
              }}
            />
            <p className="text-xs text-gray-500 mt-1">{percentage}% used this month</p>
          </Box>
        )}

        {description && <p className="text-xs text-gray-600">{description}</p>}

        {renewalText && (
          <p className="text-xs text-gray-600 mt-1">
            Monthly renewal: <span className="font-semibold">{renewalText}</span>
          </p>
        )}

        {chartData && (
          <div className="mt-2">
            {/* <AreaChart
              height={70}
              series={[{ data: [5, 10, 8, 12, 15], area: true, color: '#f46e31' }]}
              xAxis={[{ scaleType: 'point', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] }]}
              margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
              grid={{ horizontal: false, vertical: false }}
            /> */}
          </div>
        )}

        {linkText && linkHref && (
          <a href={linkHref} className="text-xs text-orange-500 font-medium mt-2">
            {linkText} →
          </a>
        )}
      </div>
    </div>
  );
}
