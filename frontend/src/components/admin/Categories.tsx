import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock data for categories and subcategories
const mockData = [
    { id: 1, name: "Electronics", subcategories: ["Phones", "Laptops", "Tablets"] },
    { id: 2, name: "Clothing", subcategories: ["Men", "Women", "Kids"] },
    { id: 3, name: "Books", subcategories: ["Fiction", "Non-fiction", "Educational"] },
];

const Categories: React.FC = () => {
    const [categories, setCategories] = useState(mockData);
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
    const [isAddSubcategoryOpen, setIsAddSubcategoryOpen] = useState(false);

    const [newCategory, setNewCategory] = useState("");
    const [newSubcategory, setNewSubcategory] = useState({ category: "", name: "" });

    const handleAddCategory = () => {
        if (newCategory) {
            setCategories([...categories, { id: categories.length + 1, name: newCategory, subcategories: [] }]);
            setNewCategory("");
            setIsAddCategoryOpen(false);
        }
    };

    // useEffect(() => {

    // }, [categories]);

    const handleAddSubcategory = () => {
        if (newSubcategory.category && newSubcategory.name) {
            setCategories(categories.map((cat) => (cat.name === newSubcategory.category ? { ...cat, subcategories: [...cat.subcategories, newSubcategory.name] } : cat)));
            setNewSubcategory({ category: "", name: "" });
            setIsAddSubcategoryOpen(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Categories</h1>
                <div className="space-x-2">
                    <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Add Category
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Category</DialogTitle>
                                <DialogDescription>Enter the name of the new category.</DialogDescription>
                            </DialogHeader>
                            <Input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Category name" />
                            <DialogFooter>
                                <Button onClick={handleAddCategory}>Add Category</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isAddSubcategoryOpen} onOpenChange={setIsAddSubcategoryOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Add Subcategory
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Subcategory</DialogTitle>
                                <DialogDescription>Select a category and enter the name of the new subcategory.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="category">Category</Label>
                                    <select
                                        id="category"
                                        className="w-full p-2 border rounded"
                                        value={newSubcategory.category}
                                        onChange={(e) => setNewSubcategory({ ...newSubcategory, category: e.target.value })}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.name}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <Label htmlFor="subcategory">Subcategory Name</Label>
                                    <Input
                                        id="subcategory"
                                        value={newSubcategory.name}
                                        onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
                                        placeholder="Subcategory name"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleAddSubcategory}>Add Subcategory</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Subcategories</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell className="font-medium">{category.name}</TableCell>
                            <TableCell>{category.subcategories.join(", ")}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Categories;
