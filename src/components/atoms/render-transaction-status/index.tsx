import { useMemo } from 'react';

type RenderTransactionStatusProps = {
  status: string;
};

const RenderTransactionStatus: React.FC<RenderTransactionStatusProps> = ({ status }) => {
  const statusClassName = useMemo(() => {
    const normalizedStatus = status?.toLowerCase();

    switch (normalizedStatus) {
      // Status States
      case 'active':
        return 'bg-[#d1fae5] text-[#065f46]';
      case 'inactive':
        return 'bg-[#fee2e2] text-[#991b1b]';
      case 'pending':
        return 'bg-[#fef3c7] text-[#92400e]';
      case 'trial':
        return 'bg-[#dbeafe] text-[#1e40af]';

      // Plan Types
      case 'basic':
        return 'bg-[#f3f4f6] text-[#374151]';
      case 'professional':
        return 'bg-[#dbeafe] text-[#1e40af]';
      case 'premium':
        return 'bg-[#ede9fe] text-[#6b21a8]';
      case 'enterprise':
        return 'bg-[#fce7f3] text-[#9f1239]';

      default:
        return 'bg-[#e6e7eb] text-black';
    }
  }, [status]);

  const setText = useMemo(() => {
    const normalizedStatus = status?.toLowerCase();

    switch (normalizedStatus) {
      // Status States
      case 'active':
        return 'Aktif';
      case 'inactive':
        return 'Tidak Aktif';
      case 'pending':
        return 'Menunggu';
      case 'trial':
        return 'Trial';

      // Plan Types
      case 'basic':
        return 'Basic';
      case 'professional':
        return 'Professional Plan';
      case 'premium':
        return 'Premium';
      case 'enterprise':
        return 'Enterprise';

      default:
        return status || 'Unknown';
    }
  }, [status]);

  const dotColor = useMemo(() => {
    const normalizedStatus = status?.toLowerCase();

    switch (normalizedStatus) {
      case 'active':
        return '#065f46';
      case 'inactive':
        return '#991b1b';
      case 'pending':
        return '#92400e';
      case 'trial':
        return '#1e40af';
      case 'basic':
        return '#374151';
      case 'professional':
        return '#1e40af';
      case 'premium':
        return '#6b21a8';
      case 'enterprise':
        return '#9f1239';
      default:
        return '#000000';
    }
  }, [status]);

  return (
    <small
      className={`${statusClassName} rounded-full px-2 py-1 text-xs font-medium inline-flex items-center gap-2`}
    >
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dotColor }} />
      {setText}
    </small>
  );
};

export default RenderTransactionStatus;
