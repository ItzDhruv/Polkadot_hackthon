import React from 'react';
import { Wallet } from 'lucide-react';
import { formatCryptoCurrency } from '../lib/utils';
import { Balance } from '../types';

interface AccountHeaderProps {
  balance: Balance;
  onTopUp: () => void;
}

const AccountHeader: React.FC<AccountHeaderProps> = ({ balance, onTopUp }) => {
  return (
    <div className="bg-white border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-4">
          <div>
            <h1 className="text-xl font-semibold text-neutral-900">Developer Console</h1>
            <p className="text-sm text-neutral-500">Manage your Cere Network resources</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="bg-neutral-50 rounded-lg p-3 flex items-center gap-2">
              <div className="p-2 rounded-full bg-primary-100 text-primary-600">
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-neutral-500">Available Balance</div>
                <div className="font-semibold text-primary-700">
                  {formatCryptoCurrency(balance.available)}
                </div>
              </div>
            </div>
            
            <button
              onClick={onTopUp}
              className="btn-primary"
            >
              Top Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;