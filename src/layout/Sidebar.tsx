import React from 'react';
import { CreditCard, BarChart2, Settings, Users, Database, Server, HelpCircle } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive = false }) => {
  return (
    <a 
      href="#"
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
        isActive 
          ? 'bg-primary-50 text-primary-700' 
          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
      }`}
    >
      <span className="text-current">{icon}</span>
      <span>{label}</span>
    </a>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:block w-56 border-r border-neutral-200 p-4 bg-white">
      <div className="mb-6 pb-4 border-b border-neutral-200">
        <div className="flex items-center gap-2 px-3 py-1">
          <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
            C
          </div>
          <div className="font-semibold">Cere Network</div>
        </div>
      </div>
      
      <nav className="space-y-1">
        <NavItem icon={<BarChart2 className="h-4 w-4" />} label="Dashboard" />
        <NavItem icon={<Database className="h-4 w-4" />} label="DDC Storage" />
        <NavItem icon={<Server className="h-4 w-4" />} label="Computing" />
        <NavItem icon={<CreditCard className="h-4 w-4" />} label="Billing" isActive={true} />
        <NavItem icon={<Users className="h-4 w-4" />} label="Team" />
        <NavItem icon={<Settings className="h-4 w-4" />} label="Settings" />
        <NavItem icon={<HelpCircle className="h-4 w-4" />} label="Support" />
      </nav>
    </aside>
  );
};

export default Sidebar;