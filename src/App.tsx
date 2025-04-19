import React, { useState } from 'react';
import TopUpForm from './components/TopUpForm/TopUpForm';
import AppLayout from './layout/AppLayout';
import { Balance } from './types';

function App() {
  const [showTopUp, setShowTopUp] = useState(false);
  const [balance, setBalance] = useState<Balance>({
    available: 100.0,
    pending: 0.0,
  });
  
  const handleOpenTopUp = () => {
    setShowTopUp(true);
  };
  
  const handleCloseTopUp = () => {
    setShowTopUp(false);
  };
  
  const handleTopUpComplete = () => {
    // In a real implementation, this would fetch the updated balance from the backend
    setBalance({
      available: balance.available + 200, // Just a mock update
      pending: balance.pending,
    });
    setShowTopUp(false);
  };
  
  return (
    <div className="min-h-screen bg-neutral-50">
      {showTopUp ? (
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-neutral-900">Top Up Your Account</h1>
            <p className="text-neutral-600 mt-1">
              Add funds to your Cere Network account to pay for services and resources
            </p>
          </div>
          
          <TopUpForm 
            onComplete={handleTopUpComplete}
            onCancel={handleCloseTopUp}
          />
        </div>
      ) : (
        <AppLayout 
          balance={balance}
          onTopUp={handleOpenTopUp}
        >
          <div className="p-8 bg-white rounded-lg shadow-sm">
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Welcome to Cere Developer Console</h2>
              <p className="text-neutral-600 max-w-lg mx-auto mb-8">
                Manage your decentralized infrastructure, monitor your resources, and scale your applications with ease.
              </p>
              <button
                onClick={handleOpenTopUp}
                className="btn-primary"
              >
                Top Up Your Account
              </button>
            </div>
          </div>
        </AppLayout>
      )}
    </div>
  );
}

export default App;