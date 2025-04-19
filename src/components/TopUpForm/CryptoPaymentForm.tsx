import React, { useState } from 'react';
import { Copy, ExternalLink, QrCode, Wallet } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Select, { SelectOption } from '../ui/Select';
import { CryptoNetwork, CryptoToken } from '../../types';
import Alert from '../ui/Alert';

interface CryptoPaymentFormProps {
  token: CryptoToken;
  onTokenChange: (token: CryptoToken) => void;
  amount: number;
}

const networkOptions: SelectOption[] = [
  { value: 'ethereum', label: 'Ethereum (ERC-20)' },
  { value: 'bsc', label: 'Binance Smart Chain (BEP-20)' },
  { value: 'polygon', label: 'Polygon' },
  { value: 'avalanche', label: 'Avalanche' },
];

const tokenOptions: SelectOption[] = [
  { value: 'USDC', label: 'USDC' },
  { value: 'USDT', label: 'USDT' },
  { value: 'DAI', label: 'DAI' },
];

const CryptoPaymentForm: React.FC<CryptoPaymentFormProps> = ({ 
  token, 
  onTokenChange,
  amount,
}) => {
  const [network, setNetwork] = useState<CryptoNetwork>('ethereum');
  const [copied, setCopied] = useState(false);
  
  // Mock wallet address based on selected network
  const walletAddresses = {
    ethereum: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
    bsc: '0xabcdef1234567890abcdef1234567890abcdef12',
    polygon: '0x9876543210abcdef9876543210abcdef98765432',
    avalanche: '0x0123456789abcdef0123456789abcdef01234567',
  };
  
  const walletAddress = walletAddresses[network];
  
  const handleNetworkChange = (value: string) => {
    setNetwork(value as CryptoNetwork);
  };
  
  const handleTokenChange = (value: string) => {
    onTokenChange(value as CryptoToken);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-neutral-900">Crypto Payment Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Token"
          options={tokenOptions}
          value={token}
          onChange={handleTokenChange}
        />
        
        <Select
          label="Network"
          options={networkOptions}
          value={network}
          onChange={handleNetworkChange}
          helperText="Select the network you want to use for payment"
        />
      </div>
      
      <Alert variant="warning" title="Important">
        Only send {token} on the {networkOptions.find(n => n.value === network)?.label} network.
        Sending tokens on the wrong network may result in permanent loss.
      </Alert>
      
      <Card className="p-5 border-2 border-dashed border-neutral-300">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="bg-neutral-100 p-4 rounded-lg flex-shrink-0 flex items-center justify-center">
            <QrCode className="h-24 w-24 text-neutral-700" />
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <p className="text-sm text-neutral-500 mb-1">Send exactly this amount:</p>
              <p className="text-xl font-semibold">{amount} {token}</p>
            </div>
            
            <div>
              <p className="text-sm text-neutral-500 mb-1">To this address:</p>
              <div className="flex items-center gap-2">
                <div className="bg-neutral-50 p-2 rounded border border-neutral-200 text-sm font-mono break-all">
                  {walletAddress}
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="p-2 text-neutral-500 hover:text-primary-500"
                  title="Copy address"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              {copied && (
                <p className="text-xs text-success-600 mt-1">Address copied to clipboard!</p>
              )}
            </div>
          </div>
        </div>
      </Card>
      
      <div className="text-sm text-neutral-600">
        <p className="mb-2">After sending payment:</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Your transaction will be automatically detected</li>
          <li>Your account will be credited after network confirmation (1-6 blocks)</li>
          <li>You'll receive an email confirmation once completed</li>
        </ol>
      </div>
      
      <div className="flex space-x-3">
        <Button 
          variant="secondary"
          leftIcon={<ExternalLink className="h-4 w-4" />}
          className="flex-1"
        >
          View on Block Explorer
        </Button>
        
        <Button 
          variant="primary"
          leftIcon={<Wallet className="h-4 w-4" />}
          className="flex-1"
        >
          I've sent the payment
        </Button>
      </div>
    </div>
  );
};

export default CryptoPaymentForm;