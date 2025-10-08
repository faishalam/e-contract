import { useState, useMemo } from 'react';
import { Add, Remove } from '@mui/icons-material';
import useEsign from '../hooks';

export default function PurchaseQuota() {
  const { quotaOptions } = useEsign();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    esign: 100,
    estamp: 50,
  });

  const handleChange = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const totalAmount = useMemo(() => {
    return quotaOptions.reduce((sum, q) => sum + (quantities[q.id] || 0) * q.unitPrice, 0);
  }, [quantities, quotaOptions]);

  const summary = useMemo(() => {
    return quotaOptions.map(q => `${quantities[q.id] || 0} ${q.name.split(' ')[0]}`).join(' + ');
  }, [quantities, quotaOptions]);

  return (
    <div className="w-full">
      <h2 className="text-lg font-bold text-black mb-4">Purchase Additional Quota</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quotaOptions.map(q => {
          const qty = quantities[q.id] || 0;
          const subtotal = qty * q.unitPrice;

          return (
            <div
              key={q.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center border rounded-lg p-4 gap-4"
            >
              <div className="flex gap-3 items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${q.iconBg}`}
                >
                  <span className={q.iconColor}>⚡</span>
                </div>
                <div>
                  <div className="font-semibold text-black">{q.name}</div>
                  <div className="text-sm text-gray-500">{q.description}</div>
                </div>
              </div>

              <div className="w-full sm:w-auto">
                <div className="text-black font-bold">
                  Rp {q.unitPrice.toLocaleString('id-ID')}
                  <span className="text-sm font-normal text-gray-500">/per unit</span>
                </div>

                <div className="flex items-center justify-end mt-2 gap-2">
                  <button
                    className="w-8 h-8 text-black flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shrink-0"
                    onClick={() => handleChange(q.id, -1)}
                    aria-label="Decrease quantity"
                  >
                    <Remove fontSize="small" />
                  </button>
                  <input
                    type="number"
                    value={qty}
                    readOnly
                    className="w-16 text-center border rounded px-2 py-1 text-black"
                  />
                  <button
                    className="w-8 h-8 text-black flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shrink-0"
                    onClick={() => handleChange(q.id, 1)}
                    aria-label="Increase quantity"
                  >
                    <Add fontSize="small" />
                  </button>
                </div>

                <div className="mt-2 text-black font-semibold text-right">
                  Rp {subtotal.toLocaleString('id-ID')}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="font-semibold text-black">Total Amount</div>
          <div className="text-gray-500 text-sm">{summary}</div>
        </div>
        <div className="font-bold text-xl text-black">Rp {totalAmount.toLocaleString('id-ID')}</div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
        <button className="px-6 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
          Cancel
        </button>
        <button className="px-6 py-2 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
