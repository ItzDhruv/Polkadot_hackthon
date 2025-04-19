import React, { ReactNode } from 'react';
import AccountHeader from './AccountHeader';
import Sidebar from './Sidebar';
import { Balance } from '../types';

interface AppLayoutProps {
  children: ReactNode;
  balance: Balance;
  onTopUp: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  balance,
  onTopUp 
}) => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <AccountHeader balance={balance} onTopUp={onTopUp} />
      
      <div className="flex-1 flex">
        <Sidebar />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;