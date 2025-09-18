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
  }, [quantities]);

  const summary = useMemo(() => {
    return quotaOptions.map(q => `${quantities[q.id] || 0} ${q.name.split(' ')[0]}`).join(' + ');
  }, [quantities]);

  return (
    <>
      <div className="w-full h-full">
        <h2 className="text-lg font-bold text-black mb-4">Purchase Additional Quota</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quotaOptions.map(q => {
            const qty = quantities[q.id] || 0;
            const subtotal = qty * q.unitPrice;

            return (
              <div key={q.id} className="flex justify-between items-center border rounded-lg p-4">
                <div className="flex gap-3 items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${q.iconBg}`}
                  >
                    <span className={q.iconColor}>⚡</span>
                  </div>
                  <div>
                    <div className="font-semibold text-black">{q.name}</div>
                    <div className="text-sm text-gray-500">{q.description}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-black font-bold">
                    Rp {q.unitPrice.toLocaleString('id-ID')}
                    <span className="text-sm font-normal text-gray-500">/per unit</span>
                  </div>

                  <div className="flex items-center justify-end mt-2">
                    <button
                      className="w-8 h-8 text-black flex items-center justify-center rounded-full bg-gray-100"
                      onClick={() => handleChange(q.id, -1)}
                    >
                      <Remove fontSize="small" />
                    </button>
                    <input
                      type="number"
                      value={qty}
                      readOnly
                      className="mx-2 text-black w-16 text-center border rounded"
                    />
                    <button
                      className="w-8 h-8 text-black flex items-center justify-center rounded-full bg-gray-100"
                      onClick={() => handleChange(q.id, 1)}
                    >
                      <Add fontSize="small" />´
                    </button>
                  </div>

                  <div className="mt-2 text-black">Rp {subtotal.toLocaleString('id-ID')}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded-md flex justify-between items-center">
          <div>
            <div className="font-semibold text-black">Total Amount</div>
            <div className="text-gray-500 text-sm">{summary}</div>
          </div>
          <div className="font-bold text-xl text-black">
            Rp {totalAmount.toLocaleString('id-ID')}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 rounded-md bg-gray-100 text-gray-700">Cancel</button>
          <button className="px-4 py-2 rounded-md bg-orange-500 text-white font-semibold">
            Proceed to Payment
          </button>
        </div>
      </div>
    </>
  );
}
