// 'use client';

// import { useState, useEffect } from 'react';
// import {
//   DndContext,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from '@dnd-kit/core';
// import {
//   SortableContext,
//   useSortable,
//   arrayMove,
//   verticalListSortingStrategy,
// } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { motion } from 'framer-motion';
// import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { GripVertical, ArrowUp, ArrowDown, X, Plus } from 'lucide-react';

// const mockClients = [
//   {
//     id: 20,
//     name: 'John Doe',
//     email: 'johndoe@email.com',
//     createdAt: new Date('2023-10-01'),
//     updatedAt: new Date('2023-10-05'),
//     status: 'active',
//     type: 'individual',
//   },
//   {
//     id: 21,
//     name: 'Test Test',
//     email: 'test@test.com',
//     createdAt: new Date('2023-10-02'),
//     updatedAt: new Date('2023-10-06'),
//     status: 'inactive',
//     type: 'company',
//   },
//   {
//     id: 22,
//     name: 'Munks Test',
//     email: 'test@test.com',
//     createdAt: new Date('2023-10-02'),
//     updatedAt: new Date('2023-11-16'),
//     status: 'inactive',
//     type: 'company',
//   },
//   {
//     id: 23,
//     name: 'Chad Test',
//     email: 'test@test.com',
//     createdAt: new Date('2023-8-12'),
//     updatedAt: new Date('2023-10-06'),
//     status: 'inactive',
//     type: 'company',
//   },
// ];

// const ClientTable = () => {
//   const [clients] = useState(mockClients);
//   const [sortCriteria, setSortCriteria] = useState([]);
//   const [sortedClients, setSortedClients] = useState([]);

//   useEffect(() => {
//     const sorted = [...clients].sort((a, b) => {
//       for (const { field, direction } of sortCriteria) {
//         const aVal = a[field];
//         const bVal = b[field];

//         if (field === 'createdAt' || field === 'updatedAt') {
//           if (aVal.getTime() < bVal.getTime()) return direction === 'asc' ? -1 : 1;
//           if (aVal.getTime() > bVal.getTime()) return direction === 'asc' ? 1 : -1;
//         } else {
//           if (aVal < bVal) return direction === 'asc' ? -1 : 1;
//           if (aVal > bVal) return direction === 'asc' ? 1 : -1;
//         }
//       }
//       return 0;
//     });
//     setSortedClients(sorted);
//   }, [sortCriteria, clients]);

//   const addCriterion = (field) => {
//     if (!sortCriteria.some(c => c.field === field)) {
//       setSortCriteria([...sortCriteria, { field, direction: 'asc' }]);
//     }
//   };

//   const removeCriterion = (index) => {
//     setSortCriteria(sortCriteria.filter((_, i) => i !== index));
//   };

//   const toggleDirection = (index) => {
//     const updated = [...sortCriteria];
//     updated[index].direction = updated[index].direction === 'asc' ? 'desc' : 'asc';
//     setSortCriteria(updated);
//   };

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (over && active.id !== over.id) {
//       const oldIndex = sortCriteria.findIndex(c => c.field === active.id);
//       const newIndex = sortCriteria.findIndex(c => c.field === over.id);
//       setSortCriteria(arrayMove(sortCriteria, oldIndex, newIndex));
//     }
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-6">
//       <Card className="shadow-lg bg-gradient-to-r from-primary/5 to-primary/10">
//         <div className="p-6 space-y-1">
//           <h1 className="text-3xl font-bold tracking-tight text-primary">CREATEXP LABS</h1>
//           <p className="text-lg text-muted-foreground font-medium">Client Management System</p>
//         </div>
//       </Card>
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg font-semibold flex items-center gap-2">
//             <GripVertical className="h-5 w-5 text-muted-foreground" />
//             Sort Configuration
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <SortPanel
//             criteria={sortCriteria}
//             onAdd={addCriterion}
//             onRemove={removeCriterion}
//             onToggle={toggleDirection}
//             onDragEnd={handleDragEnd}
//           />
//         </CardContent>
//       </Card>

//       <Card className="shadow-lg">
//         <Table className="w-full border-collapse">
//           {/* Table Header */}
//           <TableHeader className="bg-muted/50">
//             <TableRow className="grid grid-cols-5 border-b-2 border-muted">
//               <TableHead className="p-4 text-left font-semibold border-r border-muted">Name</TableHead>
//               <TableHead className="p-4 text-left font-semibold border-r border-muted">Email</TableHead>
//               <TableHead className="p-4 text-center font-semibold border-r border-muted">Created At</TableHead>
//               <TableHead className="p-4 text-center font-semibold border-r border-muted">Updated At</TableHead>
//               <TableHead className="p-4 text-center font-semibold">Status</TableHead>
//             </TableRow>
//           </TableHeader>

//           {/* Table Body */}
//           <TableBody>
//             {sortedClients.map((client) => (
//               <TableRow key={client.id} className="grid grid-cols-5 border-b border-muted/50 hover:bg-muted/10">
//                 {/* Name */}
//                 <TableCell className="p-4 border-r border-muted/50">
//                   {client.name}
//                 </TableCell>

//                 {/* Email */}
//                 <TableCell className="p-4 border-r border-muted/50 text-ellipsis overflow-hidden">
//                   {client.email}
//                 </TableCell>

//                 {/* Created At */}
//                 <TableCell className="p-4 border-r border-muted/50 text-center">
//                   {client.createdAt.toLocaleDateString()}
//                 </TableCell>

//                 {/* Updated At */}
//                 <TableCell className="p-4 border-r border-muted/50 text-center">
//                   {client.updatedAt.toLocaleDateString()}
//                 </TableCell>

//                 {/* Status */}
//                 <TableCell className="text-base border border-muted/50 p-4">
//                   <Badge
//                     variant={client.status === 'active' ? 'default' : 'destructive'}
//                     className={`text-base shadow-sm ${client.status === 'active'
//                         ? 'bg-green-100 text-green-800 hover:bg-green-200'
//                         : 'bg-red-100 text-red-800 hover:bg-red-200'
//                       }`}
//                   >
//                     {client.status}
//                   </Badge>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Card>
//     </div>
//   );
// };

// const SortPanel = ({ criteria, onAdd, onRemove, onToggle, onDragEnd }) => {
//   const sensors = useSensors(useSensor(PointerSensor));
//   const [selectedField, setSelectedField] = useState('name');

//   return (
//     <div className="space-y-4">
//       <div className="flex gap-2 items-center">
//         <Select value={selectedField} onValueChange={setSelectedField}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Select field" />
//           </SelectTrigger>
//           <SelectContent>
//             {['name', 'createdAt', 'updatedAt', 'status'].map((field) => (
//               <SelectItem key={field} value={field}>
//                 {field.replace(/([A-Z])/g, ' $1').trim()}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         <Button onClick={() => onAdd(selectedField)} className="gap-2">
//           <Plus className="h-4 w-4" />
//           Add Sort
//         </Button>
//       </div>

//       <DndContext sensors={sensors} onDragEnd={onDragEnd}>
//         <SortableContext items={criteria} strategy={verticalListSortingStrategy}>
//           <motion.div layout className="space-y-2">
//             {criteria.map((criterion, index) => (
//               <SortableItem
//                 key={criterion.field}
//                 criterion={criterion}
//                 index={index}
//                 onToggle={() => onToggle(index)}
//                 onRemove={() => onRemove(index)}
//               />
//             ))}
//           </motion.div>
//         </SortableContext>
//       </DndContext>
//     </div>
//   );
// };

// const SortableItem = ({ criterion, index, onToggle, onRemove }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
//     id: criterion.field,
//   });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition: transition || undefined,
//   };

//   return (
//     <motion.div
//       ref={setNodeRef}
//       style={style}
//       className="flex items-center gap-3 p-3 bg-background rounded-lg border-2 border-muted/50 shadow-sm hover:shadow-md transition-shadow"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       layout
//     >
//       <Button
//         variant="ghost"
//         size="icon"
//         className="cursor-grab text-muted-foreground hover:bg-accent"
//         {...attributes}
//         {...listeners}
//       >
//         <GripVertical className="h-4 w-4" />
//       </Button>

//       <span className="font-medium capitalize flex-1 text-base">
//         {criterion.field.replace(/([A-Z])/g, ' $1').trim()}
//       </span>

//       <Button
//         variant="outline"
//         size="sm"
//         onClick={onToggle}
//         className="gap-1.5 text-base"
//       >
//         {criterion.direction === 'asc' ? (
//           <ArrowUp className="h-4 w-4" />
//         ) : (
//           <ArrowDown className="h-4 w-4" />
//         )}
//         {criterion.direction === 'asc' ? 'Asc' : 'Desc'}
//       </Button>

//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={onRemove}
//         className="text-muted-foreground hover:text-destructive"
//       >
//         <X className="h-4 w-4" />
//       </Button>
//     </motion.div>
//   );
// };

// export default ClientTable;

'use client';
const MotionTableRow = motion(TableRow);
import { useState, useEffect } from 'react';
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    useSortable,
    arrayMove,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GripVertical, ArrowUp, ArrowDown, X, Plus, Sparkles } from 'lucide-react';
import useSWR from 'swr';
import axios from 'axios';

interface Client {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    status: 'active' | 'inactive';
    type: 'individual' | 'company';
}

interface SortCriterion {
    field: keyof Client;
    direction: 'asc' | 'desc';
}

const fetcher = (url: string) => axios.get<Client[]>(url).then(res => res.data);

const ClientTable = () => {
    const { data: clients, mutate } = useSWR<Client[]>('/api/clients', fetcher);
    const [sortCriteria, setSortCriteria] = useState<SortCriterion[]>([]);
    const [sortedClients, setSortedClients] = useState<Client[]>([]);
    const [newClient, setNewClient] = useState<Partial<Client>>({
        name: '',
        email: '',
        status: 'active',
        type: 'individual'
    });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (clients) {
            const sorted = [...clients].sort((a, b) => {
                for (const { field, direction } of sortCriteria) {
                    const aVal = a[field];
                    const bVal = b[field];

                    if (aVal instanceof Date && bVal instanceof Date) {
                        if (aVal.getTime() < bVal.getTime()) return direction === 'asc' ? -1 : 1;
                        if (aVal.getTime() > bVal.getTime()) return direction === 'asc' ? 1 : -1;
                    } else {
                        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
                        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
                    }
                }
                return 0;
            });
            setSortedClients(sorted);
        }
    }, [sortCriteria, clients]);

    const addCriterion = (field: keyof Client) => {
        if (!sortCriteria.some(c => c.field === field)) {
            setSortCriteria([...sortCriteria, { field, direction: 'asc' }]);
        }
    };

    const removeCriterion = (index: number) => {
        setSortCriteria(sortCriteria.filter((_, i) => i !== index));
    };

    const toggleDirection = (index: number) => {
        const updated = [...sortCriteria];
        updated[index].direction = updated[index].direction === 'asc' ? 'desc' : 'asc';
        setSortCriteria(updated);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = sortCriteria.findIndex(c => c.field === active.id);
            const newIndex = sortCriteria.findIndex(c => c.field === over.id);
            setSortCriteria(arrayMove(sortCriteria, oldIndex, newIndex));
        }
    };

    const handleAddClient = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/clients', newClient);
            mutate();
            setNewClient({
                name: '',
                email: '',
                status: 'active',
                type: 'individual'
            });
        } catch (error) {
            console.error('Error creating client:', error);
        }
    };

    if (!isMounted) return null;

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
            <Card className="relative overflow-hidden shadow-lg bg-gradient-to-r from-primary/10 to-primary/20 group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-gradient-x" />
          <div className="p-6 space-y-1 relative z-10">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">CREATEXP LABS</h1>
            <CardDescription className="text-lg font-medium flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary/80" />Client Management System </CardDescription>
                </div>
            </Card>
            </motion.div>



            {/* Add Client Form */}
            
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Add New Client</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddClient} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                placeholder="Name"
                                value={newClient.name}
                                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                            />
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                placeholder="Email"
                                type="email"
                                value={newClient.email}
                                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                            />
                            <Select
                                value={newClient.status}
                                onValueChange={(value: Client['status']) => setNewClient({ ...newClient, status: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                value={newClient.type}
                                onValueChange={(value: Client['type']) => setNewClient({ ...newClient, type: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="individual">Individual</SelectItem>
                                    <SelectItem value="company">Company</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit">Add Client</Button>
                    </form>
                </CardContent>
            </Card>

            {/* Sort Panel */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <GripVertical className="h-5 w-5 text-muted-foreground" />
                        Sort Configuration
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <SortPanel
                        criteria={sortCriteria}
                        onAdd={addCriterion}
                        onRemove={removeCriterion}
                        onToggle={toggleDirection}
                        onDragEnd={handleDragEnd}
                    />
                </CardContent>
            </Card>

            {/* Client Table */}
            

<Card className="shadow-lg">
  <Table className="w-full border-collapse">
    <TableHeader className="bg-muted/50">
      <TableRow className="grid grid-cols-5 border-b-2 border-muted">
        <TableHead className="p-4 text-left font-semibold border-r border-muted">Name</TableHead>
        <TableHead className="p-4 text-left font-semibold border-r border-muted">Email</TableHead>
        <TableHead className="p-4 text-center font-semibold border-r border-muted">Created At</TableHead>
        <TableHead className="p-4 text-center font-semibold border-r border-muted">Updated At</TableHead>
        <TableHead className="p-4 text-center font-semibold">Status</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      {sortedClients.map((client, index) => (
        <MotionTableRow
          key={client.id}
          className="grid grid-cols-5 border-b border-muted/50 hover:bg-muted/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          layout
        >
          <TableCell className="p-4 border-r border-muted/50">{client.name}</TableCell>
          <TableCell className="p-4 border-r border-muted/50 text-ellipsis overflow-hidden">
            {client.email}
          </TableCell>
          <TableCell className="p-4 border-r border-muted/50 text-center">
            {new Date(client.createdAt).toLocaleDateString()}
          </TableCell>
          <TableCell className="p-4 border-r border-muted/50 text-center">
            {new Date(client.updatedAt).toLocaleDateString()}
          </TableCell>
          <TableCell className="p-4 text-center">
            <Badge variant={client.status === 'active' ? 'default' : 'destructive'}>
              {client.status}
            </Badge>
          </TableCell>
        </MotionTableRow>
      ))}
    </TableBody>
  </Table>
</Card>

        </div>
    );
};

// Sort Panel Component
interface SortPanelProps {
    criteria: SortCriterion[];
    onAdd: (field: keyof Client) => void;
    onRemove: (index: number) => void;
    onToggle: (index: number) => void;
    onDragEnd: (event: DragEndEvent) => void;
}

const SortPanel = ({ criteria, onAdd, onRemove, onToggle, onDragEnd }: SortPanelProps) => {
    const sensors = useSensors(useSensor(PointerSensor));
    const [selectedField, setSelectedField] = useState<keyof Client>('name');

    return (
        <div className="space-y-4">
            <div className="flex gap-2 items-center">
                <Select value={selectedField} onValueChange={(value) => setSelectedField(value as keyof Client)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                        {['name', 'createdAt', 'updatedAt', 'status'].map((field) => (
                            <SelectItem key={field} value={field}>
                                {field.replace(/([A-Z])/g, ' $1').trim()}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button onClick={() => onAdd(selectedField)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Sort
                </Button>
            </div>

            <DndContext sensors={sensors} onDragEnd={onDragEnd}>
                <SortableContext items={criteria} strategy={verticalListSortingStrategy}>
                    <motion.div layout className="space-y-2">
                        {criteria.map((criterion, index) => (
                            <SortableItem
                                key={`${criterion.field}-${index}`}
                                criterion={criterion}
                                index={index}
                                onToggle={() => onToggle(index)}
                                onRemove={() => onRemove(index)}
                            />
                        ))}
                    </motion.div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

// Sortable Item Component
interface SortableItemProps {
    criterion: SortCriterion;
    index: number;
    onToggle: () => void;
    onRemove: () => void;
}

const SortableItem = ({ criterion, onToggle, onRemove }: SortableItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: criterion.field,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined,
    };

    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-3 p-3 bg-background rounded-lg border-2 border-muted/50 shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
        >
            <Button
                variant="ghost"
                size="icon"
                className="cursor-grab text-muted-foreground hover:bg-accent"
                {...attributes}
                {...listeners}
            >
                <GripVertical className="h-4 w-4" />
            </Button>

            <span className="font-medium capitalize flex-1 text-base">
                {criterion.field.replace(/([A-Z])/g, ' $1').trim()}
            </span>

            <Button
                variant="outline"
                size="sm"
                onClick={onToggle}
                className="gap-1.5 text-base"
            >
                {criterion.direction === 'asc' ? (
                    <ArrowUp className="h-4 w-4" />
                ) : (
                    <ArrowDown className="h-4 w-4" />
                )}
                {criterion.direction === 'asc' ? 'Asc' : 'Desc'}
            </Button>

            <Button
                variant="ghost"
                size="icon"
                onClick={onRemove}
                className="text-muted-foreground hover:text-destructive"
            >
                <X className="h-4 w-4" />
            </Button>
        </motion.div>
    );
};

export default ClientTable;