import React from 'react';
import { Component } from '../components/component/component.tsx'; 
import { Badge } from '../components/ui/badge'; // Adjust the import paths as needed for other components
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { DropdownMenu } from '../components/ui/dropdown-menu';
import { Input } from '../components/ui/input';
import { Table } from '../components/ui/table';

const Page = () => {
  return (
    <div>
      <Component />
      <Badge /> {/* Example usage of Badge component */}
      <Button /> {/* Example usage of Button component */}
      <Card /> {/* Example usage of Card component */}
      <DropdownMenu /> {/* Example usage of DropdownMenu component */}
      <Input /> {/* Example usage of Input component */}
      <Table /> {/* Example usage of Table component */}
    </div>
  );
};

export default Page;