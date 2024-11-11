import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addCategory, addSubCategory, getCategories } from "@/api/adminApi";
import toast from "react-hot-toast";

const Categories: React.FC = () => {
    const [categories, setCategories] = useState([]);
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
    const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
    const [isAddSubcategoryOpen, setIsAddSubcategoryOpen] = useState(false);

    const [newCategory, setNewCategory] = useState("");
    const [newSubcategory, setNewSubcategory] = useState({ category: "", name: "" });

    const handleAddCategory = async () => {
        if (newCategory) {
            try {
                await addCategory(newCategory);
                setNewCategory("");
                setIsAddCategoryOpen(false);
                getAllCategories(); 
            } catch (error:any) {
                console.log("Error in add category:", error);
                toast.error(error.response.data.message);
            }
        }
    };

    const getAllCategories = async () => {
        const response = await getCategories();
        // console.log("response.data.data", response);
        setCategories(response.data); 
    };

    useEffect(() => {
        getAllCategories();
    }, []); 

    const handleAddSubcategory = async () => {
        if (newSubcategory.category && newSubcategory.name) {
            await addSubCategory(newSubcategory);
            setNewSubcategory({ category: "", name: "" });
            setIsAddSubcategoryOpen(false);
            getAllCategories(); 
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
                                        {categories?.map((cat) => (
                                            <option key={cat._id} value={cat.name}>
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
                    {/* <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Edit Category
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Category</DialogTitle>
                                <DialogDescription>Enter the name of the new category.</DialogDescription>
                            </DialogHeader>
                            <Input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Category name" />
                            <DialogFooter>
                                <Button onClick={handleAddCategory}>Add Category</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog> */}
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Subcategories</TableHead>
                        <TableHead>actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories?.map((category) => (
                        <TableRow key={category?._id}>
                            <TableCell className="font-medium">{category?.name}</TableCell>
                            <TableCell>{category?.subCategory.map((sub: { name: string }) => sub.name).join(", ")}</TableCell>
                            <TableCell className="font-medium">
                                <Button variant="outline">Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                        <DialogDescription>Update the category name and manage subcategories.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="categoryName" className="text-right">
                                Name
                            </Label>
                            
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newSubcategory" className="text-right">
                                New Subcategory
                            </Label>
                            
                        </div>
                        <Button  className="ml-auto">
                            Add Subcategory
                        </Button>
                        <div className="mt-4">
                            <h4 className="mb-2 font-semibold">Subcategories:</h4>
                            <ul className="space-y-2">
                                
                            </ul>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default Categories;
